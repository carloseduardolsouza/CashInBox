const { db } = require("../config/database");
const formate = require("../utils/formate");
const clientesModels = require("./clientesModels");
const produtoModels = require("./produtoModels");

const cadastro = async (vendaData) => {
  return await db.transaction(async (trx) => {
    const { pagamento, produtos, ...venda } = vendaData; // separa certinho

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

    return vendaID;
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
  const produtos = await produtoModels.lista();

  console.log(`📊 Processando ${vendas.length} venda(s)...`);

  // Monta a estrutura final
  const resultado = vendas.map((venda) => {
    // 1. Pagamentos da venda
    const pagamentosVenda = pagamentos
      .filter((p) => p.id_venda === venda.id_venda)
      .map((p) => ({
        id_pagamento: p.id_pagamento,
        forma: p.forma,
        valor: p.valor,
        data_pagamento: p.data_pagamento,
      }));

    // 2. Cliente da venda
    const clienteVenda = clientes.find((c) => c.id_cliente === venda.id_cliente) || null;

    // 3. Funcionário/Vendedor da venda
    const funcionarioVenda = funcionarios.find((f) => f.id_funcionario === venda.id_funcionario) || null;

    // 4. Itens da venda com detalhes dos produtos
    const itensVenda = itens
      .filter((item) => item.id_venda === venda.id_venda)
      .map((item) => {
        // Busca o produto correspondente
        const produto = produtos.find((p) => p.id_produto === item.id_produto);

        if (!produto) {
          console.warn(`⚠️  Produto ${item.id_produto} não encontrado na venda ${venda.id_venda}`);
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
          const variacao = produto.variacao.find((v) => v.id_variacao === item.id_variacao);
          
          if (variacao) {
            nomeVariacao = variacao.nome;
            imagemVariacao = variacao.imagem ? variacao.imagem.caminho_arquivo : null;
          }
        }

        // Pega a primeira imagem do produto (principal ou primeira disponível)
        const imagemProduto = produto.images && produto.images.length > 0
          ? produto.images.find((img) => img.principal)?.caminho_arquivo || produto.images[0].caminho_arquivo
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
      vendedor: funcionarioVenda ? {
        id_funcionario: funcionarioVenda.id_funcionario,
        nome: funcionarioVenda.nome,
        cargo: funcionarioVenda.cargo,
      } : null,
      pagamentos: pagamentosVenda,
      itens: itensVenda,
      total_itens: itensVenda.length,
    };
  });

  console.log(`✅ ${resultado.length} venda(s) processada(s)`);

  return resultado;
};

const editar = async (id, clienteData) => {
  return await db.transaction(async (trx) => {
    const { endereco, ...dadosCliente } = clienteData;

    // 1. Atualiza dados do cliente
    await trx("cliente")
      .where("id_cliente", id)
      .update({
        ...dadosCliente,
        nome: formate.formatNome(dadosCliente.nome),
        email: dadosCliente.email ? dadosCliente.email.toLowerCase() : "",
      });

    // 2. Atualizar endereços
    if (Array.isArray(endereco)) {
      // Remove endereços antigos
      await trx("endereco").where("id_cliente", id).del();

      // Adiciona endereços novamente já formatados
      for (const end of endereco) {
        await trx("endereco").insert({
          pais: formate.normalize(end.pais),
          estado: formate.normalize(end.estado),
          cidade: formate.normalize(end.cidade),
          bairro: formate.normalize(end.bairro),
          rua: formate.normalize(end.rua),
          cep: end.cep,
          complemento: formate.normalize(end.complemento),
          id_cliente: id,
        });
      }
    }

    return true;
  });
};

const deletar = async (id) => {
  return await db.transaction(async (trx) => {
    // Verifica se o cliente existe
    const cliente = await trx("cliente").where("id_cliente", id).first();

    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }

    // 1. Deletar os endereços do cliente
    await trx("endereco").where("id_cliente", id).del();

    // 2. Deletar o cliente
    await trx("cliente").where("id_cliente", id).del();

    return true;
  });
};

module.exports = {
  cadastro,
  lista,
  editar,
  deletar,
};
