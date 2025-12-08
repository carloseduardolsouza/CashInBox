const { db } = require("../config/database");
const fs = require("fs");
const path = require("path");
const os = require("os");
const formate = require("../utils/formate");

// Caminho para uploads
const userDataPath = path.join(os.homedir(), "AppData", "Roaming", "CashInBox");
const uploadPath = path.join(userDataPath, "uploads", "produtos");

// Produtos

const deleteImage = (filename) => {
  try {
    const cleanFilename = filename.replace('/uploads/', '').replace(/^\//, '');
    const fullPath = path.join(uploadPath, cleanFilename);
    
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`✅ Imagem deletada: ${cleanFilename}`);
      return true;
    } else {
      console.log(`⚠️  Imagem não encontrada: ${cleanFilename}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erro ao deletar imagem ${filename}:`, error);
    return false;
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
      nome: formate.formatNome(dadosProduto.nome),
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
          nome: formate.formatNome(dadosVariacao.nome),
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
    console.log("\n🔄 Iniciando transação de edição (PRESERVANDO IDs)...");

    const { variacao, images, imagensExistentes, imagensDeletar, ...dadosProduto } = produtoData;

    // 1. Verifica se o produto existe
    const produtoExiste = await trx("produtos").where("id_produto", id).first();
    if (!produtoExiste) {
      throw new Error("Produto não encontrado");
    }

    // 2. Atualiza dados do produto
    console.log("📝 Atualizando dados do produto...");
    await trx("produtos").where("id_produto", id).update({
      ...dadosProduto,
      nome: formate.formatNome(dadosProduto.nome),
    });

    // 3. GERENCIAMENTO DE IMAGENS DO PRODUTO PRINCIPAL
    console.log("\n🖼️  Gerenciando imagens do produto...");

    // 3.1 Deletar imagens marcadas para exclusão
    if (Array.isArray(imagensDeletar) && imagensDeletar.length > 0) {
      console.log(`🗑️  Deletando ${imagensDeletar.length} imagem(ns)...`);
      
      for (const idImagem of imagensDeletar) {
        const imagemParaDeletar = await trx("produto_imagens")
          .where("id_imagem", idImagem)
          .first();

        if (imagemParaDeletar) {
          deleteImage(imagemParaDeletar.caminho_arquivo);
          await trx("produto_imagens").where("id_imagem", idImagem).del();
          console.log(`  ✓ Imagem ${idImagem} deletada`);
        }
      }
    }

    console.log(`✅ Mantendo ${imagensExistentes?.length || 0} imagem(ns) existente(s)`);

    // 3.2 Adicionar novas imagens
    if (Array.isArray(images) && images.length > 0) {
      console.log(`\n📸 Adicionando ${images.length} nova(s) imagem(ns)...`);
      
      const imagensAtuais = await trx("produto_imagens")
        .where("id_produto", id)
        .whereNull("id_variacao")
        .select("id_imagem");

      const temImagensExistentes = imagensAtuais.length > 0;
      
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        await trx("produto_imagens").insert({
          id_produto: id,
          id_variacao: null,
          caminho_arquivo: img.caminho_arquivo,
          principal: !temImagensExistentes && i === 0
        });
        console.log(`  ✓ Imagem ${i + 1} adicionada: ${img.caminho_arquivo}`);
      }
    }

    // 4. GERENCIAMENTO INTELIGENTE DE VARIAÇÕES (PRESERVANDO IDs)
    console.log("\n🔄 Gerenciando variações (PRESERVANDO IDs)...");

    // 4.1 Buscar variações existentes no banco
    const variacoesExistentes = await trx("produto_variacao")
      .where("id_produto", id)
      .select("id_variacao");

    const idsExistentes = variacoesExistentes.map(v => v.id_variacao);
    
    const temVariacoes = Array.isArray(variacao) && variacao.length > 0;

    if (temVariacoes) {
      // IDs das variações que estão vindo do frontend
      const idsRecebidos = variacao
        .filter(v => v.id_variacao)
        .map(v => v.id_variacao);

      // Variações que foram removidas (existem no banco mas não vieram do frontend)
      const variacoesRemovidas = idsExistentes.filter(id => !idsRecebidos.includes(id));

      // 4.2 Remover variações que foram deletadas
      if (variacoesRemovidas.length > 0) {
        console.log(`🗑️  Removendo ${variacoesRemovidas.length} variação(ões) deletada(s)...`);

        for (const variacaoId of variacoesRemovidas) {
          // Busca e deleta imagens da variação
          const imagensVariacao = await trx("produto_imagens")
            .where("id_variacao", variacaoId)
            .select("caminho_arquivo");

          imagensVariacao.forEach((img) => deleteImage(img.caminho_arquivo));
          await trx("produto_imagens").where("id_variacao", variacaoId).del();
          await trx("produto_variacao").where("id_variacao", variacaoId).del();
          
          console.log(`  ✓ Variação ${variacaoId} removida`);
        }
      }

      // 4.3 Processar cada variação (UPDATE ou INSERT)
      console.log(`\n📦 Processando ${variacao.length} variação(ões)...`);

      for (const v of variacao) {
        const { images: variacaoImages, id_variacao, ...dadosVariacao } = v;

        if (id_variacao && idsExistentes.includes(id_variacao)) {
          // ✅ VARIAÇÃO EXISTENTE - FAZER UPDATE
          console.log(`  🔄 Atualizando variação ID: ${id_variacao}`);

          await trx("produto_variacao")
            .where("id_variacao", id_variacao)
            .update({
              ...dadosVariacao,
              nome: formate.formatNome(dadosVariacao.nome),
            });

          // ⚠️ IMPORTANTE: Remove imagens antigas da variação
          const imagensAntigas = await trx("produto_imagens")
            .where("id_variacao", id_variacao)
            .select("caminho_arquivo");

          imagensAntigas.forEach((img) => deleteImage(img.caminho_arquivo));
          await trx("produto_imagens").where("id_variacao", id_variacao).del();

          // ✅ Adiciona nova imagem SE imagemIndex foi especificado
          if (v.imagemIndex !== null && v.imagemIndex !== undefined) {
            // Buscar TODAS as imagens disponíveis (existentes + novas)
            const todasImagensDisponiveis = await trx("produto_imagens")
              .where("id_produto", id)
              .whereNull("id_variacao")
              .select("id_imagem", "caminho_arquivo")
              .orderBy("id_imagem", "asc");

            // Adicionar novas imagens ao array (elas ainda não têm ID no banco)
            const totalImagensExistentes = todasImagensDisponiveis.length;
            
            // Se imagemIndex aponta para uma imagem EXISTENTE
            if (v.imagemIndex < totalImagensExistentes) {
              const imagemSelecionada = todasImagensDisponiveis[v.imagemIndex];
              
              // Duplicar a imagem para a variação
              await trx("produto_imagens").insert({
                id_produto: id,
                id_variacao: id_variacao,
                caminho_arquivo: imagemSelecionada.caminho_arquivo,
                principal: true,
              });
              
              console.log(`    ✓ Imagem existente associada à variação: ${imagemSelecionada.caminho_arquivo}`);
            } 
            // Se imagemIndex aponta para uma NOVA imagem
            else if (Array.isArray(images) && images.length > 0) {
              const novaImagemIndex = v.imagemIndex - totalImagensExistentes;
              
              if (novaImagemIndex >= 0 && novaImagemIndex < images.length) {
                await trx("produto_imagens").insert({
                  id_produto: id,
                  id_variacao: id_variacao,
                  caminho_arquivo: images[novaImagemIndex].caminho_arquivo,
                  principal: true,
                });
                
                console.log(`    ✓ Nova imagem associada à variação: ${images[novaImagemIndex].caminho_arquivo}`);
              }
            }
          }

        } else {
          // ➕ VARIAÇÃO NOVA - FAZER INSERT
          console.log(`  ➕ Criando nova variação: ${dadosVariacao.nome}`);

          const [novoIdVariacao] = await trx("produto_variacao").insert({
            ...dadosVariacao,
            nome: formate.formatNome(dadosVariacao.nome),
            id_produto: id,
            created_at: trx.fn.now(),
          });

          console.log(`    ✓ Variação criada com ID: ${novoIdVariacao}`);

          // ✅ Adiciona imagem SE imagemIndex foi especificado
          if (v.imagemIndex !== null && v.imagemIndex !== undefined) {
            const todasImagensDisponiveis = await trx("produto_imagens")
              .where("id_produto", id)
              .whereNull("id_variacao")
              .select("id_imagem", "caminho_arquivo")
              .orderBy("id_imagem", "asc");

            const totalImagensExistentes = todasImagensDisponiveis.length;
            
            if (v.imagemIndex < totalImagensExistentes) {
              const imagemSelecionada = todasImagensDisponiveis[v.imagemIndex];
              
              await trx("produto_imagens").insert({
                id_produto: id,
                id_variacao: novoIdVariacao,
                caminho_arquivo: imagemSelecionada.caminho_arquivo,
                principal: true,
              });
              
              console.log(`    ✓ Imagem existente associada à nova variação`);
            } else if (Array.isArray(images) && images.length > 0) {
              const novaImagemIndex = v.imagemIndex - totalImagensExistentes;
              
              if (novaImagemIndex >= 0 && novaImagemIndex < images.length) {
                await trx("produto_imagens").insert({
                  id_produto: id,
                  id_variacao: novoIdVariacao,
                  caminho_arquivo: images[novaImagemIndex].caminho_arquivo,
                  principal: true,
                });
                
                console.log(`    ✓ Nova imagem associada à nova variação`);
              }
            }
          }
        }
      }
    } else {
      // Não há variações - remover todas as existentes
      if (idsExistentes.length > 0) {
        console.log(`🗑️  Removendo todas as ${idsExistentes.length} variação(ões)...`);

        for (const variacaoId of idsExistentes) {
          const imagensVariacao = await trx("produto_imagens")
            .where("id_variacao", variacaoId)
            .select("caminho_arquivo");

          imagensVariacao.forEach((img) => deleteImage(img.caminho_arquivo));
          await trx("produto_imagens").where("id_variacao", variacaoId).del();
          await trx("produto_variacao").where("id_variacao", variacaoId).del();
        }
      }
    }

    console.log("\n✅ Transação de edição concluída com sucesso (IDs PRESERVADOS)!\n");
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
    const categoria = await trx("categoria_produtos").where("id_categoria", id).first();

    if (!categoria) {
      throw new Error("Categoria não encontrado");
    }

    // 1. Deletar subcategorias
    await trx("subcategoria_produtos").where("id_categoria", id).del();

    // 2. Deletar a categoria
    await trx("categoria_produtos").where("id_categoria", id).del();

    return true;
  });
}

const editarCategoria = async (id , categoriaData) => {
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
}

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
    const subcategoria = await trx("subcategoria_produtos").where("id_subcategoria", id).first();

    if (!subcategoria) {
      throw new Error("SubCategoria não encontrado");
    }

    // 1. Deletar subcategorias
    await trx("subcategoria_produtos").where("id_subcategoria", id).del();

    return true;
  });
}

const editarSubcategoria = async (id , subcategoriaData) => {
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
}

module.exports = {
  cadastro,
  lista,
  editar,
  deletar,

  listaCategoria,
  cadastroCategoria,
  deletarCategoria,
  editarCategoria,

  cadastroSubcategoria,
  deletarSubcategoria,
  editarSubcategoria
};