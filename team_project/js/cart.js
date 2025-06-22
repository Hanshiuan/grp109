// cart.js

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  renderCartItems();
  updateCartCount();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCartItems();
  updateCartCount();
}

function getCartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartCount() {
  const countEl = document.getElementById("cartCount");
  if (countEl) {
    countEl.textContent = getCartCount();
  }
}

// Render cart items inside dropdown
function renderCartItems() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  container.innerHTML = ""; // Clear previous

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <span>${item.name} x ${item.quantity}</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
      <button class="remove-btn" aria-label="Remove ${item.name} from cart" data-id="${item.id}">&times;</button>
    `;

    container.appendChild(itemDiv);
  });

  // Add event listeners for remove buttons
  container.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      removeFromCart(id);
    });
  });
}

// Initialize cart UI on page load
document.addEventListener("DOMContentLoaded", () => {
  renderCartItems();
  updateCartCount();

  // Optional: Toggle cart dropdown on cart hover or click
  const cartEl = document.querySelector(".cart");
  const dropdown = cartEl.querySelector(".cart-dropdown");
  cartEl.addEventListener("mouseenter", () => {
    dropdown.style.display = "block";
  });
  cartEl.addEventListener("mouseleave", () => {
    dropdown.style.display = "none";
  });
});
