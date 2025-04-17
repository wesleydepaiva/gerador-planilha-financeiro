import XLSX from "xlsx";

export async function gerarPlanilha(
  valorContrato,
  quantidadeUsuarios,
  valorUsuarioAdicional
) {
  const usuariosTotais = quantidadeUsuarios + 20;
  const dados = [];

  for (let i = 1; i <= usuariosTotais; i++) {
    const valor =
      i <= quantidadeUsuarios
        ? valorContrato
        : valorContrato + (i - quantidadeUsuarios) * valorUsuarioAdicional;

    dados.push({ unidade: i, valor });
  }

  const worksheet = XLSX.utils.json_to_sheet(dados);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Simulacao");

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return buffer;
}
