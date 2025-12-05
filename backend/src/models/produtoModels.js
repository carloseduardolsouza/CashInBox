const { db } = require("../config/database");
const fs = require("fs");
const path = require("path");
const os = require("os");
const formate = require("../utils/formate");

// Caminho para uploads
const userDataPath = path.join(os.homedir(), "AppData", "Roaming", "CashInBox");
const uploadPath = path.join(userDataPath, "uploads", "produtos");

const deleteImage = (filename) => {
  try {
    const fullPath = path.join(uploadPath, filename);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`✅ Imagem deletada: ${filename}`);
    }
  } catch (error) {
    console.error(`❌ Erro ao deletar imagem ${filename}:`, error);
  }
};

const cadastro = async (produtoData) => {
  return await db.transaction(async (trx) => {
    console.log("\n🔄 Iniciando transação de cadastro...");

    const { variacao, images, ...dadosProduto } = produtoData;

    // 1. Inserir produto principal
    console.log("📝 Inserindo produto principal...");
    const [produtoId] = await trx("produtos").insert({
      ...dadosProduto,
      created_at: trx.fn.now(),
    });
    console.log(`✅ Produto criado com ID: ${produtoId}`);

    // 2. SALVAR TODAS AS IMAGENS DO PRODUTO PRINCIPAL (SEMPRE)
    if (Array.isArray(images) && images.length > 0) {
      console.log(`\n🖼️  Salvando ${images.length} imagem(ns) do produto principal...`);
      
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        await trx("produto_imagens").insert({
          id_produto: produtoId,
          id_variacao: null, // Imagem pertence ao produto, não à variação
          caminho_arquivo: img.caminho_arquivo,
          principal: i === 0 // Primeira imagem é a principal
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
        const { images: variacaoImages, ...dadosVariacao } = v;

        console.log(`  📦 Variação ${i + 1}: ${dadosVariacao.nome}`);

        // Insere a variação
        const [variacaoId] = await trx("produto_variacao").insert({
          ...dadosVariacao,
          id_produto: produtoId,
          created_at: trx.fn.now(),
        });

        console.log(`    ✅ Variação criada com ID: ${variacaoId}`);

        // Salva imagens da variação (se existirem)
        if (Array.isArray(variacaoImages) && variacaoImages.length > 0) {
          console.log(`    🖼️  Salvando ${variacaoImages.length} imagem(ns) da variação...`);

          for (const img of variacaoImages) {
            await trx("produto_imagens").insert({
              id_produto: produtoId,
              id_variacao: variacaoId,
              caminho_arquivo: img.caminho_arquivo,
              principal: img.principal || false,
            });
          }

          console.log(`    ✅ Imagens da variação salvas`);
        }
      }
    }

    console.log("\n✅ Transação concluída com sucesso!\n");
    return produtoId;
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
      .filter((img) => 
        img.id_produto === produto.id_produto && 
        img.id_variacao === null // Apenas imagens que pertencem diretamente ao produto
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
    const { variacao, images, ...dadosProduto } = produtoData;

    // 1. Verifica se o produto existe
    const produtoExiste = await trx("produtos").where("id_produto", id).first();
    if (!produtoExiste) {
      throw new Error("Produto não encontrado");
    }

    // 2. Atualiza dados do produto
    await trx("produtos").where("id_produto", id).update(dadosProduto);

    // 3. Remove variações e imagens antigas
    const variacoesAntigas = await trx("produto_variacao")
      .where("id_produto", id)
      .select("id_variacao");

    // Remove imagens das variações
    for (const v of variacoesAntigas) {
      const imagensVariacao = await trx("produto_imagens")
        .where("id_variacao", v.id_variacao)
        .select("caminho_arquivo");

      // Deleta arquivos físicos
      imagensVariacao.forEach((img) => deleteImage(img.caminho_arquivo));

      // Remove do banco
      await trx("produto_imagens").where("id_variacao", v.id_variacao).del();
    }

    // Remove imagens principais antigas
    const imagensAntigas = await trx("produto_imagens")
      .where("id_produto", id)
      .whereNull("id_variacao")
      .select("caminho_arquivo");

    imagensAntigas.forEach((img) => deleteImage(img.caminho_arquivo));

    await trx("produto_imagens")
      .where("id_produto", id)
      .whereNull("id_variacao")
      .del();

    // Remove variações
    await trx("produto_variacao").where("id_produto", id).del();

    // 4. SALVAR TODAS AS NOVAS IMAGENS DO PRODUTO
    if (Array.isArray(images) && images.length > 0) {
      console.log(`\n🖼️  Salvando ${images.length} nova(s) imagem(ns) do produto...`);
      
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        await trx("produto_imagens").insert({
          id_produto: id,
          id_variacao: null,
          caminho_arquivo: img.caminho_arquivo,
          principal: i === 0
        });
      }
      
      console.log("✅ Todas as imagens do produto salvas");
    }

    // 5. Insere novas variações
    const temVariacoes = Array.isArray(variacao) && variacao.length > 0;

    if (temVariacoes) {
      for (const v of variacao) {
        const { images: variacaoImages, ...dadosVariacao } = v;

        const [variacaoId] = await trx("produto_variacao").insert({
          ...dadosVariacao,
          id_produto: id,
          created_at: trx.fn.now(),
        });

        if (Array.isArray(variacaoImages) && variacaoImages.length > 0) {
          for (const img of variacaoImages) {
            await trx("produto_imagens").insert({
              id_produto: id,
              id_variacao: variacaoId,
              caminho_arquivo: img.caminho_arquivo,
              principal: img.principal || false,
            });
          }
        }
      }
    }

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

const listaSubcategoria = async () => {
  const subcategorias = await db("subcategoria_produtos").select("*");
  return subcategorias;
};

const cadastroSubcategoria = async (subcategoriaData) => {
  return await db.transaction(async (trx) => {
    const [subcategoriaId] = await trx("subcategoria_produtos").insert({
      ...subcategoriaData,
      nome: formate.formatNome(subcategoriaData.nome),
    });

    return subcategoriaId;
  });
};

module.exports = {
  cadastro,
  lista,
  editar,
  deletar,
  listaCategoria,
  cadastroCategoria,
  listaSubcategoria,
  cadastroSubcategoria,
};