const { db } = require("../config/database");
const formate = require("../utils/formate");

const cadastro = async (funcionarioData) => {
  return await db.transaction(async (trx) => {
    // 1. Criar funcionario
    const [funcionarioId] = await trx("funcionarios").insert({
      ...funcionarioData,
      nome: formate.formatNome(funcionarioData.nome),
      email: funcionarioData.email ? funcionarioData.email.toLowerCase() : "",
      created_at: trx.fn.now(),
    });

    return funcionarioId;
  });
};

const lista = async () => {
  // Busca todos os funcionarios
  const funcionarios = await db("funcionarios").select("*");

  return funcionarios;
};

const editar = async (id, funcionarioData) => {
  return await db.transaction(async (trx) => {
    // 1. Atualiza dados do funcionario
    await trx("funcionarios")
      .where("id_funcionario", id)
      .update({
        ...funcionarioData,
        nome: formate.formatNome(funcionarioData.nome),
        email: funcionarioData.email ? funcionarioData.email.toLowerCase() : "",
      });

    return true;
  });
};

const deletar = async (id) => {
  return await db.transaction(async (trx) => {
    // Verifica se o funcionario existe
    const funcionario = await trx("funcionarios").where("id_funcionario", id).first();

    if (!funcionario) {
      throw new Error("Funcionario não encontrado");
    }

    // 1. Deletar o funcionario
    await trx("funcionarios").where("id_funcionario", id).del();

    return true;
  });
};

module.exports = {
  cadastro,
  lista,
  editar,
  deletar,
};
