// cart.js

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCartCount();
  updateCartDropdown();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartCount();
  updateCartDropdown();
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

function updateCartDropdown() {
  const cartItemsContainer = document.getElementById("cart-items");
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
        <img src="${item.image}" alt="${item.title}" style="width: 40px; height: 40px; border-radius: 5px; object-fit: cover;">
        <div style="flex: 1; margin-left: 10px;">
          <p style="margin: 0;"><strong>${item.title}</strong></p>
          <p style="margin: 0;">$${item.price.toFixed(2)} x ${item.quantity}</p>
        </div>
        <button onclick="removeFromCart('${item.id}')" style="background: none; border: none; color: red; font-size: 1.2em; cursor: pointer;">🗑️</button>
      </div>
    `;
    cartItemsContainer.appendChild(div);
  });
}

updateCartCount();
updateCartDropdown();
