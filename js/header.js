// === ВНЕ initializeHeader — глобальные функции ===
function toggleDropdown(button) {
    const dropdown = button?.nextElementSibling;
    const isOpen = dropdown?.classList.contains("show");
    document.querySelectorAll(".services-dropdown").forEach(d => d.classList.remove("show"));
    if (!isOpen && dropdown) dropdown.classList.add("show");
}
window.toggleDropdown = toggleDropdown;

function toggleLangDropdown() {
    document.getElementById("langDropdown")?.classList.toggle("show");
}
window.toggleLangDropdown = toggleLangDropdown;

function toggleMobileMenu() {
    document.getElementById("mobileMenu")?.classList.toggle("show");
    document.getElementById("overlay")?.classList.toggle("show");
}
window.toggleMobileMenu = toggleMobileMenu;

function toggleMobileSubMenu(button) {
    const dropdown = button?.nextElementSibling;
    if (!dropdown) return;

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
window.toggleMobileSubMenu = toggleMobileSubMenu;

function setLanguage(lang) {
    const imgMap = {
        ru: 'images/icons/ru.svg',
        uz: 'images/icons/uz.svg',
        en: 'images/icons/gb.svg'
    };

    const btnImg = document.getElementById('selectedLang');
    if (btnImg) btnImg.src = imgMap[lang];

    document.querySelectorAll('#langDropdown div[data-lang]').forEach(div => {
        const divLang = div.getAttribute('data-lang');
        if (divLang) {
            div.addEventListener('click', () => setLanguage(divLang));
        }
    });

    document.getElementById("langDropdown")?.classList.remove("show");

    document.querySelectorAll('.mobile-menu__langs img').forEach(img => {
        img.classList.remove('active');
    });

    const activeImg = document.querySelector(`.mobile-menu__langs img[data-lang="${lang}"]`);
    if (activeImg) activeImg.classList.add('active');

    localStorage.setItem('selectedLanguage', lang);
}
window.setLanguage = setLanguage;

export function initializeHeader() {
    const savedLang = localStorage.getItem('selectedLanguage') || 'ru';
    setLanguage(savedLang);

    document.querySelectorAll('.services-toggle').forEach(button => {
        button.addEventListener('click', () => toggleDropdown(button));
    });

    document.querySelectorAll('.mobile-menu__langs img').forEach(img => {
        const lang = img.getAttribute('data-lang');
        if (lang) img.addEventListener('click', () => setLanguage(lang));
    });

    // Смена хедера при скролле
    const header = document.querySelector(".site-header");
    if (header) {
        window.addEventListener("scroll", () => {
            header.classList.toggle("scrolled", window.scrollY > 20);
        });
    }

    // Клик вне — закрытие dropdown-ов
    window.addEventListener("click", function (e) {
        if (!e.target.closest(".language-selector")) {
            document.getElementById("langDropdown")?.classList.remove("show");
        }

        if (!e.target.closest(".services-select")) {
            document.querySelectorAll(".services-dropdown").forEach(drop => drop.classList.remove("show"));
        }
    });
}

