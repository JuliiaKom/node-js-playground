document.addEventListener("DOMContentLoaded", () => {
  const itemsGrid = document.querySelector(".items-grid");
  const searchInput = document.querySelector("#search");
  const searchButton = document.querySelector("#searchButton");
  const topicLinks = document.querySelectorAll(".topic-list a");
  const priceRange = document.querySelector(".price-range");
  const priceValue = document.querySelector(".price-value");
  const loadMoreBtn = document.querySelector(".load-more-btn");

  let allItems = [];
  let currentSearch = "";
  let currentTopic = "All";
  let currentPrice = priceRange.value;

  fetch("data.json")
    .then((res) => {
      if (!res.ok) throw new Error("File not found");
      return res.json();
    })
    .then((data) => {
      allItems = data;
      renderItems(allItems);
      updateSliderBackground();
    })
    .catch((error) => {
      itemsGrid.innerHTML = `<p class="error-message">Data loading error: ${error.message}</p>`;
    });

  // Output of goods
  function renderItems(items) {
    itemsGrid.innerHTML = "";

    if (items.length === 0) {
      itemsGrid.innerHTML = "<p>No products found.</p>";
      return;
    }

    items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "item-card";
      card.innerHTML = `
        <div class="img-wrapper">
          <img src="${item.image}" alt="${item.name}" />
          <button class="add-btn" data-id="${item.id}">
            <span class="btn-plus">+</span>
            <span class="btn-add">Add</span>
          </button>
        </div>
        <div class="item-info">
          <p class="item-name">${item.name}</p>
          <p class="item-price">$${item.price.toFixed(2)}</p>
          <span class="stars">★★★★★</span>
          <p class="item-category">${item.category}</p>
        </div>
      `;
      itemsGrid.appendChild(card);
    });


    // Add an event handler for each "Add" button
    document.querySelectorAll(".add-btn").forEach(button => {
      const itemId = button.dataset.id;

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const isInCart = cart.some(item => item.id === itemId);

      if (isInCart) {
        button.classList.add("added");
        button.disabled = true;
        button.innerHTML = `
        <span class=" btn-added btn-plus">+</span>
            <span class=" btn-added btn-add">Add</span></span>`;
      }

      if (!isInCart) {
        button.addEventListener("click", () => {
          const item = getItemById(itemId);
          addToCart(item);
          button.classList.add("added");
          button.disabled = true;
          button.innerHTML = ` <span class=" btn-added btn-plus">+</span>
            <span class=" btn-added btn-add">Add</span></span>`;
          window.updateCartCount();
        });
      }
    });
  }

  function addToCart(item) {
    let carts = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = carts.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      carts[existingItemIndex].quantity += 1;
    } else {
      carts.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(carts));
    updateCartCount();
  }

  function getItemById(id) {
    return allItems.find(item => item.id == id);
  }

  // Applying filters
  function applyFilters() {

    let filteredItems = [...allItems];

    // Search by name
    if (currentSearch.trim() !== "") {
      filteredItems = filteredItems.filter(item =>
        item.category.toLowerCase().includes(currentSearch)
      );
    }

    // Filter by category
    if (currentTopic !== "All") {
      filteredItems = filteredItems.filter(item =>
        item.category === currentTopic
      );
    }

    // Filter by price
    if (!isNaN(currentPrice) && currentPrice !== "") {
      filteredItems = filteredItems.filter(item =>
        item.price <= currentPrice
      );
    }

    renderItems(filteredItems);
  }

  function updateSliderBackground() {
    const min = +priceRange.min;
    const max = +priceRange.max;
    const val = +priceRange.value;
    const percent = ((val - min) / (max - min)) * 100;

    priceRange.style.background = `linear-gradient(to right,
      rgba(204, 85, 32, 1) 0%,
      rgba(204, 85, 32, 1) ${percent}%,
      #ddd ${percent}%,
      #ddd 100%)`;
  }

  // Search
  searchInput.addEventListener("input", () => {
    currentSearch = searchInput.value.trim().toLowerCase();
    applyFilters();
  });

  searchButton.addEventListener("click", () => {
    currentSearch = searchInput.value.trim().toLowerCase();
    applyFilters();
  });

  // Filter by topic
  topicLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      currentTopic = link.dataset.filter;
      applyFilters();
    });
  });

  // Filter by price
  priceRange.addEventListener("input", () => {
    currentPrice = priceRange.value;
    priceValue.textContent = `Value: $${currentPrice}`;
    updateSliderBackground();
    applyFilters();
  });

  // When clicking on "All foxes"
  loadMoreBtn.addEventListener("click", () => {

    currentSearch = "";
    currentTopic = "All";
    currentPrice = priceRange.max;

    searchInput.value = "";
    priceRange.value = priceRange.max;
    priceValue.textContent = `Value: $${priceRange.max}`;

    updateSliderBackground();
    renderItems(allItems);
  });
});
