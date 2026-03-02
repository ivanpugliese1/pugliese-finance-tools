
/*
 * CALCULADORA DE SUELDO NETO ARGENTINA

 * 1. Bruto → Neto: ingresás tu sueldo bruto y ves cuánto cobrás en mano.

 *
 * La lógica de cálculo vive en netSalaryService.js; este archivo solo se encarga de:
 * - Generar el HTML de la calculadora (formularios, pestañas, sección informativa).
 * - Configurar eventos (submit de formularios, clic en pestañas).
 * - Leer valores de los inputs, llamar al servicio y mostrar resultados en pantalla.
 */

import { calculateNetSalary } from '../services/netSalaryService.js';
import { formatAmount } from '../utils/formatAmount.js';
import { formatCurrency } from '../utils/formatCurrency.js';


export function initNetSalaryCalculator(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container ${containerId} not found`);
    return;
  }

  container.innerHTML = generateGrossNet();

  setTimeout(() => {
    setupGrossToNetForm();
  }, 0);
}

function generateGrossNet() {
  return `
      <form id="form-gross-to-net" class="salary-form">
        <div class="form-group">
          <label for="gross-salary">
            Ingresá tu Sueldo Bruto Mensual
          </label>
          <input
            type="text"
            id="gross-salary"
            name="gross-salary"
            placeholder="$ 500.000"
            step="0.01"
            min="0"
            required
            autocomplete="off"
          >
          <small>Sueldo antes de descuentos</small>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" id="has-union" checked>
            <span class="checkbox-text">
              ¿Estás sindicalizado? 
            </span>
          </label>
          <small>Descuento adicional del 2%</small>
        </div>

        <div class="form-group">
          <label for="dependents">
            Personas a cargo: 
          </label>
          <input 
            type="number" 
            id="dependents" 
            name="dependents"
            value="0" 
            min="0" 
            max="10"
            class="number-input"
          >
          <small>
            Hijos menores de edad y cónyuge (deducen Ganancias)
          </small>
        </div>

        <button type="submit" class="btn-primary">
          Calcular Sueldo Neto
        </button>
      </form>
  `;
}


function setupGrossToNetForm() {
  const form = document.getElementById('form-gross-to-net');
  const grossInput = document.getElementById('gross-salary');

  // ✅ Validación adicional de seguridad
  if (!form) {
    console.error('Formulario no encontrado');
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    processGrossToNetCalculation();
  });

  grossInput.addEventListener('input', (e) => {
    formatAmount(e.target);
  });
}

function processGrossToNetCalculation() {
  const grossSalary = document.getElementById('gross-salary').value;
  const hasUnion = document.getElementById('has-union').checked;
  const dependents = parseInt(document.getElementById('dependents').value);

  const cleanGrossSalary = parseFloat(grossSalary.replace(/\./g, '').replace(',', '.'));

  if (!cleanGrossSalary || cleanGrossSalary <= 0) {
    showError('result-gross-to-net', 'Por favor, ingresá un sueldo bruto válido mayor a cero');
    return;
  }

  try {
    const result = calculateNetSalary(
      cleanGrossSalary,
      hasUnion,
      dependents,
    );

    showGrossToNetResult(result);
  } catch (error) {
    showError('result-gross-to-net', error.message);
  }
}


function showGrossToNetResult(result) {
  const resultContainer = document.getElementById('result-gross-to-net');

  resultContainer.innerHTML = `
    <div class="result-success">
        <div class="salary-flow">
          <div class="flow-item gross">
            <span class="flow-item-title">Sueldo Bruto : </span>
            <span class="amount">$${formatCurrency(result.grossSalary)} / </span>
            <span class="percentage">100%</span>
          </div>

          <div class="flow-item deductions">
            <span class="flow-item-title">Descuentos : </span>
            <span class="amount negative">- $${formatCurrency(result.totalDeductions)} / </span>
            <span class="percentage">${result.deductionsPercentage}%</span>
          </div>

          <div class="flow-item net">
            <span class="flow-item-title">Sueldo Neto : </span>
            <span class="amount highlighted">$${formatCurrency(result.netSalary)} / </span>
            <span class="percentage">${result.netPercentage}%</span>
          </div>
        </div>

      ${generateBreakdown(result)}
    </div>
  `;
}


function generateBreakdown(result) {
  const mandatory = result.mandatoryDeductions;

  return `
    <div class="deductions-breakdown">
      <h3>Detalles sobre los descuentos</h3>

      <div class="deductions-table">
        ${generateDeductionRow('Jubilación : ', mandatory.pension, mandatory.pensionPercentage)}
        ${generateDeductionRow('PAMI : ', mandatory.pami, mandatory.pamiPercentage)}
        ${generateDeductionRow('Obra Social : ', mandatory.healthInsurance, mandatory.healthInsurancePercentage)}
        ${result.hasUnion ? generateDeductionRow('Sindicato : ', mandatory.union, mandatory.unionPercentage) : ''}
        ${generateIncomeTaxRow(result)}
      </div>

      <div class="total-deductions">
        <span class="total-deductions-title">Total descuentos : </span>
        <span class="amount">$${formatCurrency(result.totalDeductions)}</span>
      </div>
    </div>
  `;
}

function generateDeductionRow(name, amount, percentage) {
  return `
    <div class="deduction-row">
      <span class="deduction-name">${name}</span>
      <span class="amount">$${formatCurrency(amount)} / </span>
      <span class="percentage">${percentage}%</span>
    </div>
  `;
}

function generateIncomeTaxRow(result) {
  const incomeTax = result.mandatoryDeductions.incomeTax;

  if (incomeTax === 0) {
    return `
      <div class="deduction-row">
        <span class="deduction-name">Ganancias : </span>
        <span class="percentage">-</span>
        <span class="amount">$0,00</span>
      </div>
      <div class="positive-note">
        <small>✓ No pagás Ganancias (por debajo del mínimo no imponible)</small>
      </div>
    `;
  }

  const detail = result.mandatoryDeductions.incomeTaxDetail;

  return `
    <div class="deduction-row">
      <span class="deduction-name">Ganancias : </span>
      <span class="percentage">Variable</span>
      <span class="amount">$${formatCurrency(incomeTax)}</span>
    </div>
    ${detail ? `
      <div class="income-tax-detail">
        <small>
          Sueldo imponible : $${formatCurrency(detail.taxableSalary)} | 
          Alícuota : ${detail.appliedBracket.rate}%
        </small>
      </div>
    ` : ''}
  `;
}

function showError(containerId, message) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
    <div class="calculation-error entrance-animation">
      <p>⚠️ ${message}</p>
    </div>
  `;
}

