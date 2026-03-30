# 💰 Pugliese&Finanzas

Aplicación web de herramientas básicas financieras en Argentina.

🌐 **Demo en vivo:** [https://ivanpugliese1.github.io/pugliese-finance-tools/](https://ivanpugliese1.github.io/pugliese-finance-tools/)

---

## 🛠️ Stack tecnológico

- **HTML5** — estructura semántica de las páginas
- **CSS3** — estilos con variables nativas y organización por componentes
- **JavaScript (ES Modules)** — lógica y manipulación del DOM
- **Vite** — bundler y servidor de desarrollo
- **GitHub Pages** — deploy estático

---

## 🧩 Arquitectura

El proyecto utiliza una **arquitectura en capas** con separación clara de responsabilidades:

| Capa | Carpeta | Responsabilidad |
|------|---------|-----------------|
| Presentación | `pages/` | Estructura HTML de cada página |
| Componentes | `components/` | Generan HTML dinámico y manejan eventos del DOM |
| Servicios | `services/` | Lógica de negocio pura, sin tocar el DOM |
| Utilidades | `utils/` | Funciones genéricas y reutilizables |
| Estilos | `styles/` | CSS organizado por base, componentes y páginas |


---

## 📦 Deploy en GitHub Pages

El proyecto usa `gh-pages` para publicar la carpeta `/dist` generada por Vite.

```bash
# Buildear y deployar en un solo paso
npm run deploy
```

Esto ejecuta `vite build` y luego publica el resultado en la rama `gh-pages` automáticamente.

> ⚙️ El archivo `vite.config.js` tiene configurado `base: '/pugliese-finance-tools/'` necesario para que las rutas funcionen correctamente en GitHub Pages.

---

## 🧮 Herramientas disponibles

### 💵 Dólar hoy y Conversor
Consulta la cotización del dólar en tiempo real a través de la API pública [dolarapi.com](https://dolarapi.com). Muestra todas las cotizaciones (oficial, blue, MEP, CCL, etc.) con variación respecto a la consulta anterior. Incluye un conversor de ARS a USD y viceversa.

### 💼 Calculadora de Sueldo Neto
Calcula el sueldo neto a partir del sueldo bruto aplicando las deducciones obligatorias vigentes:
- Jubilación: 11%
- PAMI: 3%
- Obra Social: 3%
- Sindicato: 2% (opcional)
- Impuesto a las Ganancias: según escalas progresivas con deducción por personas a cargo

### 🎁 Calculadora de Aguinaldo
Calcula el Sueldo Anual Complementario (SAC) en base al mejor sueldo del semestre y los meses trabajados, aplicando la fórmula legal: `(salario / 12) × meses trabajados`.

---

## 📌 Notas

- Los valores de deducciones e impuesto a las ganancias son estimados para 2026 y pueden variar según actualizaciones legales.
- La API de cotizaciones del dólar es externa ([dolarapi.com](https://dolarapi.com)) y puede tener períodos de inactividad.

---

## 👨‍💻 Autor

Desarrollado por [@Ivan Pugliese](https://github.com/ivanpugliese1)
