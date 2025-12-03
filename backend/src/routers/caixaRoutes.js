const express = require("express");
const router = express.Router();

const caixaControllers = require("../controllers/caixaControllers")

router.get("/lista", caixaControllers.lista);
router.post("/cadastro", caixaControllers.cadastro);
router.put("/editar", caixaControllers.editar);
router.delete("/deletar", caixaControllers.deletar);

module.exports = router;