import { initializeHeader } from './header.js';
import { initializeContactWidget } from './vidjet.js';
import { initFormSwitcher } from './form_approval.js';
import { initializeDropdownMenus } from './footer.js';

const cardsData = Array.from({ length: 24 }, (_, i) => ({
    img: "/images/news-img.webp",
    title: "Об исламском финансировании",
    text: "Исламское финансирование имеет социальную направленность с приоритетом морально-этических принципов... " + i,
    date: "19.05.2025",
}));

async function includeHTML(selector) {
    const elements = document.querySelectorAll(selector);
    for (const el of elements) {
        const file = el.getAttribute("data-include");
        const response = await fetch(file);
        const content = await response.text();
        el.innerHTML = content;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML("[data-include]");

    initializeHeader();
    initializeContactWidget();
    initFormSwitcher();
    waitForCardWrapperAndInit();
    initializeDropdownMenus();

});

function waitForCardWrapperAndInit() {
    const checkInterval = setInterval(() => {
        const wrapper = document.getElementById('cardWrapper');
        const pagination = document.getElementById('paginationControls');
        if (wrapper && pagination) {
            clearInterval(checkInterval);
            shariatCardCreate(cardsData);
        }
    }, 100);
}
function shariatCardCreate(cardsData, cardsPerPage = 9) {
    let currentPage = 1;
    const totalPages = Math.ceil(cardsData.length / cardsPerPage);

    function renderCards(data, container) {
        container.innerHTML = "";

        data.forEach(card => {
            const el = document.createElement("a");
            el.className = "shariat-card";
            el.href = "/news-card.html";
            el.innerHTML = `
            <div class="shariat-card-img"><img src="${card.img}"></div>
                <h4>${card.title}</h4>
                <p>${card.text}</p>
                <div class="shariat-card-footer">
                  <span>${card.date}</span>
                </div>
            `;
            container.appendChild(el);
        });
    }

    function renderPagination(container) {
        container.innerHTML = "";

        const totalPages = Math.ceil(cardsData.length / cardsPerPage);

        const prevBtn = document.createElement("button");
        prevBtn.className = "pagination-prev";
        prevBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        style="transform: rotate(180deg);">
                        <path d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697" stroke="currentColor"
                            stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3.5 12L20.33 12" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>`;
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                updateUI();
            }
        });
        container.appendChild(prevBtn);

        // Вычисление диапазона номеров страниц для показа (максимум 3)
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, startPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement("button");
            pageBtn.textContent = i;
            if (i === currentPage) pageBtn.classList.add("active");
            pageBtn.addEventListener("click", () => {
                currentPage = i;
                updateUI();
            });
            container.appendChild(pageBtn);
        }

        const nextBtn = document.createElement("button");
        nextBtn.className = "pagination-next";
        nextBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697" stroke="currentColor"
                            stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3.5 12L20.33 12" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>`;
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                updateUI();
            }
        });
        container.appendChild(nextBtn);
    }

    function updateUI() {
        const start = (currentPage - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        const paginatedCards = cardsData.slice(start, end);

        const cardsContainer = document.getElementById("cardWrapper");
        const paginationContainer = document.getElementById("paginationControls");

        if (cardsContainer && paginationContainer) {
            renderCards(paginatedCards, cardsContainer);
            renderPagination(paginationContainer);
        }
    }

    updateUI();
}

