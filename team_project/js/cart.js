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
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartCount() {
  const countEl = document.getElementById("cartCount");
  if (countEl) {
    countEl.textContent = getCartCount();
  }
}

function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartItemsContainer.innerHTML = ""; // Clear current items

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <span>${item.name} x ${item.quantity}</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
      <button aria-label="Remove ${item.name}" data-id="${item.id}">&times;</button>
    `;

    const btn = div.querySelector("button");
    btn.addEventListener("click", () => {
      removeFromCart(item.id);
    });

    cartItemsContainer.appendChild(div);
  });
}

function setupCartToggle() {
  const cartButton = document.querySelector(".cart");
  const cartDropdown = document.querySelector(".cart-dropdown");

  if (!cartButton || !cartDropdown) return;

  // Toggle dropdown on click
  cartButton.addEventListener("click", () => {
    const visible = cartDropdown.style.display === "flex";
    cartDropdown.style.display = visible ? "none" : "flex";
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!cartButton.contains(e.target) && !cartDropdown.contains(e.target)) {
      cartDropdown.style.display = "none";
    }
  });
}

// Initialize everything on DOM load
document.addEventListener("DOMContentLoaded", () => {
  renderCartItems();
  updateCartCount();
  setupCartToggle();

  // Add to Cart button handlers
  document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      const product = {
        id: button.getAttribute("data-id"),
        name: button.getAttribute("data-name"),
        price: parseFloat(button.getAttribute("data-price")),
      };
      addToCart(product);
    });
  });

  // View Cart and Checkout button placeholders
  document.getElementById("viewCartBtn")?.addEventListener("click", () => {
    alert("View Cart clicked. Implement navigation.");
  });
  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    alert("Checkout clicked. Implement navigation.");
  });
});
