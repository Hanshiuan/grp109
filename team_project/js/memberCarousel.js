// Carousel 1 JS logic
let currentSlide1 = 0;
let slides1;
let slideInterval1;

function showSlide1(index) {
    slides1.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
    });
}

function nextSlide1() {
    currentSlide1 = (currentSlide1 + 1) % slides1.length;
    showSlide1(currentSlide1);
    resetSlideInterval1();
}

function previousSlide1() {
    currentSlide1 = (currentSlide1 - 1 + slides1.length) % slides1.length;
    showSlide1(currentSlide1);
    resetSlideInterval1();
}

function resetSlideInterval1() {
    clearInterval(slideInterval1);
    slideInterval1 = setInterval(nextSlide1, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
    slides1 = document.querySelectorAll(".slide1");
    if (slides1.length > 0) {
        showSlide1(currentSlide1);
        slideInterval1 = setInterval(nextSlide1, 3000);
    }
});
