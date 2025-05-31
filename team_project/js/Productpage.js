//Add to Cart number

const quantityEl = document.getElementById('quantity');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');

let quantity = 1;

increaseBtn.addEventListener('click', () => {
  quantity++;
  quantityEl.textContent = quantity;
});

decreaseBtn.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    quantityEl.textContent = quantity;
  }
});
