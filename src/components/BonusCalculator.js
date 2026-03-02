import { calculateBonus } from "../services/bonusService.js";
import { formatAmount } from "../utils/formatAmount.js";
import { formatDate } from "../utils/formatDate.js";

export function initializeBonusCalculator(containerId) {
  const container = document.getElementById(containerId);

  // Obtengo la fecha actual en año y mes
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();


  // Determino la fecha de calculo.
  let calculationDate;
  if (currentMonth < 6) {
    calculationDate = new Date(currentYear, 5, 30);
  } else {
    calculationDate = new Date(currentYear, 11, 31);
  }


  // Ahora, convierto las fechas a formato YYYY-MM-DD para los inputs tipo "date"
  const inputDate = (date) => date.toISOString().split('T')[0];

  container.innerHTML = `
    <form id="form-bonus" class="form-bonus">
        <div class="form-group">
          <label for="better-salary">
            Mejor sueldo bruto del semestre :
          </label>
          <input
            type="text"
            id="better-salary"
            name="better-salary"
            placeholder="$ 500.000"
            step="0.01"
            min="0"
            required
          >
          <small>Mejor sueldo bruto (antes de descuentos)</small>
        </div>

        <div class="form-group">
          <label for="entry-date">
            Fecha de ingreso al trabajo :
          </label>
          <input
            type="date"
            id="entry-date"
            name="entry-date"
            max="${inputDate(today)}"
            required
          >
          <small>Si ingresaste antes del semestre actual, usá el inicio del semestre</small>
        </div>

        <div class="form-group">
          <label for="input-date">
            Fecha de liquidación del aguinaldo :
          </label>
          <input 
            type="date" 
            id="input-date" 
            name="input-date"
            value="${inputDate(calculationDate)}"
            max="${inputDate(new Date(currentYear + 1, 11, 31))}"
            required
          >
          <small>
            Primer semestre: 30/06 | Segundo semestre: 31/12
          </small>
        </div>


        <button type="submit" class="btn-primary">
          Calcular Aguinaldo
        </button>
    </form>
  `
  setTimeout(() => {
    bonusEvents();
  }, 0);
}


function bonusEvents() {
  const form = document.getElementById('form-bonus');
  const bonusAoumntInput = document.getElementById('better-salary');

  bonusAoumntInput.addEventListener('input', (e) => {
    formatAmount(e.target);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateBonusFormData();
  })
}


function calculateBonusFormData() {
  // Obtengo los valores del formulario
  const betterSalary = document.getElementById('better-salary').value;
  const entryDateStr = document.getElementById('entry-date').value;
  const calculationDateStr = document.getElementById('input-date').value;

  const cleanBetterSalary = parseFloat(betterSalary.replace(/\./g, '').replace(',', '.'));

  // Validacion de inputs
  if (!cleanBetterSalary || isNaN(cleanBetterSalary) || cleanBetterSalary <= 0 || !entryDateStr || !calculationDateStr) {
    bonusShowError('Debes completar todos los campos');
    return;
  }

  const [entryYear, entryMonth, entryDay] = entryDateStr.split('-').map(Number);
  const [calcYear, calcMonth, calcDay] = calculationDateStr.split('-').map(Number);

  const entryDate = new Date(entryYear, entryMonth - 1, entryDay);
  const calculationDate = new Date(calcYear, calcMonth - 1, calcDay);

  // Calculamos el aguinaldo
  try {
    const result = calculateBonus(cleanBetterSalary, entryDate, calculationDate);
    showResultBonus(result);
  } catch (error) {
    bonusShowError(error.message);
  }
}

function showResultBonus(result) {
  const divResult = document.getElementById('bonus-result');

  const semesterText = result.semester === 1 ? 'Primero ->' : 'Segundo ->';

  divResult.innerHTML = `
      <div class="calculation-details">
        <h3>Detalles del cálculo</h3>
        
        <div class="detail-group">
          <h4>Datos ingresados</h4>
          <div class="grid-detalles">
            <div class="item-detail">
              <span class="detail-text">Mejor sueldo :</span>
              <span class="value">$${result.betterSalary.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div class="item-detail">
              <span class="detail-text">Fecha de ingreso :</span>
              <span class="value">${formatDate(result.entryDate)}</span>
            </div>
            <div class="item-detail">
              <span class="detail-text">Fecha de cálculo :</span>
              <span class="value">${formatDate(result.dateCalculation)}</span>
            </div>
            <div class="item-detail">
              <span class="detail-text">Semestre :</span>
              <span class="value">${semesterText} (${formatDate(result.startSemester)} al ${formatDate(result.endSemester)})</span>
            </div>
          </div>
        </div>

        <div class="detail-group">
          <h4>Tiempo trabajado</h4>
          <div class="grid-detalles">
            <div class="item-detail">
              <span class="detail-text">Desde :</span>
              <span class="value">${formatDate(result.effectiveStartDate)}</span>
            </div>
            <div class="item-detail">
              <span class="detail-text">Hasta :</span>
              <span class="value">${formatDate(result.dateCalculation)}</span>
            </div>
            <div class="item-detail">
              <span class="detail-text">Período trabajado :</span>
              <span class="value">${result.monthsWorked} ${result.monthsWorked === 1 ? 'mes' : 'meses'} y ${result.daysWorked} ${result.daysWorked === 1 ? 'día' : 'días'}</span>
            </div>
            <div class="item-detail">
              <span class="detail-text">Meses (decimal) :</span>
              <span class="value">${result.monthsWorkedDecimal} meses</span>
            </div>
          </div>
        </div>

        <div class="detail-group math-calculation">
          <h4>Cálculo matemático</h4>
          <div class="math-calculation-text">
            <p>- (Mejor sueldo / 12) * Meses trabajados</p>
            <p>
              - ($ ${result.betterSalary.toLocaleString('es-AR')} / 12) * ${result.monthsWorkedDecimal}
            </p>
            <p>
              - $ ${(result.betterSalary / 12).toLocaleString('es-AR', { maximumFractionDigits: 2 })} * ${result.monthsWorkedDecimal}
            </p>
            <p>
              Aguinaldo = <strong>$ ${result.bonusAmount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</strong>
            </p>
          </div>
        </div>

        <div class="additional-info">
          <p>
            💡 <strong>Recordá:</strong> Este es el monto BRUTO de tu aguinaldo. 
            A este monto se le aplicarán los mismos descuentos que a tu sueldo mensual 
            (jubilación, obra social, etc.).
          </p>
        </div>
      </div>
  `;
}

function bonusShowError(message) {
  const divResult = document.getElementById('bonus-result');
  divResult.innerHTML = `
    <div>
      <p>⚠️ ${message}</p>
    </div>
  `;
}


