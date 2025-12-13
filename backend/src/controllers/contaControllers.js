const ContaModel = require("../models/ContaModels");

const lista = async (req, res) => {
  try {
    const contas = await ContaModel.lista();

    return res.status(200).json({
      success: true,
      data: contas,
      total: contas.length,
    });
  } catch (error) {
    console.error("❌ Erro ao listar contas:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao listar contas",
      error: error.message,
    });
  }
};

const cadastro = async (req, res) => {
  try {
    // Criar a conta
    const contaId = await ContaModel.cadastro(req.body);

    return res.status(201).json({
      success: true,
      message: "Conta cadastrada com sucesso",
      data: { id_conta: contaId },
    });
  } catch (error) {
    console.error("❌ Erro ao cadastrar conta:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao cadastrar conta",
      error: error.message,
    });
  }
};

const editar = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se a conta existe
    const conta = await ContaModel.editar(id , req.body);
    if (!conta) {
      return res.status(404).json({
        success: false,
        message: "Conta não encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Conta atualizado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao editar conta:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao editar conta",
      error: error.message,
    });
  }
};

const pagar = async (req , res) => {
  try {
    const { id } = req.params;

    // Verifica se a conta existe
    const conta = await ContaModel.pagar(id , req.body);
    if (!conta) {
      return res.status(404).json({
        success: false,
        message: "Conta não encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Conta atualizado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao editar conta:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao editar conta",
      error: error.message,
    });
  }
}

const deletar = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o conta existe
    const conta = await ContaModel.deletar(id);
    if (!conta) {
      return res.status(404).json({
        success: false,
        message: "Conta não encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Conta deletado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao deletar conta:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao deletar conta",
      error: error.message,
    });
  }
};

// Categorias
const cadastroCategoria = async (req, res) => {
  try {
    if (!req.body.nome) {
      return res.status(400).json({
        success: false,
        message: "Nome é obrigatório",
      });
    }

    const categoriaId = await ContaModel.cadastroCategoria(req.body);

    return res.status(201).json({
      success: true,
      message: "Categoria cadastrada com sucesso",
      data: { id_categoria: categoriaId },
    });
  } catch (error) {
    console.error("❌ Erro ao cadastrar categoria:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao cadastrar categoria",
      error: error.message,
    });
  }
};

const listaCategoria = async (req, res) => {
  try {
    const categorias = await ContaModel.listaCategoria();

    return res.status(200).json({
      success: true,
      data: categorias,
      total: categorias.length,
    });
  } catch (error) {
    console.error("❌ Erro ao listar categorias:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao listar categorias",
      error: error.message,
    });
  }
};

const editarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await ContaModel.editarCategoria(id, req.body);
    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: "Categoria não encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Categoria atualizada com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao editar categoria:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao editar categoria",
      error: error.message,
    });
  }
};

const deletarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await ContaModel.deletarCategoria(id);
    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: "Categoria não encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Categoria deletada com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao deletar categoria:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao deletar categoria",
      error: error.message,
    });
  }
};

// Subcategorias
const cadastroSubcategoria = async (req, res) => {
  try {
    if (!req.body.nome) {
      return res.status(400).json({
        success: false,
        message: "Nome é obrigatório",
      });
    }

    const subcategoriaId = await ContaModel.cadastroSubcategoria(req.body);

    return res.status(201).json({
      success: true,
      message: "Subcategoria cadastrada com sucesso",
      data: { id_subcategoria: subcategoriaId },
    });
  } catch (error) {
    console.error("❌ Erro ao cadastrar subcategoria:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao cadastrar subcategoria",
      error: error.message,
    });
  }
};

const editarSubcategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategoria = await ContaModel.editarSubcategoria(id, req.body);
    if (!subcategoria) {
      return res.status(404).json({
        success: false,
        message: "Subcategoria não encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subcategoria atualizada com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao editar Subcategoria:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao editar Subcategoria",
      error: error.message,
    });
  }
};

const deletarSubcategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategoria = await ContaModel.deletarSubcategoria(id);
    if (!subcategoria) {
      return res.status(404).json({
        success: false,
        message: "Subcategoria não encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subcategoria deletada com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao deletar subcategoria:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao deletar subcategoria",
      error: error.message,
    });
  }
};

module.exports = {
  lista,
  cadastro,
  editar,
  pagar,
  deletar,

  cadastroCategoria,
  listaCategoria,
  editarCategoria,
  deletarCategoria,
  cadastroSubcategoria,
  editarSubcategoria,
  deletarSubcategoria
};
