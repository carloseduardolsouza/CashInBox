const { db } = require("../config/database");
const fs = require("fs");
const path = require("path");
const os = require("os");
const formate = require("../utils/formate");

// Caminho para uploads
const userDataPath = path.join(os.homedir(), "AppData", "Roaming", "CashInBox");
const uploadPath = path.join(userDataPath, "uploads", "produtos");

// Produtos

const deletarImagem = async (id_imagem) => {
  try {
    // Busca a imagem no banco
    const image = await db("produto_imagens").where({ id_imagem }).first();

    if (!image) {
      console.log("⚠️ Imagem não encontrada no banco.");
      return false;
    }

    // Caminho completo do arquivo
    const fullPath = path.join(uploadPath, image.caminho_arquivo);

    // Deleta o arquivo físico
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`✅ Arquivo deletado: ${image.caminho_arquivo}`);
    } else {
      console.log(`⚠️ Caminho não encontrado: ${image.caminho_arquivo}`);
    }

    // Remove do banco
    await db("produto_imagens").where({ id_imagem }).del();

    console.log(`🗑️ Registro do banco removido: ${id_imagem}`);

    return true;
  } catch (err) {
    console.error("❌ Erro ao deletar imagem:", err);
    return false;
  }
};

const deletarVariacao = async (id_variacao) => {
  try {
    // Busca a variacao no banco
    const image = await db("produto_variacao").where({ id_variacao }).first();

    // Remove do banco
    await db("produto_variacao").where({ id_variacao }).del();

    console.log(`🗑️ Registro do banco removido: ${id_variacao}`);

    return true;
  } catch (err) {
    console.error("❌ Erro ao deletar imagem:", err);
    return false;
  }
}

const cadastro = async (produtoData) => {
  return await db.transaction(async (trx) => {
    console.log("\n🔄 Iniciando transação de cadastro...");

    const { variacao, images, ...dadosProduto } = produtoData;

    // 1. Inserir produto principal
    console.log("📝 Inserindo produto principal...");
    const [produtoId] = await trx("produtos").insert({
      ...dadosProduto,
      nome: formate.formatNome(dadosProduto.nome),
      created_at: trx.fn.now(),
    });
    console.log(`✅ Produto criado com ID: ${produtoId}`);

    // 2. SALVAR TODAS AS IMAGENS DO PRODUTO PRINCIPAL (SEMPRE)
    if (Array.isArray(images) && images.length > 0) {
      console.log(
        `\n🖼️  Salvando ${images.length} imagem(ns) do produto principal...`
      );

      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        await trx("produto_imagens").insert({
          id_produto: produtoId,
          caminho_arquivo: img.caminho_arquivo,
          principal: i === 0, // Primeira imagem é a principal
        });
        console.log(`  ✓ Imagem ${i + 1}: ${img.caminho_arquivo}`);
      }

      console.log("✅ Todas as imagens do produto salvas");
    }

    // 3. Verificar se tem variações
    const temVariacoes = Array.isArray(variacao) && variacao.length > 0;
    console.log(`📊 Variações: ${temVariacoes ? variacao.length : 0}`);

    // 4. Processar VARIAÇÕES (se houver)
    if (temVariacoes) {
      console.log("\n🔄 Processando variações...");

      for (let i = 0; i < variacao.length; i++) {
        const v = variacao[i];

        console.log(`  📦 Variação ${i + 1}: ${v.nome}`);

        // Insere a variação
        const [variacaoId] = await trx("produto_variacao").insert({
          ...v,
          nome: formate.formatNome(v.nome),
          id_imagem: ,
          id_produto: produtoId,
          created_at: trx.fn.now(),
        });

        console.log(`    ✅ Variação criada com ID: ${variacaoId}`);
      }
    }

    console.log("\n✅ Transação concluída com sucesso!\n");
    return produtoId;
  });
};

const novaImagem = async (id, imagensData) => {
  return await db.transaction(async (trx) => {
    console.log("\n📸 Adicionando novas imagens ao produto...");
    console.log(`Produto ID: ${id}`);
    console.log(`Quantidade de imagens: ${imagensData.length}`);

    // 1. Verifica se o produto existe
    const produtoExiste = await trx("produtos").where("id_produto", id).first();

    if (!produtoExiste) {
      throw new Error("Produto não encontrado");
    }

    // 2. Verifica se há imagens existentes do produto
    const imagensExistentes = await trx("produto_imagens")
      .where("id_produto", id)
      .whereNull("id_variacao")
      .select("id_imagem");

    const temImagensExistentes = imagensExistentes.length > 0;

    console.log(`Imagens existentes: ${imagensExistentes.length}`);

    // 3. Adiciona as novas imagens
    const imagensAdicionadas = [];

    for (let i = 0; i < imagensData.length; i++) {
      const img = imagensData[i];

      const [idImagem] = await trx("produto_imagens").insert({
        id_produto: id,
        id_variacao: null,
        caminho_arquivo: imagensData[i].filename,
        principal: !temImagensExistentes && i === 0,
      });

      imagensAdicionadas.push({
        id_imagem: idImagem,
        caminho_arquivo: `/uploads/${imagensData[i].filename}`,
        principal: !temImagensExistentes && i === 0,
      });

      console.log(`  ✓ Imagem ${i + 1} adicionada: ${imagensData[i].filename}`);
    }

    console.log(
      `✅ Total de ${imagensAdicionadas.length} imagem(ns) adicionada(s)\n`
    );

    return imagensAdicionadas;
  });
};

const lista = async () => {
  // Busca produtos
  const produtos = await db("produtos")
    .leftJoin(
      "categoria_produtos",
      "produtos.id_categoria",
      "categoria_produtos.id_categoria"
    )
    .leftJoin(
      "subcategoria_produtos",
      "produtos.id_subcategoria",
      "subcategoria_produtos.id_subcategoria"
    )
    .select(
      "produtos.*",
      "categoria_produtos.nome as categoria_nome",
      "subcategoria_produtos.nome as subcategoria_nome"
    );

  // Busca variações
  const variacoes = await db("produto_variacao").select("*");

  // Busca TODAS as imagens
  const imagens = await db("produto_imagens").select("*");

  // Monta estrutura final
  const resultado = produtos.map((produto) => {
    // Filtra variações do produto
    const variacoesProduto = variacoes
      .filter((v) => v.id_produto === produto.id_produto)
      .map((v) => {
        // Imagens da variação
        const imagensVariacao = imagens
          .filter((img) => img.id_variacao === v.id_variacao)
          .map((img) => ({
            id_imagem: img.id_imagem,
            caminho_arquivo: `/uploads/${img.caminho_arquivo}`,
            principal: img.principal,
          }));

        return {
          id_variacao: v.id_variacao,
          nome: v.nome,
          tipo: v.tipo,
          cod_interno: v.cod_interno,
          cod_barras: v.cod_barras,
          estoque: v.estoque,
          estoque_minimo: v.estoque_minimo,
          images: imagensVariacao,
        };
      });

    // ✅ TODAS as imagens do produto (incluindo as não vinculadas a variações)
    const imagensProduto = imagens
      .filter(
        (img) =>
          img.id_produto === produto.id_produto
      )
      .map((img) => ({
        id_imagem: img.id_imagem,
        caminho_arquivo: `/uploads/${img.caminho_arquivo}`,
        principal: img.principal,
      }));

    return {
      id_produto: produto.id_produto,
      nome: produto.nome,
      descricao: produto.descricao,
      cod_barras: produto.cod_barras,
      cod_interno: produto.cod_interno,
      preco_custo: produto.preco_custo,
      preco_venda: produto.preco_venda,
      margem: produto.margem,
      ativo: produto.ativo,
      estoque: produto.estoque,
      estoque_minimo: produto.estoque_minimo,
      id_categoria: produto.id_categoria,
      categoria_nome: produto.categoria_nome,
      id_subcategoria: produto.id_subcategoria,
      subcategoria_nome: produto.subcategoria_nome,
      variacao: variacoesProduto,
      images: imagensProduto, // ✅ Todas as imagens do produto
    };
  });

  return resultado;
};

const editar = async (id, produtoData) => {
  return await db.transaction(async (trx) => {
    console.log("\n🔄 Iniciando transação de edição (PRESERVANDO IDs)...");

    const { variacao, ...dadosProduto } = produtoData;

    // 1. Verifica se o produto existe
    const produtoExiste = await trx("produtos")
      .where("id_produto", id)
      .first();

    if (!produtoExiste) {
      throw new Error("Produto não encontrado");
    }

    // 2. Atualiza os dados do produto
    console.log("📝 Atualizando dados do produto...");
    await trx("produtos")
      .where("id_produto", id)
      .update({
        ...dadosProduto,
        nome: formate.formatNome(dadosProduto.nome),
      });

    for (const v of variacao) {
      let idImagem = v.images;

      // Criar nova variação
      if (!v.id_variacao) {
        const [variacaoId] = await trx("produto_variacao").insert({
          cod_barras: v.cod_barras,
          cod_interno: v.cod_interno,
          estoque: v.estoque,
          estoque_minimo: v.estoque_minimo,
          tipo: v.tipo,
          nome: formate.formatNome(v.nome),
          id_produto: id,
          created_at: trx.fn.now(),
        });

        // Associa imagem
        if (idImagem) {
          await trx("produto_imagens")
            .where("id_imagem", idImagem)
            .update({
              id_variacao: variacaoId,
            });
        }

      } else {
        // Atualizar variação existente
        await trx("produto_variacao")
          .where("id_variacao", v.id_variacao)
          .update({
            cod_barras: v.cod_barras,
            cod_interno: v.cod_interno,
            estoque: v.estoque,
            estoque_minimo: v.estoque_minimo,
            tipo: v.tipo,
            nome: formate.formatNome(v.nome),
            id_produto: id,
            created_at: trx.fn.now(),
          });

        // Associa imagem
        if (idImagem) {
          await trx("produto_imagens")
            .where("id_imagem", idImagem)
            .update({
              id_variacao: v.id_variacao,
            });
        }
      }
    }

    console.log("\n✅ Produto e variações atualizados com sucesso!\n");

    return true;
  });
};


const deletar = async (id) => {
  return await db.transaction(async (trx) => {
    // Verifica se existe
    const produto = await trx("produtos").where("id_produto", id).first();

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    // 1. Remove imagens físicas
    const imagens = await trx("produto_imagens")
      .where("id_produto", id)
      .select("caminho_arquivo");

    imagens.forEach((img) => deleteImage(img.caminho_arquivo));

    // 2. Remove do banco (CASCADE vai cuidar de variações e imagens)
    await trx("produto_imagens").where("id_produto", id).del();
    await trx("produto_variacao").where("id_produto", id).del();
    await trx("produtos").where("id_produto", id).del();

    return true;
  });
};

// Categorias

const listaCategoria = async () => {
  // Busca todas as categorias
  const categorias = await db("categoria_produtos").select("*");

  // Busca todas as subcategorias
  const subcategorias = await db("subcategoria_produtos").select("*");

  // Monta a estrutura final
  const resultado = categorias.map((categoria) => {
    const subcategoriaFiltrada = subcategorias
      .filter((s) => s.id_categoria === categoria.id_categoria)
      .map((s) => ({
        id_subcategoria: s.id_subcategoria,
        nome: s.nome,
        descricao: s.descricao,
      }));

    return {
      id_categoria: categoria.id_categoria,
      nome: categoria.nome,
      descricao: categoria.descricao,
      subcategorias: subcategoriaFiltrada,
    };
  });

  return resultado;
};

const cadastroCategoria = async (categoriaData) => {
  return await db.transaction(async (trx) => {
    const [categoriaId] = await trx("categoria_produtos").insert({
      ...categoriaData,
      nome: formate.formatNome(categoriaData.nome),
    });

    return categoriaId;
  });
};

const deletarCategoria = async (id) => {
  return await db.transaction(async (trx) => {
    // Verifica se a categoria existe
    const categoria = await trx("categoria_produtos")
      .where("id_categoria", id)
      .first();

    if (!categoria) {
      throw new Error("Categoria não encontrado");
    }

    // 1. Deletar subcategorias
    await trx("subcategoria_produtos").where("id_categoria", id).del();

    // 2. Deletar a categoria
    await trx("categoria_produtos").where("id_categoria", id).del();

    return true;
  });
};

const editarCategoria = async (id, categoriaData) => {
  return await db.transaction(async (trx) => {
    // 1. Atualiza dados da categoria
    await trx("categoria_produtos")
      .where("id_categoria", id)
      .update({
        nome: formate.formatNome(categoriaData.nome),
        descricao: categoriaData.descricao,
      });

    return true;
  });
};

// Subcategorias

const cadastroSubcategoria = async (subcategoriaData) => {
  return await db.transaction(async (trx) => {
    const [subcategoriaId] = await trx("subcategoria_produtos").insert({
      ...subcategoriaData,
      nome: formate.formatNome(subcategoriaData.nome),
    });

    return subcategoriaId;
  });
};

const deletarSubcategoria = async (id) => {
  return await db.transaction(async (trx) => {
    // Verifica se a categoria existe
    const subcategoria = await trx("subcategoria_produtos")
      .where("id_subcategoria", id)
      .first();

    if (!subcategoria) {
      throw new Error("SubCategoria não encontrado");
    }

    // 1. Deletar subcategorias
    await trx("subcategoria_produtos").where("id_subcategoria", id).del();

    return true;
  });
};

const editarSubcategoria = async (id, subcategoriaData) => {
  return await db.transaction(async (trx) => {
    // 1. Atualiza dados da categoria
    await trx("subcategoria_produtos")
      .where("id_subcategoria", id)
      .update({
        nome: formate.formatNome(subcategoriaData.nome),
        descricao: subcategoriaData.descricao,
      });

    return true;
  });
};

module.exports = {
  cadastro,
  novaImagem,
  lista,
  editar,
  deletar,
  deletarImagem,
  deletarVariacao,

  listaCategoria,
  cadastroCategoria,
  deletarCategoria,
  editarCategoria,

  cadastroSubcategoria,
  deletarSubcategoria,
  editarSubcategoria,
};
