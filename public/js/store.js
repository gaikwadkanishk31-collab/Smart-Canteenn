/**
 * Smart Canteen Management System - Central Reactive Store
 */

const Store = (function() {
  const STORAGE_KEY = 'SCMS_STATE_V1';

  // Private state object
  let state = {
    currentUser: null, // { id, name, email, role, wallet_balance }
    categories: [],
    menuItems: [],
    orders: [],
    cart: [] // [{ item, quantity }]
  };

  const listeners = [];

  // Initialize state from localStorage or SEED_DATA
  function init() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        state = JSON.parse(saved);
      } else {
        resetToSeedData();
      }
    } catch (e) {
      console.warn('Failed to parse saved state; reverting to defaults', e);
      resetToSeedData();
    }

    // Default to student if no user logged in
    if (!state.currentUser) {
      state.currentUser = state.users ? state.users[0] : SEED_DATA.users[0];
    }
  }

  function resetToSeedData() {
    state = {
      users: [...SEED_DATA.users],
      currentUser: SEED_DATA.users[0], // Preloaded as student
      categories: [...SEED_DATA.categories],
      menuItems: [...SEED_DATA.menuItems],
      orders: [...SEED_DATA.orders],
      cart: []
    };
    persist();
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Storage quota or persistence error', e);
    }
    notify();
  }

  function subscribe(fn) {
    listeners.push(fn);
    return () => {
      const idx = listeners.indexOf(fn);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }

  function notify() {
    listeners.forEach(fn => fn(state));
  }

  // --- Auth & User Operations ---
  function getCurrentUser() {
    return state.currentUser;
  }

  function login(email, password) {
    const user = state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return { success: false, message: 'No account registered with this email.' };
    }
    if (user.password_hash !== password) {
      return { success: false, message: 'Invalid credentials. Please verify your password.' };
    }
    state.currentUser = user;
    persist();
    return { success: true, user };
  }

  function register({ name, email, password, phone }) {
    const existing = state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password_hash: password,
      phone: phone || '',
      role: 'customer',
      wallet_balance: 500.00, // ₹500 welcome credit for immediate testing
      created_at: new Date().toISOString()
    };

    state.users.push(newUser);
    state.currentUser = newUser;
    persist();
    return { success: true, user: newUser };
  }

  function logout() {
    state.currentUser = null;
    state.cart = [];
    persist();
  }

  function switchRole(targetRole) {
    // Find pre-configured user for that role or switch role directly
    const matchingUser = state.users.find(u => u.role === targetRole);
    if (matchingUser) {
      state.currentUser = matchingUser;
    } else {
      // Create or adjust current user role
      if (state.currentUser) {
        state.currentUser.role = targetRole;
      }
    }
    persist();
  }

  // --- Wallet Operations ---
  function topUpWallet(amount) {
    if (!state.currentUser) return false;
    const addVal = parseFloat(amount);
    if (isNaN(addVal) || addVal <= 0) return false;

    state.currentUser.wallet_balance = (parseFloat(state.currentUser.wallet_balance) + addVal);
    
    // Also update in users list
    const u = state.users.find(x => x.id === state.currentUser.id);
    if (u) u.wallet_balance = state.currentUser.wallet_balance;

    persist();
    return true;
  }

  // --- Menu Operations ---
  function getCategories() {
    return state.categories;
  }

  function getMenuItems() {
    return state.menuItems;
  }

  function addMenuItem(dish) {
    const newItem = {
      id: 'itm_' + Date.now(),
      name: dish.name.trim(),
      category_id: dish.category_id,
      price: parseFloat(dish.price),
      description: dish.description || '',
      image_url: dish.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
      is_veg: dish.is_veg !== undefined ? dish.is_veg : true,
      is_available: true,
      prep_time_minutes: parseInt(dish.prep_time_minutes) || 10,
      is_special: !!dish.is_special
    };
    state.menuItems.unshift(newItem);
    persist();
    return newItem;
  }

  function updateMenuItem(id, updates) {
    const item = state.menuItems.find(i => i.id === id);
    if (!item) return false;

    Object.assign(item, updates);
    if (updates.price) item.price = parseFloat(updates.price);
    if (updates.prep_time_minutes) item.prep_time_minutes = parseInt(updates.prep_time_minutes);

    persist();
    return item;
  }

  function toggleItemAvailability(id) {
    const item = state.menuItems.find(i => i.id === id);
    if (!item) return false;
    item.is_available = !item.is_available;
    persist();
    return item.is_available;
  }

  function deleteMenuItem(id) {
    const idx = state.menuItems.findIndex(i => i.id === id);
    if (idx === -1) return false;
    state.menuItems.splice(idx, 1);
    persist();
    return true;
  }

  // --- Cart Operations ---
  function getCart() {
    return state.cart;
  }

  function addToCart(itemId, qty = 1) {
    const item = state.menuItems.find(i => i.id === itemId);
    if (!item || !item.is_available) {
      return { success: false, message: 'This dish is currently out of stock.' };
    }

    const existingIndex = state.cart.findIndex(c => c.item.id === itemId);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += qty;
    } else {
      state.cart.push({ item, quantity: qty });
    }
    persist();
    return { success: true };
  }

  function updateCartQuantity(itemId, quantity) {
    const idx = state.cart.findIndex(c => c.item.id === itemId);
    if (idx === -1) return;

    if (quantity <= 0) {
      state.cart.splice(idx, 1);
    } else {
      state.cart[idx].quantity = quantity;
    }
    persist();
  }

  function removeFromCart(itemId) {
    state.cart = state.cart.filter(c => c.item.id !== itemId);
    persist();
  }

  function clearCart() {
    state.cart = [];
    persist();
  }

  function getCartTotals() {
    const subtotal = state.cart.reduce((sum, c) => sum + (c.item.price * c.quantity), 0);
    const tax = subtotal * 0.05; // 5% GST
    const total = subtotal + tax;
    const totalCount = state.cart.reduce((sum, c) => sum + c.quantity, 0);

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      totalCount
    };
  }

  // --- Orders Management ---
  function getOrders() {
    return state.orders;
  }

  function getOrderById(id) {
    return state.orders.find(o => o.id === id);
  }

  function createOrder({ payment_method, special_instructions }) {
    if (state.cart.length === 0) {
      return { success: false, message: 'Your cart is empty.' };
    }

    // Edge check: verify availability of all items
    for (const c of state.cart) {
      const liveItem = state.menuItems.find(m => m.id === c.item.id);
      if (!liveItem || !liveItem.is_available) {
        return { 
          success: false, 
          message: `"${c.item.name}" has just run out of stock. Please remove it from your tray.` 
        };
      }
    }

    const totals = getCartTotals();
    const user = state.currentUser;

    if (payment_method === 'wallet') {
      if (!user || user.wallet_balance < totals.total) {
        return { 
          success: false, 
          message: `Insufficient wallet balance (Available: ₹${user ? user.wallet_balance.toFixed(2) : 0}). Top up or choose Cash at Counter.` 
        };
      }
      // Deduct wallet balance
      user.wallet_balance -= totals.total;
      const u = state.users.find(x => x.id === user.id);
      if (u) u.wallet_balance = user.wallet_balance;
    }

    // Generate random 4-digit token
    const tokenNum = Math.floor(100 + Math.random() * 900);
    const newOrder = {
      id: 'ORD-' + tokenNum,
      user_id: user ? user.id : 'guest',
      customer_name: user ? user.name : 'Walk-in Diner',
      customer_email: user ? user.email : 'guest@canteen.edu',
      subtotal: totals.subtotal,
      tax_amount: totals.tax,
      grand_total: totals.total,
      payment_method: payment_method, // 'wallet' or 'cash'
      payment_status: payment_method === 'wallet' ? 'paid' : 'pending',
      order_status: 'pending', // 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
      special_instructions: special_instructions || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      items: state.cart.map(c => ({
        item_id: c.item.id,
        item_name: c.item.name,
        unit_price: c.item.price,
        quantity: c.quantity,
        item_total: parseFloat((c.item.price * c.quantity).toFixed(2))
      }))
    };

    state.orders.unshift(newOrder);
    state.cart = []; // clear tray after order
    persist();

    return { success: true, order: newOrder };
  }

  function updateOrderStatus(orderId, newStatus) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: 'Order not found.' };

    order.order_status = newStatus;
    order.updated_at = new Date().toISOString();

    if (newStatus === 'delivered' && order.payment_method === 'cash') {
      order.payment_status = 'paid';
    }

    persist();
    return { success: true, order };
  }

  function cancelOrder(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: 'Order not found.' };

    if (order.order_status !== 'pending') {
      return { 
        success: false, 
        message: 'Order is already being prepared or ready and cannot be cancelled.' 
      };
    }

    order.order_status = 'cancelled';
    order.updated_at = new Date().toISOString();

    // Refund wallet if charged
    if (order.payment_method === 'wallet' && order.payment_status === 'paid') {
      const customer = state.users.find(u => u.id === order.user_id);
      if (customer) {
        customer.wallet_balance += order.grand_total;
        if (state.currentUser && state.currentUser.id === customer.id) {
          state.currentUser.wallet_balance = customer.wallet_balance;
        }
      }
      order.payment_status = 'refunded';
    }

    persist();
    return { success: true, order };
  }

  // Self-initialize
  init();

  return {
    init,
    subscribe,
    getState: () => state,
    getCurrentUser,
    login,
    register,
    logout,
    switchRole,
    topUpWallet,
    getCategories,
    getMenuItems,
    addMenuItem,
    updateMenuItem,
    toggleItemAvailability,
    deleteMenuItem,
    getCart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartTotals,
    getOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    resetToSeedData
  };
})();
