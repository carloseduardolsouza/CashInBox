// backend/src/database/migrations/20251203210057_create_clientes_tables.js

exports.up = async function(knex) {
  // 1. Tabela de clientes
  await knex.schema.createTable('cliente', (table) => {
    table.increments('id_cliente').primary();
    table.string('nome', 200).notNullable();
    table.string('telefone', 20);
    table.string('email', 150);
    table.string('cpfCNPJ', 20);
    table.date('data_nascimento');
    table.string('genero', 20);
    table.text('observacoes');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    
    table.index('nome');
    table.index('cpfCNPJ');
    table.index('email');
  });

  // 2. Tabela de endereços (1 cliente → muitos endereços)
  await knex.schema.createTable('endereco', (table) => {
    table.increments('id_endereco').primary();
    table
      .integer('id_cliente')
      .unsigned()
      .notNullable()
      .references('id_cliente')
      .inTable('cliente')
      .onDelete('CASCADE');

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
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('endereco');
  await knex.schema.dropTableIfExists('cliente');
};
