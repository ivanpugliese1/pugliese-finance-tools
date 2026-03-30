export function formatDate(date) {
  if (!date) return 'N/A';

  const dateObj = (date instanceof Date) ? date : new Date(date);

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
