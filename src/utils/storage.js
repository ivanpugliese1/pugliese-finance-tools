export function setPricesToLocalStorage(currentPrices) {
  const data = {
    precio: currentPrices,
    date: new Date().toISOString()
  };
  localStorage.setItem('dollarPrices', JSON.stringify(data));
}

export function getPricesFromLocalStorage() {
  const data = localStorage.getItem('dollarPrices');
  return data ? JSON.parse(data) : null;
}

