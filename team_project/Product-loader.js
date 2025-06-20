// js/Product-loader.js

document.addEventListener("DOMContentLoaded", () => {
  window.products = [
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
    {
      name: "Monstera deliciosa",
      category: "houseplants",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1637967885705-a60e3fea266d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Hoya lacunosa",
      category: "houseplants",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1744143495309-60dc0483c879?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Aloe vera",
      category: "houseplants",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1694285617850-fad6e23756fb?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Rosemary",
      category: "houseplants",
      price: 6.99,
      image: "https://t3.ftcdn.net/jpg/12/44/60/04/360_F_1244600427_0pIbPafMvKCdaSi6XO3CFWqoVConrvjy.jpg",
    },
    {
      name: "Philodendron brandiatum",
      category: "houseplants",
      price: 42.99,
      image: "https://images.unsplash.com/photo-1733916291695-069ae5ae4310?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const gallery = document.getElementById("productGallery");
  const cartDropdown = document.getElementById("cart-dropdown");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  const cartItemsContainer = document.getElementById("cart-items");
  let cart = [];

  function renderProducts(filter = "all") {
    gallery.innerHTML = "";
    const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

    filtered.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-row";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <h2>${product.name}</h2>
          <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
          <button onclick='addToCart(${JSON.stringify(product)})'>Add to cart</button>
        </div>
      `;
      gallery.appendChild(card);
    });
  }

  function addToCart(product) {
    cart.push(product);
    updateCart();
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }

  function updateCart() {
    cartItemsContainer.innerHTML = "";
    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">🗑️</button>`;
      cartItemsContainer.appendChild(div);
    });
    cartCount.textContent = cart.length;
    cartTotal.textContent = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  }

  document.querySelectorAll(".category-button").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      renderProducts(btn.dataset.category);
    });
  });

  document.getElementById("cartIcon").addEventListener("mouseenter", () => {
    cartDropdown.style.display = "block";
  });

  document.getElementById("cartIcon").addEventListener("mouseleave", () => {
    cartDropdown.style.display = "none";
  });

  window.viewCart = () => alert("View cart clicked!");
  window.checkout = () => alert("Checkout clicked!");
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;

  renderProducts();
});
