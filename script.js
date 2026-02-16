document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    // We might have multiple icons if we have multiple buttons, so we should target them relative to the button or via a common class
    // actually, let's select all icons that should change
    const themeIcons = document.querySelectorAll('.theme-icon-active');
    const body = document.body;

    // Check local storage for preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        updateIcons(currentTheme === 'dark-mode');
    }

    if (themeToggleBtns) {
        themeToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                body.classList.toggle('dark-mode');
                const isDark = body.classList.contains('dark-mode');

                // Save preference
                localStorage.setItem('theme', isDark ? 'dark-mode' : '');

                updateIcons(isDark);
            });
        });
    }

    // Mobile Menu Close Button
    const navbarCollapse = document.getElementById('navbarContent');

    // Use event delegation to handle potential multiple close buttons or dynamic insertion
    document.addEventListener('click', function (e) {
        if (e.target.closest('.mobile-nav-close')) {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                // Check if Bootstrap 5 is available
                if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
                    bsCollapse.hide();
                } else {
                    // Fallback
                    navbarCollapse.classList.remove('show');
                }
            }
        }
    });

    // Prevent body scroll when menu is open
    if (navbarCollapse) {
        navbarCollapse.addEventListener('show.bs.collapse', () => {
            document.body.style.overflow = 'hidden';
        });
        navbarCollapse.addEventListener('hidden.bs.collapse', () => {
            document.body.style.overflow = '';
        });
    }

    function updateIcons(isDark) {
        themeIcons.forEach(icon => {
            if (isDark) {
                icon.classList.remove('bi-moon-stars-fill');
                icon.classList.add('bi-sun-fill');
            } else {
                icon.classList.remove('bi-sun-fill');
                icon.classList.add('bi-moon-stars-fill');
            }
        });
    }

    // Scroll to Top Button Logic
    const scrollToTopBtn = document.createElement("button");
    scrollToTopBtn.id = "scrollToTopBtn";
    scrollToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollToTopBtn.title = "Go to top";
    document.body.appendChild(scrollToTopBtn);

    window.onscroll = function () {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    };

    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
