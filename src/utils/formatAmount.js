// Buscamos que los puntos de miles se vean automaticamente mientras el usuario escribe.
export function formatAmount(input) {

  // Creamos una variable valor, le asignamos el valor del input y eliminamos con regex las letras o simbolos que no sean numeros o coma, ya que en Argentina usamos la coma como separador decimal.
  let value = input.value.replace(/[^0-9,]/g, "");

  // Creamos la constante partes, en donde tomamos el valor y lo separamos en un array usando la coma como separador con el metodo split. Split es el metodo que divide un string en un array de substrings segun el separador que le indiquemos.
  // En el if, si el array tiene mas de dos partes, quiere decir que se ingresaron varias comas, tomamos la primera parte como la parte ENTERA y unimos el resto como la parte DECIMAL.
  const parts = value.split(",");
  if (parts.length > 2) {
    value = parts[0] + "," + parts.slice(1).join("");
  }

  // En la variable parteEntera, utilizamos el metodo replace con regex para eliminar todo lo que no sea un numero.
  let intPart = parts[0].replace(/\D/g, "");
  let decimalPart = parts[1];

  // En este if, si la parteEntera no esta vacia, usamos Intl.Number.Format para formatear el numero con puntes de miles segun la localizacion es-AR.
  if (intPart !== "") {
    intPart = new Intl.NumberFormat('es-AR').format(parseInt(intPart, 10));
  }

  // Al input.value le asignamos la parteEntera y la parteDecimal (si existe) unidas por una coma, el slice(0,2) limita la parte decimal a dos digitos.
  input.value = decimalPart !== undefined ? `${intPart},${decimalPart.slice(0, 2)}` : intPart;
}