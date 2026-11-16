/**
 * Smart Canteen Management System - Production Node.js & Express REST API Server
 */

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend assets from public/
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory Database / Cache (Backed by seed data)
const db = {
  users: [
    { id: 'usr_student', name: 'Kanishk Sharma', email: 'student@canteen.edu', password: 'Student@123', role: 'customer', wallet: 450.00 },
    { id: 'usr_kitchen', name: 'Chef Ramesh', email: 'kitchen@canteen.edu', password: 'Kitchen@123', role: 'kitchen', wallet: 0.00 },
    { id: 'usr_admin', name: 'Prof. C.K. Mehta', email: 'admin@canteen.edu', password: 'Admin@123', role: 'admin', wallet: 0.00 }
  ],
  orders: [],
  menuItems: []
};

// ================= REST API ROUTES =================

// Auth: Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }
  return res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role, wallet: user.wallet } });
});

// Auth: Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
  }
  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, message: 'Account with this email already exists.' });
  }
  const newUser = {
    id: 'usr_' + Date.now(),
    name,
    email: email.toLowerCase(),
    password,
    phone: phone || '',
    role: 'customer',
    wallet: 500.00
  };
  db.users.push(newUser);
  return res.json({ success: true, user: newUser });
});

// Wallet: Top-Up
app.post('/api/wallet/topup', (req, res) => {
  const { userId, amount } = req.body;
  const user = db.users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
  user.wallet += parseFloat(amount);
  return res.json({ success: true, new_balance: user.wallet });
});

// Orders: Create
app.post('/api/orders', (req, res) => {
  const { userId, items, paymentMethod, notes } = req.body;
  const user = db.users.find(u => u.id === userId) || db.users[0];
  
  const subtotal = items.reduce((sum, i) => sum + (i.unit_price * i.quantity), 0);
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + tax;

  if (paymentMethod === 'wallet') {
    if (user.wallet < grandTotal) {
      return res.status(400).json({ success: false, message: 'Insufficient wallet balance.' });
    }
    user.wallet -= grandTotal;
  }

  const newOrder = {
    id: 'ORD-' + Math.floor(100 + Math.random() * 900),
    user_id: user.id,
    customer_name: user.name,
    customer_email: user.email,
    subtotal,
    tax_amount: tax,
    grand_total: grandTotal,
    payment_method: paymentMethod,
    payment_status: paymentMethod === 'wallet' ? 'paid' : 'pending',
    order_status: 'pending',
    special_instructions: notes || '',
    items,
    created_at: new Date().toISOString()
  };

  db.orders.unshift(newOrder);
  return res.status(201).json({ success: true, order: newOrder });
});

// Orders: List
app.get('/api/orders', (req, res) => {
  return res.json({ success: true, orders: db.orders });
});

// Orders: Update Status
app.put('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = db.orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });

  order.order_status = status;
  if (status === 'delivered' && order.payment_method === 'cash') {
    order.payment_status = 'paid';
  }
  return res.json({ success: true, order });
});

// SPA Fallback: send index.html for any unhandled routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Smart Canteen Server running at http://localhost:${PORT}`);
});
