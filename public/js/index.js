const navbar = document.querySelector('.navbar');
const toggleButton = document.querySelector('.navbar-toggle');

toggleButton.addEventListener('click', () => {
    navbar.classList.toggle('active');
})


const themeToggleButton = document.querySelector('.theme-toggle');
const themeIcon = themeToggleButton.querySelector('i');

themeToggleButton.addEventListener('click', async () => {

    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    themeIcon.className = `bi ${newTheme === 'light' ? 'bi-moon-fill' : 'bi-sun-fill'}`;

    await fetch('/set-theme', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ theme: newTheme })
    });
});
