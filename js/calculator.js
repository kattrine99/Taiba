export function initCalculator() {
    const toggleBtn = document.getElementById('calculatortoggleDetailsBtn');
    const detailsBlock = document.getElementById('details');
    const btnText = toggleBtn.querySelector('.btn-text');
    const btnIcon = toggleBtn.querySelector('#btnIcon svg');

    let isOpen = false;

    toggleBtn.addEventListener('click', () => {
        isOpen = !isOpen;

        detailsBlock.style.display = isOpen ? 'block' : 'none';
        btnText.textContent = isOpen ? 'Скрыть расчет' : 'Получить детальный расчет';
        btnIcon.classList.toggle('rotate-up', isOpen);
    });

}