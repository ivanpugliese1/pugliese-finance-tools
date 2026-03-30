import { renderPrices } from "./components/DollarPrices.js";
import { renderConversor } from "./components/CurrencyConverter.js";
import { initializeBonusCalculator } from "./components/BonusCalculator.js";
import { initNetSalaryCalculator } from "./components/NetSalaryCalculator.js";
import { initDarkTheme } from "./utils/darkTheme.js";


// ********************** MENU TOGGLE ********************** //
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const menuNav = document.querySelector('nav');
const overlay = document.createElement('div');
overlay.className = 'menu-overlay';
document.body.appendChild(overlay);

function toggleMenu() {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true'; abierto.

    menuToggle.setAttribute('aria-expanded', !isExpanded);

  menuNav.classList.toggle('is-open');

  overlay.classList.toggle('is-active');


  if (!isExpanded) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

if (menuToggle) {
  menuToggle.addEventListener('click', toggleMenu);

  menuToggle.addEventListener('touchend', (e) => {
    e.preventDefault();
    toggleMenu();
  }, { passive: false });
}



if (menuNav) {
  const navLinks = menuNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuToggle.getAttribute('aria-expanded') === 'true') {
        toggleMenu();
      }
    })
  })
}

overlay.addEventListener('click', () => {
  menuNav.classList.remove('is-open');
  overlay.classList.remove('is-active');
  menuToggle.setAttribute('aria-expanded', 'false');
});


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

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    toggleMenu();
  }
});


initDarkTheme();


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