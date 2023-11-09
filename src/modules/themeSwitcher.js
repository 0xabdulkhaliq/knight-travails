function getCurrentTheme() {
  return localStorage.getItem("knight-travails.theme") === null
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    : localStorage.getItem("knight-travails.theme")
}

function loadTheme(theme) {
  document.querySelector(":root").setAttribute("color-scheme", theme)
}

function setBrowserBarTheme(colorCode) {
  document.querySelector('[name="theme-color"]').content = colorCode
}

function themeSwitch(theme) {
  const themeBtn = document.querySelector(".header__theme-toggle")

  themeBtn.addEventListener("click", (e) => {
    if (theme === "dark") {
      theme = "light"
      e.target.setAttribute("aria-label", theme)
      setBrowserBarTheme("#5a5e87")
    } else {
      theme = "dark"
      e.target.setAttribute("aria-label", theme)
      setBrowserBarTheme("#cacde8")
    }
    localStorage.setItem("knight-travails.theme", `${theme}`)
    loadTheme(theme)
  })
}

function themeSwitchInitializer() {
  window.addEventListener("DOMContentLoaded", () => {
    loadTheme(getCurrentTheme())
  })

  themeSwitch(getCurrentTheme())
}

export { themeSwitchInitializer }
