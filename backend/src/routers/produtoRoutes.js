const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const produtoControllers = require("../controllers/produtoControllers");

// Rotas de Produtos
router.get("/lista", produtoControllers.lista);

// Upload de múltiplos arquivos (máximo 20 imagens)
router.post("/cadastro", upload.array('images', 20), produtoControllers.cadastro);

router.put("/editar/:id", upload.array('images', 20), produtoControllers.editar);
router.delete("/deletar/:id", produtoControllers.deletar);

// Rotas de Categorias (placeholder - implemente depois)
router.get("/categoria/lista", produtoControllers.listaCategoria);
router.post("/categoria/cadastro", produtoControllers.cadastroCategoria);
router.put("/categoria/editar/:id", produtoControllers.editarCategoria);
router.delete("/categoria/deletar/:id", produtoControllers.deletarCategoria);

// Rotas de Subcategorias (placeholder - implemente depois)
router.get("/subcategoria/lista", produtoControllers.listaSubcategoria);
router.post("/subcategoria/cadastro", produtoControllers.cadastroSubcategoria);
router.put("/subcategoria/editar/:id", produtoControllers.editarSubcategoria);
router.delete("/subcategoria/deletar/:id", produtoControllers.deletarSubcategoria);

module.exports = router;