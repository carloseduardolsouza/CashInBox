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

const listaCrediarios = async (req ,res) => {
  try {
    const crediarios = await VendaModel.listaCrediarios();

    return res.status(200).json({
      success: true,
      data: crediarios,
      total: crediarios.length,
    });
  } catch (error) {
    console.error("❌ Erro ao listar crediarios:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao listar crediarios",
      error: error.message,
    });
  }
}

const darBaixaParcela = async (req , res) => {
  try {
      const { id } = req.params;
  
      // Verifica se o parcela existe
      const parcela = await VendaModel.darBaixaParcela(id);
      if (!parcela) {
        return res.status(404).json({
          success: false,
          message: "Parcela não encontrado",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Parcela atualizado com sucesso",
      });
    } catch (error) {
      console.error("❌ Erro ao editar parcela:", error);
      return res.status(500).json({
        success: false,
        message: "Erro ao editar parcela",
        error: error.message,
      });
    }
}

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

const deletar = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se a venda existe
    const venda = await VendaModel.deletar(id);
    if (!venda) {
      return res.status(404).json({
        success: false,
        message: "Venda não encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Venda deletado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao deletar venda:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao deletar venda",
      error: error.message,
    });
  }
};

module.exports = {
  lista,
  listaCrediarios,
  darBaixaParcela,
  cadastro,
  deletar,
};
