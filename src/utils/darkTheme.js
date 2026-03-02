// utils/darkTheme.js - versión correcta
export function initDarkTheme() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  // Recuperamos la preferencia guardada (o la del sistema operativo)
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

  if (isDark) {
    document.documentElement.classList.add('dark-mode');
  }

  updateButtonIcon(themeBtn, isDark);

  themeBtn.addEventListener('click', () => {
    const isCurrentlyDark = document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('theme', isCurrentlyDark ? 'dark' : 'light');
    updateButtonIcon(themeBtn, isCurrentlyDark);
  });
}

function updateButtonIcon(btn, isDark) {
  const lightIcon = btn.querySelector('.light-theme-icon');
  const darkIcon = btn.querySelector('.dark-theme-icon');

  if (lightIcon && darkIcon) {
    // páginas con SVG (bonus, dollar, salary)
    lightIcon.style.display = isDark ? 'none' : 'block';
    darkIcon.style.display = isDark ? 'block' : 'none';
  } else {
    // index.html que usa emoji
    btn.textContent = isDark ? '☀️' : '🌙';
  }
}