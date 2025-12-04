const { db } = require("../config/database");
const formate = require("../utils/formate");

const cadastro = async (clienteData) => {
  return await db.transaction(async (trx) => {
    const { endereco, ...cliente } = clienteData; // separa certinho

    // 1. Criar cliente
    const [clienteId] = await trx("cliente").insert({
      ...cliente,
      nome: formate.formatNome(cliente.nome),
      email: cliente.email ? cliente.email.toLowerCase() : "",
      created_at: trx.fn.now(),
    });

    // 2. Criar endereços (percorrendo o array)
    if (Array.isArray(endereco) && endereco.length > 0) {
      for (const end of endereco) {
        await trx("endereco").insert({
          pais: formate.normalize(end.pais),
          estado: formate.normalize(end.estado),
          cidade: formate.normalize(end.cidade),
          bairro: formate.normalize(end.bairro),
          rua: formate.normalize(end.rua),
          cep: end.cep,
          complemento: formate.normalize(end.complemento),
          id_cliente: clienteId,
        });
      }
    }

    return clienteId;
  });
};

const lista = async () => {
  // Busca todos os clientes
  const clientes = await db("cliente").select("*");

  // Busca todos os endereços
  const enderecos = await db("endereco").select("*");

  // Monta a estrutura final
  const resultado = clientes.map((cliente) => {
    const enderecosCliente = enderecos
      .filter((e) => e.id_cliente === cliente.id_cliente)
      .map((e) => ({
        id_endereco: e.id_endereco,
        pais: e.pais,
        estado: e.estado,
        cidade: e.cidade,
        bairro: e.bairro,
        rua: e.rua,
        cep: e.cep,
        complemento: e.complemento,
      }));

    return {
      id_cliente: cliente.id_cliente,
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email,
      cpfCNPJ: cliente.cpfCNPJ,
      data_nascimento: cliente.data_nascimento,
      genero: cliente.genero,
      observacoes: cliente.observacoes,
      endereco: enderecosCliente,
    };
  });

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
