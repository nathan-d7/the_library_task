const rootElement = document.documentElement

export function initTheme() {

  const themeToggleBtn = document.querySelector('.toggle-theme-button')
  if(!themeToggleBtn) return

  const savedTheme = localStorage.getItem('theme') || 'light'
  updateThemeIcon(themeToggleBtn, savedTheme)

  rootElement.setAttribute('data-theme', savedTheme)

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = rootElement.getAttribute('data-theme')
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'

    updateThemeIcon(themeToggleBtn, newTheme)
    rootElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  })

}

function updateThemeIcon(themeToggleBtn, themeIcon) {

  const sunIcon = `
    <svg class="toggle-theme-icon" width="16" height="16" viewBox="0 0 16 16">
      <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
    </svg>
  `
  const moonIcon = `
    <svg class="toggle-theme-icon" width="16" height="16" viewBox="0 0 24 24" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  `

  themeToggleBtn.innerHTML = ''
  themeToggleBtn.innerHTML = themeIcon === 'light' ? moonIcon : sunIcon
}