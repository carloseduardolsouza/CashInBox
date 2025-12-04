const ClienteModel = require("../models/clientesModels");

const lista = async (req, res) => {
  try {
    // Sem paginação
    const clientes = await ClienteModel.lista();

    return res.status(200).json({
      success: true,
      data: clientes,
      total: clientes.length,
    });
  } catch (error) {
    console.error("❌ Erro ao listar clientes:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao listar clientes",
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

    // Criar cliente
    const clienteId = await ClienteModel.cadastro(req.body);

    return res.status(201).json({
      success: true,
      message: "Cliente cadastrado com sucesso",
      data: { id_cliente: clienteId },
    });
  } catch (error) {
    console.error("❌ Erro ao cadastrar cliente:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao cadastrar cliente",
      error: error.message,
    });
  }
};

const editar = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o cliente existe
    const cliente = await ClienteModel.editar(id , req.body);
    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: "Cliente não encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cliente atualizado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao editar cliente:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao editar cliente",
      error: error.message,
    });
  }
};

const deletar = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o cliente existe
    const cliente = await ClienteModel.deletar(id);
    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: "Cliente não encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cliente deletado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao deletar cliente:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao deletar cliente",
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
