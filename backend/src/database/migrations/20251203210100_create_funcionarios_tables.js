// backend/src/database/migrations/20251203210100_create_funcionarios_tables.js

exports.up = async function(knex) {
  // 1. Tabela de funcionários
  await knex.schema.createTable('funcionarios', (table) => {
    table.increments('id_funcionario').primary();
    table.string('nome', 200).notNullable();
    table.string('cpf', 14).notNullable();
    table.string('telefone', 20);
    table.string('email', 150);
    table.string('cargo', 100);
    table.string('genero', 200);
    table.text('observacoes');
    table.date('data_admissao');
    table.date('data_demissao');
    table.date('data_nascimento');
    table.text('endereco');
    table.boolean('ativo').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    
    table.index('cpf');
    table.index('nome');
    table.index('ativo');
  });

  // 2. Adiciona FK de funcionario em vendas (agora que a tabela existe)
  await knex.schema.alterTable('vendas', (table) => {
    table.foreign('id_funcionario').references('id_funcionario').inTable('funcionarios').onDelete('SET NULL');
  });

  // 3. Tabela de configuração de comissões
  await knex.schema.createTable('comissoes_config', (table) => {
    table.increments('id_config').primary();
    table.string('tipo', 50).notNullable(); // 'produto', 'categoria', 'global'
    table.decimal('valor_percentual', 5, 2).defaultTo(0);
    table.decimal('valor_fixo', 10, 2).defaultTo(0);
    table.integer('id_produto').unsigned().references('id_produto').inTable('produtos').onDelete('CASCADE');
    table.integer('id_categoria').unsigned().references('id_categoria').inTable('categoria_produtos').onDelete('CASCADE');
    table.integer('id_funcionario').unsigned().references('id_funcionario').inTable('funcionarios').onDelete('CASCADE');
    table.boolean('ativo').defaultTo(true);
    
    table.index('tipo');
    table.index('id_produto');
    table.index('id_categoria');
    table.index('id_funcionario');
    table.index('ativo');
  });

  // 4. Tabela de comissões geradas
  await knex.schema.createTable('comissoes_geradas', (table) => {
    table.increments('id_comissao').primary();
    table.integer('id_venda').unsigned().references('id_venda').inTable('vendas').onDelete('CASCADE');
    table.integer('id_funcionario').unsigned().references('id_funcionario').inTable('funcionarios').onDelete('CASCADE');
    table.decimal('valor', 10, 2).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.boolean('pago').defaultTo(false);
    table.date('data_pagamento');
    
    table.index('id_venda');
    table.index('id_funcionario');
    table.index('pago');
    table.index('created_at');
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('comissoes_geradas');
  await knex.schema.dropTableIfExists('comissoes_config');
  
  // Remove a FK antes de dropar a tabela funcionarios
  await knex.schema.alterTable('vendas', (table) => {
    table.dropForeign('id_funcionario');
  });
  
  await knex.schema.dropTableIfExists('funcionarios');
};