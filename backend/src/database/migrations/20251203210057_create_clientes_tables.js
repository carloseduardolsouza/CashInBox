// backend/src/database/migrations/20251203210057_create_clientes_tables.js

exports.up = async function(knex) {
  // 1. Tabela de clientes (precisa ser criada antes de endereço devido à referência circular)
  await knex.schema.createTable('cliente', (table) => {
    table.increments('id_cliente').primary();
    table.string('nome', 200).notNullable();
    table.string('telefone', 20);
    table.string('email', 150);
    table.string('cpfCNPJ', 20);
    table.date('data_nascimento');
    table.string('genero', 20);
    table.integer('id_endereco').unsigned(); // Sem FK ainda
    table.text('observacoes');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    
    table.index('nome');
    table.index('cpfCNPJ');
    table.index('email');
  });

  // 2. Tabela de endereços
  await knex.schema.createTable('endereco', (table) => {
    table.increments('id_endereco').primary();
    table.integer('id_cliente').unsigned().references('id_cliente').inTable('cliente').onDelete('CASCADE');
    table.string('pais', 100).defaultTo('Brasil');
    table.string('estado', 100);
    table.string('cidade', 150);
    table.string('bairro', 150);
    table.string('rua', 200);
    table.string('complemento', 200);
    table.string('cep', 10);
    
    table.index('id_cliente');
    table.index('cep');
  });

  // 3. Adiciona a FK de endereco em cliente (agora que a tabela endereco existe)
  await knex.schema.alterTable('cliente', (table) => {
    table.foreign('id_endereco').references('id_endereco').inTable('endereco').onDelete('SET NULL');
  });
};

exports.down = async function(knex) {
  // Remove a FK antes de dropar as tabelas
  await knex.schema.alterTable('cliente', (table) => {
    table.dropForeign('id_endereco');
  });
  
  await knex.schema.dropTableIfExists('endereco');
  await knex.schema.dropTableIfExists('cliente');
};