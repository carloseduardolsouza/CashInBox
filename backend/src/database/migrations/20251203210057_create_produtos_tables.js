// backend/src/database/migrations/XXXXXX_create_produtos_tables.js

exports.up = async function(knex) {
  // 1. Tabela de categorias de produtos
  await knex.schema.createTable('categoria_produtos', (table) => {
    table.increments('id_categoria').primary();
    table.string('nome', 100).notNullable();
    table.text('descricao');
    table.boolean('ativo').defaultTo(true);
    
    table.index('nome');
    table.index('ativo');
  });

  // 2. Tabela de subcategorias de produtos
  await knex.schema.createTable('subcategoria_produtos', (table) => {
    table.increments('id_subcategoria').primary();
    table.integer('id_categoria').unsigned().references('id_categoria').inTable('categoria_produtos').onDelete('CASCADE');
    table.string('nome', 100).notNullable();
    table.text('descricao');
    table.boolean('ativo').defaultTo(true);
    
    table.index('id_categoria');
    table.index('nome');
  });

  // 3. Tabela de produtos
  await knex.schema.createTable('produtos', (table) => {
    table.increments('id_produto').primary();
    table.integer('id_categoria').unsigned().references('id_categoria').inTable('categoria_produtos').onDelete('SET NULL');
    table.integer('id_subcategoria').unsigned().references('id_subcategoria').inTable('subcategoria_produtos').onDelete('SET NULL');
    table.string('nome', 200).notNullable();
    table.text('descricao');
    table.string('cod_barras', 50);
    table.string('cod_interno', 50);
    table.decimal('preco_custo', 10, 2).defaultTo(0);
    table.decimal('preco_venda', 10, 2).defaultTo(0);
    table.decimal('margem', 5, 2).defaultTo(0);
    table.boolean('ativo').defaultTo(true);
    table.decimal('estoque', 10, 2).defaultTo(0);
    table.decimal('estoque_minimo', 10, 2).defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    
    table.index('nome');
    table.index('cod_barras');
    table.index('cod_interno');
    table.index('ativo');
  });

  // 4. Tabela de variações de produtos
  await knex.schema.createTable('produto_variacao', (table) => {
    table.increments('id_variacao').primary();
    table.integer('id_produto').unsigned().references('id_produto').inTable('produtos').onDelete('CASCADE');
    table.string('nome', 100).notNullable();
    table.string('tipo', 50); // Ex: cor, tamanho
    table.string('cod_interno', 50);
    table.string('cod_barras', 50);
    table.decimal('estoque', 10, 2).defaultTo(0);
    table.decimal('estoque_minimo', 10, 2).defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    
    table.index('id_produto');
    table.index('cod_barras');
  });

  // 5. Tabela de imagens de produtos
  await knex.schema.createTable('produto_imagens', (table) => {
    table.increments('id_imagem').primary();
    table.integer('id_produto').unsigned().references('id_produto').inTable('produtos').onDelete('CASCADE');
    table.integer('id_variacao').unsigned().references('id_variacao').inTable('produto_variacao').onDelete('CASCADE');
    table.string('caminho_arquivo', 500).notNullable();
    table.boolean('principal').defaultTo(false);
    
    table.index('id_produto');
    table.index('id_variacao');
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('produto_imagens');
  await knex.schema.dropTableIfExists('produto_variacao');
  await knex.schema.dropTableIfExists('produtos');
  await knex.schema.dropTableIfExists('subcategoria_produtos');
  await knex.schema.dropTableIfExists('categoria_produtos');
};