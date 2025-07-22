export function initializeContactWidget() {
    const widget = document.querySelector('.connection-container');
    if (!widget) {
        return;
    }

    const mainButton = widget.querySelector('.main_img');
    if (!mainButton) {
        return;
    }

    mainButton.addEventListener('click', () => {
        widget.classList.toggle('open');
    });
}