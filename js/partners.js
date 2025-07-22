export function partnerSwiper() {
    var partnersSwiper = new Swiper(".partnersSwiper", {
        slidesPerView: 'auto',
        spaceBetween: 20,
        speed: 3000,
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false
        },
        breakpoints: {
            1024:
            {
                slidesPerView: 4,
                spaceBetween: 20
            },
            720:
            {
                slidesPerView: 3,
                spaceBetween: 15
            },
            580:
            {
                slidesPerView: 2,
                spaceBetween: 10
            },
        }
    });
    return partnersSwiper;
}