const products = [

      { id: 1, name: "Daily Essentials Multivitamin", category: "Vitamins", detail: "-----", price: 18.00},

      { id: 2, name: "Gentle Sleep Support", category: "Sleep & calm", detail: "-----", price: 14.50},

      { id: 3, name: "Everyday Vitamin C", category: "Vitamins", detail: "------", price: 12.00},

      { id: 4, name: "Hydrating Face Serum", category: "Personal care", detail: "-----", price: 22.00},

      { id: 5, name: "Nourishing Hand Cream", category: "Personal care", detail: "-----", price: 9.50},

      { id: 6, name: "Omega-3 Softgels", category: "Vitamins", detail: "-----", price: 16.00},

      { id: 7, name: "Daily Immune Support", category: "Vitamins", detail: "-----", price: 15.00},

      { id: 8, name: "Soothing Lip Balm", category: "Personal care", detail: "-----", price: 6.50},

      { id: 9, name: "Ariyan Nath", category: "Personal care", detail: "-----", price: 10.50}

    ];
    const categories = ["All", "Vitamins", "Personal care", "Sleep & calm"];
    const cart = new Map();
    let activeCategory = "All";
    const grid = document.getElementById("productGrid");
    const categoryList = document.getElementById("categoryList");
    const searchInput = document.getElementById("searchInput");
    const toast = document.getElementById("toast");
    let toastTimer;

    function renderCategories() {
      categoryList.innerHTML = categories.map(category =>
        `<button class="category-chip${category === activeCategory ? " active" : ""}" type="button" data-category="${category}" aria-pressed="${category === activeCategory}">${category}</button>`
      ).join("");
    }

    function renderProducts() {
      const query = searchInput.value.trim().toLowerCase();
      const visible = products.filter(product =>
        (activeCategory === "All" || product.category === activeCategory) &&
        `${product.name} ${product.category} ${product.detail}`.toLowerCase().includes(query)
      );
      if (!visible.length) {
        grid.innerHTML = '<div class="empty-state">No products found. Try another search or category.</div>';
        return;
      }
      grid.innerHTML = visible.map(product => `
        <article class="product-card">
          <div class="product-art">
            ${product.badge ? `<span class="badge">${product.badge}</span>` : ""}
            <img class="product-logo" src="PRIME.png" alt="Prime Medicare">
          </div>
          <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3>${product.name}</h3>
            <p>${product.detail}</p>
            <div class="product-bottom">
              <span class="price">$${product.price.toFixed(2)}</span>
            </div>
          </div>
        </article>`).join("");
    }

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
    }

    categoryList.addEventListener("click", event => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      activeCategory = button.dataset.category;
      renderCategories();
      renderProducts();
    });
    grid.addEventListener("click", event => {
      const button = event.target.closest("[data-add]");
      if (!button) return;
      const product = products.find(item => item.id === Number(button.dataset.add));
      if (!product) return;
      cart.set(product.id, (cart.get(product.id) || 0) + 1);
      showToast(`${product.name} added to your cart`);
    });
    searchInput.addEventListener("input", renderProducts);
    document.getElementById("showAll").addEventListener("click", event => {
      event.preventDefault();
      activeCategory = "All";
      searchInput.value = "";
      renderCategories();
      renderProducts();
    });
    document.querySelectorAll("[data-nav-category]").forEach(link => {
      link.addEventListener("click", () => {
        activeCategory = link.dataset.navCategory;
        renderCategories();
        renderProducts();
      });
    });
    renderCategories();
    renderProducts();