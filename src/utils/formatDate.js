export function formatDate(date) {
  // Si no hay fecha, devolvemos un string vacío o un placeholder
  if (!date) return 'N/A';

  // Si es un string (porque vino de sessionStorage o un input), lo convertimos
  const dateObj = (date instanceof Date) ? date : new Date(date);

  // Verificamos si la fecha es válida para evitar el error "Invalid Date"
  if (isNaN(dateObj.getTime())) {
    console.error("Fecha inválida recibida:", date);
    return 'Fecha error';
  }

  return dateObj.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}
