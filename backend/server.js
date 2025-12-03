// server.js - Inicialização do servidor com banco de dados
const app = require("./src/app");
const { initializeDatabase, closeDatabase } = require("./src/config/database");
const { validateAndFix } = require("./src/config/schemaValidator");

const fs = require("fs");
const path = require("path");
const os = require("os");

const userDataPath = path.join(os.homedir(), "AppData", "Roaming", "CashInBox");
const userDataPathDev = path.join(userDataPath, "Desenvolvimento");

function ensureDirectories() {
  if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath, { recursive: true });
  }

  if (!fs.existsSync(userDataPathDev)) {
    fs.mkdirSync(userDataPathDev, { recursive: true });
  }
}

const PORT = process.env.PORT || 1122;

const startServer = async () => {
  try {
    // 👉 PRIMEIRA COISA: criar as pastas
    ensureDirectories();

    // 1. Inicializa o banco de dados
    await initializeDatabase();

    // 2. Valida e corrige o schema
    const validation = await validateAndFix();
    
    if (!validation.valid) {
      console.error('\n❌ Schema inválido! Servidor não pode iniciar.');
      console.error('🔧 Execute "npm run migrate" manualmente para corrigir.');
      process.exit(1);
    }

    // 3. Inicia o servidor Express
    const server = app.listen(PORT, () => {
      console.log('\n🔥 Servidor rodando na porta ' + PORT);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`❌ Porta ${PORT} já está em uso.`);
      } else {
        console.error("❌ Erro ao iniciar o servidor:", error);
      }
      process.exit(1);
    });

    // Encerramento gracioso
    const gracefulShutdown = async (signal) => {
      console.log(`\n👋 Encerrando servidor (${signal})...`);
      server.close(async () => {
        console.log('🔌 Servidor HTTP encerrado.');
        await closeDatabase();
        process.exit(0);
      });
      setTimeout(() => {
        console.error('❌ Timeout forçando encerramento');
        process.exit(1);
      }, 10000);
    };

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

  } catch (error) {
    console.error("❌ Erro fatal na inicialização da aplicação:", error);
    await closeDatabase();
    process.exit(1);
  }
};

startServer();