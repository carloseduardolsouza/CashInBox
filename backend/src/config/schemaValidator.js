const { db } = require("./database");

// Define o schema esperado do banco de dados
// Adicione aqui todas as tabelas e colunas que sua aplicação precisa
const EXPECTED_SCHEMA = {
  users: {
    columns: [
      "id",
      "name",
      "email",
      "password",
      "phone",
      "active",
      "created_at",
      "updated_at",
    ],
    indexes: ["email", "active"],
  },
  // Adicione mais tabelas aqui conforme sua aplicação crescer
  // products: {
  //   columns: ['id', 'name', 'price', 'stock', 'created_at'],
  //   indexes: ['name']
  // }
};

// Obtém informações sobre as colunas de uma tabela
const getTableColumns = async (tableName) => {
  try {
    const columns = await db(tableName).columnInfo();
    return Object.keys(columns);
  } catch (error) {
    console.error(
      `❌ Erro ao obter colunas da tabela ${tableName}:`,
      error.message
    );
    return null;
  }
};

// Obtém os índices de uma tabela
const getTableIndexes = async (tableName) => {
  try {
    const indexes = await db.raw(
      `
      SELECT name FROM sqlite_master 
      WHERE type='index' 
      AND tbl_name=? 
      AND sql IS NOT NULL
    `,
      [tableName]
    );

    return indexes.map((idx) => idx.name);
  } catch (error) {
    console.error(
      `❌ Erro ao obter índices da tabela ${tableName}:`,
      error.message
    );
    return [];
  }
};

// Verifica se uma tabela existe
const tableExists = async (tableName) => {
  try {
    const exists = await db.schema.hasTable(tableName);
    return exists;
  } catch (error) {
    console.error(`❌ Erro ao verificar tabela ${tableName}:`, error.message);
    return false;
  }
};

// Valida o schema completo do banco de dados
const validateSchema = async () => {
  console.log("\n🔍 Iniciando validação de schema...");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const issues = [];
  const warnings = [];

  // Verifica cada tabela esperada
  for (const [tableName, tableSchema] of Object.entries(EXPECTED_SCHEMA)) {
    console.log(`\n📊 Validando tabela: ${tableName}`);

    // 1. Verifica se a tabela existe
    const exists = await tableExists(tableName);

    if (!exists) {
      issues.push({
        type: "missing_table",
        table: tableName,
        message: `Tabela '${tableName}' não existe`,
      });
      console.log(`   ❌ Tabela não encontrada`);
      continue; // Pula para próxima tabela
    }

    console.log(`   ✅ Tabela existe`);

    // 2. Verifica colunas
    const actualColumns = await getTableColumns(tableName);

    if (!actualColumns) {
      issues.push({
        type: "error_reading_columns",
        table: tableName,
        message: `Erro ao ler colunas da tabela '${tableName}'`,
      });
      continue;
    }

    const expectedColumns = tableSchema.columns;
    const missingColumns = expectedColumns.filter(
      (col) => !actualColumns.includes(col)
    );
    const extraColumns = actualColumns.filter(
      (col) => !expectedColumns.includes(col)
    );

    if (missingColumns.length > 0) {
      issues.push({
        type: "missing_columns",
        table: tableName,
        columns: missingColumns,
        message: `Colunas ausentes na tabela '${tableName}': ${missingColumns.join(", ")}`,
      });
      console.log(`   ❌ Colunas ausentes: ${missingColumns.join(", ")}`);
    } else {
      console.log(`   ✅ Todas as colunas esperadas existem`);
    }

    if (extraColumns.length > 0) {
      warnings.push({
        type: "extra_columns",
        table: tableName,
        columns: extraColumns,
        message: `Colunas extras na tabela '${tableName}': ${extraColumns.join(", ")}`,
      });
      console.log(`   ⚠️  Colunas extras: ${extraColumns.join(", ")}`);
    }

    // 3. Verifica índices (opcional, apenas aviso)
    if (tableSchema.indexes && tableSchema.indexes.length > 0) {
      const actualIndexes = await getTableIndexes(tableName);
      const indexNames = tableSchema.indexes.map(
        (idx) => `${tableName}_${idx}_index`
      );

      const missingIndexes = indexNames.filter(
        (idx) => !actualIndexes.some((actualIdx) => actualIdx.includes(idx))
      );

      if (missingIndexes.length > 0) {
        warnings.push({
          type: "missing_indexes",
          table: tableName,
          indexes: missingIndexes,
          message: `Índices possivelmente ausentes na tabela '${tableName}'`,
        });
        console.log(`   ⚠️  Alguns índices podem estar ausentes`);
      }
    }
  }

  // Resumo da validação
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📋 RESUMO DA VALIDAÇÃO");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  if (issues.length === 0 && warnings.length === 0) {
    console.log("✅ Schema validado com sucesso!");
    console.log("✅ Todas as tabelas e colunas estão corretas.");
    return { valid: true, issues: [], warnings: [] };
  }

  if (issues.length > 0) {
    console.log(`\n❌ Problemas críticos encontrados: ${issues.length}`);
    issues.forEach((issue, index) => {
      console.log(`\n${index + 1}. ${issue.message}`);
      if (issue.columns) {
        console.log(`   Colunas: ${issue.columns.join(", ")}`);
      }
    });
    console.log(
      '\n🔧 SOLUÇÃO: Execute "npm run migrate" para corrigir os problemas.'
    );
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  Avisos encontrados: ${warnings.length}`);
    warnings.forEach((warning, index) => {
      console.log(`${index + 1}. ${warning.message}`);
    });
  }

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  return {
    valid: issues.length === 0,
    issues,
    warnings,
  };
};

// Tenta corrigir problemas automaticamente
const autoFixSchema = async () => {
  console.log("🔧 Tentando corrigir schema automaticamente...");

  try {
    // Executa migrations pendentes
    const [batchNo, log] = await db.migrate.latest();

    if (log.length > 0) {
      console.log(`✅ ${log.length} migration(s) aplicada(s):`);
      log.forEach((migration) => console.log(`   ✓ ${migration}`));
      return true;
    } else {
      console.log("ℹ️  Nenhuma migration pendente para aplicar.");
      return false;
    }
  } catch (error) {
    console.error("❌ Erro ao tentar corrigir schema:", error.message);
    return false;
  }
};

// Validação completa com tentativa de correção automática
const validateAndFix = async () => {
  const validation = await validateSchema();

  if (!validation.valid) {
    console.log("\n🔧 Tentando correção automática...");
    const fixed = await autoFixSchema();

    if (fixed) {
      console.log("\n🔍 Revalidando schema...");
      return await validateSchema();
    }
  }

  return validation;
};

module.exports = {
  validateSchema,
  autoFixSchema,
  validateAndFix,
  EXPECTED_SCHEMA,
};
