// ✅ STEP 2: Handle category filtering and cart logic

// Ensure the DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      name: "Ocean Forest potting soil",
      category: "plantcare",
      price: 16.99,
      image: "images/products/foxfarmsoil.jpg",
    },
    {
      name: "Potting tarp",
      category: "plantcare",
      price: 22.0,
      image: "https://rt1home.com/cdn/shop/products/potting-tarp-856633_2048x2048.png?v=1637244629",
    },
    {
      name: "Comfort grip hand trowel",
      category: "supplies",
      price: 9.68,
      image: "https://coronatools.com/cdn/shop/files/8e721ee1526d72cd934b772161de1d99d18fb1a6.jpg?v=1747368389&width=580",
    },
    {
      name: "Rooting powder",
      category: "plantcare",
      price: 6.99,
      image: "images/products/rootingpowder.jpg",
    },
    {
      name: "Osmocote slow release fertilizer",
      category: "plantcare",
      price: 8.99,
      image: "images/products/osmocote.jpg",
    },
    // Add your houseplants and pottery items too
  ];

  const gallery = document.getElementById("productGallery");
  const categoryButtons = document.querySelectorAll(".category-button");
  const cart = [];

  function displayProducts(filteredProducts) {
    gallery.innerHTML = "";
    filteredProducts.forEach((product, index) => {
      const productCard = document.createElement("div");
      productCard.className = "product-row";
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <h2>${product.name}</h2>
          <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
          <button onclick="addToCart(${index})">Add to cart</button>
        </div>
      `;
      gallery.appendChild(productCard);
    });
  }

  window.addToCart = function (index) {
    cart.push(products[index]);
    updateCart();
  };

  function updateCart() {
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    const cartItems = document.getElementById("cart-items");
    let total = 0;

    cartItems.innerHTML = "";
    cart.forEach((item, idx) => {
      total += item.price;
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <p>${item.name} - $${item.price.toFixed(2)}</p>
        <button onclick="removeFromCart(${idx})">🗑️</button>
      `;
      cartItems.appendChild(itemDiv);
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = total.toFixed(2);
  }

  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    updateCart();
  };

  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-category");
      if (cat === "all") {
        displayProducts(products);
      } else {
        displayProducts(products.filter((p) => p.category === cat));
      }
    });
  });

  // Hover effect for cart icon to toggle dropdown
  const cartIcon = document.getElementById("cartIcon");
  const dropdown = document.getElementById("cart-dropdown");
  cartIcon.addEventListener("mouseover", () => (dropdown.style.display = "block"));
  cartIcon.addEventListener("mouseleave", () => (dropdown.style.display = "none"));

  window.viewCart = function () {
    alert("You clicked View. Functionality coming soon!");
  };

  window.checkout = function () {
    alert("You clicked Checkout. Functionality coming soon!");
  };

  // Initial render
  displayProducts(products);
});
document.addEventListener("DOMContentLoaded", () => {
  const productGallery = document.getElementById("productGallery");
  const categoryButtons = document.querySelectorAll(".category-button");
  const cartCount = document.getElementById("cart-count");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  let cart = [];

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      const allCards = document.querySelectorAll(".product-card");
      allCards.forEach(card => {
        const match = category === "all" || card.dataset.category === category;
        card.style.display = match ? "block" : "none";
      });
    });
  });

  window.addToCart = (productName, price) => {
    cart.push({ productName, price });
    updateCart();
  };

  function updateCart() {
    cartCount.textContent = cart.length;
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.innerHTML = `
        ${item.productName} - $${item.price.toFixed(2)}
        <span style="float:right; cursor:pointer;" onclick="removeFromCart(${index})">🗑️</span>
      `;
      cartItemsContainer.appendChild(div);
      total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
  }

  window.removeFromCart = index => {
    cart.splice(index, 1);
    updateCart();
  };

  window.viewCart = () => {
    alert("🛍️ View Cart:\n" + cart.map(item => `${item.productName} - $${item.price}`).join("\n"));
  };

  window.checkout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
    } else {
      alert("✅ Checkout complete!\nTotal: $" + cart.reduce((sum, item) => sum + item.price, 0).toFixed(2));
      cart = [];
      updateCart();
    }
  };
});
