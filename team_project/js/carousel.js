const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel-button.right");
const prevButton = document.querySelector(".carousel-button.left");

let currentSlideIndex = 0;

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
}

nextButton.addEventListener("click", () => {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  updateCarousel();
});

prevButton.addEventListener("click", () => {
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

window.addEventListener("resize", updateCarousel);
