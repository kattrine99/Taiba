import { initializeHeader } from './header.js';
import { initializeContactWidget } from './vidjet.js';
import { initFormSwitcher } from './form_approval.js';
import { initializeDropdownMenus } from './footer.js';
import { newsSwiper } from './news.js';
import { partnerSwiper } from './partners.js';

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
    initializeDropdownMenus();
    initFormSwitcher();
    waitForNewsSwiperAndInit();
    waitForPartnersSwiperAndInit();
    waitForYearSliderAndInit();
    initPeopleSwipers();
    initCertificateSwipers();


    const swiperContainer = document.querySelector('.newsSwiper');
    if (swiperContainer && swiperContainer.querySelector('.swiper-slide')) {
        newsSwiper();
    }
    const partnersContainer = document.querySelector('.partnerSwiper');
    if (partnersContainer && partnersContainer.querySelector('.swiper-slide')) {
        partnerSwiper();
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
function waitForPartnersSwiperAndInit() {
    const checkExist = setInterval(() => {
        const swiperEl = document.querySelector('.partnersSwiper');
        const slideEls = document.querySelectorAll('.partnersSwiper .swiper-slide');
        if (swiperEl && slideEls.length > 0) {
            clearInterval(checkExist);
            partnerSwiper();
        }
    }, 100);
}
let Yearswiper;

function waitForYearSliderAndInit() {
    const checkExist = setInterval(() => {
        const swiperEl = document.querySelector('.yearSwiper');
        const slideEls = document.querySelectorAll('.yearSwiper .swiper-slide');
        const timelineBtns = document.querySelectorAll('.timeline-btn');

        const isVisible = swiperEl && swiperEl.offsetWidth > 0;

        if (swiperEl && slideEls.length > 0 && timelineBtns.length > 0 && isVisible) {
            clearInterval(checkExist);
            initializeYearSlider();
        }
    }, 100);
}

function initializeYearSlider() {
    if (Yearswiper) return;

    Yearswiper = new Swiper(".yearSwiper", {
        loop: false,
        speed: 800,
        allowTouchMove: false,
    });

    const buttons = document.querySelectorAll(".timeline-btn");

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            Yearswiper.slideTo(index);
            updateActiveButton(index);
        });
    });

    Yearswiper.on("slideChange", () => {
        updateActiveButton(Yearswiper.realIndex);
    });
    setTimeout(() => {
        Yearswiper.update();
    }, 200);
}

function updateActiveButton(activeIndex) {
    const buttons = document.querySelectorAll(".timeline-btn");
    buttons.forEach((btn, idx) => {
        btn.classList.toggle("active", idx === activeIndex);
    });
}
function initPeopleSwipers() {
    const sections = document.querySelectorAll('.control-section');

    sections.forEach((section) => {
        const swiperContainer = section.querySelector('.peopleSwiper');
        const slides = swiperContainer?.querySelectorAll('.swiper-slide') || [];
        const prevBtn = section.querySelector('.swiper-button-prev-control');
        const nextBtn = section.querySelector('.swiper-button-next-control');

        if (!swiperContainer || slides.length === 0) return;

        const peopleSwiper = new Swiper(swiperContainer, {
            slidesPerView: slides.length <= 3 ? slides.length : 3,
            spaceBetween: 20,
            autoHeight: true,
            allowTouchMove: slides.length >= 3,
            allowSlideNext: slides.length >= 3,
            allowSlidePrev: slides.length >= 3,
            watchOverflow: true,
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                680: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                    allowSlidePrev: slides.length > 2,
                },
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
            },
            on: {
                init: function () {
                    toggleNav(this, slides.length, prevBtn, nextBtn);
                },
                breakpoint: function () {
                    toggleNav(this, slides.length, prevBtn, nextBtn);
                },
            }
        });
    });

    function toggleNav(swiper, totalSlides, prevBtn, nextBtn) {
        const slidesPerView = swiper.slidesPerViewDynamic?.() || swiper.params.slidesPerView;
        if (typeof slidesPerView === 'number' && totalSlides > slidesPerView) {
            prevBtn?.classList.remove('hidden');
            nextBtn?.classList.remove('hidden');
        } else {
            prevBtn?.classList.add('hidden');
            nextBtn?.classList.add('hidden');
        }
    }
}
function initCertificateSwipers() {
    const sections = document.querySelectorAll('.certificates-section');

    sections.forEach((section) => {
        const swiperContainer = section.querySelector('.certificateSwiper');
        const slides = swiperContainer?.querySelectorAll('.swiper-slide') || [];
        const prevBtn = section.querySelector('.swiper-button-prev-certificate');
        const nextBtn = section.querySelector('.swiper-button-next-certificate');

        if (!swiperContainer || slides.length === 0) return;

        const certificateSwiper = new Swiper(swiperContainer, {
            slidesPerView: slides.length <= 4 ? slides.length : 4,
            spaceBetween: 20,
            autoHeight: true,
            allowTouchMove: slides.length >= 4,
            allowSlideNext: slides.length >= 4,
            allowSlidePrev: slides.length >= 4,
            watchOverflow: true,
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            },
            breakpoints: {
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                890: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                680: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
            },
            on: {
                init: function () {
                    toggleNav(this, slides.length, prevBtn, nextBtn);
                },
                breakpoint: function () {
                    toggleNav(this, slides.length, prevBtn, nextBtn);
                },
            }
        });
    });

    function toggleNav(swiper, totalSlides, prevBtn, nextBtn) {
        const slidesPerView = swiper.slidesPerViewDynamic?.() || swiper.params.slidesPerView;
        if (typeof slidesPerView === 'number' && totalSlides > slidesPerView) {
            prevBtn?.classList.remove('hidden');
            nextBtn?.classList.remove('hidden');
        } else {
            prevBtn?.classList.add('hidden');
            nextBtn?.classList.add('hidden');
        }
    }
}




