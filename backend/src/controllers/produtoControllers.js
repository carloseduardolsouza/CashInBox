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
    console.log("\n📦 Recebendo cadastro de produto...");
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    // 1. Parse dos dados do formulário
    const dadosProduto = {
      nome: req.body.nome,
      descricao: req.body.descricao || "",
      cod_barras: req.body.cod_barras || "",
      preco_custo: parseFloat(req.body.preco_custo) || 0,
      preco_venda: parseFloat(req.body.preco_venda) || 0,
      margem: parseFloat(req.body.margem) || 0,
      id_categoria: req.body.id_categoria ? parseInt(req.body.id_categoria) : null,
      id_subcategoria: req.body.id_subcategoria ? parseInt(req.body.id_subcategoria) : null,
      estoque: parseFloat(req.body.estoque) || 0,
      estoque_minimo: parseFloat(req.body.estoque_minimo) || 0,
      ativo: req.body.ativo !== undefined ? req.body.ativo === 'true' : true,
    };

    // 2. Validações básicas
    if (!dadosProduto.nome || dadosProduto.nome.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Nome do produto é obrigatório",
      });
    }

    if (dadosProduto.preco_venda <= 0) {
      return res.status(400).json({
        success: false,
        message: "Preço de venda é obrigatório e deve ser maior que zero",
      });
    }

    // 3. Parse das imagens do produto principal
    const images = [];
    if (req.files && req.files.length > 0) {
      // Imagens que NÃO pertencem a variações
      req.files.forEach(file => {
        if (!file.fieldname.includes('variacao')) {
          images.push({
            caminho_arquivo: file.filename,
            principal: images.length === 0, // Primeira é principal
          });
        }
      });
    }

    // 4. Parse das variações
    const variacoes = [];
    
    // Verifica se existem variações no body
    if (req.body.variacoes) {
      let variacoesData;
      
      // Se vier como string JSON, faz parse
      if (typeof req.body.variacoes === 'string') {
        try {
          variacoesData = JSON.parse(req.body.variacoes);
        } catch (e) {
          console.error("Erro ao fazer parse das variações:", e);
          variacoesData = [];
        }
      } else {
        variacoesData = req.body.variacoes;
      }

      // Processa cada variação
      if (Array.isArray(variacoesData)) {
        variacoesData.forEach((variacao, index) => {
          const variacaoData = {
            nome: variacao.nome || "",
            tipo: variacao.tipo || "",
            cod_interno: variacao.cod_interno || "",
            cod_barras: variacao.cod_barras || "",
            estoque: parseFloat(variacao.estoque) || 0,
            estoque_minimo: parseFloat(variacao.estoque_minimo) || 0,
            images: []
          };

          // Busca imagens específicas desta variação
          if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
              if (file.fieldname === `variacao_${index}_imagem`) {
                variacaoData.images.push({
                  caminho_arquivo: file.filename,
                  principal: true,
                });
              }
            });
          }

          variacoes.push(variacaoData);
        });
      }
    }

    // 5. Monta objeto final para o Model
    const produtoCompleto = {
      ...dadosProduto,
      images: images,
      variacao: variacoes
    };

    console.log("\n✅ Dados processados:", JSON.stringify(produtoCompleto, null, 2));

    // 6. Salva no banco de dados
    const produtoId = await ProdutoModel.cadastro(produtoCompleto);

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


// Edita um produto existente
// PUT /produto/editar/:id
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

const cadastroCategoria = async (req , res) => {
  try {
      // Validações
      if (!req.body.nome) {
        return res.status(400).json({
          success: false,
          message: "Nome é obrigatório",
        });
      }
  
      // Criar categoria
      const categoriaId = await ProdutoModel.cadastroCategoria(req.body);
  
      return res.status(201).json({
        success: true,
        message: "Categoria cadastrado com sucesso",
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
}

const listaCategoria = async (req , res) => {
  try {
    const categorias = await ProdutoModel.listaCategoria();

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
}

const editarCategoria = (req , res) => {

}

const deletarCategoria = (req , res) => {

}

const cadastroSubcategoria = async (req , res) => {
  try {
      // Validações
      if (!req.body.nome) {
        return res.status(400).json({
          success: false,
          message: "Nome é obrigatório",
        });
      }
  
      // Criar subcategoria
      const subcategoriaId = await ProdutoModel.cadastroSubcategoria(req.body);
  
      return res.status(201).json({
        success: true,
        message: "Subcategoria cadastrado com sucesso",
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
}

const listaSubcategoria = async (req , res) => {
  try {
    const subcategorias = await ProdutoModel.listaSubcategoria();

    return res.status(200).json({
      success: true,
      data: subcategorias,
      total: subcategorias.length,
    });
  } catch (error) {
    console.error("❌ Erro ao listar subcategorias:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao listar subcategorias",
      error: error.message,
    });
  }
}

const editarSubcategoria = (req , res) => {

}

const deletarSubcategoria = (req , res) => {

}

module.exports = {
  cadastro,
  lista,
  editar,
  deletar,

  cadastroCategoria,
  listaCategoria,
  editarCategoria,
  deletarCategoria,

  cadastroSubcategoria,
  listaSubcategoria,
  editarSubcategoria,
  deletarSubcategoria
};