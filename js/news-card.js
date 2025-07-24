import { initializeHeader } from './header.js';
import { initializeContactWidget } from './vidjet.js';
import { initFormSwitcher } from './form_approval.js';
import { initializeDropdownMenus } from './footer.js';
import { newsSwiper } from './news.js';
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

    waitForNewsSwiperAndInit();
    initializeDropdownMenus();
    showFAQ();
    smoothScroll();

    const swiperContainer = document.querySelector('.newsSwiper');
    if (swiperContainer && swiperContainer.querySelector('.swiper-slide')) {
        newsSwiper();
    }
});
function waitForNewsSwiperAndInit() {
    const checkExist = setInterval(() => {
        const swiperEl = document.querySelector('.newsSwiper');
        const slideEls = document.querySelectorAll('.newsSwiper .swiper-slide');
        if (swiperEl && slideEls.length > 0) {
            clearInterval(checkExist);
            newsSwiper();
        }
    }, 100);
}