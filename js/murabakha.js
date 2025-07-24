import { initializeHeader } from './header.js';
import { initializeContactWidget } from './vidjet.js';
import { initFormSwitcher } from './form_approval.js';
import { initializeDropdownMenus } from './footer.js';
import { showFAQ } from './faq.js';

async function includeHTML(selector) {
    const elements = document.querySelectorAll(selector);
    for (const el of elements) {
        const file = el.getAttribute("data-include");
        const response = await fetch(file);
        const content = await response.text();
        el.innerHTML = content;
    }
}
//Вызов всех функций с компонентов
document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML("[data-include]");

    initializeHeader();
    initializeContactWidget();
    initFormSwitcher();
    initializeDropdownMenus();
    showFAQ();
    smoothScroll();

});

export function smoothScroll() {
    const requestBtn = document.getElementById("request");

    requestBtn?.addEventListener("click", function (e) {
        e.preventDefault();

        const scrollToForm = () => {
            const target = document.getElementById("form-approval");

            if (target) {
                const yOffset = -300;
                const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({ top: y, behavior: "smooth" });
            } else {
                setTimeout(scrollToForm, 100);
            }
        };

        scrollToForm();
    });
}