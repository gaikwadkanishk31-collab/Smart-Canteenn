/**
 * Smart Canteen Management System - Master App Controller & Router
 */

const App = (function() {
  const routes = {
    '': LandingView,
    '#/': LandingView,
    '#/menu': MenuView,
    '#/tracker': TrackerView,
    '#/history': HistoryView,
    '#/profile': ProfileView,
    '#/kitchen': KitchenView,
    '#/admin/dashboard': AdminDashView,
    '#/admin/menu': AdminMenuView,
    '#/admin/orders': AdminOrdersView,
    '#/admin/reports': AdminReportsView
  };

  function init() {
    window.addEventListener('hashchange', handleRoute);
    Store.subscribe(renderUIState);

    // Initial render
    handleRoute();
    renderUIState();
  }

  function handleRoute() {
    const fullHash = window.location.hash || '#/';
    const [path, queryString] = fullHash.split('?');
    const queryParams = {};

    if (queryString) {
      new URLSearchParams(queryString).forEach((val, key) => {
        queryParams[key] = val;
      });
    }

    const container = document.getElementById('app-viewport');
    if (!container) return;

    const user = Store.getCurrentUser();
    const userRole = user ? user.role : 'guest';

    // Route Protection
    if (path.startsWith('#/admin') && userRole !== 'admin') {
      Toast.warning('Access restricted to Canteen Administrators.');
      window.location.hash = '#/';
      return;
    }
    if (path === '#/kitchen' && !['kitchen', 'admin'].includes(userRole)) {
      Toast.warning('Access restricted to Kitchen Staff.');
      window.location.hash = '#/';
      return;
    }

    const view = routes[path] || LandingView;
    
    // Pass queryParams or specific ID if on tracker
    if (path === '#/tracker') {
      view.render(container, queryParams.id);
    } else {
      view.render(container, queryParams);
    }

    renderNavLinks(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function navigateTo(hash) {
    window.location.hash = hash;
  }

  function renderUIState() {
    const user = Store.getCurrentUser();
    const totals = Store.getCartTotals();

    // 1. Role Label
    const roleLabel = document.getElementById('current-role-label');
    if (roleLabel) {
      if (user) {
        const roleNames = { customer: 'Student', kitchen: 'Kitchen Staff', admin: 'Canteen Admin' };
        roleLabel.textContent = roleNames[user.role] || user.role;
      } else {
        roleLabel.textContent = 'Guest';
      }
    }

    // 2. Wallet Pill
    const walletPill = document.getElementById('header-wallet-pill');
    const walletBalance = document.getElementById('header-wallet-balance');
    if (walletPill && walletBalance) {
      if (user && user.role === 'customer') {
        walletPill.classList.remove('hidden');
        walletBalance.textContent = `₹${(user.wallet_balance || 0).toFixed(2)}`;
      } else {
        walletPill.classList.add('hidden');
      }
    }

    // 3. Cart Badge & Count
    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
      if (totals.totalCount > 0) {
        cartBadge.textContent = totals.totalCount;
        cartBadge.classList.remove('hidden');
      } else {
        cartBadge.classList.add('hidden');
      }
    }

    // 4. Auth Button Container
    const authContainer = document.getElementById('auth-btn-container');
    if (authContainer) {
      if (user) {
        authContainer.innerHTML = `
          <button onclick="App.navigateTo('#/profile')" class="flex items-center gap-1.5 p-1 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors" title="My Profile">
            <div class="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 font-extrabold text-xs flex items-center justify-center">
              ${user.name.charAt(0)}
            </div>
          </button>
        `;
      } else {
        authContainer.innerHTML = `
          <button onclick="App.openAuthModal('login')" class="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all">
            Login
          </button>
        `;
      }
    }

    // Update Drawer if open
    renderCartDrawer();
  }

  function renderNavLinks(activePath) {
    const desktopNav = document.getElementById('desktop-nav-links');
    const mobileNav = document.getElementById('mobile-bottom-nav');
    const user = Store.getCurrentUser();
    const role = user ? user.role : 'guest';

    let links = [];

    if (role === 'admin') {
      links = [
        { hash: '#/admin/dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
        { hash: '#/admin/menu', label: 'Menu Catalog', icon: 'utensils' },
        { hash: '#/admin/orders', label: 'All Orders', icon: 'shopping-bag' },
        { hash: '#/kitchen', label: 'Kitchen Board', icon: 'chef-hat' },
        { hash: '#/admin/reports', label: 'Reports', icon: 'file-text' }
      ];
    } else if (role === 'kitchen') {
      links = [
        { hash: '#/kitchen', label: 'Kitchen Board', icon: 'chef-hat' },
        { hash: '#/menu', label: 'Menu Catalog', icon: 'utensils' },
        { hash: '#/profile', label: 'Staff Profile', icon: 'user' }
      ];
    } else {
      // Customer / Guest
      links = [
        { hash: '#/', label: 'Home', icon: 'home' },
        { hash: '#/menu', label: 'Daily Menu', icon: 'utensils' },
        { hash: '#/tracker', label: 'Track Order', icon: 'activity' },
        { hash: '#/history', label: 'Past Orders', icon: 'receipt' },
        { hash: '#/profile', label: 'Wallet & Profile', icon: 'wallet' }
      ];
    }

    if (desktopNav) {
      desktopNav.innerHTML = links.map(l => {
        const isActive = activePath === l.hash || (l.hash === '#/' && activePath === '');
        return `
          <a href="${l.hash}" class="px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }">
            <i data-lucide="${l.icon}" class="w-3.5 h-3.5"></i>
            <span>${l.label}</span>
          </a>
        `;
      }).join('');
    }

    if (mobileNav) {
      mobileNav.innerHTML = links.slice(0, 5).map(l => {
        const isActive = activePath === l.hash || (l.hash === '#/' && activePath === '');
        return `
          <a href="${l.hash}" class="flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-bold ${
            isActive ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'
          }">
            <i data-lucide="${l.icon}" class="w-5 h-5"></i>
            <span>${l.label}</span>
          </a>
        `;
      }).join('');
    }

    if (window.lucide) lucide.createIcons();
  }

  // --- Cart Drawer Logic ---
  function toggleCartDrawer(open) {
    const backdrop = document.getElementById('cart-drawer-backdrop');
    const drawer = document.getElementById('cart-drawer');
    if (!backdrop || !drawer) return;

    if (open) {
      backdrop.classList.remove('opacity-0', 'pointer-events-none');
      drawer.classList.remove('translate-x-full');
      renderCartDrawer();
    } else {
      backdrop.classList.add('opacity-0', 'pointer-events-none');
      drawer.classList.add('translate-x-full');
    }
  }

  function renderCartDrawer() {
    const cart = Store.getCart();
    const totals = Store.getCartTotals();
    const user = Store.getCurrentUser();

    const countEl = document.getElementById('cart-drawer-count');
    const itemsEl = document.getElementById('cart-drawer-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    const taxEl = document.getElementById('cart-tax');
    const totalEl = document.getElementById('cart-total');
    const walletAvailEl = document.getElementById('cart-wallet-avail');

    if (countEl) countEl.textContent = totals.totalCount;
    if (subtotalEl) subtotalEl.textContent = `₹${totals.subtotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `₹${totals.tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `₹${totals.total.toFixed(2)}`;
    if (walletAvailEl) walletAvailEl.textContent = `₹${user ? user.wallet_balance.toFixed(2) : '0.00'}`;

    if (!itemsEl) return;

    if (cart.length === 0) {
      itemsEl.innerHTML = `
        <div class="py-16 text-center space-y-3">
          <div class="w-14 h-14 rounded-2xl bg-brand-50 text-brand-400 mx-auto flex items-center justify-center">
            <i data-lucide="shopping-bag" class="w-7 h-7"></i>
          </div>
          <h3 class="text-sm font-bold text-slate-800">Your Tray is Empty</h3>
          <p class="text-xs text-slate-400 max-w-xs mx-auto">Browse the canteen catalog to add freshly cooked meals.</p>
        </div>
      `;
    } else {
      itemsEl.innerHTML = cart.map(c => `
        <div class="py-3 flex items-center justify-between gap-3">
          <img src="${c.item.image_url}" alt="${c.item.name}" class="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0">
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-slate-900 truncate">${c.item.name}</h4>
            <span class="text-xs text-slate-500 font-semibold">₹${c.item.price.toFixed(2)}</span>
          </div>

          <!-- Quantity Controls -->
          <div class="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg p-1 shrink-0">
            <button onclick="Store.updateCartQuantity('${c.item.id}', ${c.quantity - 1})" class="w-5 h-5 rounded bg-white text-slate-700 flex items-center justify-center hover:bg-slate-200 text-xs font-bold">
              <i data-lucide="minus" class="w-3 h-3"></i>
            </button>
            <span class="w-5 text-center text-xs font-bold text-slate-800">${c.quantity}</span>
            <button onclick="Store.updateCartQuantity('${c.item.id}', ${c.quantity + 1})" class="w-5 h-5 rounded bg-white text-slate-700 flex items-center justify-center hover:bg-slate-200 text-xs font-bold">
              <i data-lucide="plus" class="w-3 h-3"></i>
            </button>
          </div>

          <button onclick="Store.removeFromCart('${c.item.id}')" class="p-1 text-slate-400 hover:text-rose-600 rounded">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      `).join('');
    }

    if (window.lucide) lucide.createIcons();
  }

  function quickAddToCart(itemId) {
    const res = Store.addToCart(itemId, 1);
    if (res.success) {
      Toast.success('Dish added to tray!');
      toggleCartDrawer(true);
    } else {
      Toast.error(res.message);
    }
  }

  function handleCheckout() {
    const paymentRadio = document.querySelector('input[name="payment_method"]:checked');
    const payment_method = paymentRadio ? paymentRadio.value : 'wallet';
    const notes = document.getElementById('cart-special-notes')?.value || '';

    const res = Store.createOrder({
      payment_method,
      special_instructions: notes
    });

    if (res.success) {
      toggleCartDrawer(false);
      Toast.success(`Order Placed! Token: ${res.order.id}`);
      navigateTo(`#/tracker?id=${res.order.id}`);
    } else {
      Toast.error(res.message);
    }
  }

  // --- Auth Modal & Role Switcher ---
  function openAuthModal(defaultTab = 'login') {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;
    switchAuthTab(defaultTab);
    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }

  function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('hidden');
  }

  function switchAuthTab(tab) {
    const loginForm = document.getElementById('login-form');
    const regForm = document.getElementById('register-form');
    const loginBtn = document.getElementById('tab-login-btn');
    const regBtn = document.getElementById('tab-register-btn');

    if (tab === 'login') {
      loginForm?.classList.remove('hidden');
      regForm?.classList.add('hidden');
      loginBtn?.classList.add('border-brand-600', 'text-brand-600');
      regBtn?.classList.remove('border-brand-600', 'text-brand-600');
    } else {
      loginForm?.classList.add('hidden');
      regForm?.classList.remove('hidden');
      regBtn?.classList.add('border-brand-600', 'text-brand-600');
      loginBtn?.classList.remove('border-brand-600', 'text-brand-600');
    }
  }

  function fillTestCredentials(email, pwd) {
    switchAuthTab('login');
    const emailInput = document.getElementById('login-email');
    const pwdInput = document.getElementById('login-password');
    if (emailInput && pwdInput) {
      emailInput.value = email;
      pwdInput.value = pwd;
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pwd = document.getElementById('login-password').value;

    const res = Store.login(email, pwd);
    if (res.success) {
      Toast.success(`Welcome back, ${res.user.name}!`);
      closeAuthModal();

      if (res.user.role === 'admin') navigateTo('#/admin/dashboard');
      else if (res.user.role === 'kitchen') navigateTo('#/kitchen');
      else navigateTo('#/menu');
    } else {
      Toast.error(res.message);
    }
  }

  function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const password = document.getElementById('reg-password').value;

    const res = Store.register({ name, email, phone, password });
    if (res.success) {
      Toast.success('Account created! ₹500 test wallet credited.');
      closeAuthModal();
      navigateTo('#/menu');
    } else {
      Toast.error(res.message);
    }
  }

  function handleLogout() {
    Store.logout();
    Toast.info('You have been signed out.');
    navigateTo('#/');
  }

  function switchRole(role) {
    Store.switchRole(role);
    Toast.info(`Switched role context to: ${role.toUpperCase()}`);
    if (role === 'admin') navigateTo('#/admin/dashboard');
    else if (role === 'kitchen') navigateTo('#/kitchen');
    else navigateTo('#/menu');
  }

  return {
    init,
    navigateTo,
    toggleCartDrawer,
    quickAddToCart,
    handleCheckout,
    openAuthModal,
    closeAuthModal,
    switchAuthTab,
    fillTestCredentials,
    handleLogin,
    handleRegister,
    handleLogout,
    switchRole
  };
})();

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
