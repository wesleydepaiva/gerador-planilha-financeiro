const { gerarPlanilha } = require("../services/planilhaServices");
const { Readable } = require("stream");

function handleGerarPlanilha(req, res) {
  const { valorContrato, quantidadeUsuarios, valorUsuarioAdicional } = req.body;

  if (
    typeof valorContrato !== "number" ||
    typeof quantidadeUsuarios !== "number" ||
    typeof valorUsuarioAdicional !== "number"
  ) {
    return res.status(400).json({ error: "Todos os campos devem ser números" });
  }

  const buffer = gerarPlanilha(
    valorContrato,
    quantidadeUsuarios,
    valorUsuarioAdicional
  );

  res.setHeader("Content-Disposition", "attachment; filename=simulacao.xlsx");
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  const fileStream = Readable.from(buffer);
  fileStream.pipe(res);
}

module.exports = { handleGerarPlanilha };
