const express = require("express");
const router = express.Router();

const funcionariosControllers = require("../controllers/funcionariosControllers")

router.get("/lista", funcionariosControllers.lista);
router.post("/cadastro", funcionariosControllers.cadastro);
router.put("/editar/:id", funcionariosControllers.editar);
router.delete("/deletar/:id", funcionariosControllers.deletar);

module.exports = router;