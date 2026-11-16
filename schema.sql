-- =======================================================
-- Smart Canteen Management System - Production SQL Schema
-- Compatible with PostgreSQL, MySQL 8.0, and SQLite
-- =======================================================

-- 1. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(30) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    display_order INT DEFAULT 0
);

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) NOT NULL CHECK (role IN ('customer', 'kitchen', 'admin')),
    wallet_balance DECIMAL(10,2) NOT NULL DEFAULT 500.00 CHECK (wallet_balance >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    category_id VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    image_url TEXT NOT NULL,
    is_veg BOOLEAN NOT NULL DEFAULT 1,
    is_available BOOLEAN NOT NULL DEFAULT 1,
    prep_time_minutes INT NOT NULL DEFAULT 10,
    is_special BOOLEAN NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(20) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(150) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) NOT NULL,
    grand_total DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('wallet', 'cash')),
    payment_status VARCHAR(20) NOT NULL CHECK (payment_status IN ('paid', 'pending', 'refunded')),
    order_status VARCHAR(20) NOT NULL CHECK (order_status IN ('pending', 'preparing', 'ready', 'delivered', 'cancelled')),
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 5. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(20) NOT NULL,
    menu_item_id VARCHAR(36) NOT NULL,
    item_name VARCHAR(120) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    item_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- 6. High-Performance Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_menu_category ON menu_items(category_id, is_available);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
