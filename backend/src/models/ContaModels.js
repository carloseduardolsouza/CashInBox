const { db } = require("../config/database");
const formate = require("../utils/formate");

const cadastro = async (contaData) => {
  return await db.transaction(async (trx) => {
    // 1. Criar a conta
    const [contaID] = await trx("contas_pagar").insert({
      ...contaData,
    });

    return contaID;
  });
};

const lista = async () => {
  // Busca todos as contas
  const contas = await db("contas_pagar").select("*");
  // Busca todas as categorias
  const categorias = await db("categoria_movimentacao").select("*")
  // Buca todas as subcategoria
  const subcategorias = await db("subcategoria_movimentacao").select("*")

  // Monta a estrutura final
  const resultado = contas.map((conta) => {
    const categoriaConta = categorias.find((e) => e.id_categoria_movimentacao === conta.id_categoria_movimentacao)
    const subcategoriaConta = subcategorias.find((e) => e.id_subcategoria_movimentacao === conta.id_subcategoria_movimentacao)

    return {
      ...conta,
      categoria: categoriaConta,
      subcategoria: subcategoriaConta
    };
  });

  return resultado;
};

const editar = async (id, contaData) => {
  return await db.transaction(async (trx) => {
    // 1. Atualiza dados da conta
    await trx("contas_pagar")
      .where("id_conta", id)
      .update({
        ...contaData,
      });

    return true;
  });
};

const pagar = async (id , dadosConta) => {
  return await db.transaction(async (trx) => {
    // 1. Atualiza dados da conta
    await trx("contas_pagar")
      .where("id_conta", id)
      .update({
        status: "Pago",
        valor_pago: dadosConta.valor_pago,
        data_pagamento: dadosConta.data_pagamento,
      });

    return true;
  });
}

const deletar = async (id) => {
  return await db.transaction(async (trx) => {
    // Verifica se a conta existe
    const conta = await trx("contas_pagar").where("id_conta", id).first();

    if (!conta) {
      throw new Error("Conta não encontrado");
    }

    // 2. Deletar a conta
    await trx("contas_pagar").where("id_conta", id).del();

    return true;
  });
};

// Categorias
const listaCategoria = async () => {
  // Busca todas as categorias
  const categorias = await db("categoria_movimentacao").select("*");

  // Busca todas as subcategorias
  const subcategorias = await db("subcategoria_movimentacao").select("*");

  // Monta a estrutura final
  const resultado = categorias.map((categoria) => {
    const subcategoriaFiltrada = subcategorias
      .filter(
        (s) =>
          s.id_categoria_movimentacao === categoria.id_categoria_movimentacao
      )
      .map((s) => ({
        id_subcategoria_movimentacao: s.id_subcategoria_movimentacao,
        nome: s.nome,
        descricao: s.descricao,
      }));

    return {
      id_categoria_movimentacao: categoria.id_categoria_movimentacao,
      nome: categoria.nome,
      descricao: categoria.descricao,
      subcategorias: subcategoriaFiltrada,
    };
  });

  return resultado;
};

const cadastroCategoria = async (categoriaData) => {
  return await db.transaction(async (trx) => {
    const [categoriaId] = await trx("categoria_movimentacao").insert({
      ...categoriaData,
      nome: formate.formatNome(categoriaData.nome),
      tipo: "saida",
    });

    return categoriaId;
  });
};

const deletarCategoria = async (id) => {
  return await db.transaction(async (trx) => {
    // Verifica se a categoria existe
    const categoria = await trx("categoria_movimentacao")
      .where("id_categoria_movimentacao", id)
      .first();

    if (!categoria) {
      throw new Error("Categoria não encontrado");
    }

    // 1. Deletar subcategorias
    await trx("subcategoria_movimentacao")
      .where("id_categoria_movimentacao", id)
      .del();

    // 2. Deletar a categoria
    await trx("categoria_movimentacao")
      .where("id_categoria_movimentacao", id)
      .del();

    return true;
  });
};

const editarCategoria = async (id, categoriaData) => {
  return await db.transaction(async (trx) => {
    // 1. Atualiza dados da categoria
    await trx("categoria_movimentacao")
      .where("id_categoria_movimentacao", id)
      .update({
        nome: formate.formatNome(categoriaData.nome),
        descricao: categoriaData.descricao,
      });

    return true;
  });
};

// Subcategorias
const cadastroSubcategoria = async (subcategoriaData) => {
  return await db.transaction(async (trx) => {
    const [subcategoriaId] = await trx("subcategoria_movimentacao").insert({
      ...subcategoriaData,
      nome: formate.formatNome(subcategoriaData.nome),
      tipo: "saida",
    });

    return subcategoriaId;
  });
};

const deletarSubcategoria = async (id) => {
  return await db.transaction(async (trx) => {
    // Verifica se a categoria existe
    const subcategoria = await trx("subcategoria_movimentacao")
      .where("id_subcategoria_movimentacao", id)
      .first();

    if (!subcategoria) {
      throw new Error("SubCategoria não encontrado");
    }

    // 1. Deletar subcategorias
    await trx("subcategoria_movimentacao")
      .where("id_subcategoria_movimentacao", id)
      .del();

    return true;
  });
};

const editarSubcategoria = async (id, subcategoriaData) => {
  return await db.transaction(async (trx) => {
    // 1. Atualiza dados da categoria
    await trx("subcategoria_movimentacao")
      .where("id_subcategoria_movimentacao", id)
      .update({
        nome: formate.formatNome(subcategoriaData.nome),
        descricao: subcategoriaData.descricao,
      });

    return true;
  });
};

module.exports = {
  cadastro,
  lista,
  editar,
  pagar,
  deletar,

  listaCategoria,
  cadastroCategoria,
  deletarCategoria,
  editarCategoria,
  cadastroSubcategoria,
  deletarSubcategoria,
  editarSubcategoria,
};
