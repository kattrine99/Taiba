import { initializeHeader } from './header.js';
import { initializeContactWidget } from './vidjet.js';
import { initFormSwitcher } from './form_approval.js';
import { initializeDropdownMenus } from './footer.js';
import { newsSwiper } from './news.js';
import { partnerSwiper } from './partners.js';
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

    // Главный слайдер
    mainSwiper();
    waitForNewsSwiperAndInit();
    waitForPartnersSwiperAndInit();
    initSingleVideo();
    initializeDropdownMenus();
    showFAQ();
    smoothScroll();

    const swiperContainer = document.querySelector('.newsSwiper');
    if (swiperContainer && swiperContainer.querySelector('.swiper-slide')) {
        newsSwiper();
    }
    const partnersContainer = document.querySelector('.partnerSwiper');
    if (partnersContainer && partnersContainer.querySelector('.swiper-slide')) {
        partnerSwiper();
    }
});
// Главный слайдер
function mainSwiper() {
    var mainSwiper = new Swiper(".main-swiper", {
        loop: true,
        speed: 3000,
    });
}

// Видео ютуб
function initSingleVideo() {
    const videoBlock = document.querySelector('.short-aboutUs_video');
    if (!videoBlock) return;

    const videoUrl = videoBlock.dataset.youtubeId;
    const videoId = extractYouTubeID(videoUrl);

    const thumbnail = videoBlock.querySelector('.video-thumbnail');
    const iframe = videoBlock.querySelector('iframe');
    const overlay = videoBlock.querySelector('.video-overlay');
    const playButton = videoBlock.querySelector('.video-play-button');
    const playerContainer = videoBlock.querySelector('.video-player-container');

    if (!videoId || !thumbnail || !iframe) return;

    const highRes = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const fallback = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    const img = new Image();
    img.onload = () => { thumbnail.src = highRes; };
    img.onerror = () => { thumbnail.src = fallback; };
    img.src = highRes;

    playButton.addEventListener('click', () => {
        iframe.src = getEmbedUrl(videoId);
        videoBlock.classList.add('playing');
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) pauseVideo();
    });

    window.addEventListener('scroll', () => {
        const rect = videoBlock.getBoundingClientRect();
        const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
        const percent = (visible / rect.height) * 100;
        if (percent < 10) pauseVideo();
    });

    function pauseVideo() {
        iframe.src = '';
        videoBlock.classList.remove('playing');
    }

    function getEmbedUrl(id) {
        const params = new URLSearchParams({
            autoplay: '1',
            rel: '0',
            modestbranding: '1',
            playsinline: '1',
            enablejsapi: '1',
            fs: '1',
            iv_load_policy: '3',
            showinfo: '0',
            controls: '1',
            disablekb: '0',
            origin: window.location.origin
        });
        return `https://www.youtube.com/embed/${id}?${params.toString()}`;
    }

    function extractYouTubeID(url) {
        const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    }
}

function waitForNewsSwiperAndInit() {
    const checkExist = setInterval(() => {
        const swiperEl = document.querySelector('.newsSwiper');
        const slideEls = document.querySelectorAll('.newsSwiper .swiper-slide');
        if (swiperEl && slideEls.length > 0) {
            clearInterval(checkExist);
            newsSwiper();
            console.log('✅ Swiper инициализирован');
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
            console.log('✅ Swiper инициализирован');
        }
    }, 100);
}
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