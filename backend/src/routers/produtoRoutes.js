const express = require("express");
const router = express.Router();

const produtoControllers = require("../controllers/produtoControllers")

router.get("/lista", produtoControllers.lista);
router.post("/cadastro", produtoControllers.cadastro);
router.put("/editar", produtoControllers.editar);
router.delete("/deletar", produtoControllers.deletar);

module.exports = router;