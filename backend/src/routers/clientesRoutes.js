const express = require("express");
const router = express.Router();

const clientesControllers = require("../controllers/clientesControllers")

router.get("/lista", clientesControllers.lista);
router.post("/cadastro", clientesControllers.cadastro);
router.put("/editar/:id", clientesControllers.editar);
router.delete("/deletar/:id", clientesControllers.deletar);

module.exports = router;