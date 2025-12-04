const express = require("express");
const router = express.Router();

const produtoControllers = require("../controllers/produtoControllers")

router.get("/lista", produtoControllers.lista);
router.post("/cadastro", produtoControllers.cadastro);
router.put("/editar/:id", produtoControllers.editar);
router.delete("/deletar/:id", produtoControllers.deletar);

router.get("/categoria/lista", produtoControllers.lista);
router.post("/categoria/cadastro", produtoControllers.cadastro);
router.put("/categoria/editar/:id", produtoControllers.editar);
router.delete("/categoria/deletar/:id", produtoControllers.deletar);

router.get("/subcategoria/lista/:id", produtoControllers.lista);
router.post("/subcategoria/cadastro/:id", produtoControllers.cadastro);
router.put("/subcategoria/editar/:id", produtoControllers.editar);
router.delete("/subcategoria/deletar/:id", produtoControllers.deletar);

module.exports = router;