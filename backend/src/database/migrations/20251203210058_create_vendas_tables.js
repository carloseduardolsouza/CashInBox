// backend/src/database/migrations/20251203210058_create_vendas_tables.js

exports.up = async function(knex) {
  // 1. Tabela de vendas (sem FK de funcionario ainda)
  await knex.schema.createTable('vendas', (table) => {
    table.increments('id_venda').primary();
    table.integer('id_cliente').unsigned().references('id_cliente').inTable('cliente').onDelete('SET NULL');
    table.integer('id_funcionario').unsigned(); // FK será adicionada depois na migration de funcionarios
    table.integer('id_usuario').unsigned(); // Referência ao sistema de usuários
    table.timestamp('data').defaultTo(knex.fn.now());
    table.decimal('valor_liquido', 10, 2).defaultTo(0);
    table.decimal('valor_bruto', 10, 2).defaultTo(0);
    table.string('status', 50).defaultTo('finalizada'); // finalizada, cancelada, pendente
    table.decimal('desconto_real', 10, 2).defaultTo(0);
    table.decimal('desconto_porcentagem', 5, 2).defaultTo(0);
    table.decimal('acrescimo_real', 10, 2).defaultTo(0);
    table.decimal('acrescimo_porcentagem', 5, 2).defaultTo(0);
    
    table.index('data');
    table.index('status');
    table.index('id_cliente');
    table.index('id_funcionario');
  });

  // 2. Tabela de itens da venda
  await knex.schema.createTable('venda_itens', (table) => {
    table.increments('id_item').primary();
    table.integer('id_venda').unsigned().references('id_venda').inTable('vendas').onDelete('CASCADE');
    table.integer('id_produto').unsigned().references('id_produto').inTable('produtos').onDelete('SET NULL');
    table.integer('id_variacao').unsigned().references('id_variacao').inTable('produto_variacao').onDelete('SET NULL');
    table.decimal('quantidade', 10, 2).notNullable();
    table.decimal('preco_unitario', 10, 2).notNullable();
    table.decimal('subtotal', 10, 2).notNullable();
    
    table.index('id_venda');
    table.index('id_produto');
  });

  // 3. Tabela de pagamentos da venda
  await knex.schema.createTable('vendas_pagamento', (table) => {
    table.increments('id_pagamento').primary();
    table.integer('id_venda').unsigned().references('id_venda').inTable('vendas').onDelete('CASCADE');
    table.string('forma', 50).notNullable(); // dinheiro, credito, debito, pix
    table.decimal('valor', 10, 2).notNullable();
    table.timestamp('data_pagamento').defaultTo(knex.fn.now());
    
    table.index('id_venda');
    table.index('forma');
  });

  // 4. Tabela de crediário
  await knex.schema.createTable('crediario_venda', (table) => {
    table.increments('id_crediario').primary();
    table.integer('id_venda').unsigned().references('id_venda').inTable('vendas').onDelete('CASCADE');
    table.integer('id_cliente').unsigned().references('id_cliente').inTable('cliente').onDelete('CASCADE');
    table.decimal('valor_total', 10, 2).notNullable();
    table.decimal('entrada', 10, 2).defaultTo(0);
    table.integer('numero_parcelas').notNullable();
    table.string('status', 50).defaultTo('ativo'); // ativo, quitado, cancelado
    table.timestamp('created_at').defaultTo(knex.fn.now());
    
    table.index('id_venda');
    table.index('id_cliente');
    table.index('status');
  });

  // 5. Tabela de parcelas do crediário
  await knex.schema.createTable('crediario_parcelas', (table) => {
    table.increments('id_parcela').primary();
    table.integer('id_crediario').unsigned().references('id_crediario').inTable('crediario_venda').onDelete('CASCADE');
    table.integer('numero_parcela').notNullable();
    table.decimal('valor', 10, 2).notNullable();
    table.date('data_vencimento').notNullable();
    table.date('data_pagamento');
    table.string('status', 50).defaultTo('pendente'); // pendente, pago, atrasado
    
    table.index('id_crediario');
    table.index('data_vencimento');
    table.index('status');
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('crediario_parcelas');
  await knex.schema.dropTableIfExists('crediario_venda');
  await knex.schema.dropTableIfExists('vendas_pagamento');
  await knex.schema.dropTableIfExists('venda_itens');
  await knex.schema.dropTableIfExists('vendas');
};