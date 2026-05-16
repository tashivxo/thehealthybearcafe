(function () {
  const CART_KEY = "thbc_cart_v1";
  const ORDER_KEY = "thbc_last_order_v1";

  function loadJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  }

  function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function loadCart() {
    return loadJson(CART_KEY, {});
  }

  function saveCart(cart) {
    saveJson(CART_KEY, cart);
  }

  function loadOrder() {
    return loadJson(ORDER_KEY, null);
  }

  function saveOrder(order) {
    saveJson(ORDER_KEY, order);
  }

  function getCartItems() {
    return Object.values(loadCart());
  }

  function getCartSummary() {
    return getCartItems().reduce(
      (summary, item) => {
        summary.count += item.qty;
        summary.total += item.qty * item.price;
        return summary;
      },
      { count: 0, total: 0 }
    );
  }

  function formatRand(amount, precise) {
    const value = Number(amount) || 0;
    if (precise) {
      return `R${value.toFixed(2)}`;
    }

    return Number.isInteger(value) ? `R${value}` : `R${value.toFixed(2)}`;
  }

  function addToCart(item) {
    const cart = loadCart();
    if (cart[item.id]) {
      cart[item.id].qty += 1;
    } else {
      cart[item.id] = { ...item, qty: 1 };
    }

    saveCart(cart);
    updateMenuChrome();
    showToast(`${item.name} added to cart`);
  }

  function clearCart() {
    localStorage.removeItem(CART_KEY);
  }

  function updateMenuChrome() {
    const summary = getCartSummary();
    const countLabel = document.getElementById("cart-count-label");
    const totalLabel = document.getElementById("cart-total-label");
    const cartBar = document.getElementById("cart-bar");
    const checkoutButton = document.querySelector('[data-action="checkout"]');

    if (countLabel) {
      countLabel.textContent = `Cart (${summary.count} item${summary.count === 1 ? "" : "s"})`;
    }

    if (totalLabel) {
      totalLabel.textContent = formatRand(summary.total, false);
    }

    if (cartBar) {
      cartBar.style.display = summary.count ? "block" : "none";
    }

    if (checkoutButton) {
      checkoutButton.disabled = summary.count === 0;
    }
  }

  function renderCheckout() {
    const items = getCartItems();
    const summaryCard = document.getElementById("order-summary-card");
    const totalLabel = document.getElementById("checkout-total");
    const placeOrderButton = document.querySelector('[data-action="place-order"]');

    if (!summaryCard || !totalLabel || !placeOrderButton) {
      return;
    }

    const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);

    if (!items.length) {
      summaryCard.innerHTML = `
        <div class="rounded-xl bg-surface-container p-md text-body-lg font-body-lg text-on-surface-variant">
          Your cart is empty. Add something from the menu before checking out.
        </div>`;
      totalLabel.textContent = formatRand(0, true);
      placeOrderButton.disabled = true;
      return;
    }

    summaryCard.innerHTML = `
      ${items
        .map(
          (item, index) => `
        <div class="flex justify-between items-center py-2 ${index < items.length - 1 ? "border-b border-surface-variant" : ""}">
          <div class="flex flex-col">
            <span class="text-body-lg font-body-lg text-on-surface">${item.qty}x ${item.name}</span>
          </div>
          <span class="text-label-bold font-label-bold text-primary">${formatRand(item.qty * item.price, true)}</span>
        </div>`
        )
        .join("")}
      <div class="flex justify-between items-center pt-2 mt-2 border-t border-surface-variant">
        <span class="text-headline-sm font-headline-sm text-on-surface">Subtotal</span>
        <span class="text-headline-sm font-headline-sm text-primary">${formatRand(subtotal, true)}</span>
      </div>`;

    totalLabel.textContent = formatRand(subtotal, true);
    placeOrderButton.disabled = false;
  }

  function createOrder() {
    const items = getCartItems();
    if (!items.length) {
      return null;
    }

    const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);
    const orderNumber = `#HB-${String(Date.now()).slice(-4)}`;
    const order = {
      orderNumber,
      etaMinutes: 15,
      total,
      createdAt: new Date().toISOString(),
      items
    };

    saveOrder(order);
    clearCart();
    return order;
  }

  function renderOrderStatus() {
    const order = loadOrder();
    const orderNumber = document.getElementById("order-number");
    const pickupEta = document.getElementById("pickup-eta");
    const orderSummary = document.getElementById("order-summary-text");

    if (!order) {
      if (orderSummary) {
        orderSummary.textContent = "No active order found. Start from the menu to place one.";
      }
      return;
    }

    if (orderNumber) {
      orderNumber.textContent = order.orderNumber;
    }

    if (pickupEta) {
      pickupEta.textContent = `${order.etaMinutes} mins`;
    }

    if (orderSummary) {
      const itemCount = order.items.reduce((sum, item) => sum + item.qty, 0);
      orderSummary.textContent = `${itemCount} item${itemCount === 1 ? "" : "s"} confirmed. Total ${formatRand(order.total, true)}.`;
    }
  }

  function showToast(message) {
    const toast = document.getElementById("app-toast");
    if (!toast) {
      return;
    }

    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.transform = "translate(-50%, 0)";

    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translate(-50%, 8px)";
    }, 1800);
  }

  function handleFilterClick(button) {
    const filter = button.dataset.filter;
    const group = button.closest("[data-filter-group]");
    if (!group || !filter) {
      return;
    }

    group.querySelectorAll("[data-filter]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("bg-on-surface", active);
      item.classList.toggle("text-surface", active);
      item.classList.toggle("bg-surface-container", !active);
      item.classList.toggle("text-on-surface-variant", !active);
      item.classList.toggle("border", !active);
      item.classList.toggle("border-outline-variant", !active);
    });

    document.querySelectorAll("[data-categories]").forEach((card) => {
      const categories = (card.dataset.categories || "").split(" ");
      const show = filter === "all" || categories.includes(filter);
      card.style.display = show ? "" : "none";
    });
  }

  function handleActionClick(actionable) {
    const action = actionable.dataset.action;

    if (action === "add-to-cart") {
      addToCart({
        id: actionable.dataset.id,
        name: actionable.dataset.name,
        price: Number(actionable.dataset.price)
      });
      return;
    }

    if (action === "checkout") {
      if (!getCartSummary().count) {
        return;
      }
      window.location.href = actionable.dataset.href;
      return;
    }

    if (action === "navigate") {
      window.location.href = actionable.dataset.href;
      return;
    }

    if (action === "go-back") {
      if (window.history.length > 1) {
        window.history.back();
      } else if (actionable.dataset.fallback) {
        window.location.href = actionable.dataset.fallback;
      }
      return;
    }

    if (action === "place-order") {
      const order = createOrder();
      if (order) {
        window.location.href = actionable.dataset.href;
      }
      return;
    }
  }

  document.addEventListener("click", (event) => {
    const filterButton = event.target.closest("[data-filter]");
    if (filterButton) {
      handleFilterClick(filterButton);
      return;
    }

    const actionable = event.target.closest("[data-action]");
    if (actionable) {
      handleActionClick(actionable);
    }
  });

  function initPage() {
    const page = document.body.dataset.page;
    if (page === "menu-grid" || page === "menu-list") {
      updateMenuChrome();
    }

    if (page === "checkout") {
      renderCheckout();
    }

    if (page === "order-status") {
      renderOrderStatus();
    }
  }

  initPage();
})();