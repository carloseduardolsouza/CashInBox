const knex = require('knex');
const knexConfig = require('../../knexfile');

// Determina o ambiente (development ou production)
const environment = process.env.NODE_ENV || 'development';

// Cria a instância do Knex com as configurações do ambiente
const db = knex(knexConfig[environment]);

// Inicializa o banco de dados
// - Testa a conexão
// - Executa migrations pendentes
const initializeDatabase = async () => {
  try {
    console.log('🔌 Conectando ao banco de dados...');
    
    // Testa a conexão
    await db.raw('SELECT 1');
    console.log('✅ Conexão com o banco estabelecida com sucesso!');
    
    // Executa migrations pendentes automaticamente
    console.log('🔄 Verificando migrations...');
    await db.migrate.latest();
    console.log('✅ Migrations executadas com sucesso!');
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error.message);
    throw error;
  }
};

// Encerra a conexão com o banco de dados
const closeDatabase = async () => {
  try {
    await db.destroy();
    console.log('🔌 Conexão com o banco de dados encerrada.');
  } catch (error) {
    console.error('❌ Erro ao fechar conexão:', error.message);
    throw error;
  }
};

// Verifica o status da conexão
const checkDatabaseHealth = async () => {
  try {
    await db.raw('SELECT 1');
    return { status: 'healthy', message: 'Banco de dados operando' };
  } catch (error) {
    return { status: 'unhealthy', message: error.message };
  }
};

module.exports = {
  db,
  initializeDatabase,
  closeDatabase,
  checkDatabaseHealth
};