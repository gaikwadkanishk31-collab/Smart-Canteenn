/**
 * Smart Canteen REST API Server
 * Node.js + Express + SQLite
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..')));

// Database Connection
const dbFile = path.join(__dirname, 'canteen.db');
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('Failed to open database:', err.message);
  } else {
    console.log('Connected to SQLite canteen database.');
    initializeDatabase();
  }
});

// Run Schema and Seed
function initializeDatabase() {
  const schemaSql = fs.readFileSync(path.join(__dirname, 'db', 'schema.sql'), 'utf-8');
  db.exec(schemaSql, (err) => {
    if (err) {
      console.error('Schema initialization error:', err.message);
      return;
    }
    // Check if seeded
    db.get("SELECT COUNT(*) AS count FROM menu_items", (err, row) => {
      if (!err && row && row.count === 0) {
        const seedSql = fs.readFileSync(path.join(__dirname, 'db', 'seed.sql'), 'utf-8');
        db.exec(seedSql, (seedErr) => {
          if (seedErr) console.error('Seed error:', seedErr.message);
          else console.log('Database seeded successfully.');
        });
      }
    });
  });
}

// Routes
// 1. Auth Route
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT id, full_name, email, phone, role, college_id FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });
    
    // In production, compare with bcrypt: bcrypt.compareSync(password, user.password_hash)
    res.json({
      success: true,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        collegeId: user.college_id
      },
      token: `demo-jwt-token-${user.id}`
    });
  });
});

app.post('/api/auth/register', (req, res) => {
  const { fullName, email, phone, collegeId, role, password } = req.body;
  const id = `usr-${Date.now()}`;
  const sql = `INSERT INTO users (id, full_name, email, phone, college_id, role, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [id, fullName, email, phone, collegeId, role || 'customer', password], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.json({
      success: true,
      user: { id, fullName, email, phone, collegeId, role: role || 'customer' }
    });
  });
});

// 2. Menu Routes
app.get('/api/menu', (req, res) => {
  db.all('SELECT * FROM menu_items ORDER BY category, name', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const formatted = rows.map(r => ({
      id: r.id,
      name: r.name,
      category: r.category,
      price: r.price,
      description: r.description,
      imageUrl: r.image_url,
      isVeg: Boolean(r.is_veg),
      isAvailable: Boolean(r.is_available),
      isSpecial: Boolean(r.is_special),
      prepTimeMins: r.prep_time_mins
    }));
    res.json(formatted);
  });
});

app.post('/api/menu', (req, res) => {
  const { name, category, price, description, imageUrl, isVeg, isAvailable, isSpecial, prepTimeMins } = req.body;
  const id = `item-${Date.now()}`;
  const sql = `INSERT INTO menu_items (id, name, category, price, description, image_url, is_veg, is_available, is_special, prep_time_mins)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.run(sql, [id, name, category, price, description, imageUrl, isVeg ? 1 : 0, isAvailable ? 1 : 0, isSpecial ? 1 : 0, prepTimeMins || 10], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id });
  });
});

app.patch('/api/menu/:id/toggle', (req, res) => {
  const { id } = req.params;
  db.run('UPDATE menu_items SET is_available = CASE WHEN is_available = 1 THEN 0 ELSE 1 END WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.delete('/api/menu/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM menu_items WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// 3. Orders Routes
app.get('/api/orders', (req, res) => {
  const sql = `SELECT * FROM orders ORDER BY created_at DESC`;
  db.all(sql, [], (err, orders) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Fetch items
    db.all('SELECT * FROM order_items', [], (err, items) => {
      if (err) return res.status(500).json({ error: err.message });
      const itemsMap = {};
      items.forEach(it => {
        if (!itemsMap[it.order_id]) itemsMap[it.order_id] = [];
        itemsMap[it.order_id].push({
          id: it.id,
          name: it.item_name,
          price: it.unit_price,
          quantity: it.quantity,
          total: it.total_price
        });
      });

      const response = orders.map(o => ({
        id: o.id,
        orderNumber: o.order_number,
        userId: o.user_id,
        customerName: o.customer_name,
        customerPhone: o.customer_phone,
        status: o.status,
        subtotal: o.subtotal,
        taxAmount: o.tax_amount,
        totalAmount: o.total_amount,
        paymentMethod: o.payment_method,
        specialInstructions: o.special_instructions,
        createdAt: o.created_at,
        completedAt: o.completed_at,
        items: itemsMap[o.id] || []
      }));
      res.json(response);
    });
  });
});

app.post('/api/orders', (req, res) => {
  const { userId, customerName, customerPhone, items, specialInstructions } = req.body;
  if (!items || items.length === 0) return res.status(400).json({ error: 'Order must contain items' });

  const subtotal = items.reduce((sum, it) => sum + (it.price * it.quantity), 0);
  const tax = Math.round(subtotal * 0.05 * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;
  const orderId = `ord-${Date.now()}`;
  const orderNumber = `#CAN-${Math.floor(1000 + Math.random() * 9000)}`;

  const orderSql = `INSERT INTO orders (id, order_number, user_id, customer_name, customer_phone, status, subtotal, tax_amount, total_amount, payment_method, special_instructions)
                    VALUES (?, ?, ?, ?, ?, 'pending', ?, ?, ?, 'cash_at_counter', ?)`;

  db.run(orderSql, [orderId, orderNumber, userId, customerName, customerPhone, subtotal, tax, total, specialInstructions || ''], function(err) {
    if (err) return res.status(500).json({ error: err.message });

    const itemStmt = db.prepare(`INSERT INTO order_items (id, order_id, menu_item_id, item_name, unit_price, quantity, total_price) VALUES (?, ?, ?, ?, ?, ?, ?)`);
    items.forEach((it, idx) => {
      itemStmt.run([`oi-${Date.now()}-${idx}`, orderId, it.menuItemId, it.name, it.price, it.quantity, it.price * it.quantity]);
    });
    itemStmt.finalize();

    res.json({
      success: true,
      order: {
        id: orderId,
        orderNumber,
        status: 'pending',
        subtotal,
        taxAmount: tax,
        totalAmount: total,
        items
      }
    });
  });
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const completedAt = status === 'completed' ? new Date().toISOString() : null;

  db.run('UPDATE orders SET status = ?, completed_at = COALESCE(?, completed_at) WHERE id = ?', [status, completedAt, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, status });
  });
});

// 4. Reports & Analytics
app.get('/api/admin/reports', (req, res) => {
  const sql = `SELECT * FROM orders WHERE status = 'completed' ORDER BY created_at DESC`;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const grossSales = rows.reduce((sum, r) => sum + r.total_amount, 0);
    const taxCollected = rows.reduce((sum, r) => sum + r.tax_amount, 0);
    const netSales = rows.reduce((sum, r) => sum + r.subtotal, 0);

    res.json({
      summary: {
        grossSales,
        taxCollected,
        netSales,
        orderCount: rows.length,
        aov: rows.length > 0 ? (grossSales / rows.length) : 0
      },
      transactions: rows
    });
  });
});

// Fallback to index.html for Single Page Application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Smart Canteen Server running on http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
