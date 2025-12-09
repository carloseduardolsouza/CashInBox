const VendaModel = require("../models/VendaModel");

const lista = async (req, res) => {
  try {
    const vendas = await VendaModel.lista();

    return res.status(200).json({
      success: true,
      data: vendas,
      total: vendas.length,
    });
  } catch (error) {
    console.error("❌ Erro ao listar vendas:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao listar vendas",
      error: error.message,
    });
  }
};

const cadastro = async (req, res) => {
  try {

    // Criar venda
    const vendaId = await VendaModel.cadastro(req.body);

    return res.status(201).json({
      success: true,
      message: "Venda cadastrado com sucesso",
      data: { id_venda: vendaId },
    });
  } catch (error) {
    console.error("❌ Erro ao cadastrar venda:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao cadastrar venda",
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
