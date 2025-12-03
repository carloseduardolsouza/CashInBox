const express = require("express");
const router = express.Router();

const clientesControllers = require("../controllers/clientesControllers")

router.get("/lista", clientesControllers.lista);
router.post("/cadastro", clientesControllers.cadastro);
router.put("/editar", clientesControllers.editar);
router.delete("/deletar", clientesControllers.deletar);

module.exports = router;