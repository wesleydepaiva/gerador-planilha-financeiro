const { gerarPlanilha } = require("../services/planilhaServices");
const { Readable } = require("stream");

async function handleGerarPlanilha(req, res) {
  const {
    valorContrato,
    quantidadeUsuarios,
    valorUsuarioAdicional,
    quantidadeUsuariosAdicionais,
  } = req.body;

  if (
    typeof valorContrato !== "number" ||
    typeof quantidadeUsuarios !== "number" ||
    typeof valorUsuarioAdicional !== "number" ||
    typeof quantidadeUsuariosAdicionais !== "number"
  ) {
    return res.status(400).json({ error: "Todos os campos devem ser números" });
  }

  const buffer = await gerarPlanilha(
    valorContrato,
    quantidadeUsuarios,
    valorUsuarioAdicional,
    quantidadeUsuariosAdicionais
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
