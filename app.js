/**
 * Smart Canteen Management System - Core Application Engine
 * Handles State, Local Database Persistence, Reactive UI, Calculations & Reporting
 */

// --- 1. DEFAULT SEED DATA ---
const DEFAULT_SEED_DATA = {
  users: [
    {
      id: "usr-admin",
      fullName: "Sunita Verma",
      email: "admin@canteen.edu",
      phone: "9876500001",
      role: "admin",
      collegeId: "ADM-001",
      passwordHash: "admin123",
      createdAt: "2026-11-10T08:00:00Z"
    },
    {
      id: "usr-staff",
      fullName: "Chef Ramesh Kumar",
      email: "kitchen@canteen.edu",
      phone: "9876500002",
      role: "staff",
      collegeId: "STF-102",
      passwordHash: "kitchen123",
      createdAt: "2026-11-10T08:00:00Z"
    },
    {
      id: "usr-student",
      fullName: "Aarav Sharma",
      email: "student@canteen.edu",
      phone: "9876543210",
      role: "customer",
      collegeId: "CS-2024-042",
      passwordHash: "student123",
      createdAt: "2026-11-11T09:30:00Z"
    }
  ],
  menuItems: [
    // Breakfast
    {
      id: "item-101",
      name: "Crispy Masala Dosa",
      category: "Breakfast",
      price: 65,
      description: "Golden rice crepe filled with spiced potato masala, served with fresh coconut chutney and piping hot sambar.",
      imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80",
      isVeg: true,
      isAvailable: true,
      prepTimeMins: 10,
      isSpecial: true
    },
    {
      id: "item-102",
      name: "Idli Vada Sambar Combo",
      category: "Breakfast",
      price: 50,
      description: "Two steamed soft idlis and one crispy medu vada with authentic lentil sambar and coriander dip.",
      imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
      isVeg: true,
      isAvailable: true,
      prepTimeMins: 5,
      isSpecial: false
    },
    {
      id: "item-103",
      name: "Stuffed Paneer Paratha",
      category: "Breakfast",
      price: 70,
      description: "Whole wheat flatbread stuffed with spiced cottage cheese, served with fresh curd and mixed pickle.",
      imageUrl: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600&auto=format&fit=crop&q=80",
      isVeg: true,
      isAvailable: true,
      prepTimeMins: 12,
      isSpecial: false
    },
    {
      id: "item-104",
      name: "Double Egg Cheese Omelette",
      category: "Breakfast",
      price: 60,
      description: "Fluffy two-egg omelette with melted cheddar, diced onions, and green chilies, served with two butter toasts.",
      imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80",
      isVeg: false,
      isAvailable: true,
      prepTimeMins: 8,
      isSpecial: false
    },

    // Lunch
    {
      id: "item-201",
      name: "Royal Veg Thali",
      category: "Lunch",
      price: 110,
      description: "Complete wholesome meal: Paneer curry, Dal Tadka, Seasonal Sabzi, Jeera Rice, 3 Butter Rotis, Gulab Jamun & Salad.",
      imageUrl: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600&auto=format&fit=crop&q=80",
      isVeg: true,
      isAvailable: true,
      prepTimeMins: 12,
      isSpecial: true
    },
    {
      id: "item-202",
      name: "Dum Chicken Biryani",
      category: "Lunch",
      price: 140,
      description: "Fragrant basmati rice slow-cooked with marinated chicken chunks and secret spices, served with cooling onion raita.",
      imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
      isVeg: false,
      isAvailable: true,
      prepTimeMins: 15,
      isSpecial: true
    },
    {
      id: "item-203",
      name: "Homestyle Rajma Chawal",
      category: "Lunch",
      price: 80,
      description: "Slow-cooked red kidney beans in rich spiced tomato gravy served over aromatic steamed basmati rice.",
      imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
      isVeg: true,
      isAvailable: true,
      prepTimeMins: 7,
      isSpecial: false
    },
    {
      id: "item-204",
      name: "Paneer Butter Masala Combo",
      category: "Lunch",
      price: 120,
      description: "Cottage cheese cubes in creamy makhani gravy paired with 2 fluffy garlic naans and salad.",
      imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80",
      isVeg: true,
      isAvailable: true,
      prepTimeMins: 12,
      isSpecial: false
    },

    // Snacks
    {
      id: "item-301",
      name: "Crispy Samosa Platter (2 pcs)",
      category: "Snacks",
      price: 30,
      description: "Golden flaky pastry stuffed with seasoned potatoes and peas, served with sweet tamarind and spicy mint chutneys.",
      imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80",
      isVeg: true,
      isAvailable: true,
      prepTimeMins: 5,
      isSpecial: false
    },
    {
      id: "item-302",
      name: "Bombay Cheese Grilled Sandwich",
      category: "Snacks",
      price: 55,
      description: "Toasted sandwich loaded with potato masala, beetroot, cucumber, tangy green chutney, and melted mozzarella.",
      imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80",
      isVeg: true,
      isAvailable: true,
      prepTimeMins: 8,
      isSpecial: false
    },
    {
      id: "item-303",
      name: "Spicy Chicken Kathi Roll",
      category: "Snacks",
      price: 85,
      description: "Juicy tandoori chicken tikka cubes rolled in flaky paratha with sliced red onions and mint mayo.",
      imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80",
      isVeg: false,
      isAvailable: true,
      prepTimeMins: 10,
      isSpecial: false
    },
    {
      id: "item-304",
      name: "Butter Pav Bhaji",
      category: "Snacks",
      price: 75,
      description: "Thick spiced mashed vegetable gravy topped with a dollop of butter, served with two toasted soft pavs and lemon.",
      imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=80",
      isVeg: true,
      isAvailable: false, // Demo out of stock item
      prepTimeMins: 10,
      isSpecial: false
    },

    // Beverages
    {
      id: "item-401",
      name: "Kadak Masala Chai",
      category: "Beverages",
      price: 15,
      description: "Freshly brewed Indian tea infused with ginger, cardamom, and clove. Canteen favorite!",
      imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
      isVeg: true,
      isAvailable: true,
      prepTimeMins: 3,
      isSpecial: false
    },
    {
      id: "item-402",
      name: "South Indian Filter Coffee",
      category: "Beverages",
      price: 25,
      description: "Traditional frothy chicory blend drip coffee served in stainless steel tumbler and dabara.",
      imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
      isVeg: true,
      isAvailable: true,
      prepTimeMins: 4,
      isSpecial: false
    },
    {
      id: "item-403",
      name: "Cold Coffee with Vanilla Float",
      category: "Beverages",
      price: 65,
      description: "Rich blended chilled espresso, whole milk, and chocolate syrup crowned with a scoop of vanilla ice cream.",
      imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80",
      isVeg: true,
      isAvailable: true,
      prepTimeMins: 5,
      isSpecial: true
    },
    {
      id: "item-404",
      name: "Sweet Mango Lassi",
      category: "Beverages",
      price: 45,
      description: "Thick, creamy churned yogurt blended with Alphonso mango pulp and garnished with pistachio flakes.",
      imageUrl: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80",
      isVeg: true,
      isAvailable: true,
      prepTimeMins: 4,
      isSpecial: false
    }
  ],
  orders: [
    {
      id: "ord-1001",
      orderNumber: "#CAN-8401",
      userId: "usr-student",
      customerName: "Aarav Sharma",
      customerPhone: "9876543210",
      status: "completed",
      items: [
        { menuItemId: "item-201", name: "Royal Veg Thali", price: 110, quantity: 1, total: 110 },
        { menuItemId: "item-401", name: "Kadak Masala Chai", price: 15, quantity: 2, total: 30 }
      ],
      subtotal: 140,
      taxAmount: 7.00,
      totalAmount: 147.00,
      paymentMethod: "cash_at_counter",
      specialInstructions: "Extra pickle with thali please.",
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hrs ago
      completedAt: new Date(Date.now() - 3600000 * 3.5).toISOString()
    },
    {
      id: "ord-1002",
      orderNumber: "#CAN-8402",
      userId: "usr-student",
      customerName: "Aarav Sharma",
      customerPhone: "9876543210",
      status: "ready",
      items: [
        { menuItemId: "item-202", name: "Dum Chicken Biryani", price: 140, quantity: 1, total: 140 },
        { menuItemId: "item-403", name: "Cold Coffee with Vanilla Float", price: 65, quantity: 1, total: 65 }
      ],
      subtotal: 205,
      taxAmount: 10.25,
      totalAmount: 215.25,
      paymentMethod: "cash_at_counter",
      specialInstructions: "Extra raita",
      createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString() // 25 mins ago
    },
    {
      id: "ord-1003",
      orderNumber: "#CAN-8403",
      userId: "usr-student",
      customerName: "Aarav Sharma",
      customerPhone: "9876543210",
      status: "preparing",
      items: [
        { menuItemId: "item-101", name: "Crispy Masala Dosa", price: 65, quantity: 2, total: 130 },
        { menuItemId: "item-402", name: "South Indian Filter Coffee", price: 25, quantity: 2, total: 50 }
      ],
      subtotal: 180,
      taxAmount: 9.00,
      totalAmount: 189.00,
      paymentMethod: "cash_at_counter",
      specialInstructions: "Make dosa extra crisp",
      createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString() // 12 mins ago
    },
    {
      id: "ord-1004",
      orderNumber: "#CAN-8404",
      userId: "usr-student",
      customerName: "Aarav Sharma",
      customerPhone: "9876543210",
      status: "pending",
      items: [
        { menuItemId: "item-301", name: "Crispy Samosa Platter (2 pcs)", price: 30, quantity: 1, total: 30 },
        { menuItemId: "item-401", name: "Kadak Masala Chai", price: 15, quantity: 1, total: 15 }
      ],
      subtotal: 45,
      taxAmount: 2.25,
      totalAmount: 47.25,
      paymentMethod: "cash_at_counter",
      specialInstructions: "Less sugar in chai",
      createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString() // 3 mins ago
    }
  ]
};

// --- 2. LOCAL STORAGE DATABASE MANAGER ---
const DB = {
  STORAGE_KEY: "smart_canteen_db_v1",

  load() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) {
        this.save(DEFAULT_SEED_DATA);
        return JSON.parse(JSON.stringify(DEFAULT_SEED_DATA));
      }
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to load local DB, resetting to defaults", e);
      this.save(DEFAULT_SEED_DATA);
      return JSON.parse(JSON.stringify(DEFAULT_SEED_DATA));
    }
  },

  save(data) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  },

  reset() {
    this.save(DEFAULT_SEED_DATA);
    return JSON.parse(JSON.stringify(DEFAULT_SEED_DATA));
  }
};

// --- 3. GLOBAL APP STATE ---
const State = {
  db: DB.load(),
  currentUser: null,
  cart: [], // [{ menuItem, quantity }]
  currentTab: "menu", // 'menu' | 'orders' | 'kitchen' | 'admin'
  adminSubTab: "dashboard", // 'dashboard' | 'menu' | 'orders' | 'reports' | 'settings'
  activeCategory: "All",
  searchQuery: "",
  vegFilter: "all", // 'all' | 'veg' | 'nonveg'
  reportFilter: "month", // 'today' | 'week' | 'month' | 'custom'
  customDateRange: { start: "", end: "" },
  chartInstances: {},

  init() {
    // Default current user to Student for instant preview
    const savedUser = localStorage.getItem("smart_canteen_auth_user");
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
      } catch (e) {
        this.currentUser = this.db.users.find(u => u.role === "customer");
      }
    } else {
      this.currentUser = this.db.users.find(u => u.role === "customer");
    }

    // Load cart
    const savedCart = localStorage.getItem("smart_canteen_cart");
    if (savedCart) {
      try {
        this.cart = JSON.parse(savedCart);
      } catch (e) {
        this.cart = [];
      }
    }
  },

  persistCart() {
    localStorage.setItem("smart_canteen_cart", JSON.stringify(this.cart));
    UI.updateCartBadge();
  },

  setUser(user) {
    this.currentUser = user;
    if (user) {
      localStorage.setItem("smart_canteen_auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("smart_canteen_auth_user");
    }
    UI.renderHeaderUser();
    UI.renderNavigation();
  }
};

// --- 4. BUSINESS LOGIC & CONTROLLER ---
const App = {
  TAX_RATE: 0.05, // 5% GST

  init() {
    State.init();
    UI.initEventListeners();
    UI.renderHeaderUser();
    UI.renderNavigation();
    UI.renderMenu();
    UI.updateCartBadge();
    UI.renderOrders();
    UI.renderKitchenBoard();
    UI.renderAdmin();
  },

  // Cart operations
  addToCart(itemId) {
    const item = State.db.menuItems.find(m => m.id === itemId);
    if (!item || !item.isAvailable) {
      UI.toast("This item is currently sold out", "error");
      return;
    }

    const existingIndex = State.cart.findIndex(c => c.menuItem.id === itemId);
    if (existingIndex > -1) {
      State.cart[existingIndex].quantity += 1;
    } else {
      State.cart.push({ menuItem: item, quantity: 1 });
    }

    State.persistCart();
    UI.toast(`Added ${item.name} to cart!`, "success");
    UI.renderCartDrawer();
  },

  updateCartQuantity(itemId, delta) {
    const index = State.cart.findIndex(c => c.menuItem.id === itemId);
    if (index === -1) return;

    State.cart[index].quantity += delta;
    if (State.cart[index].quantity <= 0) {
      State.cart.splice(index, 1);
    }

    State.persistCart();
    UI.renderCartDrawer();
  },

  removeFromCart(itemId) {
    State.cart = State.cart.filter(c => c.menuItem.id !== itemId);
    State.persistCart();
    UI.renderCartDrawer();
  },

  clearCart() {
    State.cart = [];
    State.persistCart();
    UI.renderCartDrawer();
  },

  getCartTotals() {
    const subtotal = State.cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
    const tax = Math.round(subtotal * this.TAX_RATE * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;
    return { subtotal, tax, total };
  },

  // Order Placement
  placeOrder(specialInstructions = "") {
    if (!State.currentUser) {
      UI.showLoginModal();
      return;
    }

    if (State.cart.length === 0) {
      UI.toast("Your cart is empty!", "error");
      return;
    }

    // Verify all items are still available
    const unavailable = State.cart.filter(c => {
      const fresh = State.db.menuItems.find(m => m.id === c.menuItem.id);
      return !fresh || !fresh.isAvailable;
    });

    if (unavailable.length > 0) {
      UI.toast(`Some items in your cart are no longer available: ${unavailable.map(u => u.menuItem.name).join(", ")}`, "error");
      return;
    }

    const { subtotal, tax, total } = this.getCartTotals();
    const orderNum = `#CAN-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      userId: State.currentUser.id,
      customerName: State.currentUser.fullName,
      customerPhone: State.currentUser.phone || "9876543210",
      status: "pending",
      items: State.cart.map(c => ({
        menuItemId: c.menuItem.id,
        name: c.menuItem.name,
        price: c.menuItem.price,
        quantity: c.quantity,
        total: c.menuItem.price * c.quantity
      })),
      subtotal,
      taxAmount: tax,
      totalAmount: total,
      paymentMethod: "cash_at_counter",
      specialInstructions: specialInstructions.trim(),
      createdAt: new Date().toISOString()
    };

    State.db.orders.unshift(newOrder);
    DB.save(State.db);
    this.clearCart();

    UI.closeCartDrawer();
    UI.showOrderConfirmationModal(newOrder);
    UI.renderOrders();
    UI.renderKitchenBoard();
    UI.renderAdmin();
  },

  // Order Lifecycle
  cancelOrder(orderId) {
    const order = State.db.orders.find(o => o.id === orderId);
    if (!order) return;

    if (order.status !== "pending") {
      UI.toast("Cannot cancel order: Kitchen has already started preparing it!", "error");
      return;
    }

    order.status = "cancelled";
    order.cancelledAt = new Date().toISOString();
    DB.save(State.db);

    UI.toast(`Order ${order.orderNumber} has been cancelled`, "info");
    UI.renderOrders();
    UI.renderKitchenBoard();
    UI.renderAdmin();
  },

  advanceOrderStatus(orderId, newStatus) {
    const order = State.db.orders.find(o => o.id === orderId);
    if (!order) return;

    order.status = newStatus;
    if (newStatus === "completed") {
      order.completedAt = new Date().toISOString();
    }
    DB.save(State.db);

    const statusLabels = {
      preparing: "in Preparation",
      ready: "Ready for Pickup",
      completed: "Completed"
    };

    UI.toast(`Order ${order.orderNumber} is now ${statusLabels[newStatus] || newStatus}!`, "success");
    UI.renderOrders();
    UI.renderKitchenBoard();
    UI.renderAdmin();
  },

  // Menu Admin Operations
  saveMenuItem(itemData) {
    if (!itemData.name || !itemData.price || itemData.price <= 0) {
      UI.toast("Please enter a valid item name and positive price", "error");
      return false;
    }

    if (itemData.id) {
      // Edit existing
      const index = State.db.menuItems.findIndex(m => m.id === itemData.id);
      if (index > -1) {
        State.db.menuItems[index] = { ...State.db.menuItems[index], ...itemData };
        UI.toast(`Updated ${itemData.name}`, "success");
      }
    } else {
      // Add new
      const newItem = {
        id: `item-${Date.now()}`,
        name: itemData.name,
        category: itemData.category,
        price: parseFloat(itemData.price),
        description: itemData.description || "Freshly prepared at our canteen kitchen.",
        imageUrl: itemData.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
        isVeg: Boolean(itemData.isVeg),
        isAvailable: Boolean(itemData.isAvailable),
        prepTimeMins: parseInt(itemData.prepTimeMins) || 10,
        isSpecial: Boolean(itemData.isSpecial)
      };
      State.db.menuItems.push(newItem);
      UI.toast(`Added ${newItem.name} to menu!`, "success");
    }

    DB.save(State.db);
    UI.renderMenu();
    UI.renderAdmin();
    return true;
  },

  toggleMenuAvailability(itemId) {
    const item = State.db.menuItems.find(m => m.id === itemId);
    if (!item) return;

    item.isAvailable = !item.isAvailable;
    DB.save(State.db);

    UI.toast(`${item.name} is now ${item.isAvailable ? 'In Stock' : 'Marked Sold Out'}`, item.isAvailable ? "success" : "info");
    UI.renderMenu();
    UI.renderAdmin();
  },

  deleteMenuItem(itemId) {
    const item = State.db.menuItems.find(m => m.id === itemId);
    if (!item) return;

    if (!confirm(`Are you sure you want to delete "${item.name}" from the menu?`)) {
      return;
    }

    State.db.menuItems = State.db.menuItems.filter(m => m.id !== itemId);
    DB.save(State.db);

    UI.toast(`Deleted ${item.name}`, "info");
    UI.renderMenu();
    UI.renderAdmin();
  },

  // Auth & Roles
  login(email, password) {
    const user = State.db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.passwordHash !== password) {
      UI.toast("Invalid email or password", "error");
      return false;
    }

    State.setUser(user);
    UI.toast(`Welcome back, ${user.fullName}!`, "success");
    UI.closeLoginModal();

    // Auto-switch tab based on role
    if (user.role === "staff") {
      UI.switchTab("kitchen");
    } else if (user.role === "admin") {
      UI.switchTab("admin");
    } else {
      UI.switchTab("menu");
    }
    return true;
  },

  register(userData) {
    if (!userData.fullName || !userData.email || !userData.password) {
      UI.toast("Please fill in all required fields", "error");
      return false;
    }

    const existing = State.db.users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      UI.toast("An account with this email already exists", "error");
      return false;
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone || "9876543210",
      collegeId: userData.collegeId || "STU-2026",
      role: userData.role || "customer",
      passwordHash: userData.password,
      createdAt: new Date().toISOString()
    };

    State.db.users.push(newUser);
    DB.save(State.db);

    State.setUser(newUser);
    UI.toast(`Account created! Welcome, ${newUser.fullName}!`, "success");
    UI.closeLoginModal();
    return true;
  },

  resetPassword(email, newPassword) {
    const user = State.db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      UI.toast("No account found with this email", "error");
      return false;
    }

    user.passwordHash = newPassword;
    DB.save(State.db);
    UI.toast("Password reset successfully! You can now log in.", "success");
    return true;
  },

  logout() {
    State.setUser(null);
    UI.toast("Logged out successfully", "info");
    UI.switchTab("menu");
  },

  switchRole(role) {
    let target = State.db.users.find(u => u.role === role);
    if (!target) {
      // If staff not found, create one
      if (role === "staff") {
        target = {
          id: "usr-staff",
          fullName: "Chef Kitchen",
          email: "kitchen@canteen.edu",
          phone: "9876500002",
          role: "staff",
          collegeId: "STF-101",
          passwordHash: "kitchen123",
          createdAt: new Date().toISOString()
        };
        State.db.users.push(target);
        DB.save(State.db);
      }
    }

    if (target) {
      State.setUser(target);
      UI.toast(`Switched role to: ${target.role.toUpperCase()} (${target.fullName})`, "success");
      if (role === "staff") UI.switchTab("kitchen");
      else if (role === "admin") UI.switchTab("admin");
      else UI.switchTab("menu");
    }
  },

  resetAllData() {
    if (confirm("Reset database to clean default seed data? All custom orders and added items will be reset.")) {
      State.db = DB.reset();
      State.cart = [];
      State.persistCart();
      State.currentUser = State.db.users.find(u => u.role === "customer");
      localStorage.setItem("smart_canteen_auth_user", JSON.stringify(State.currentUser));

      UI.toast("Database reset to factory seed data!", "info");
      UI.renderHeaderUser();
      UI.renderNavigation();
      UI.renderMenu();
      UI.renderOrders();
      UI.renderKitchenBoard();
      UI.renderAdmin();
    }
  }
};

// --- 5. UI CONTROLLERS & RENDERERS ---
const UI = {
  initEventListeners() {
    // Search input
    const searchInput = document.getElementById("menu-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        State.searchQuery = e.target.value.toLowerCase().trim();
        this.renderMenu();
      });
    }

    // Role switcher dropdown
    const roleSelector = document.getElementById("demo-role-select");
    if (roleSelector) {
      roleSelector.addEventListener("change", (e) => {
        App.switchRole(e.target.value);
      });
    }

    // Modal background clicks
    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
          backdrop.classList.add("hidden");
        }
      });
    });
  },

  switchTab(tabName) {
    State.currentTab = tabName;

    // Route protections
    if (tabName === "admin" && (!State.currentUser || State.currentUser.role !== "admin")) {
      this.toast("Admin access required. Please login as Admin.", "error");
      this.showLoginModal();
      return;
    }

    if (tabName === "kitchen" && (!State.currentUser || (State.currentUser.role !== "staff" && State.currentUser.role !== "admin"))) {
      this.toast("Kitchen Staff access required.", "error");
      this.showLoginModal();
      return;
    }

    document.querySelectorAll(".tab-view").forEach(view => view.classList.add("hidden"));
    const activeView = document.getElementById(`view-${tabName}`);
    if (activeView) activeView.classList.remove("hidden");

    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.dataset.tab === tabName) {
        link.classList.add("text-orange-600", "border-orange-500", "font-bold");
        link.classList.remove("text-slate-600", "border-transparent");
      } else {
        link.classList.remove("text-orange-600", "border-orange-500", "font-bold");
        link.classList.add("text-slate-600", "border-transparent");
      }
    });

    if (tabName === "menu") this.renderMenu();
    if (tabName === "orders") this.renderOrders();
    if (tabName === "kitchen") this.renderKitchenBoard();
    if (tabName === "admin") this.renderAdmin();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  switchAdminSubTab(subTab) {
    State.adminSubTab = subTab;
    document.querySelectorAll(".admin-sub-view").forEach(v => v.classList.add("hidden"));
    const active = document.getElementById(`admin-view-${subTab}`);
    if (active) active.classList.remove("hidden");

    document.querySelectorAll(".admin-tab-btn").forEach(btn => {
      if (btn.dataset.subtab === subTab) {
        btn.classList.add("bg-orange-500", "text-white", "shadow-sm");
        btn.classList.remove("bg-white", "text-slate-600", "hover:bg-slate-100");
      } else {
        btn.classList.remove("bg-orange-500", "text-white", "shadow-sm");
        btn.classList.add("bg-white", "text-slate-600", "hover:bg-slate-100");
      }
    });

    if (subTab === "dashboard") this.renderAdminDashboard();
    if (subTab === "menu") this.renderAdminMenuTable();
    if (subTab === "orders") this.renderAdminOrdersTable();
    if (subTab === "reports") this.renderAdminReports();
  },

  renderHeaderUser() {
    const userContainer = document.getElementById("header-user-container");
    const roleSelector = document.getElementById("demo-role-select");

    if (State.currentUser) {
      if (roleSelector) roleSelector.value = State.currentUser.role;
      if (userContainer) {
        const roleBadges = {
          admin: '<span class="px-2 py-0.5 text-xs font-semibold rounded bg-purple-100 text-purple-700">Admin</span>',
          staff: '<span class="px-2 py-0.5 text-xs font-semibold rounded bg-blue-100 text-blue-700">Kitchen</span>',
          customer: '<span class="px-2 py-0.5 text-xs font-semibold rounded bg-green-100 text-green-700">Student</span>'
        };

        userContainer.innerHTML = `
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-sm shadow-inner">
              ${State.currentUser.fullName.charAt(0)}
            </div>
            <div class="hidden sm:block text-left">
              <div class="text-xs font-bold text-slate-800 leading-tight">${State.currentUser.fullName}</div>
              <div class="text-[10px] text-slate-500">${roleBadges[State.currentUser.role] || State.currentUser.role}</div>
            </div>
            <button onclick="App.logout()" title="Logout" class="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg transition-colors">
              <i data-lucide="log-out" class="w-4 h-4"></i>
            </button>
          </div>
        `;
      }
    } else {
      if (userContainer) {
        userContainer.innerHTML = `
          <button onclick="UI.showLoginModal()" class="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold shadow-sm transition-all">
            Sign In
          </button>
        `;
      }
    }
    if (window.lucide) lucide.createIcons();
  },

  renderNavigation() {
    const adminLink = document.getElementById("nav-link-admin");
    const kitchenLink = document.getElementById("nav-link-kitchen");
    const ordersLink = document.getElementById("nav-link-orders");

    // Dynamic visibility based on role
    if (State.currentUser?.role === "admin") {
      if (adminLink) adminLink.classList.remove("hidden");
      if (kitchenLink) kitchenLink.classList.remove("hidden");
    } else if (State.currentUser?.role === "staff") {
      if (adminLink) adminLink.classList.add("hidden");
      if (kitchenLink) kitchenLink.classList.remove("hidden");
    } else {
      if (adminLink) adminLink.classList.add("hidden");
      if (kitchenLink) kitchenLink.classList.add("hidden");
    }

    // Active order count badge
    if (ordersLink && State.currentUser) {
      const activeOrdersCount = State.db.orders.filter(
        o => o.userId === State.currentUser.id && (o.status === "pending" || o.status === "preparing" || o.status === "ready")
      ).length;

      const badge = document.getElementById("nav-orders-badge");
      if (badge) {
        if (activeOrdersCount > 0) {
          badge.textContent = activeOrdersCount;
          badge.classList.remove("hidden");
        } else {
          badge.classList.add("hidden");
        }
      }
    }
  },

  // Menu Rendering
  renderMenu() {
    const container = document.getElementById("menu-grid");
    if (!container) return;

    let items = State.db.menuItems;

    // Filter by Category
    if (State.activeCategory !== "All") {
      items = items.filter(item => item.category === State.activeCategory);
    }

    // Filter by Veg / Non-Veg
    if (State.vegFilter === "veg") {
      items = items.filter(item => item.isVeg);
    } else if (State.vegFilter === "nonveg") {
      items = items.filter(item => !item.isVeg);
    }

    // Search Filter
    if (State.searchQuery) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(State.searchQuery) ||
        item.description.toLowerCase().includes(State.searchQuery)
      );
    }

    // Render Category Pills
    const categories = ["All", "Breakfast", "Lunch", "Snacks", "Beverages"];
    const pillsContainer = document.getElementById("category-pills");
    if (pillsContainer) {
      pillsContainer.innerHTML = categories.map(cat => `
        <button onclick="UI.setCategory('${cat}')" 
          class="px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
            State.activeCategory === cat
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }">
          ${cat}
        </button>
      `).join("");
    }

    // Render Specials Banner
    const specials = State.db.menuItems.filter(m => m.isSpecial && m.isAvailable);
    const specialsContainer = document.getElementById("todays-specials-cards");
    if (specialsContainer && specials.length > 0) {
      specialsContainer.innerHTML = specials.map(item => `
        <div class="min-w-[240px] max-w-[280px] bg-white rounded-2xl p-3 border border-orange-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div class="relative h-28 rounded-xl overflow-hidden mb-2 bg-slate-100">
            <img src="${item.imageUrl}" alt="${item.name}" class="w-full h-full object-cover">
            <span class="absolute top-2 left-2 px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-full shadow">Chef's Special</span>
            <span class="absolute top-2 right-2 p-1 bg-white/90 backdrop-blur rounded-full">
              <span class="block w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-red-500'}"></span>
            </span>
          </div>
          <div>
            <div class="font-bold text-slate-800 text-sm leading-snug truncate">${item.name}</div>
            <div class="text-[11px] text-slate-500 mb-2 truncate">${item.category} • ${item.prepTimeMins} mins</div>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-slate-100">
            <span class="font-extrabold text-slate-900 text-sm">₹${item.price}</span>
            <button onclick="App.addToCart('${item.id}')" class="px-3 py-1 bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white rounded-lg text-xs font-bold transition-colors">
              + Add
            </button>
          </div>
        </div>
      `).join("");
      document.getElementById("todays-specials-banner")?.classList.remove("hidden");
    } else {
      document.getElementById("todays-specials-banner")?.classList.add("hidden");
    }

    // Render Food Cards
    if (items.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <div class="w-16 h-16 mx-auto mb-3 text-slate-300">
            <i data-lucide="utensils-crossed" class="w-full h-full stroke-[1.5]"></i>
          </div>
          <h3 class="text-base font-bold text-slate-700">No food items found</h3>
          <p class="text-xs text-slate-500 mt-1">Try clearing your search query or selecting a different category.</p>
        </div>
      `;
    } else {
      container.innerHTML = items.map(item => {
        const cartItem = State.cart.find(c => c.menuItem.id === item.id);
        const inCartQty = cartItem ? cartItem.quantity : 0;

        return `
          <div class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group ${
            !item.isAvailable ? 'opacity-70 grayscale-[20%]' : ''
          }">
            <div>
              <div class="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img src="${item.imageUrl}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                <!-- Veg / Non-Veg badge -->
                <div class="absolute top-3 left-3 bg-white/95 backdrop-blur px-2 py-1 rounded-md shadow-sm flex items-center space-x-1.5">
                  <div class="w-3 h-3 border ${item.isVeg ? 'border-emerald-600' : 'border-red-600'} flex items-center justify-center p-[1px]">
                    <div class="w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-red-600'}"></div>
                  </div>
                  <span class="text-[10px] font-bold ${item.isVeg ? 'text-emerald-800' : 'text-red-800'}">
                    ${item.isVeg ? 'VEG' : 'NON-VEG'}
                  </span>
                </div>

                <!-- Category & Prep Time -->
                <div class="absolute bottom-3 left-3 flex items-center space-x-1 text-white text-[11px] font-medium drop-shadow">
                  <span>${item.category}</span>
                  <span>•</span>
                  <span>⏱️ ${item.prepTimeMins}m prep</span>
                </div>

                <!-- Availability Badge -->
                <div class="absolute top-3 right-3">
                  ${item.isAvailable 
                    ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow">In Stock</span>' 
                    : '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white shadow">Sold Out</span>'
                  }
                </div>
              </div>

              <div class="p-4">
                <h3 class="font-bold text-slate-800 text-base leading-snug group-hover:text-orange-600 transition-colors">${item.name}</h3>
                <p class="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">${item.description}</p>
              </div>
            </div>

            <div class="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span class="text-xs text-slate-400">Price</span>
                <div class="text-lg font-black text-slate-900">₹${item.price}</div>
              </div>

              ${!item.isAvailable 
                ? `<span class="px-3 py-1.5 bg-slate-100 text-slate-400 rounded-xl text-xs font-semibold cursor-not-allowed">Unavailable</span>`
                : inCartQty > 0 
                  ? `
                    <div class="flex items-center space-x-2 bg-orange-50 border border-orange-200 rounded-xl p-1">
                      <button onclick="App.updateCartQuantity('${item.id}', -1)" class="w-7 h-7 rounded-lg bg-white text-orange-600 font-bold hover:bg-orange-600 hover:text-white transition-colors flex items-center justify-center shadow-sm">
                        -
                      </button>
                      <span class="w-5 text-center text-xs font-extrabold text-orange-700">${inCartQty}</span>
                      <button onclick="App.updateCartQuantity('${item.id}', 1)" class="w-7 h-7 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors flex items-center justify-center shadow-sm">
                        +
                      </button>
                    </div>
                  `
                  : `
                    <button onclick="App.addToCart('${item.id}')" class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-orange-500/20 active:scale-95 flex items-center space-x-1">
                      <span>Add to Cart</span>
                    </button>
                  `
              }
            </div>
          </div>
        `;
      }).join("");
    }

    if (window.lucide) lucide.createIcons();
  },

  setCategory(cat) {
    State.activeCategory = cat;
    this.renderMenu();
  },

  setVegFilter(filter) {
    State.vegFilter = filter;
    document.querySelectorAll(".veg-filter-btn").forEach(btn => {
      if (btn.dataset.filter === filter) {
        btn.classList.add("bg-slate-900", "text-white");
        btn.classList.remove("bg-white", "text-slate-600");
      } else {
        btn.classList.remove("bg-slate-900", "text-white");
        btn.classList.add("bg-white", "text-slate-600");
      }
    });
    this.renderMenu();
  },

  // Cart Badge & Drawer
  updateCartBadge() {
    const totalCount = State.cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(b => {
      b.textContent = totalCount;
      if (totalCount > 0) {
        b.classList.remove("hidden");
      } else {
        b.classList.add("hidden");
      }
    });

    // Mobile floating cart button
    const floatBtn = document.getElementById("mobile-floating-cart");
    if (floatBtn) {
      if (totalCount > 0) {
        floatBtn.classList.remove("translate-y-28");
        floatBtn.classList.add("translate-y-0");
        const { total } = App.getCartTotals();
        document.getElementById("floating-cart-total").textContent = `₹${total.toFixed(2)}`;
        document.getElementById("floating-cart-count").textContent = `${totalCount} item${totalCount > 1 ? 's' : ''}`;
      } else {
        floatBtn.classList.add("translate-y-28");
        floatBtn.classList.remove("translate-y-0");
      }
    }
  },

  openCartDrawer() {
    this.renderCartDrawer();
    document.getElementById("cart-drawer").classList.remove("hidden");
    document.getElementById("cart-drawer-backdrop").classList.remove("hidden");
  },

  closeCartDrawer() {
    document.getElementById("cart-drawer").classList.add("hidden");
    document.getElementById("cart-drawer-backdrop").classList.add("hidden");
  },

  renderCartDrawer() {
    const itemsContainer = document.getElementById("cart-drawer-items");
    const summaryContainer = document.getElementById("cart-drawer-summary");
    if (!itemsContainer || !summaryContainer) return;

    if (State.cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="py-16 text-center">
          <div class="w-16 h-16 mx-auto mb-3 text-slate-300">
            <i data-lucide="shopping-bag" class="w-full h-full stroke-[1.5]"></i>
          </div>
          <h4 class="font-bold text-slate-700 text-sm">Your cart is empty</h4>
          <p class="text-xs text-slate-400 mt-1">Add items from the menu to build your meal</p>
        </div>
      `;
      summaryContainer.classList.add("hidden");
    } else {
      itemsContainer.innerHTML = State.cart.map(c => `
        <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div class="flex items-center space-x-3">
            <img src="${c.menuItem.imageUrl}" alt="${c.menuItem.name}" class="w-12 h-12 rounded-lg object-cover">
            <div>
              <h5 class="text-xs font-bold text-slate-800 leading-tight">${c.menuItem.name}</h5>
              <div class="text-[11px] text-slate-500 mt-0.5">₹${c.menuItem.price} each</div>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <div class="flex items-center border border-slate-200 bg-white rounded-lg">
              <button onclick="App.updateCartQuantity('${c.menuItem.id}', -1)" class="w-6 h-6 text-slate-600 font-bold hover:bg-slate-100 rounded-l flex items-center justify-center text-xs">
                -
              </button>
              <span class="w-6 text-center text-xs font-bold text-slate-800">${c.quantity}</span>
              <button onclick="App.updateCartQuantity('${c.menuItem.id}', 1)" class="w-6 h-6 text-slate-600 font-bold hover:bg-slate-100 rounded-r flex items-center justify-center text-xs">
                +
              </button>
            </div>
            <span class="text-xs font-bold text-slate-900 w-12 text-right">₹${c.menuItem.price * c.quantity}</span>
          </div>
        </div>
      `).join("");

      const { subtotal, tax, total } = App.getCartTotals();
      document.getElementById("cart-subtotal").textContent = `₹${subtotal.toFixed(2)}`;
      document.getElementById("cart-tax").textContent = `₹${tax.toFixed(2)}`;
      document.getElementById("cart-total").textContent = `₹${total.toFixed(2)}`;
      summaryContainer.classList.remove("hidden");
    }

    if (window.lucide) lucide.createIcons();
  },

  // Customer Orders View
  renderOrders() {
    const activeContainer = document.getElementById("active-orders-container");
    const historyContainer = document.getElementById("history-orders-container");
    if (!activeContainer || !historyContainer) return;

    if (!State.currentUser) {
      activeContainer.innerHTML = `
        <div class="text-center py-12">
          <p class="text-sm text-slate-500 mb-3">Please sign in to track and view your orders</p>
          <button onclick="UI.showLoginModal()" class="px-4 py-2 bg-orange-500 text-white rounded-xl text-xs font-bold">Sign In</button>
        </div>
      `;
      historyContainer.innerHTML = "";
      return;
    }

    const myOrders = State.db.orders.filter(o => o.userId === State.currentUser.id);
    const activeOrders = myOrders.filter(o => o.status === "pending" || o.status === "preparing" || o.status === "ready");
    const pastOrders = myOrders.filter(o => o.status === "completed" || o.status === "cancelled");

    // Render Active Orders with Stepper
    if (activeOrders.length === 0) {
      activeContainer.innerHTML = `
        <div class="text-center py-8 bg-white rounded-2xl border border-slate-200/80 p-6">
          <div class="w-12 h-12 text-slate-300 mx-auto mb-2">
            <i data-lucide="chef-hat" class="w-full h-full stroke-[1.5]"></i>
          </div>
          <h4 class="font-bold text-slate-700 text-sm">No active orders right now</h4>
          <p class="text-xs text-slate-400 mt-1">Place an order from the menu and track preparation live!</p>
          <button onclick="UI.switchTab('menu')" class="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm">
            Browse Menu
          </button>
        </div>
      `;
    } else {
      activeContainer.innerHTML = activeOrders.map(order => {
        const steps = [
          { key: "pending", label: "Order Received", desc: "Sent to kitchen" },
          { key: "preparing", label: "Preparing", desc: "Chef is cooking" },
          { key: "ready", label: "Ready for Pickup", desc: "Collect at counter" }
        ];

        const stepIndexes = { pending: 0, preparing: 1, ready: 2, completed: 3 };
        const currentIdx = stepIndexes[order.status] ?? 0;

        return `
          <div class="bg-white rounded-2xl border border-orange-100 shadow-md p-5 relative overflow-hidden">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">Token</span>
                <h3 class="text-lg font-extrabold text-slate-900 mt-0.5">${order.orderNumber}</h3>
                <span class="text-[11px] text-slate-400">Placed at ${new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div class="text-right">
                <span class="text-xs text-slate-400">Total Amount</span>
                <div class="text-base font-black text-slate-900">₹${order.totalAmount.toFixed(2)}</div>
                <span class="text-[10px] text-slate-500">Pay at Counter</span>
              </div>
            </div>

            <!-- Stepper Progress Bar -->
            <div class="py-6">
              <div class="relative flex items-center justify-between">
                <div class="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0"></div>
                <div class="absolute top-1/2 left-0 h-1 bg-orange-500 -translate-y-1/2 z-0 transition-all duration-500" style="width: ${currentIdx === 0 ? '0%' : currentIdx === 1 ? '50%' : '100%'}"></div>

                ${steps.map((step, idx) => {
                  const isDone = idx < currentIdx;
                  const isCurrent = idx === currentIdx;
                  return `
                    <div class="relative z-10 flex flex-col items-center">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent 
                          ? 'bg-orange-500 text-white ring-4 ring-orange-100 scale-110 shadow' 
                          : isDone 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-white border-2 border-slate-200 text-slate-400'
                      }">
                        ${isDone ? '✓' : idx + 1}
                      </div>
                      <span class="mt-2 text-[11px] font-bold ${isCurrent ? 'text-orange-600' : 'text-slate-600'}">${step.label}</span>
                      <span class="text-[9px] text-slate-400 hidden sm:block">${step.desc}</span>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>

            <!-- Order Item Details -->
            <div class="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4">
              <div class="text-xs font-bold text-slate-700 mb-2">Order Items:</div>
              <div class="space-y-1">
                ${order.items.map(it => `
                  <div class="flex justify-between text-xs text-slate-600">
                    <span>${it.quantity}x ${it.name}</span>
                    <span class="font-semibold text-slate-800">₹${it.total.toFixed(2)}</span>
                  </div>
                `).join("")}
              </div>
              ${order.specialInstructions ? `
                <div class="mt-2 pt-2 border-t border-slate-200 text-[11px] text-amber-700 italic">
                  Note: "${order.specialInstructions}"
                </div>
              ` : ''}
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-between pt-2">
              <button onclick="UI.showReceiptModal('${order.id}')" class="text-xs text-slate-500 hover:text-slate-800 font-semibold underline">
                View Receipt Slip
              </button>

              ${order.status === "pending" ? `
                <button onclick="App.cancelOrder('${order.id}')" class="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold transition-colors">
                  Cancel Order
                </button>
              ` : order.status === "ready" ? `
                <span class="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold animate-pulse">
                  Ready at Counter! Pick up now 🛎️
                </span>
              ` : `
                <span class="text-xs text-slate-400">Order in preparation</span>
              `}
            </div>
          </div>
        `;
      }).join("");
    }

    // Render Past Order History
    if (pastOrders.length === 0) {
      historyContainer.innerHTML = `<p class="text-xs text-slate-400 italic py-4">No completed orders yet.</p>`;
    } else {
      historyContainer.innerHTML = pastOrders.map(order => `
        <div class="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 transition-colors">
          <div>
            <div class="flex items-center space-x-2">
              <span class="font-bold text-xs text-slate-900">${order.orderNumber}</span>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
              }">
                ${order.status.toUpperCase()}
              </span>
            </div>
            <div class="text-[11px] text-slate-500 mt-1">
              ${new Date(order.createdAt).toLocaleDateString()} • ${order.items.length} items
            </div>
          </div>

          <div class="text-right">
            <div class="text-xs font-black text-slate-900">₹${order.totalAmount.toFixed(2)}</div>
            <button onclick="UI.showReceiptModal('${order.id}')" class="text-[11px] text-orange-600 hover:text-orange-700 font-bold mt-0.5">
              Receipt
            </button>
          </div>
        </div>
      `).join("");
    }

    if (window.lucide) lucide.createIcons();
  },

  // Kitchen Display System (KDS)
  renderKitchenBoard() {
    const pendingCol = document.getElementById("kitchen-pending-col");
    const preparingCol = document.getElementById("kitchen-preparing-col");
    const readyCol = document.getElementById("kitchen-ready-col");
    if (!pendingCol || !preparingCol || !readyCol) return;

    const allOrders = State.db.orders;
    const pending = allOrders.filter(o => o.status === "pending");
    const preparing = allOrders.filter(o => o.status === "preparing");
    const ready = allOrders.filter(o => o.status === "ready");

    // Update Top Counters
    document.getElementById("kds-count-pending").textContent = pending.length;
    document.getElementById("kds-count-preparing").textContent = preparing.length;
    document.getElementById("kds-count-ready").textContent = ready.length;

    // Helper for ticket cards
    const renderTicket = (order, actionBtn) => {
      const elapsedMins = Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 60000);
      const isUrgent = elapsedMins >= 15;

      return `
        <div class="bg-white rounded-xl border ${isUrgent ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'} p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span class="text-xs font-black text-slate-900">${order.orderNumber}</span>
                <div class="text-[10px] text-slate-500">${order.customerName} (${order.customerPhone})</div>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold ${isUrgent ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-600'}">
                ${elapsedMins}m ago
              </span>
            </div>

            <!-- Items checklist -->
            <div class="py-3 space-y-1.5">
              ${order.items.map(it => `
                <div class="flex items-start justify-between text-xs">
                  <span class="font-bold text-slate-800">${it.quantity}x ${it.name}</span>
                </div>
              `).join("")}
            </div>

            ${order.specialInstructions ? `
              <div class="p-2 bg-amber-50 rounded-lg text-[11px] text-amber-800 font-medium mb-3">
                ⚠️ Note: ${order.specialInstructions}
              </div>
            ` : ''}
          </div>

          <div class="pt-2 border-t border-slate-100">
            ${actionBtn}
          </div>
        </div>
      `;
    };

    // Pending Column
    pendingCol.innerHTML = pending.length === 0 
      ? '<p class="text-xs text-slate-400 text-center py-8">No pending orders in queue</p>'
      : pending.map(o => renderTicket(o, `
        <button onclick="App.advanceOrderStatus('${o.id}', 'preparing')" class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm">
          Start Preparing 👨‍🍳
        </button>
      `)).join("");

    // Preparing Column
    preparingCol.innerHTML = preparing.length === 0
      ? '<p class="text-xs text-slate-400 text-center py-8">No orders currently cooking</p>'
      : preparing.map(o => renderTicket(o, `
        <button onclick="App.advanceOrderStatus('${o.id}', 'ready')" class="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm">
          Mark as Ready 🔔
        </button>
      `)).join("");

    // Ready Column
    readyCol.innerHTML = ready.length === 0
      ? '<p class="text-xs text-slate-400 text-center py-8">No orders waiting for pickup</p>'
      : ready.map(o => renderTicket(o, `
        <button onclick="App.advanceOrderStatus('${o.id}', 'completed')" class="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm">
          Picked Up / Completed ✅
        </button>
      `)).join("");

    if (window.lucide) lucide.createIcons();
  },

  // Admin Console Main
  renderAdmin() {
    this.switchAdminSubTab(State.adminSubTab);
  },

  renderAdminDashboard() {
    const orders = State.db.orders;
    const completedOrders = orders.filter(o => o.status === "completed");

    const totalSales = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const totalOrdersCount = orders.length;
    const pendingOrdersCount = orders.filter(o => o.status === "pending" || o.status === "preparing").length;
    const totalMenuItemsCount = State.db.menuItems.length;

    document.getElementById("kpi-total-sales").textContent = `₹${totalSales.toFixed(2)}`;
    document.getElementById("kpi-total-orders").textContent = totalOrdersCount;
    document.getElementById("kpi-pending-orders").textContent = pendingOrdersCount;
    document.getElementById("kpi-menu-items").textContent = totalMenuItemsCount;

    // Render Recent 5 Orders Table
    const recentTable = document.getElementById("admin-recent-orders-table");
    if (recentTable) {
      const recent = orders.slice(0, 5);
      recentTable.innerHTML = recent.map(o => `
        <tr class="border-b border-slate-100 text-xs">
          <td class="py-3 px-3 font-bold text-slate-800">${o.orderNumber}</td>
          <td class="py-3 px-3 text-slate-600">${o.customerName}</td>
          <td class="py-3 px-3 text-slate-500">${o.items.length} items</td>
          <td class="py-3 px-3 font-bold text-slate-900">₹${o.totalAmount.toFixed(2)}</td>
          <td class="py-3 px-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
              o.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
              o.status === 'ready' ? 'bg-purple-100 text-purple-700' :
              o.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
              o.status === 'cancelled' ? 'bg-rose-100 text-rose-700' :
              'bg-amber-100 text-amber-700'
            }">
              ${o.status.toUpperCase()}
            </span>
          </td>
        </tr>
      `).join("");
    }

    // Initialize or Update Charts
    this.initAdminCharts();
  },

  initAdminCharts() {
    if (typeof Chart === "undefined") return;

    // 1. Weekly Sales Chart
    const salesCanvas = document.getElementById("admin-sales-chart");
    if (salesCanvas) {
      if (State.chartInstances.salesChart) {
        State.chartInstances.salesChart.destroy();
      }

      // Generate simulated last 7 days sales
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const salesData = [1240, 1890, 2150, 1780, 2640, 3120, 2480];

      State.chartInstances.salesChart = new Chart(salesCanvas, {
        type: "line",
        data: {
          labels: days,
          datasets: [{
            label: "Sales Revenue (₹)",
            data: salesData,
            borderColor: "#f97316",
            backgroundColor: "rgba(249, 115, 22, 0.1)",
            fill: true,
            tension: 0.35,
            borderWidth: 2,
            pointBackgroundColor: "#f97316"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { callback: v => `₹${v}` }
            }
          }
        }
      });
    }

    // 2. Category Share Pie Chart
    const categoryCanvas = document.getElementById("admin-category-chart");
    if (categoryCanvas) {
      if (State.chartInstances.categoryChart) {
        State.chartInstances.categoryChart.destroy();
      }

      State.chartInstances.categoryChart = new Chart(categoryCanvas, {
        type: "doughnut",
        data: {
          labels: ["Breakfast", "Lunch", "Snacks", "Beverages"],
          datasets: [{
            data: [25, 40, 20, 15],
            backgroundColor: ["#f59e0b", "#f97316", "#3b82f6", "#10b981"],
            borderWidth: 2,
            borderColor: "#ffffff"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10 } } }
          }
        }
      });
    }
  },

  renderAdminMenuTable() {
    const tableBody = document.getElementById("admin-menu-table-body");
    if (!tableBody) return;

    tableBody.innerHTML = State.db.menuItems.map(item => `
      <tr class="border-b border-slate-100 hover:bg-slate-50/50 text-xs transition-colors">
        <td class="py-2.5 px-3">
          <img src="${item.imageUrl}" alt="${item.name}" class="w-10 h-10 rounded-lg object-cover">
        </td>
        <td class="py-2.5 px-3 font-bold text-slate-800">
          ${item.name}
          ${item.isSpecial ? '<span class="ml-1 text-[9px] bg-orange-100 text-orange-700 px-1 py-0.5 rounded font-bold">Special</span>' : ''}
        </td>
        <td class="py-2.5 px-3 text-slate-600">${item.category}</td>
        <td class="py-2.5 px-3 font-black text-slate-900">₹${item.price}</td>
        <td class="py-2.5 px-3">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${item.isVeg ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}">
            ${item.isVeg ? 'Veg' : 'Non-Veg'}
          </span>
        </td>
        <td class="py-2.5 px-3">
          <button onclick="App.toggleMenuAvailability('${item.id}')" class="px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
            item.isAvailable 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' 
              : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
          }">
            ${item.isAvailable ? '● In Stock' : '○ Sold Out'}
          </button>
        </td>
        <td class="py-2.5 px-3 text-right space-x-1">
          <button onclick="UI.showEditMenuItemModal('${item.id}')" class="p-1 text-slate-400 hover:text-blue-600 transition-colors" title="Edit">
            <i data-lucide="edit-3" class="w-4 h-4"></i>
          </button>
          <button onclick="App.deleteMenuItem('${item.id}')" class="p-1 text-slate-400 hover:text-red-600 transition-colors" title="Delete">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </td>
      </tr>
    `).join("");

    if (window.lucide) lucide.createIcons();
  },

  renderAdminOrdersTable() {
    const tableBody = document.getElementById("admin-orders-table-body");
    if (!tableBody) return;

    tableBody.innerHTML = State.db.orders.map(order => `
      <tr class="border-b border-slate-100 hover:bg-slate-50/50 text-xs">
        <td class="py-3 px-3 font-bold text-slate-800">${order.orderNumber}</td>
        <td class="py-3 px-3">
          <div class="font-semibold text-slate-800">${order.customerName}</div>
          <div class="text-[10px] text-slate-400">${order.customerPhone}</div>
        </td>
        <td class="py-3 px-3 text-slate-600">
          ${order.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}
        </td>
        <td class="py-3 px-3 font-black text-slate-900">₹${order.totalAmount.toFixed(2)}</td>
        <td class="py-3 px-3">
          <select onchange="App.advanceOrderStatus('${order.id}', this.value)" class="text-xs font-semibold rounded-lg border border-slate-200 py-1 px-2 bg-white focus:outline-none focus:ring-1 focus:ring-orange-500">
            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
            <option value="preparing" ${order.status === 'preparing' ? 'selected' : ''}>Preparing</option>
            <option value="ready" ${order.status === 'ready' ? 'selected' : ''}>Ready for Pickup</option>
            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td class="py-3 px-3 text-slate-400 text-[10px]">
          ${new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </td>
      </tr>
    `).join("");
  },

  renderAdminReports() {
    const completedOrders = State.db.orders.filter(o => o.status === "completed");
    
    const grossSales = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const taxCollected = completedOrders.reduce((sum, o) => sum + o.taxAmount, 0);
    const netSales = completedOrders.reduce((sum, o) => sum + o.subtotal, 0);
    const totalOrdersCount = completedOrders.length;
    const aov = totalOrdersCount > 0 ? (grossSales / totalOrdersCount) : 0;

    document.getElementById("report-gross-sales").textContent = `₹${grossSales.toFixed(2)}`;
    document.getElementById("report-tax-collected").textContent = `₹${taxCollected.toFixed(2)}`;
    document.getElementById("report-net-sales").textContent = `₹${netSales.toFixed(2)}`;
    document.getElementById("report-order-volume").textContent = totalOrdersCount;
    document.getElementById("report-aov").textContent = `₹${aov.toFixed(2)}`;

    // Breakdown table
    const reportTable = document.getElementById("admin-report-table-body");
    if (reportTable) {
      reportTable.innerHTML = completedOrders.map(o => `
        <tr class="border-b border-slate-100 text-xs">
          <td class="py-2.5 px-3 font-semibold text-slate-800">${new Date(o.createdAt).toLocaleDateString()}</td>
          <td class="py-2.5 px-3 font-bold text-slate-900">${o.orderNumber}</td>
          <td class="py-2.5 px-3 text-slate-600">${o.customerName}</td>
          <td class="py-2.5 px-3 text-slate-700">₹${o.subtotal.toFixed(2)}</td>
          <td class="py-2.5 px-3 text-slate-500">₹${o.taxAmount.toFixed(2)}</td>
          <td class="py-2.5 px-3 font-black text-slate-900">₹${o.totalAmount.toFixed(2)}</td>
          <td class="py-2.5 px-3 text-slate-500">Pay on Pickup</td>
        </tr>
      `).join("");
    }
  },

  exportReportCSV() {
    const completedOrders = State.db.orders.filter(o => o.status === "completed");
    if (completedOrders.length === 0) {
      this.toast("No completed sales to export", "error");
      return;
    }

    const headers = ["Order Number", "Date", "Customer Name", "Items", "Subtotal (INR)", "5% GST (INR)", "Total (INR)", "Payment Method"];
    const rows = completedOrders.map(o => [
      o.orderNumber,
      new Date(o.createdAt).toLocaleDateString(),
      `"${o.customerName}"`,
      `"${o.items.map(i => `${i.quantity}x ${i.name}`).join("; ")}"`,
      o.subtotal.toFixed(2),
      o.taxAmount.toFixed(2),
      o.totalAmount.toFixed(2),
      o.paymentMethod
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Canteen_Sales_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.toast("Sales report CSV exported successfully!", "success");
  },

  printReport() {
    window.print();
  },

  // Modals
  showLoginModal() {
    document.getElementById("login-modal").classList.remove("hidden");
  },

  closeLoginModal() {
    document.getElementById("login-modal").classList.add("hidden");
  },

  showRegisterTab() {
    document.getElementById("auth-login-view").classList.add("hidden");
    document.getElementById("auth-register-view").classList.remove("hidden");
    document.getElementById("auth-reset-view").classList.add("hidden");
  },

  showLoginTab() {
    document.getElementById("auth-login-view").classList.remove("hidden");
    document.getElementById("auth-register-view").classList.add("hidden");
    document.getElementById("auth-reset-view").classList.add("hidden");
  },

  showResetPasswordTab() {
    document.getElementById("auth-login-view").classList.add("hidden");
    document.getElementById("auth-register-view").classList.add("hidden");
    document.getElementById("auth-reset-view").classList.remove("hidden");
  },

  showOrderConfirmationModal(order) {
    const modal = document.getElementById("order-confirmed-modal");
    if (!modal) return;

    document.getElementById("conf-order-number").textContent = order.orderNumber;
    document.getElementById("conf-order-total").textContent = `₹${order.totalAmount.toFixed(2)}`;
    document.getElementById("conf-order-items").innerHTML = order.items.map(i => `
      <div class="flex justify-between text-xs py-1 text-slate-600">
        <span>${i.quantity}x ${i.name}</span>
        <span class="font-bold">₹${i.total.toFixed(2)}</span>
      </div>
    `).join("");

    modal.classList.remove("hidden");
  },

  closeOrderConfirmationModal() {
    document.getElementById("order-confirmed-modal").classList.add("hidden");
    this.switchTab("orders");
  },

  showReceiptModal(orderId) {
    const order = State.db.orders.find(o => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById("receipt-modal");
    if (!modal) return;

    document.getElementById("rec-order-number").textContent = order.orderNumber;
    document.getElementById("rec-customer").textContent = `${order.customerName} (${order.customerPhone})`;
    document.getElementById("rec-date").textContent = new Date(order.createdAt).toLocaleString();
    document.getElementById("rec-status").textContent = order.status.toUpperCase();
    document.getElementById("rec-items").innerHTML = order.items.map(i => `
      <div class="flex justify-between text-xs py-1 border-b border-dashed border-slate-200">
        <span>${i.quantity}x ${i.name}</span>
        <span class="font-bold">₹${i.total.toFixed(2)}</span>
      </div>
    `).join("");

    document.getElementById("rec-subtotal").textContent = `₹${order.subtotal.toFixed(2)}`;
    document.getElementById("rec-tax").textContent = `₹${order.taxAmount.toFixed(2)}`;
    document.getElementById("rec-total").textContent = `₹${order.totalAmount.toFixed(2)}`;

    modal.classList.remove("hidden");
  },

  closeReceiptModal() {
    document.getElementById("receipt-modal").classList.add("hidden");
  },

  showAddMenuItemModal() {
    document.getElementById("menu-modal-title").textContent = "Add Food Item";
    document.getElementById("menu-form-id").value = "";
    document.getElementById("menu-form-name").value = "";
    document.getElementById("menu-form-category").value = "Breakfast";
    document.getElementById("menu-form-price").value = "";
    document.getElementById("menu-form-prep").value = "10";
    document.getElementById("menu-form-desc").value = "";
    document.getElementById("menu-form-image-url").value = "";
    document.getElementById("menu-form-veg").checked = true;
    document.getElementById("menu-form-available").checked = true;
    document.getElementById("menu-form-special").checked = false;
    document.getElementById("menu-item-modal").classList.remove("hidden");
  },

  showEditMenuItemModal(itemId) {
    const item = State.db.menuItems.find(m => m.id === itemId);
    if (!item) return;

    document.getElementById("menu-modal-title").textContent = "Edit Food Item";
    document.getElementById("menu-form-id").value = item.id;
    document.getElementById("menu-form-name").value = item.name;
    document.getElementById("menu-form-category").value = item.category;
    document.getElementById("menu-form-price").value = item.price;
    document.getElementById("menu-form-prep").value = item.prepTimeMins || 10;
    document.getElementById("menu-form-desc").value = item.description || "";
    document.getElementById("menu-form-image-url").value = item.imageUrl || "";
    document.getElementById("menu-form-veg").checked = item.isVeg;
    document.getElementById("menu-form-available").checked = item.isAvailable;
    document.getElementById("menu-form-special").checked = item.isSpecial || false;
    document.getElementById("menu-item-modal").classList.remove("hidden");
  },

  closeMenuItemModal() {
    document.getElementById("menu-item-modal").classList.add("hidden");
  },

  handleMenuItemFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById("menu-form-id").value;
    const name = document.getElementById("menu-form-name").value.trim();
    const category = document.getElementById("menu-form-category").value;
    const price = parseFloat(document.getElementById("menu-form-price").value);
    const prepTimeMins = parseInt(document.getElementById("menu-form-prep").value) || 10;
    const description = document.getElementById("menu-form-desc").value.trim();
    let imageUrl = document.getElementById("menu-form-image-url").value.trim();
    const isVeg = document.getElementById("menu-form-veg").checked;
    const isAvailable = document.getElementById("menu-form-available").checked;
    const isSpecial = document.getElementById("menu-form-special").checked;

    // Check file upload input
    const fileInput = document.getElementById("menu-form-image-file");
    if (fileInput && fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        imageUrl = event.target.result;
        App.saveMenuItem({ id, name, category, price, prepTimeMins, description, imageUrl, isVeg, isAvailable, isSpecial });
        UI.closeMenuItemModal();
      };
      reader.readAsDataURL(fileInput.files[0]);
      return;
    }

    if (!imageUrl) {
      imageUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80";
    }

    const success = App.saveMenuItem({ id, name, category, price, prepTimeMins, description, imageUrl, isVeg, isAvailable, isSpecial });
    if (success) {
      UI.closeMenuItemModal();
    }
  },

  // Toast Notification System
  toast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toastEl = document.createElement("div");
    const bgColors = {
      success: "bg-emerald-600 text-white",
      error: "bg-rose-600 text-white",
      info: "bg-slate-900 text-white"
    };

    toastEl.className = `px-4 py-3 rounded-xl shadow-lg text-xs font-semibold flex items-center space-x-2 transition-all duration-300 transform translate-y-2 opacity-0 ${bgColors[type] || bgColors.info}`;
    toastEl.innerHTML = `
      <span>${type === 'success' ? '✓' : type === 'error' ? '⚠️' : 'ℹ️'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toastEl);
    setTimeout(() => {
      toastEl.classList.remove("translate-y-2", "opacity-0");
    }, 10);

    setTimeout(() => {
      toastEl.classList.add("opacity-0", "translate-y-2");
      setTimeout(() => toastEl.remove(), 300);
    }, 3500);
  }
};

// Bootstrap application once DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
