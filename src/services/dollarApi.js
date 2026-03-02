
const API = 'https://dolarapi.com/v1/dolares';

export async function getCurrentDollarPrice() {
  try {
    const response = await fetch(API);

    // Si hay un error de conexion, validamos el estado de la respuesta.
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    // Transformarmos la respuesta a formato JSON
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('Error al obtener el valor del dolar', error);
    throw error;
  }
}

export function pesoToDollarConversion(pesos, salesRate) {
  return pesos / salesRate;
}

export function dollarToPesoConversion(dollars, purchaseRate) {
  return dollars * purchaseRate;
}


export function calculatePercentageVariation(previousValue, currentValue) {
  if (!previousValue || previousValue === 0) return null;

  const difference = currentValue - previousValue;
  const percentageVariation = (difference / previousValue) * 100;

  return {
    difference: difference,
    percentageVariation: percentageVariation,
    type: difference >= 0 ? 'ascent' : 'descent'
  }
}

