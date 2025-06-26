let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
}

// HTML uses this to go to next slide when button is clicked
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// HTML uses this to go to previous slide when button is clicked
function previousSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Resets the timer when the slides are manually changed to next/previous slides
function resetSlideInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
  slides = document.querySelectorAll(".slides");
  showSlide(currentSlide);
  setInterval(nextSlide, 3000); // Change slide every 3 seconds
});

