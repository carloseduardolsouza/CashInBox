const { db } = require("../config/database");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Caminho para uploads
const userDataPath = path.join(os.homedir(), "AppData", "Roaming", "CashInBox");
const uploadPath = path.join(userDataPath, "uploads", "produtos");

// Garante que a pasta de uploads existe
const ensureUploadDirectory = () => {
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
};

/**
 * Salva uma imagem base64 no disco
 * @param {string} base64Image - Imagem em base64
 * @param {string} produtoId - ID do produto
 * @param {string} variacaoId - ID da variação (opcional)
 * @returns {string} - Caminho relativo da imagem
 */
const saveImage = (base64Image, produtoId, variacaoId = null) => {
  ensureUploadDirectory();

  // Remove o prefixo "data:image/...;base64," se existir
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  // Gera nome único para a imagem
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  const prefix = variacaoId ? `var${variacaoId}` : `prod${produtoId}`;
  const filename = `${prefix}_${timestamp}_${random}.png`;

  const filepath = path.join(uploadPath, filename);

  // Salva o arquivo
  fs.writeFileSync(filepath, buffer);

  // Retorna o caminho relativo (para salvar no banco)
  return filename;
};

/**
 * Remove uma imagem do disco
 * @param {string} imagePath - Caminho da imagem
 */
const deleteImage = (imagePath) => {
  try {
    const fullPath = path.join(userDataPath, imagePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (error) {
    console.error("Erro ao deletar imagem:", error);
  }
};

/**
 * Cadastra um novo produto com variações e imagens
 */
const cadastro = async (produtoData) => {
  return await db.transaction(async (trx) => {
    const { variacao, images, ...dadosProduto } = produtoData;

    // 1. Inserir produto principal
    const [produtoId] = await trx("produtos").insert({
      ...dadosProduto,
      created_at: trx.fn.now(),
    });

    // 2. Verificar se tem variações
    const temVariacoes = Array.isArray(variacao) && variacao.length > 0;

    // 3. Processar VARIAÇÕES (se houver mais de uma)
    if (temVariacoes) {
      for (const v of variacao) {
        const { images: variacaoImages, ...dadosVariacao } = v;

        // Insere a variação
        const [variacaoId] = await trx("produto_variacao").insert({
          ...dadosVariacao,
          id_produto: produtoId,
          created_at: trx.fn.now(),
        });

        // Salva imagens da variação
        if (Array.isArray(variacaoImages) && variacaoImages.length > 0) {
          for (const img of variacaoImages) {
            const caminhoImagem = saveImage(img.image, produtoId, variacaoId);

            await trx("produto_imagens").insert({
              id_produto: produtoId,
              id_variacao: variacaoId,
              caminho_arquivo: caminhoImagem,
              principal: img.principal || false,
            });
          }
        }
      }
    }
    // 4. Processar IMAGENS PRINCIPAIS (se NÃO tiver variações ou tiver apenas 1)
    else if (Array.isArray(images) && images.length > 0) {
      for (const img of images) {
        const caminhoImagem = saveImage(img.image, produtoId);

        await trx("produto_imagens").insert({
          id_produto: produtoId,
          id_variacao: null, // Imagem é do produto, não de variação
          caminho_arquivo: caminhoImagem,
          principal: img.principal || false,
        });
      }
    }

    return produtoId;
  });
};

/**
 * Lista todos os produtos com suas variações e imagens
 */
const lista = async () => {
  // Busca produtos
  const produtos = await db("produtos")
    .leftJoin("categoria_produtos", "produtos.id_categoria", "categoria_produtos.id_categoria")
    .leftJoin("subcategoria_produtos", "produtos.id_subcategoria", "subcategoria_produtos.id_subcategoria")
    .select(
      "produtos.*",
      "categoria_produtos.nome as categoria_nome",
      "subcategoria_produtos.nome as subcategoria_nome"
    );

  // Busca variações
  const variacoes = await db("produto_variacao").select("*");

  // Busca imagens
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
            caminho_arquivo: img.caminho_arquivo,
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

    // Imagens principais do produto (sem variação)
    const imagensProduto = imagens
      .filter((img) => img.id_produto === produto.id_produto && !img.id_variacao)
      .map((img) => ({
        id_imagem: img.id_imagem,
        caminho_arquivo: img.caminho_arquivo,
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
      images: imagensProduto,
    };
  });

  return resultado;
};

/**
 * Edita um produto existente
 */
const editar = async (id, produtoData) => {
  return await db.transaction(async (trx) => {
    const { variacao, images, ...dadosProduto } = produtoData;

    // 1. Atualiza dados do produto
    await trx("produtos").where("id_produto", id).update(dadosProduto);

    // 2. Remove variações e imagens antigas
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

    await trx("produto_imagens").where("id_produto", id).whereNull("id_variacao").del();

    // Remove variações
    await trx("produto_variacao").where("id_produto", id).del();

    // 3. Insere novas variações
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
            const caminhoImagem = saveImage(img.image, id, variacaoId);

            await trx("produto_imagens").insert({
              id_produto: id,
              id_variacao: variacaoId,
              caminho_arquivo: caminhoImagem,
              principal: img.principal || false,
            });
          }
        }
      }
    }
    // 4. Insere novas imagens principais
    else if (Array.isArray(images) && images.length > 0) {
      for (const img of images) {
        const caminhoImagem = saveImage(img.image, id);

        await trx("produto_imagens").insert({
          id_produto: id,
          id_variacao: null,
          caminho_arquivo: caminhoImagem,
          principal: img.principal || false,
        });
      }
    }

    return true;
  });
};

/**
 * Deleta um produto
 */
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

module.exports = {
  cadastro,
  lista,
  editar,
  deletar,
};