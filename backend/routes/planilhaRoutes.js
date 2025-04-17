const express = require("express");
const { handleGerarPlanilha } = require("../controllers/planilhaControllers");

const router = express.Router();

router.post("/api/gerar-planilha", handleGerarPlanilha);

module.exports = router;
