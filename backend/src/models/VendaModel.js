const { db } = require("../config/database");
const formate = require("../utils/formate");
const clientesModels = require("./clientesModels");
const produtoModels = require("./produtoModels");

const cadastro = async (vendaData) => {
  return await db.transaction(async (trx) => {
    const { pagamento, produtos, crediario, ...venda } = vendaData; // separa certinho

    // 1. Criar venda
    const [vendaID] = await trx("vendas").insert(venda);

    // 2. Criar pagamentos (percorrendo o array)
    if (Array.isArray(pagamento) && pagamento.length > 0) {
      for (const end of pagamento) {
        await trx("vendas_pagamento").insert({
          ...end,
          id_venda: vendaID,
        });
      }
    } else {
      await trx("vendas_pagamento").insert({
        id_venda: vendaID,
        forma: "Entrada crediário",
        valor: crediario.entrada,
      });
    }

    // 3. Criar produtos da venda (percorrendo o array)
    if (Array.isArray(produtos) && produtos.length > 0) {
      for (const end of produtos) {
        await trx("venda_itens").insert({
          ...end,
          id_venda: vendaID,
        });
      }
    }

    // 4. cria o crediario
    if (crediario != null) {
      var [crediarioID] = await trx("crediario_venda").insert({
        id_venda: vendaID,
        id_cliente: venda.id_cliente,
        valor_total: venda.valor_liquido,
        entrada: crediario.entrada,
        numero_parcelas: Number(crediario.numero_parcelas),
        status: "Pendente",
        created_at: new Date().toISOString(),
      });
    }

    // 5. cria as parcelas do crediario
    if (
      crediario != null &&
      crediario.parcelas &&
      Array.isArray(crediario.parcelas) &&
      crediario.parcelas.length > 0
    ) {
      for (const end of crediario.parcelas) {
        await trx("crediario_parcelas").insert({
          id_crediario: crediarioID,
          numero_parcela: end.numero_parcela,
          valor: end.valor,
          data_vencimento: end.data_vencimento,
          status: "Pendente",
        });
      }
    }

    return vendaID;
  });
};

const listaCrediarios = async () => {
  // Busca todos os crediarios
  const crediarios = await db("crediario_venda").select("*");
  // Busca todas as parcelas do crediario
  const parcelas = await db("crediario_parcelas").select("*");
  // Busca todos os clientes
  const clientes = await db("cliente").select("*");

  const resultado = crediarios.map((dados) => {
    // 1. Parcelas do crediario
    const parcelasCrediario = parcelas
      .filter((p) => p.id_crediario === dados.id_crediario)
      .map((p) => p);
    // 2. Clientes do crediario
    const clienteCrediario = clientes.find(
      (p) => p.id_cliente === dados.id_cliente
    );

    return {
      ...dados,
      cliente: clienteCrediario,
      parcelas: parcelasCrediario,
    };
  });

  return resultado;
};

const darBaixaParcela = async (id, dadosPagamento) => {
  return await db.transaction(async (trx) => {
    // 1. Verifica se a parcela existe
    const parcela = await trx("crediario_parcelas")
      .where("id_parcela", id)
      .first();

    if (!parcela) {
      throw new Error("Parcela não encontrada");
    }

    // 2. Busca o crediário relacionado
    const crediario = await trx("crediario_venda")
      .where("id_crediario", parcela.id_crediario)
      .first();

    if (!crediario) {
      throw new Error("Crediário não encontrado");
    }

    // 3. Atualiza a parcela para "Pago"
    await trx("crediario_parcelas").where("id_parcela", id).update({
      data_pagamento: dadosPagamento.data_pagamento,
      valor_pago: dadosPagamento.valor_pago,
      status: "Pago",
    });

    // 3.1 Adiciona o forma de pagamento na venda
    await trx("vendas_pagamento").insert({
      id_venda: crediario.id_venda,
      id_parcela: id,
      forma: `Parcela de n° ${parcela.numero_parcela}`,
      valor: dadosPagamento.valor_pago,
      data_pagamento: dadosPagamento.data_pagamento,
    });

    // 4. Busca todas as parcelas do crediario
    const parcelasAll = await trx("crediario_parcelas")
      .select("*")
      .where("id_crediario", parcela.id_crediario);

    const parcelasPagas = parcelasAll.filter((e) => e.status === "Pago");

    if (parcelasAll.length === parcelasPagas.length) {
      await trx("crediario_venda")
        .where("id_crediario", crediario.id_crediario)
        .update({ status: "Pago" });
    }

    // 5. Atualiza status do crediário (na tabela de vendas)
    const statusVenda =
      parcelasPagas.length === parcelasAll.length
        ? "Crediário pago"
        : `Pagamento pendente: ${parcelasPagas.length}/${parcelasAll.length}`;

    await trx("vendas")
      .where("id_venda", crediario.id_venda)
      .update({ status: statusVenda });

    return {
      ok: true,
      status: statusVenda,
      parcelasPagas: parcelasPagas.length,
      totalParcelas: parcelasAll.length,
    };
  });
};

const amortizarParcela = async (id, dadosAmortizacao) => {
  return await db.transaction(async (trx) => {
    // 1. Verifica se o crediario existe
    const crediario = await trx("crediario_venda")
      .where("id_crediario", id)
      .first();

    if (!crediario) {
      throw new Error("Crediario não encontrado");
    }

    // 2. Busca todas as parcelas do crediario
    const parcelasAll = await trx("crediario_parcelas")
      .select("*")
      .where("id_crediario", id);

    if (!parcelasAll) {
      throw new Error("Parcelas não encontradas");
    }

    // 3. Filtra somente as parcelas pendentes
    const parcelasPendentes = parcelasAll.filter((e) => e.status != "Pago");

    // 4. Atualiza os valores da parcela para o novo valor
    for (const end of parcelasPendentes) {
      await trx("crediario_parcelas")
        .where("id_parcela", end.id_parcela)
        .update({
          valor: dadosAmortizacao.novo_valor
        });
    }

    // 5. Adiciona o forma de pagamento na venda
    await trx("vendas_pagamento").insert({
      id_venda: crediario.id_venda,
      forma: `Amortização`,
      valor: dadosAmortizacao.valor_amortizado,
      data_pagamento: new Date().toISOString(),
    });

    return true;
  });
};

const cancelarParcela = async (id) => {
  return await db.transaction(async (trx) => {
    // 1. Verifica se a parcela existe
    const parcela = await trx("crediario_parcelas")
      .where("id_parcela", id)
      .first();

    if (!parcela) {
      throw new Error("Parcela não encontrada");
    }

    // 2. Busca o crediário relacionado
    const crediario = await trx("crediario_venda")
      .where("id_crediario", parcela.id_crediario)
      .first();

    if (!crediario) {
      throw new Error("Crediário não encontrado");
    }

    //2.1 Atualiza o status do crediario para pendente
    await trx("crediario_venda")
      .where("id_crediario", parcela.id_crediario)
      .update({
        status: "Pendente",
      });

    // 3. Atualiza a parcela para "Pendente"
    await trx("crediario_parcelas").where("id_parcela", id).update({
      data_pagamento: null,
      valor_pago: null,
      status: "Pendente",
    });

    // 3.1 Remove a forma de pagamento na venda
    await trx("vendas_pagamento").where("id_parcela", id).del();

    // 4. Busca todas as parcelas do crediario
    const parcelasAll = await trx("crediario_parcelas")
      .select("*")
      .where("id_crediario", parcela.id_crediario);

    const parcelasPagas = parcelasAll.filter((e) => e.status === "Pago");

    // 5. Atualiza status do crediário (na tabela de vendas)
    const statusVenda =
      parcelasPagas.length === parcelasAll.length
        ? "Crediário pago"
        : `Pagamento pendente: ${parcelasPagas.length}/${parcelasAll.length}`;

    await trx("vendas")
      .where("id_venda", crediario.id_venda)
      .update({ status: statusVenda });

    return {
      ok: true,
      status: statusVenda,
      parcelasPagas: parcelasPagas.length,
      totalParcelas: parcelasAll.length,
    };
  });
};

const lista = async () => {
  // Busca todas as vendas
  const vendas = await db("vendas").select("*").orderBy("data", "desc");

  // Busca todos os pagamentos
  const pagamentos = await db("vendas_pagamento").select("*");

  // Busca todos os itens das vendas
  const itens = await db("venda_itens").select("*");

  // Busca todos os clientes
  const clientes = await clientesModels.lista();

  // Busca todos os funcionários
  const funcionarios = await db("funcionarios").select("*");

  // Busca todos os produtos
  const produtos = await produtoModels.listaAll();

  // Busca todos os crediarios
  const crediarios = await listaCrediarios();

  console.log(`📊 Processando ${vendas.length} venda(s)...`);

  // Monta a estrutura final
  const resultado = vendas.map((venda) => {
    // 1. Pagamentos da venda
    const pagamentosVenda = pagamentos
      .filter((p) => p.id_venda === venda.id_venda)
      .map((p) => p);

    // 2. Cliente da venda
    const clienteVenda =
      clientes.find((c) => c.id_cliente === venda.id_cliente) || null;

    // 3. Funcionário/Vendedor da venda
    const funcionarioVenda =
      funcionarios.find((f) => f.id_funcionario === venda.id_funcionario) ||
      null;

    // 4. Itens da venda com detalhes dos produtos
    const itensVenda = itens
      .filter((item) => item.id_venda === venda.id_venda)
      .map((item) => {
        // Busca o produto correspondente
        const produto = produtos.find((p) => p.id_produto === item.id_produto);

        if (!produto) {
          console.warn(
            `⚠️  Produto ${item.id_produto} não encontrado na venda ${venda.id_venda}`
          );
          return {
            id_item: item.id_item,
            id_produto: item.id_produto,
            id_variacao: item.id_variacao,
            nome_produto: "Produto não encontrado",
            nome_variacao: null,
            quantidade: item.quantidade,
            preco_unitario: item.preco_unitario,
            subtotal: item.subtotal,
          };
        }

        // Se tem variação, busca os detalhes
        let nomeVariacao = null;
        let imagemVariacao = null;

        if (item.id_variacao && produto.variacao) {
          const variacao = produto.variacao.find(
            (v) => v.id_variacao === item.id_variacao
          );

          if (variacao) {
            nomeVariacao = variacao.nome;
            imagemVariacao = variacao.imagem
              ? variacao.imagem.caminho_arquivo
              : null;
          }
        }

        // Pega a primeira imagem do produto (principal ou primeira disponível)
        const imagemProduto =
          produto.images && produto.images.length > 0
            ? produto.images.find((img) => img.principal)?.caminho_arquivo ||
              produto.images[0].caminho_arquivo
            : null;

        return {
          id_item: item.id_item,
          id_produto: item.id_produto,
          id_variacao: item.id_variacao,
          nome_produto: produto.nome,
          nome_variacao: nomeVariacao,
          imagem: imagemVariacao || imagemProduto, // Prioriza imagem da variação
          quantidade: item.quantidade,
          preco_unitario: item.preco_unitario,
          subtotal: item.subtotal,
        };
      });

    // 5. Crediaio da venda
    const crediarioVenda =
      crediarios.find((c) => c.id_venda === venda.id_venda) || null;

    return {
      id_venda: venda.id_venda,
      data: venda.data,
      valor_bruto: venda.valor_bruto,
      valor_liquido: venda.valor_liquido,
      status: venda.status,
      desconto_real: venda.desconto_real,
      desconto_porcentagem: venda.desconto_porcentagem,
      acrescimo_real: venda.acrescimo_real,
      acrescimo_porcentagem: venda.acrescimo_porcentagem,
      id_usuario: venda.id_usuario,
      cliente: clienteVenda,
      vendedor: funcionarioVenda
        ? {
            id_funcionario: funcionarioVenda.id_funcionario,
            nome: funcionarioVenda.nome,
            cargo: funcionarioVenda.cargo,
          }
        : null,
      pagamentos: pagamentosVenda,
      crediario: crediarioVenda,
      itens: itensVenda,
      total_itens: itensVenda.length,
    };
  });

  console.log(`✅ ${resultado.length} venda(s) processada(s)`);

  return resultado;
};

const deletar = async (id) => {
  return await db.transaction(async (trx) => {
    // Verifica se a venda existe
    const venda = await trx("vendas").where("id_venda", id).first();

    if (!venda) {
      throw new Error("Venda não encontrado");
    }

    // 1. Deletar a venda
    await trx("vendas").where("id_venda", id).del();

    return true;
  });
};

module.exports = {
  cadastro,
  lista,
  listaCrediarios,
  darBaixaParcela,
  amortizarParcela,
  cancelarParcela,
  deletar,
};
