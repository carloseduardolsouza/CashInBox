const express = require("express");
const router = express.Router();

const vendasControllers = require("../controllers/vendasControllers")

router.get("/lista", vendasControllers.lista);
router.get("/lista/crediarios", vendasControllers.listaCrediarios);
router.post("/cadastro", vendasControllers.cadastro);
router.delete("/deletar/:id", vendasControllers.deletar);

router.put("/faturar/parcela/:id", vendasControllers.darBaixaParcela);
router.put("/cancelar/parcela/:id", vendasControllers.cancelarParcela);
router.put("/amortizar/parcela/:id", vendasControllers.amortizarParcela);

module.exports = router;