const ProdutoModel = require("../models/produtoModels");

/**
 * Lista todos os produtos
 * GET /produto/lista
 */
const lista = async (req, res) => {
  try {
    const produtos = await ProdutoModel.lista();

    return res.status(200).json({
      success: true,
      data: produtos,
      total: produtos.length,
    });
  } catch (error) {
    console.error("❌ Erro ao listar produtos:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao listar produtos",
      error: error.message,
    });
  }
};

/**
 * Cadastra um novo produto
 * POST /produto/cadastro
 */
const cadastro = async (req, res) => {
  try {
    // Validações básicas
    if (!req.body.nome) {
      return res.status(400).json({
        success: false,
        message: "Nome do produto é obrigatório",
      });
    }

    if (!req.body.preco_venda || req.body.preco_venda <= 0) {
      return res.status(400).json({
        success: false,
        message: "Preço de venda é obrigatório e deve ser maior que zero",
      });
    }

    // Validação de variações
    if (req.body.variacao && Array.isArray(req.body.variacao)) {
      if (req.body.variacao.length > 1 && req.body.images && req.body.images.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Quando há múltiplas variações, as imagens devem estar nas variações, não no produto principal",
        });
      }

      // Valida cada variação
      for (const v of req.body.variacao) {
        if (!v.nome) {
          return res.status(400).json({
            success: false,
            message: "Nome da variação é obrigatório",
          });
        }
      }
    }

    // Cria o produto
    const produtoId = await ProdutoModel.cadastro(req.body);

    return res.status(201).json({
      success: true,
      message: "Produto cadastrado com sucesso",
      data: { id_produto: produtoId },
    });
  } catch (error) {
    console.error("❌ Erro ao cadastrar produto:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao cadastrar produto",
      error: error.message,
    });
  }
};

/**
 * Edita um produto existente
 * PUT /produto/editar/:id
 */
const editar = async (req, res) => {
  try {
    const { id } = req.params;

    // Validações
    if (!req.body.nome) {
      return res.status(400).json({
        success: false,
        message: "Nome do produto é obrigatório",
      });
    }

    // Atualiza o produto
    await ProdutoModel.editar(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Produto atualizado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao editar produto:", error);
    
    if (error.message === "Produto não encontrado") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erro ao editar produto",
      error: error.message,
    });
  }
};

/**
 * Deleta um produto
 * DELETE /produto/deletar/:id
 */
const deletar = async (req, res) => {
  try {
    const { id } = req.params;

    await ProdutoModel.deletar(id);

    return res.status(200).json({
      success: true,
      message: "Produto deletado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao deletar produto:", error);

    if (error.message === "Produto não encontrado") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erro ao deletar produto",
      error: error.message,
    });
  }
};

module.exports = {
  cadastro,
  lista,
  editar,
  deletar,
};