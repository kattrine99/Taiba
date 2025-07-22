export function initializeHeader() {
    // Ссылки в селектах для перехода на страницы
    function handleSelect(select) {
        const value = select.value;
        if (value) {
            window.location.href = value;
        }
    }

    // Настройка селекта с картинками флагов
    function toggleLangDropdown() {
        const langDropdown = document.getElementById("langDropdown");
        langDropdown.classList.toggle("show");
    }

    function setLanguage(lang) {
        const imgMap = {
            ru: 'images/icons/ru.svg',
            uz: 'images/icons/uz.svg',
            en: 'images/icons/gb.svg'
        };

        const btnImg = document.getElementById('selectedLang');
        if (btnImg) {
            btnImg.src = imgMap[lang];
        }
        document.querySelectorAll('#langDropdown div[data-lang]').forEach(div => {
            const lang = div.getAttribute('data-lang');
            if (lang) {
                div.addEventListener('click', () => setLanguage(lang));
            }
        });
        const dropdown = document.getElementById("langDropdown");
        if (dropdown) {
            dropdown.classList.remove("show");
        }

        document.querySelectorAll('.mobile-menu__langs img').forEach(img => {
            img.classList.remove('active');
        });

        const activeImg = document.querySelector(`.mobile-menu__langs img[data-lang="${lang}"]`);
        if (activeImg) {
            activeImg.classList.add('active');
        }

        localStorage.setItem('selectedLanguage', lang);
    }

    function toggleDropdown(button) {
        const dropdown = button.nextElementSibling;
        const isOpen = dropdown.classList.contains("show");

        document.querySelectorAll(".services-dropdown").forEach(d => d.classList.remove("show"));
        if (!isOpen) {
            dropdown.classList.add("show");
        }
    }

    function toggleMobileMenu() {
        const menu = document.getElementById("mobileMenu");
        const overlay = document.getElementById("overlay");

        menu.classList.toggle("show");
        overlay.classList.toggle("show");
    }

    function toggleMobileSubMenu(button) {
        const dropdown = button.nextElementSibling;

        if (dropdown.classList.contains('open')) {
            dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
            requestAnimationFrame(() => {
                dropdown.style.maxHeight = '0px';
                dropdown.classList.remove('open');
            });
        } else {
            dropdown.classList.add('open');
            dropdown.style.maxHeight = '0px';
            requestAnimationFrame(() => {
                dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
            });
        }
    }
    // === Привязка событий после загрузки контента === //
    const savedLang = localStorage.getItem('selectedLanguage') || 'ru';
    setLanguage(savedLang);

    document.querySelectorAll('.services-toggle').forEach(button => {
        button.addEventListener('click', () => toggleDropdown(button));
    });

    document.querySelectorAll('.mobile-menu__nav .services-toggle').forEach(button => {
        button.addEventListener('click', () => toggleMobileSubMenu(button));
    });

    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLangDropdown);
    }

    document.querySelectorAll('.mobile-menu__langs img').forEach(img => {
        const lang = img.getAttribute('data-lang');
        if (lang) {
            img.addEventListener('click', () => setLanguage(lang));
        }
    });

    const menuBtn = document.querySelector('.burger');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMobileMenu);
    }

    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleMobileMenu);
    }

    const overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.addEventListener("click", toggleMobileMenu);
    }
    const header = document.querySelector(".site-header");
    if (!header) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
    // Закрытие по клику вне
    window.addEventListener("click", function (e) {
        if (!e.target.closest(".language-selector")) {
            document.getElementById("langDropdown")?.classList.remove("show");
        }

        if (!e.target.closest(".services-select")) {
            document.querySelectorAll(".services-dropdown").forEach(drop => {
                drop.classList.remove("show");
            });
        }
    });
}
