import { getCurrentDollarPrice, calculatePercentageVariation, setPricesToLocalStorage, getPricesFromLocalStorage } from "../services/dollarApi.js";


export async function renderPrices(containerId) {
  const container = document.getElementById(containerId);

  // Si no encuentra el contenedor, salimos de la función.
  if (!container) {
    console.error(`Container ${containerId} no encontrado`);
    return;
  }

  try {
    const currentPrices = await getCurrentDollarPrice();

    const setPrices = getPricesFromLocalStorage();

    const pricesWithVariation = currentPrices.map(price => {
      let variation = { purchase: null, sale: null };
      if (setPrices && setPrices.precio) {
        const previousPrice = setPrices.precio.find(prevPrice =>
          prevPrice.casa === price.casa
        )
        if (previousPrice) {
          variation.purchase = calculatePercentageVariation(previousPrice.compra, price.compra);
          variation.sale = calculatePercentageVariation(previousPrice.venta, price.venta);
        }
      }

      return { ...price, variation: variation };
    })

    setPricesToLocalStorage(currentPrices);

    container.innerHTML = `
        <div class="header-prices">
          <h2>Cotizaciones USD</h2>
          <div>
            <span class="live-dot"></span>
            <span>EN VIVO</span>
          </div>
        </div>
        
        <div class="dollar-prices">
          ${pricesWithVariation.map(price => dollarCardHtml(price)).join('')} 
        </div>
        <p class="last-update">
          Última actualización: ${new Date(currentPrices[0]?.fechaActualizacion || new Date()).toLocaleString('es-AR')} 
        </p>
    `;
  } catch (error) {
    container.innerHTML = '<p class="error">Error al cargar las cotizaciones del dólar. Por favor, intente nuevamente más tarde.</p>';

    document.getElementById('retry-prices')?.addEventListener('click', () => {
      renderPrices(containerId);
    });
  }
}

function dollarCardHtml(price) {
  const simplifiedName = price.nombre === "Contado con liquidación"
    ? "CCL"
    : price.nombre;

  // Función interna para generar el HTML de la variación (subida/bajada)
  const variationHtml = (variation) => {
    if (!variation) return '';
    const style = variation.type === 'ascent' ? 'positive-variation' : 'negative-variation';
    const symbol = variation.type === 'ascent' ? '▲' : '▼';
    return `
      <span class="${style}">
        ${symbol} ${Math.abs(variation.percentageVariation).toFixed(2)}%
      </span>
    `;
  };
  return `
    <div class="dollar-card">
      <h3>Dolar ${simplifiedName}</h3>
      
      <div class="values">
        <div class="purchase-value">
          <span class="price">$${price.compra.toFixed(2)}</span>
          <span class="purchase-text">Compra</span>
          ${variationHtml(price.variation?.purchase)}
        </div>
        <div class="sale-value">
          <span class="price">$${price.venta.toFixed(2)}</span>
          <span class="sale-text">Venta</span>
          ${variationHtml(price.variation?.sale)}
        </div>
      </div>
    </div>
  `;
}

