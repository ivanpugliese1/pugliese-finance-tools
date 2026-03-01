import { renderPrices } from "./components/dollarPrices.js";
import { renderConversor } from "./components/currencyConverter.js";
import { initializeBonusCalculator } from "./components/calculateBonus.js";
import { initNetSalaryCalculator } from "./components/calculateNetSalary.js";
import { darkTheme } from "./components/darkTheme.js";


// ********************** MENU TOGGLE ********************** //
const header = document.querySelector('header'); // Traigo el header completo.
const menuToggle = document.querySelector('.menu-toggle'); // Traigo el botón que abre y cierra el menu de navegación.
const menuNav = document.querySelector('nav'); // Traigo el elemento de navegación con sus respectivos links.
const overlay = document.createElement('div');
overlay.className = 'menu-overlay';
document.body.appendChild(overlay);

function toggleMenu() {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true'; // Valor del atributo aria-expanded si el menu esta abierto.

  menuToggle.setAttribute('aria-expanded', !isExpanded); // Actualizo el valor del atributo aria-expanded.

  menuNav.classList.toggle('is-open'); // Alterno la clase is-open en el elemento de navegación.

  overlay.classList.toggle('is-active');


  if (!isExpanded) {
    document.body.style.overflow = 'hidden'; // Desactivo el scroll del body cuando el menu está abierto.
  } else {
    document.body.style.overflow = ''; // Reactivo el scroll del body cuando el menu está cerrado.
  }
}

if (menuToggle) {
  // Click para desktop
  menuToggle.addEventListener('click', toggleMenu);

  // Touch para móvil - CRÍTICO
  menuToggle.addEventListener('touchend', (e) => {
    e.preventDefault();
    toggleMenu();
  }, { passive: false });
}



if (menuNav) {
  const navLinks = menuNav.querySelectorAll('a'); // Traigo todos los links dentro del nav.
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuToggle.getAttribute('aria-expanded') === 'true') {
        toggleMenu(); // Cierro el menú si está abierto al hacer click en un link.
      }
    })
  })
}

// Cerrar al hacer click en el overlay
overlay.addEventListener('click', () => {
  menuNav.classList.remove('is-open');
  overlay.classList.remove('is-active');
  menuToggle.setAttribute('aria-expanded', 'false');
});


// Cierro el menú al hacer click fuera de él.
document.addEventListener("click", (e) => {
  if (
    header &&
    header.classList.contains("menu-open") &&
    !menuNav.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    toggleMenu();
  }
});

// Cerrar el menú al presionar la tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    toggleMenu();
  }
});

const themeBtn = document.getElementById("theme-toggle");
darkTheme(themeBtn, "dark-mode");


// ********************** RENDER DOLLAR PRICES ********************** //
const pricesSection = document.getElementById('prices-section');

if (pricesSection) {
  pricesSection.innerHTML = `
    <article id="prices-section-container" class="prices-section-container width-page"></article>
  `;
  setTimeout(() => {
    renderPrices('prices-section-container');
  }, 0);
}

const conversionForm = document.getElementById('conversion-form');
if (conversionForm) {
  renderConversor('conversion-form');
}

const calculadoraBonus = document.getElementById('calculateBonus');
if (calculadoraBonus) {
  initializeBonusCalculator('calculateBonus');
}

const netSalaryCalculator = document.getElementById('net-salary-calculator-container');
if (netSalaryCalculator) {
  initNetSalaryCalculator('net-salary-calculator-container');
}