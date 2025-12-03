// backend/scripts/migrate.js
// Script para executar migrations de forma mais controlada

const { db } = require('../src/config/database');

const executeMigrations = async () => {
  console.log('\n🚀 INICIANDO MIGRATIONS...\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  try {
    // 1. Testa conexão
    console.log('\n🔌 Testando conexão com o banco...');
    await db.raw('SELECT 1');
    console.log('✅ Conexão estabelecida!');

    // 2. Verifica migrations pendentes
    console.log('\n🔍 Verificando migrations pendentes...');
    const [batchNo, migrations] = await db.migrate.list();
    
    console.log('\n📋 Status das migrations:');
    console.log(`   Executadas: ${migrations[0].length}`);
    console.log(`   Pendentes: ${migrations[1].length}`);

    if (migrations[1].length === 0) {
      console.log('\n✅ Nenhuma migration pendente!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      await db.destroy();
      return;
    }

    // 3. Lista migrations pendentes
    console.log('\n📝 Migrations que serão executadas:');
    migrations[1].forEach((migration, index) => {
      console.log(`   ${index + 1}. ${migration.name}`);
    });

    // 4. Executa migrations
    console.log('\n⚙️  Executando migrations...');
    const [batch, log] = await db.migrate.latest();

    if (log.length === 0) {
      console.log('\n⚠️  Nenhuma migration foi executada.');
    } else {
      console.log('\n✅ Migrations executadas com sucesso!');
      console.log(`   Batch: ${batch}`);
      log.forEach((migration, index) => {
        console.log(`   ✓ ${migration}`);
      });
    }

    // 5. Verifica estrutura criada
    console.log('\n🔍 Verificando tabelas criadas...');
    const tables = await db.raw(`
      SELECT name FROM sqlite_master 
      WHERE type='table' 
      AND name NOT LIKE 'sqlite_%'
      AND name NOT LIKE 'knex_%'
      ORDER BY name
    `);

    console.log(`\n📊 Total de tabelas: ${tables.length}`);
    tables.forEach((table, index) => {
      console.log(`   ${index + 1}. ${table.name}`);
    });

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ PROCESSO CONCLUÍDO COM SUCESSO!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('❌ ERRO AO EXECUTAR MIGRATIONS:');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error(error);
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } finally {
    await db.destroy();
  }
};

const rollbackMigrations = async () => {
  console.log('\n⚠️  REVERTENDO ÚLTIMA MIGRATION...\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  try {
    await db.raw('SELECT 1');
    
    const [batchNo, migrations] = await db.migrate.rollback();

    if (migrations.length === 0) {
      console.log('\n⚠️  Nenhuma migration para reverter.');
    } else {
      console.log('\n✅ Migrations revertidas:');
      console.log(`   Batch: ${batchNo}`);
      migrations.forEach((migration) => {
        console.log(`   ✓ ${migration}`);
      });
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('\n❌ Erro ao reverter migrations:', error);
  } finally {
    await db.destroy();
  }
};

// Detecta qual comando executar
const command = process.argv[2];

switch (command) {
  case 'rollback':
    rollbackMigrations();
    break;
  default:
    executeMigrations();
}