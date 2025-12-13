const express = require("express");
const router = express.Router();

const contaControllers = require("../controllers/contaControllers")

router.get("/lista", contaControllers.lista);
router.post("/cadastro", contaControllers.cadastro);
router.put("/editar/:id", contaControllers.editar);
router.put("/pagar/:id", contaControllers.pagar);
router.delete("/deletar/:id", contaControllers.deletar);

// Rotas de Categorias
router.get("/categoria/lista", contaControllers.listaCategoria);
router.post("/categoria/cadastro", contaControllers.cadastroCategoria);
router.delete("/categoria/deletar/:id", contaControllers.deletarCategoria);
router.put("/categoria/editar/:id", contaControllers.editarCategoria);

// Rotas de Subcategorias
router.post("/subcategoria/cadastro", contaControllers.cadastroSubcategoria);
router.put("/subcategoria/editar/:id", contaControllers.editarSubcategoria);
router.delete("/subcategoria/deletar/:id", contaControllers.deletarSubcategoria);

module.exports = router;