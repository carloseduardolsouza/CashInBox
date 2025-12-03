const express = require("express");
const router = express.Router();

const contaControllers = require("../controllers/contaControllers")

router.get("/lista", contaControllers.lista);
router.post("/cadastro", contaControllers.cadastro);
router.put("/editar", contaControllers.editar);
router.delete("/deletar", contaControllers.deletar);

module.exports = router;