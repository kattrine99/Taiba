
export function newsSwiper() {
    const newsSwiper = new Swiper('.newsSwiper', {

        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        speed: 1000,
        navigation: {
            nextEl: '.swiper-button-next-news',
            prevEl: '.swiper-button-prev-news',
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            560: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
        }
    });
    return newsSwiper;
}