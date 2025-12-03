const { db } = require("./database");

// Define o schema esperado do banco de dados
// Adicione aqui todas as tabelas e colunas que sua aplicação precisa
const EXPECTED_SCHEMA = {
  // ========== PRODUTOS ==========
  categoria_produtos: {
    columns: ['id_categoria', 'nome', 'descricao', 'ativo'],
    indexes: ['nome', 'ativo']
  },
  
  subcategoria_produtos: {
    columns: ['id_subcategoria', 'id_categoria', 'nome', 'descricao', 'ativo'],
    indexes: ['id_categoria', 'nome']
  },
  
  produtos: {
    columns: [
      'id_produto', 'id_categoria', 'id_subcategoria', 'nome', 'descricao',
      'cod_barras', 'cod_interno', 'preco_custo', 'preco_venda', 'margem',
      'ativo', 'estoque', 'estoque_minimo', 'created_at'
    ],
    indexes: ['nome', 'cod_barras', 'cod_interno', 'ativo']
  },
  
  produto_variacao: {
    columns: [
      'id_variacao', 'id_produto', 'nome', 'tipo', 'cod_interno',
      'cod_barras', 'estoque', 'estoque_minimo', 'created_at'
    ],
    indexes: ['id_produto', 'cod_barras']
  },
  
  produto_imagens: {
    columns: ['id_imagem', 'id_produto', 'id_variacao', 'caminho_arquivo', 'principal'],
    indexes: ['id_produto', 'id_variacao']
  },

  // ========== CLIENTES ==========
  cliente: {
    columns: [
      'id_cliente', 'nome', 'telefone', 'email', 'cpfCNPJ',
      'data_nascimento', 'genero', 'id_endereco', 'observacoes', 'created_at'
    ],
    indexes: ['nome', 'cpfCNPJ', 'email']
  },
  
  endereco: {
    columns: [
      'id_endereco', 'id_cliente', 'pais', 'estado', 'cidade',
      'bairro', 'rua', 'complemento', 'cep'
    ],
    indexes: ['id_cliente', 'cep']
  },

  // ========== VENDAS ==========
  vendas: {
    columns: [
      'id_venda', 'id_cliente', 'id_funcionario', 'id_usuario', 'data',
      'valor_liquido', 'valor_bruto', 'status', 'desconto_real',
      'desconto_porcentagem', 'acrescimo_real', 'acrescimo_porcentagem'
    ],
    indexes: ['data', 'status', 'id_cliente', 'id_funcionario']
  },
  
  venda_itens: {
    columns: [
      'id_item', 'id_venda', 'id_produto', 'id_variacao',
      'quantidade', 'preco_unitario', 'subtotal'
    ],
    indexes: ['id_venda', 'id_produto']
  },
  
  vendas_pagamento: {
    columns: ['id_pagamento', 'id_venda', 'forma', 'valor', 'data_pagamento'],
    indexes: ['id_venda', 'forma']
  },
  
  crediario_venda: {
    columns: [
      'id_crediario', 'id_venda', 'id_cliente', 'valor_total',
      'entrada', 'numero_parcelas', 'status', 'created_at'
    ],
    indexes: ['id_venda', 'id_cliente', 'status']
  },
  
  crediario_parcelas: {
    columns: [
      'id_parcela', 'id_crediario', 'numero_parcela', 'valor',
      'data_vencimento', 'data_pagamento', 'status'
    ],
    indexes: ['id_crediario', 'data_vencimento', 'status']
  },

  // ========== FINANCEIRO ==========
  categoria_movimentacao: {
    columns: ['id_categoria_movimentacao', 'nome', 'tipo', 'conta', 'descricao', 'ativo'],
    indexes: ['tipo', 'conta', 'ativo']
  },
  
  subcategoria_movimentacao: {
    columns: [
      'id_subcategoria_movimentacao', 'id_categoria_movimentacao',
      'nome', 'tipo', 'descricao', 'ativo'
    ],
    indexes: ['id_categoria_movimentacao', 'tipo']
  },
  
  caixa_movimentacao: {
    columns: [
      'id_movimentacao', 'id_categoria_movimentacao', 'id_subcategoria_movimentacao',
      'id_venda', 'id_usuario', 'data', 'tipo', 'valor', 'descricao', 'created_at'
    ],
    indexes: ['data', 'tipo', 'id_venda']
  },
  
  contas_pagar: {
    columns: [
      'id_conta', 'id_categoria_movimentacao', 'id_subcategoria_movimentacao',
      'fornecedor', 'descricao', 'valor', 'data_vencimento', 'data_pagamento',
      'recorrente', 'intervalo_recorrencia', 'status', 'observacoes'
    ],
    indexes: ['data_vencimento', 'status', 'fornecedor']
  },

  // ========== FUNCIONÁRIOS ==========
  funcionarios: {
    columns: [
      'id_funcionario', 'nome', 'cpf', 'telefone', 'email', 'cargo',
      'data_admissao', 'data_demissao', 'data_nascimento', 'endereco', 'ativo'
    ],
    indexes: ['cpf', 'nome', 'ativo']
  },
  
  comissoes_config: {
    columns: [
      'id_config', 'tipo', 'valor_percentual', 'valor_fixo',
      'id_produto', 'id_categoria', 'id_funcionario', 'ativo'
    ],
    indexes: ['tipo', 'id_produto', 'id_categoria', 'id_funcionario', 'ativo']
  },
  
  comissoes_geradas: {
    columns: [
      'id_comissao', 'id_venda', 'id_funcionario', 'valor',
      'created_at', 'pago', 'data_pagamento'
    ],
    indexes: ['id_venda', 'id_funcionario', 'pago', 'created_at']
  }
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