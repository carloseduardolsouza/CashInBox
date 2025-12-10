const express = require("express");
const router = express.Router();

const vendasControllers = require("../controllers/vendasControllers")

router.get("/lista", vendasControllers.lista);
router.post("/cadastro", vendasControllers.cadastro);
router.delete("/deletar/:id", vendasControllers.deletar);

module.exports = router;