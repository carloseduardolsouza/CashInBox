// server.js - Inicialização do servidor com banco de dados
const app = require("./src/app");
const { initializeDatabase, closeDatabase } = require("./src/config/database");
const { validateAndFix } = require("./src/config/schemaValidator");

const PORT = process.env.PORT || 1122;

const startServer = async () => {
  try {
    // 1. Inicializa o banco de dados primeiro
    await initializeDatabase();

    // 2. Valida e corrige o schema automaticamente
    const validation = await validateAndFix();
    
    if (!validation.valid) {
      console.error('\n❌ Schema inválido! Servidor não pode iniciar.');
      console.error('🔧 Execute "npm run migrate" manualmente para corrigir.');
      process.exit(1);
    }

    // 3. Inicia o servidor Express
    const server = app.listen(PORT, () => {
      console.log('\n🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉');
      console.log(`🔥 Servidor rodando na porta ${PORT}`);
      console.log(`📍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log('🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉\n');
    });

    // 4. Tratamento de erros do servidor
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(
          `❌ Porta ${PORT} já está em uso. Tente outra porta ou feche o processo existente.`
        );
      } else {
        console.error("❌ Erro ao iniciar o servidor:", error);
      }
      process.exit(1);
    });

    // 5. Tratamento gracioso de encerramento (Ctrl+C)
    const gracefulShutdown = async (signal) => {
      console.log(`\n👋 Recebido sinal ${signal}. Encerrando servidor...`);
      
      // Fecha o servidor HTTP (não aceita novas conexões)
      server.close(async () => {
        console.log('🔌 Servidor HTTP encerrado.');
        
        // Fecha a conexão com o banco de dados
        await closeDatabase();
        
        console.log('✅ Aplicação encerrada com sucesso!');
        process.exit(0);
      });

      // Se não fechar em 10 segundos, força o encerramento
      setTimeout(() => {
        console.error('❌ Forçando encerramento após timeout');
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