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

    // 3. Parse das variações
    let variacoesData = [];
    if (req.body.variacoes) {
      try {
        variacoesData = typeof req.body.variacoes === 'string' 
          ? JSON.parse(req.body.variacoes) 
          : req.body.variacoes;
      } catch (e) {
        console.error("❌ Erro ao fazer parse das variações:", e);
      }
    }

    const temVariacoes = Array.isArray(variacoesData) && variacoesData.length > 0;
    console.log(`📊 Tem variações: ${temVariacoes} (${variacoesData.length})`);

    // 4. Processar imagens
    // IMPORTANTE: O frontend envia TODAS as imagens com fieldname "images"
    const todasImagens = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file, index) => {
        todasImagens.push(file.filename);
        console.log(`📸 Imagem ${index}: ${file.filename}`);
      });
    }

    console.log(`\n📊 Total de imagens recebidas: ${todasImagens.length}`);

    // 5. Separar imagens entre produto e variações
    const imagensUsadasEmVariacoes = new Set();
    const variacoes = [];

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
          images: []
        };

        // Verifica se esta variação tem uma imagem associada
        const imagemIndex = variacao.imagemIndex;
        
        if (imagemIndex !== null && imagemIndex !== undefined && todasImagens[imagemIndex]) {
          const nomeArquivo = todasImagens[imagemIndex];
          variacaoData.images.push({
            caminho_arquivo: nomeArquivo,
            principal: true
          });
          imagensUsadasEmVariacoes.add(imagemIndex);
          console.log(`  ✓ Variação "${variacao.nome}" -> Imagem ${imagemIndex}: ${nomeArquivo}`);
        } else {
          console.log(`  ⚠️  Variação "${variacao.nome}" -> Sem imagem`);
        }

        variacoes.push(variacaoData);
      });
    }

    // 6. Imagens do produto principal (as que NÃO foram usadas nas variações)
    const imagesProduto = [];
    
    if (!temVariacoes) {
      // Se NÃO tem variações, TODAS as imagens são do produto
      todasImagens.forEach((filename, index) => {
        imagesProduto.push({
          caminho_arquivo: filename,
          principal: index === 0
        });
      });
      console.log(`\n📸 Todas as ${imagesProduto.length} imagens atribuídas ao produto principal`);
    } else {
      // Se TEM variações, apenas as imagens NÃO usadas vão para o produto
      todasImagens.forEach((filename, index) => {
        if (!imagensUsadasEmVariacoes.has(index)) {
          imagesProduto.push({
            caminho_arquivo: filename,
            principal: imagesProduto.length === 0
          });
        }
      });
      console.log(`\n📸 ${imagesProduto.length} imagens não usadas atribuídas ao produto principal`);
      console.log(`🔗 ${imagensUsadasEmVariacoes.size} imagens vinculadas a variações`);
    }

    // 7. Monta objeto final
    const produtoCompleto = {
      ...dadosProduto,
      images: imagesProduto,
      variacao: variacoes
    };

    console.log("\n✅ Resumo final:");
    console.log(`  Produto: ${produtoCompleto.nome}`);
    console.log(`  Imagens produto principal: ${produtoCompleto.images.length}`);
    console.log(`  Total de variações: ${produtoCompleto.variacao.length}`);
    produtoCompleto.variacao.forEach((v, i) => {
      console.log(`    Variação ${i + 1}: ${v.nome} - ${v.images.length} imagem(ns)`);
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

const editar = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("\n📝 Editando produto ID:", id);
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    // Parse dos dados (similar ao cadastro)
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

    // Validações
    if (!dadosProduto.nome || dadosProduto.nome.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Nome do produto é obrigatório",
      });
    }

    // Parse variações
    let variacoesData = [];
    if (req.body.variacoes) {
      try {
        variacoesData = typeof req.body.variacoes === 'string' 
          ? JSON.parse(req.body.variacoes) 
          : req.body.variacoes;
      } catch (e) {
        console.error("❌ Erro ao fazer parse das variações:", e);
      }
    }

    const temVariacoes = Array.isArray(variacoesData) && variacoesData.length > 0;

    // Processar imagens
    const todasImagens = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        todasImagens.push(file.filename);
      });
    }

    // Separar imagens
    const imagensUsadasEmVariacoes = new Set();
    const variacoes = [];

    if (temVariacoes) {
      variacoesData.forEach((variacao) => {
        const variacaoData = {
          nome: variacao.nome || "",
          tipo: variacao.tipo || "",
          cod_interno: variacao.cod_interno || "",
          cod_barras: variacao.cod_barras || "",
          estoque: parseFloat(variacao.estoque) || 0,
          estoque_minimo: parseFloat(variacao.estoque_minimo) || 0,
          images: []
        };

        const imagemIndex = variacao.imagemIndex;
        
        if (imagemIndex !== null && imagemIndex !== undefined && todasImagens[imagemIndex]) {
          const nomeArquivo = todasImagens[imagemIndex];
          variacaoData.images.push({
            caminho_arquivo: nomeArquivo,
            principal: true
          });
          imagensUsadasEmVariacoes.add(imagemIndex);
        }

        variacoes.push(variacaoData);
      });
    }

    // Imagens do produto principal
    const imagesProduto = [];
    
    if (!temVariacoes) {
      todasImagens.forEach((filename, index) => {
        imagesProduto.push({
          caminho_arquivo: filename,
          principal: index === 0
        });
      });
    } else {
      todasImagens.forEach((filename, index) => {
        if (!imagensUsadasEmVariacoes.has(index)) {
          imagesProduto.push({
            caminho_arquivo: filename,
            principal: imagesProduto.length === 0
          });
        }
      });
    }

    // Objeto final
    const produtoCompleto = {
      ...dadosProduto,
      images: imagesProduto,
      variacao: variacoes
    };

    // Atualiza no banco
    await ProdutoModel.editar(id, produtoCompleto);

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

const editarCategoria = (req, res) => {
  // Implementar quando necessário
};

const deletarCategoria = (req, res) => {
  // Implementar quando necessário
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

const listaSubcategoria = async (req, res) => {
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
};

const editarSubcategoria = (req, res) => {
  // Implementar quando necessário
};

const deletarSubcategoria = (req, res) => {
  // Implementar quando necessário
};

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