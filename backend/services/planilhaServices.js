import XLSX from "xlsx";

export async function gerarPlanilha(
  valorContrato,
  quantidadeUsuarios,
  valorUsuarioAdicional,
  quantidadeUsuariosAdicionais
) {
  const usuariosTotais = quantidadeUsuarios + quantidadeUsuariosAdicionais;
  const dados = [];

  const formatarValor = (valor) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);

  for (let i = 1; i <= usuariosTotais; i++) {
    const valor =
      i <= quantidadeUsuarios
        ? valorContrato
        : valorContrato + (i - quantidadeUsuarios) * valorUsuarioAdicional;

    dados.push({
      unidade: i,
      valor: formatarValor(valor),
    });
  }

  const worksheet = XLSX.utils.json_to_sheet(dados);

  // Ajuste automático da largura das colunas
  const colWidths = Object.keys(dados[0]).map((key) => {
    const maxLength = Math.max(
      key.length,
      ...dados.map((row) => String(row[key]).length)
    );
    return { wch: maxLength + 2 }; // padding extra
  });
  worksheet["!cols"] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Simulacao");

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return buffer;
}
