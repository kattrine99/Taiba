import { initializeHeader } from './header.js';
import { initializeContactWidget } from './vidjet.js';
import { initFormSwitcher } from './form_approval.js';
import { initializeDropdownMenus } from './footer.js';

// Вставка HTML с data-include
async function includeHTML(selector) {
    const elements = document.querySelectorAll(selector);
    for (const el of elements) {
        const file = el.getAttribute("data-include");
        const response = await fetch(file);
        const content = await response.text();
        el.innerHTML = content;
    }
}

// Подключение скрипта Яндекс.Карт V3
function loadYandexScript(callback) {
    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/v3/?apikey=a5b8c9ae-3c35-41c3-9738-c3ddfc6327ca&lang=ru_RU";
    script.onload = callback;
    document.head.appendChild(script);
}

// Функция активации карты по клику и деактивации вне карты
function setupMapInteractivity() {
    const map = document.getElementById("map");
    const overlay = document.getElementById("mapOverlay");
    const container = document.getElementById("mapContainer");

    if (!map || !overlay || !container) return;

    overlay.addEventListener("click", () => {
        overlay.style.display = "none";
        map.classList.add("active");
    });

    document.addEventListener("click", (e) => {
        if (!container.contains(e.target)) {
            overlay.style.display = "block";
            map.classList.remove("active");
        }
    });
}

// Основной запуск
document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML("[data-include]");
    initializeHeader();
    initializeContactWidget();
    initFormSwitcher();
    initializeDropdownMenus();

    loadYandexScript(() => {
        ymaps3.ready.then(() => {
            initMap();
            setupMapInteractivity(); // активируем поведение с кликом
        });
    });
});

// Функция инициализации карты
async function initMap() {
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

    const map = new YMap(document.getElementById("map"), {
        location: {
            center: [69.282019, 41.336787],
            zoom: 17,
        }
    });

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());

    const markerElement = document.createElement("div");
    markerElement.innerHTML = `<img src="/images/icons/Placemark.svg" style="width: 80px; height: 86px;" />`;

    const marker = new YMapMarker(
        {
            coordinates: [69.282019, 41.336787],
        },
        markerElement
    );

    map.addChild(marker);
}
