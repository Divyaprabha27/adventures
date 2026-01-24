document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Check local storage for preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        updateIcon(currentTheme === 'dark-mode');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Fallback to system preference
        body.classList.add('dark-mode');
        updateIcon(true);
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        
        // Save preference
        localStorage.setItem('theme', isDark ? 'dark-mode' : '');
        
        updateIcon(isDark);
    });

    function updateIcon(isDark) {
        if (isDark) {
            themeIcon.classList.remove('bi-moon-stars-fill');
            themeIcon.classList.add('bi-sun-fill');
        } else {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-stars-fill');
        }
    }
});
