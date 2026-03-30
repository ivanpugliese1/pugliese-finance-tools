// Buscamos que los puntos de miles se vean automaticamente mientras el usuario escribe.
export function formatAmount(input) {

  let value = input.value.replace(/[^0-9,]/g, "");

  const parts = value.split(",");
  if (parts.length > 2) {
    value = parts[0] + "," + parts.slice(1).join("");
  }

  let intPart = parts[0].replace(/\D/g, "");
  let decimalPart = parts[1];

  if (intPart !== "") {
    intPart = new Intl.NumberFormat('es-AR').format(parseInt(intPart, 10));
  }

  input.value = decimalPart !== undefined ? `${intPart},${decimalPart.slice(0, 2)}` : intPart;
}