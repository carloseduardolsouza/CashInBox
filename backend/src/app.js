const express = require("express");
const path = require("path");
const os = require("os");

// Importa todas as rotas da aplicação
const clientesRoutes = require("./routers/clientesRoutes");
const funcionariosRoutes = require("./routers/funcionariosRoutes");
const produtoRoutes = require("./routers/produtoRoutes");

// Inicializa o app Express
const app = express();

// 🌐 Middleware CORS – Libera acesso externo

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


// 📁 Configuração do caminho de uploads (pasta persistente)
const userDataPath = path.join(os.homedir(), "AppData", "Roaming", "CashInBox");
const uploadPath = path.join(userDataPath, "uploads" , "produtos");


// 🖼️ Servir arquivos estáticos de uploads
// Isso permite acessar imagens/arquivos via URL:
// ex: http://localhost:1122/uploads/imagem.png
app.use("/uploads", express.static(uploadPath));


// 🧠 Middleware Body Parser (Deixa o Express entender JSON no body das requisições.)
app.use(express.json());


// 🔁 Rotas da API

app.use("/cliente", clientesRoutes);
app.use("/funcionario", funcionariosRoutes);
app.use("/produto", produtoRoutes);

module.exports = app;