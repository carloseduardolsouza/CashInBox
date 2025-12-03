const express = require("express");
const router = express.Router();

const vendaControllers = require("../controllers/vendaControllers")

router.get("/lista", vendaControllers.lista);
router.post("/cadastro", vendaControllers.cadastro);
router.put("/editar", vendaControllers.editar);
router.delete("/deletar", vendaControllers.deletar);

module.exports = router;