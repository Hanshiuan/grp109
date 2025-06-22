const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel-button.right");
const prevButton = document.querySelector(".carousel-button.left");

let currentSlideIndex = 0;

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;

  // Update active slide class for accessibility or styling
  slides.forEach(slide => slide.classList.remove("current-slide"));
  slides[currentSlideIndex].classList.add("current-slide");
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

// Optional: Touch swipe support for mobile users
let startX = 0;
track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    nextButton.click();
  } else if (endX - startX > 50) {
    prevButton.click();
  }
});

updateCarousel(); // Initialize
