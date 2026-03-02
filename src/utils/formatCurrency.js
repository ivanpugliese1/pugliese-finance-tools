/*
  Formatea un número como moneda argentina (separador de miles, 2 decimales).
  Se usa en todos los montos mostrados en resultados.
*/
export function formatCurrency(number) {
  return number.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}