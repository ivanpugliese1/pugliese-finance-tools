export function darkTheme() {
  const themeBtn = document.getElementById("theme-toggle");
  const selectors = document.querySelectorAll("[data-dark]");
  let moon = "🌙";
  let sun = "☀️";

  themeBtn.addEventListener("click", () => {
    if (themeBtn.textContent === moon) {
      selectors.forEach((el) => el.classList.add("dark-mode"));
      themeBtn.textContent = sun;
    } else {
      selectors.forEach((el) => el.classList.remove("dark-mode"));
      themeBtn.textContent = moon;
    }
  }
  )
};
