const FuncionarioModel = require("../models/funcionariosModels");

const lista = async (req, res) => {
  try {
    // Sem paginação
    const funcionarios = await FuncionarioModel.lista();

    return res.status(200).json({
      success: true,
      data: funcionarios,
      total: funcionarios.length,
    });
  } catch (error) {
    console.error("❌ Erro ao listar funcionarios:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao listar funcionarios",
      error: error.message,
    });
  }
};

const cadastro = async (req, res) => {
  try {
    // Validações
    if (!req.body.nome) {
      return res.status(400).json({
        success: false,
        message: "Nome é obrigatório",
      });
    }

    // Criar funcionario
    const funcionarioId = await FuncionarioModel.cadastro(req.body);

    return res.status(201).json({
      success: true,
      message: "Funcionario cadastrado com sucesso",
      data: { id_funcionario: funcionarioId },
    });
  } catch (error) {
    console.error("❌ Erro ao cadastrar funcionario:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao cadastrar funcionario",
      error: error.message,
    });
  }
};

const editar = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o funcionario existe
    const funcionario = await FuncionarioModel.editar(id , req.body);
    if (!funcionario) {
      return res.status(404).json({
        success: false,
        message: "Funcionario não encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Funcionario atualizado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao editar funcionario:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao editar funcionario",
      error: error.message,
    });
  }
};

const deletar = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o funcionario existe
    const funcionario = await FuncionarioModel.deletar(id);
    if (!funcionario) {
      return res.status(404).json({
        success: false,
        message: "Funcionario não encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Funcionario deletado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao deletar funcionario:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao deletar funcionario",
      error: error.message,
    });
  }
};

module.exports = {
  lista,
  cadastro,
  editar,
  deletar,
};
