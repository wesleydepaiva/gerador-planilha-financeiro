import { gerarPlanilha } from "../services/planilhaServices.js";
import { Readable } from "stream";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

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

  try {
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
  } catch (err) {
    console.error("Erro ao gerar planilha:", err);
    res.status(500).json({ error: "Erro interno ao gerar planilha" });
  }
}
