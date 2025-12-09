const ProdutoModel = require("../models/produtoModels");

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

const cadastro = async (req, res) => {
  try {
    console.log("\n📦 Recebendo cadastro de produto...");
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    // 1. Parse dos dados do produto
    const dadosProduto = {
      nome: req.body.nome,
      descricao: req.body.descricao || "",
      cod_barras: req.body.cod_barras || "",
      preco_custo: parseFloat(req.body.preco_custo) || 0,
      preco_venda: parseFloat(req.body.preco_venda) || 0,
      margem: parseFloat(req.body.margem) || 0,
      id_categoria: req.body.id_categoria
        ? parseInt(req.body.id_categoria)
        : null,
      id_subcategoria: req.body.id_subcategoria
        ? parseInt(req.body.id_subcategoria)
        : null,
      estoque: parseFloat(req.body.estoque) || 0,
      estoque_minimo: parseFloat(req.body.estoque_minimo) || 0,
      ativo: req.body.ativo !== undefined ? req.body.ativo === "true" : true,
    };

    // 2. Validações básicas
    if (!dadosProduto.nome || dadosProduto.nome.trim() === "") {
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

    // 3. Parse das variações
    let variacoesData = [];
    if (req.body.variacoes) {
      try {
        variacoesData =
          typeof req.body.variacoes === "string"
            ? JSON.parse(req.body.variacoes)
            : req.body.variacoes;
      } catch (e) {
        console.error("❌ Erro ao fazer parse das variações:", e);
      }
    }

    const temVariacoes =
      Array.isArray(variacoesData) && variacoesData.length > 0;
    console.log(`📊 Tem variações: ${temVariacoes} (${variacoesData.length})`);

    // 4. Processar TODAS as imagens enviadas
    const todasImagens = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file, index) => {
        todasImagens.push(file.filename);
        console.log(`📸 Imagem ${index}: ${file.filename}`);
      });
    }

    console.log(`\n📊 Total de imagens recebidas: ${todasImagens.length}`);

    // 5. Preparar imagens do produto (TODAS as imagens vão aqui)
    const imagesProduto = todasImagens.map((filename, index) => ({
      caminho_arquivo: filename,
      principal: index === 0, // Primeira imagem é a principal
    }));

    // 6. Processar variações (se houver)
    const variacoes = [];
    const imagensUsadasEmVariacoes = new Set();

    if (temVariacoes) {
      console.log("\n🔄 Processando variações...");

      variacoesData.forEach((variacao, index) => {
        const variacaoData = {
          nome: variacao.nome || "",
          tipo: variacao.tipo || "",
          cod_interno: variacao.cod_interno || "",
          cod_barras: variacao.cod_barras || "",
          estoque: parseFloat(variacao.estoque) || 0,
          estoque_minimo: parseFloat(variacao.estoque_minimo) || 0,
          images: [],
        };

        // Verifica se esta variação tem uma imagem associada
        const imagemIndex = variacao.imagemIndex;

        if (
          imagemIndex !== null &&
          imagemIndex !== undefined &&
          todasImagens[imagemIndex]
        ) {
          const nomeArquivo = todasImagens[imagemIndex];
          variacaoData.images.push({
            caminho_arquivo: nomeArquivo,
            principal: true,
          });
          imagensUsadasEmVariacoes.add(imagemIndex);
          console.log(
            `  ✓ Variação "${variacao.nome}" -> Imagem ${imagemIndex}: ${nomeArquivo}`
          );
        } else {
          console.log(
            `  ⚠️  Variação "${variacao.nome}" -> Sem imagem específica`
          );
        }

        variacoes.push(variacaoData);
      });

      console.log(
        `\n🔗 ${imagensUsadasEmVariacoes.size} imagens vinculadas a variações`
      );
    }

    // 7. Monta objeto final
    const produtoCompleto = {
      ...dadosProduto,
      images: imagesProduto,
      variacao: variacoes,
    };

    console.log("\n✅ Resumo final:");
    console.log(`  Produto: ${produtoCompleto.nome}`);
    console.log(
      `  Total de imagens do produto: ${produtoCompleto.images.length}`
    );
    console.log(`  Total de variações: ${produtoCompleto.variacao.length}`);
    produtoCompleto.variacao.forEach((v, i) => {
      console.log(
        `    Variação ${i + 1}: ${v.nome} - ${v.images.length} imagem(ns) específica(s)`
      );
    });

    // 8. Salva no banco de dados
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

// Upload de imagem individual
const novaImagem = async (req, res) => {
  try {
    const { id_produto } = req.body;

    console.log("\n📸 Recebendo nova imagem...");
    console.log("ID do Produto:", id_produto);
    console.log("Files:", req.files);

    // Validações
    if (!id_produto) {
      return res.status(400).json({
        success: false,
        message: "ID do produto é obrigatório",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Nenhuma imagem foi enviada",
      });
    }

    // Salva as imagens
    const imagensSalvas = await ProdutoModel.novaImagem(id_produto, req.files);

    return res.status(201).json({
      success: true,
      message: "Imagens adicionadas com sucesso",
      data: imagensSalvas,
    });
  } catch (error) {
    console.error("❌ Erro ao adicionar imagens:", error);

    if (error.message === "Produto não encontrado") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erro ao adicionar imagens",
      error: error.message,
    });
  }
};

const editar = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("\n📝 Editando produto ID:", id);
    console.log("Body:", req.body);

    // Parse dos dados do produto
    const dadosProduto = {
      nome: req.body.nome,
      descricao: req.body.descricao || "",
      cod_barras: req.body.cod_barras || "",
      preco_custo: parseFloat(req.body.preco_custo) || 0,
      preco_venda: parseFloat(req.body.preco_venda) || 0,
      margem: parseFloat(req.body.margem) || 0,
      id_categoria: req.body.id_categoria
        ? parseInt(req.body.id_categoria)
        : null,
      id_subcategoria: req.body.id_subcategoria
        ? parseInt(req.body.id_subcategoria)
        : null,
      estoque: parseFloat(req.body.estoque) || 0,
      estoque_minimo: parseFloat(req.body.estoque_minimo) || 0,
      ativo:
        req.body.ativo !== undefined
          ? req.body.ativo === "true" || req.body.ativo === true
          : true,
      variacao: req.body.variacao
    };

    // Validações
    if (!dadosProduto.nome || dadosProduto.nome.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Nome do produto é obrigatório",
      });
    }

    console.log("📦 Dados para atualização:", dadosProduto);

    // Atualiza no banco
    await ProdutoModel.editar(id, dadosProduto);

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

// Deletar imagem individual
const deletarImagem = async (req, res) => {
  try {
    const { id_imagem } = req.params;

    console.log("\n🗑️ Deletando imagem ID:", id_imagem);

    await ProdutoModel.deletarImagem(id_imagem);

    return res.status(200).json({
      success: true,
      message: "Imagem deletada com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao deletar imagem:", error);

    if (error.message === "Imagem não encontrada") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erro ao deletar imagem",
      error: error.message,
    });
  }
};

const deletarVariacao = async (req , res) => {
  try {
    const { id_variacao } = req.params;

    console.log("\n🗑️ Deletando varicao ID:", id_variacao);

    await ProdutoModel.deletarVariacao(id_variacao);

    return res.status(200).json({
      success: true,
      message: "Variacao deletada com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao deletar Variacao:", error);

    if (error.message === "Variacao não encontrada") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erro ao deletar variacao",
      error: error.message,
    });
  }
}

const cadastroCategoria = async (req, res) => {
  try {
    if (!req.body.nome) {
      return res.status(400).json({
        success: false,
        message: "Nome é obrigatório",
      });
    }

    const categoriaId = await ProdutoModel.cadastroCategoria(req.body);

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
};

const editarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await ProdutoModel.editarCategoria(id, req.body);
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

    const categoria = await ProdutoModel.deletarCategoria(id);
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

const cadastroSubcategoria = async (req, res) => {
  try {
    if (!req.body.nome) {
      return res.status(400).json({
        success: false,
        message: "Nome é obrigatório",
      });
    }

    const subcategoriaId = await ProdutoModel.cadastroSubcategoria(req.body);

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

    const subcategoria = await ProdutoModel.editarSubcategoria(id, req.body);
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

    const subcategoria = await ProdutoModel.deletarSubcategoria(id);
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
  cadastro,
  novaImagem,
  lista,
  editar,
  deletar,
  deletarImagem,
  deletarVariacao,

  cadastroCategoria,
  listaCategoria,
  editarCategoria,
  deletarCategoria,

  cadastroSubcategoria,
  editarSubcategoria,
  deletarSubcategoria,
};
