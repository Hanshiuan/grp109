let currentSlide = 0;
let slides;
let countdownInterval;
let countdownSeconds = 3;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
  startCountdown(); // Restart countdown with new slide
}

function previousSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
  startCountdown(); // Restart countdown with new slide
}

function startCountdown() {
  clearInterval(countdownInterval); // Clear any previous countdown

  let countdown = countdownSeconds;
  const countdownElement = document.getElementById("carousel-countdown");
  countdownElement.textContent = countdown;

  countdownInterval = setInterval(() => {
    countdown -= 1;

    if (countdown > 0) {
      countdownElement.textContent = countdown;
    } else {
      clearInterval(countdownInterval);
      nextSlide(); // Slide change happens here
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  slides = document.querySelectorAll(".slides");
  showSlide(currentSlide);
  startCountdown(); // Start initial countdown
});
