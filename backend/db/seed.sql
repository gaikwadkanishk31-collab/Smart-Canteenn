-- Seed Data for Smart Canteen Management System

-- Insert Users
INSERT OR IGNORE INTO users (id, full_name, email, phone, password_hash, role, college_id)
VALUES 
('usr-admin', 'Sunita Verma', 'admin@canteen.edu', '9876500001', '$2a$10$AdminHashSample', 'admin', 'ADM-001'),
('usr-staff', 'Chef Ramesh Kumar', 'kitchen@canteen.edu', '9876500002', '$2a$10$KitchenHashSample', 'staff', 'STF-102'),
('usr-student', 'Aarav Sharma', 'student@canteen.edu', '9876543210', '$2a$10$StudentHashSample', 'customer', 'CS-2024-042');

-- Insert Menu Items
INSERT OR IGNORE INTO menu_items (id, category, name, description, price, image_url, is_veg, is_available, is_special, prep_time_mins)
VALUES
('item-101', 'Breakfast', 'Crispy Masala Dosa', 'Golden rice crepe filled with spiced potato masala, served with fresh coconut chutney and hot sambar.', 65.0, 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80', 1, 1, 1, 10),
('item-102', 'Breakfast', 'Idli Vada Sambar Combo', 'Two steamed soft idlis and one crispy medu vada with authentic lentil sambar and coriander dip.', 50.0, 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80', 1, 1, 0, 5),
('item-103', 'Breakfast', 'Stuffed Paneer Paratha', 'Whole wheat flatbread stuffed with spiced cottage cheese, served with fresh curd and pickle.', 70.0, 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600&auto=format&fit=crop&q=80', 1, 1, 0, 12),
('item-104', 'Breakfast', 'Double Egg Cheese Omelette', 'Fluffy two-egg omelette with melted cheddar, diced onions, served with two butter toasts.', 60.0, 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80', 0, 1, 0, 8),

('item-201', 'Lunch', 'Royal Veg Thali', 'Complete meal: Paneer curry, Dal Tadka, Seasonal Sabzi, Jeera Rice, 3 Butter Rotis, Gulab Jamun & Salad.', 110.0, 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600&auto=format&fit=crop&q=80', 1, 1, 1, 12),
('item-202', 'Lunch', 'Dum Chicken Biryani', 'Fragrant basmati rice slow-cooked with spiced chicken chunks, served with cooling onion raita.', 140.0, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80', 0, 1, 1, 15),
('item-203', 'Lunch', 'Homestyle Rajma Chawal', 'Slow-cooked red kidney beans in spiced tomato gravy served over aromatic steamed basmati rice.', 80.0, 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80', 1, 1, 0, 7),
('item-204', 'Lunch', 'Paneer Butter Masala Combo', 'Cottage cheese cubes in creamy makhani gravy paired with 2 fluffy garlic naans and salad.', 120.0, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80', 1, 1, 0, 12),

('item-301', 'Snacks', 'Crispy Samosa Platter (2 pcs)', 'Golden flaky pastry stuffed with seasoned potatoes and peas, served with sweet and spicy chutneys.', 30.0, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80', 1, 1, 0, 5),
('item-302', 'Snacks', 'Bombay Cheese Grilled Sandwich', 'Toasted sandwich loaded with potato masala, veggies, tangy green chutney, and melted mozzarella.', 55.0, 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80', 1, 1, 0, 8),
('item-303', 'Snacks', 'Spicy Chicken Kathi Roll', 'Juicy chicken tikka cubes rolled in flaky paratha with sliced red onions and mint mayo.', 85.0, 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80', 0, 1, 0, 10),
('item-304', 'Snacks', 'Butter Pav Bhaji', 'Thick spiced mashed vegetable gravy topped with butter, served with two toasted soft pavs and lemon.', 75.0, 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=80', 1, 0, 0, 10),

('item-401', 'Beverages', 'Kadak Masala Chai', 'Freshly brewed Indian tea infused with ginger, cardamom, and clove.', 15.0, 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80', 1, 1, 0, 3),
('item-402', 'Beverages', 'South Indian Filter Coffee', 'Traditional frothy chicory blend drip coffee served in stainless steel tumbler and dabara.', 25.0, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80', 1, 1, 0, 4),
('item-403', 'Beverages', 'Cold Coffee with Vanilla Float', 'Rich blended chilled espresso, milk, and chocolate syrup crowned with a scoop of vanilla ice cream.', 65.0, 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80', 1, 1, 1, 5),
('item-404', 'Beverages', 'Sweet Mango Lassi', 'Thick, creamy churned yogurt blended with Alphonso mango pulp and garnished with pistachio flakes.', 45.0, 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80', 1, 1, 0, 4);

-- Insert Sample Orders
INSERT OR IGNORE INTO orders (id, order_number, user_id, customer_name, customer_phone, status, subtotal, tax_amount, total_amount, payment_method, special_instructions)
VALUES
('ord-1001', '#CAN-8401', 'usr-student', 'Aarav Sharma', '9876543210', 'completed', 140.0, 7.0, 147.0, 'cash_at_counter', 'Extra pickle with thali'),
('ord-1002', '#CAN-8402', 'usr-student', 'Aarav Sharma', '9876543210', 'ready', 205.0, 10.25, 215.25, 'cash_at_counter', 'Extra raita'),
('ord-1003', '#CAN-8403', 'usr-student', 'Aarav Sharma', '9876543210', 'preparing', 180.0, 9.0, 189.0, 'cash_at_counter', 'Make dosa crisp'),
('ord-1004', '#CAN-8404', 'usr-student', 'Aarav Sharma', '9876543210', 'pending', 45.0, 2.25, 47.25, 'cash_at_counter', 'Less sugar in tea');

-- Insert Order Items
INSERT OR IGNORE INTO order_items (id, order_id, menu_item_id, item_name, unit_price, quantity, total_price)
VALUES
('oi-1', 'ord-1001', 'item-201', 'Royal Veg Thali', 110.0, 1, 110.0),
('oi-2', 'ord-1001', 'item-401', 'Kadak Masala Chai', 15.0, 2, 30.0),
('oi-3', 'ord-1002', 'item-202', 'Dum Chicken Biryani', 140.0, 1, 140.0),
('oi-4', 'ord-1002', 'item-403', 'Cold Coffee with Vanilla Float', 65.0, 1, 65.0),
('oi-5', 'ord-1003', 'item-101', 'Crispy Masala Dosa', 65.0, 2, 130.0),
('oi-6', 'ord-1003', 'item-402', 'South Indian Filter Coffee', 25.0, 2, 50.0),
('oi-7', 'ord-1004', 'item-301', 'Crispy Samosa Platter (2 pcs)', 30.0, 1, 30.0),
('oi-8', 'ord-1004', 'item-401', 'Kadak Masala Chai', 15.0, 1, 15.0);
