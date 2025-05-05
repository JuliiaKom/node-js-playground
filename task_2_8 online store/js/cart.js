document.addEventListener("DOMContentLoaded", () => {
  const cartWrapper = document.querySelector(".cart-wrapper");
  const cartModal = document.getElementById("cart-modal");
  const cartOverlay = document.getElementById("cart-modal-overlay");
  const closeCartBtn = document.getElementById("close-cart");
  const cartCount = document.getElementById("cart-count");

  // Check the state of the "Add" button after the page loads
  function updateAddButtons() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach(item => {
      const addButton = document.querySelector(`.add-btn[data-id="${item.id}"]`);
      if (addButton) {
        addButton.classList.add("added");
        addButton.disabled = true;
        addButton.innerHTML = `<span class="btn-plus">+</span><span class="btn-add">Added</span>`;
      }
    });
  }

  // Event handlers for icons
  cartWrapper.addEventListener("click", () => {
    cartModal.classList.add("open");
    cartOverlay.classList.add("open");
    updateCartModal();
  });

  closeCartBtn.addEventListener("click", () => {
    cartModal.classList.remove("open");
    cartOverlay.classList.remove("open");
  });

  cartOverlay.addEventListener("click", () => {
    cartModal.classList.remove("open");
    cartOverlay.classList.remove("open");
  });

  // Function to update the modal cart window
  function updateCartModal() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items-container");
    const cartTotal = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = "";
    let total = 0;

    // Add each item to the cart
    cart.forEach(item => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
      
        <div class="cart-item-left">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>$${item.price?.toFixed(2)}</p>
          </div>
        </div>
      
        <div class="cart-item-right">
          <div class="quantity-controls">
              <button class="btn-decrease" data-id="${item.id}">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="btn-increase" data-id="${item.id}">+</button>
          </div>
              <button class="btn-remove" data-id="${item.id}">Remove<span class="btn-remove-span">X</span>
              </button> 
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
      total += item.price * item.quantity;
    });

    // Update the total amount
    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Add event handlers for the "Remove" buttons
    document.querySelectorAll(".btn-remove").forEach(button => {
      button.addEventListener("click", (e) => {
        const button = e.target.closest(".btn-remove");
        const itemId = button?.dataset.id;

        if (itemId) {
          removeFromCart(itemId);
        }
      });
    });

    // Add event handlers for the increase/decrease quantity buttons
    document.querySelectorAll(".btn-decrease").forEach(button => {
      button.addEventListener("click", (e) => {
        const itemId = e.target.dataset.id;
        updateItemQuantity(itemId, -1);
      });
    });

    document.querySelectorAll(".btn-increase").forEach(button => {
      button.addEventListener("click", (e) => {
        const itemId = e.target.dataset.id;
        updateItemQuantity(itemId, 1);
      });
    });
  }

  window.updateCartCount = function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
      cartCount.textContent = totalCount;
      cartCount.classList.toggle("visible", totalCount > 0);
    }
  }

  // Function to update the quantity of goods in the cart
  function updateItemQuantity(itemId, change) {
    let carts = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = carts.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
      carts[itemIndex].quantity += change;
      // If the quantity of the product is less than 1, remove the product from the cart
      if (carts[itemIndex].quantity <= 0) {
        carts.splice(itemIndex, 1);
        removeFromCart(itemId);
        return;
      }

      localStorage.setItem("cart", JSON.stringify(carts));
      updateCartModal();
      updateCartCount();
    }
  }
  // Function to remove an item from the cart
  function removeFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => !(item.id == itemId));
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartModal();
    updateCartCount();

    const addButton = document.querySelector(`.add-btn[data-id="${itemId}"]`);
    if (addButton) {
      addButton.classList.remove("added");
      addButton.disabled = false;
      addButton.innerHTML = `
    <span class="btn-plus">+</span>
    <span class="btn-add">Add</span>
  `;

      addButton.addEventListener("click", () => {
        const item = getItemById(itemId);
        addToCart(item);
        addButton.classList.add("added");
        addButton.disabled = true;
        addButton.innerHTML = ` <s pan class="btn-plus">+</span>
    <span class="btn-add">Add</span>`;
        window.updateCartCount();
      });
    }
  }

  updateCartCount();
  updateAddButtons();
});