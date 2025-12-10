const express = require("express");
const router = express.Router();

const vendasControllers = require("../controllers/vendasControllers")

router.get("/lista", vendasControllers.lista);
router.get("/lista/crediarios", vendasControllers.listaCrediarios);
router.post("/cadastro", vendasControllers.cadastro);
router.put("/darbaixaparcela/:id", vendasControllers.darBaixaParcela);
router.delete("/deletar/:id", vendasControllers.deletar);

module.exports = router;