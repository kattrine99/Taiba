/* Выпадание кастомного селекттора в футере */
export function initializeDropdownMenus() {
    function toggleDropdown(button) {
        const dropdown = button.nextElementSibling;
        const isOpen = dropdown.classList.contains("show");

        document.querySelectorAll(".footer-dropdown").forEach(d => d.classList.remove("show"));

        if (!isOpen) {
            dropdown.classList.add("show");
        }
    }

    document.querySelectorAll('.footer-toggle').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown(button);
        });
    });

    window.addEventListener('click', (e) => {
        if (!e.target.closest('.footer-select')) {
            document.querySelectorAll('.footer-dropdown').forEach(drop => drop.classList.remove('show'));
        }
    });
}
