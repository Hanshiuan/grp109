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
  renderCartDropdown();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartCount();
  renderCartDropdown();
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

// Render items inside the mini dropdown
function renderCartDropdown() {
  const dropdown = document.querySelector(".cart-dropdown");
  const container = document.getElementById("cart-items");
  if (!container || !dropdown) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty</p>";
    return;
  }

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "space-between";
    div.style.marginBottom = "0.5em";

    div.innerHTML = `
      <div style="display:flex; align-items:center;">
        <img src="${item.image}" alt="${item.title}" style="width: 40px; height: 40px; object-fit: cover; margin-right: 0.5em; border-radius: 4px;">
        <div>
          <p style="margin:0; font-weight:bold;">${item.title}</p>
          <p style="margin:0;">$${item.price} x ${item.quantity}</p>
        </div>
      </div>
      <button onclick="removeFromCart('${item.id}')" aria-label="Remove item" style="border:none; background:none; cursor:pointer; font-size: 1.2em;">🗑️</button>
    `;
    container.appendChild(div);
  });
}

updateCartCount();
renderCartDropdown();
