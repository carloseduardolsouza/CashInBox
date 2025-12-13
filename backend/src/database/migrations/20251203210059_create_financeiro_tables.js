// backend/src/database/migrations/XXXXXX_create_financeiro_tables.js

exports.up = async function(knex) {
  // 1. Tabela de categorias de movimentação financeira
  await knex.schema.createTable('categoria_movimentacao', (table) => {
    table.increments('id_categoria_movimentacao').primary();
    table.string('nome', 100).notNullable();
    table.string('tipo', 50).notNullable(); // 'entrada' ou 'saida'
    table.string('conta', 50); // 'caixa', 'banco'
    table.text('descricao');
    table.boolean('ativo').defaultTo(true);
    
    table.index('tipo');
    table.index('conta');
    table.index('ativo');
  });

  // 2. Tabela de subcategorias de movimentação financeira
  await knex.schema.createTable('subcategoria_movimentacao', (table) => {
    table.increments('id_subcategoria_movimentacao').primary();
    table.integer('id_categoria_movimentacao').unsigned().references('id_categoria_movimentacao').inTable('categoria_movimentacao').onDelete('CASCADE');
    table.string('nome', 100).notNullable();
    table.string('tipo', 50).notNullable(); // 'entrada' ou 'saida'
    table.text('descricao');
    table.boolean('ativo').defaultTo(true);
    
    table.index('id_categoria_movimentacao');
    table.index('tipo');
  });

  // 3. Tabela de movimentações do caixa
  await knex.schema.createTable('caixa_movimentacao', (table) => {
    table.increments('id_movimentacao').primary();
    table.integer('id_categoria_movimentacao').unsigned().references('id_categoria_movimentacao').inTable('categoria_movimentacao').onDelete('SET NULL');
    table.integer('id_subcategoria_movimentacao').unsigned().references('id_subcategoria_movimentacao').inTable('subcategoria_movimentacao').onDelete('SET NULL');
    table.integer('id_venda').unsigned().references('id_venda').inTable('vendas').onDelete('SET NULL');
    table.integer('id_usuario').unsigned(); // Referência ao usuário do sistema
    table.timestamp('data').defaultTo(knex.fn.now());
    table.string('tipo', 50).notNullable(); // 'entrada' ou 'saida'
    table.decimal('valor', 10, 2).notNullable();
    table.text('descricao');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    
    table.index('data');
    table.index('tipo');
    table.index('id_venda');
  });

  // 4. Tabela de contas a pagar
  await knex.schema.createTable('contas_pagar', (table) => {
    table.increments('id_conta').primary();
    table.integer('id_categoria_movimentacao').unsigned().references('id_categoria_movimentacao').inTable('categoria_movimentacao').onDelete('SET NULL');
    table.integer('id_subcategoria_movimentacao').unsigned().references('id_subcategoria_movimentacao').inTable('subcategoria_movimentacao').onDelete('SET NULL');
    table.string('fornecedor', 200);
    table.text('descricao');
    table.decimal('valor', 10, 2).notNullable();
    table.decimal('valor_pago', 10, 2);
    table.date('data_vencimento').notNullable();
    table.date('data_pagamento');
    table.boolean('recorrente').defaultTo(false);
    table.string('intervalo_recorrencia', 50); // mensal, anual
    table.string('status', 50).defaultTo('Pendente'); // pendente, pago, atrasado
    table.text('observacoes');
    
    table.index('data_vencimento');
    table.index('status');
    table.index('fornecedor');
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('contas_pagar');
  await knex.schema.dropTableIfExists('caixa_movimentacao');
  await knex.schema.dropTableIfExists('subcategoria_movimentacao');
  await knex.schema.dropTableIfExists('categoria_movimentacao');
};