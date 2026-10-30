// ---- DARK MODE TOGGLE ----
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;

function updateThemeButton() {
    const isDark = htmlElement.classList.contains('dark');
    darkModeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

// Sync button label on load
updateThemeButton();

darkModeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    updateThemeButton();
    // Save preference to local storage
    const isDark = htmlElement.classList.contains('dark');
    localStorage.setItem('scentlab-theme', isDark ? 'dark' : 'light');
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();