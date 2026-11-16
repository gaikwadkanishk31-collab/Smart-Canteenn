/**
 * Smart Canteen Management System - Seed Dataset
 */

const SEED_DATA = {
  categories: [
    { id: 'all', name: 'All Dishes', icon: 'sparkles' },
    { id: 'breakfast', name: 'Breakfast', icon: 'coffee' },
    { id: 'lunch', name: 'Lunch & Meals', icon: 'soup' },
    { id: 'snacks', name: 'Snacks & Quick Bites', icon: 'sandwich' },
    { id: 'beverages', name: 'Beverages & Desserts', icon: 'cup-soda' }
  ],

  menuItems: [
    {
      id: 'itm_001',
      name: 'Crispy Masala Dosa',
      category_id: 'breakfast',
      price: 65.00,
      description: 'Golden fermented rice crepe filled with spiced potato masala, served with coconut chutney and tangy sambar.',
      image_url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80',
      is_veg: true,
      is_available: true,
      prep_time_minutes: 8,
      is_special: true
    },
    {
      id: 'itm_002',
      name: 'Steamed Idli Sambar (3 Pcs)',
      category_id: 'breakfast',
      price: 45.00,
      description: 'Pillowy soft steamed rice cakes soaked in aromatic drumstick sambar and coconut-mint chutney.',
      image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
      is_veg: true,
      is_available: true,
      prep_time_minutes: 5,
      is_special: false
    },
    {
      id: 'itm_003',
      name: 'Paneer Butter Masala Thali',
      category_id: 'lunch',
      price: 130.00,
      description: 'Rich cottage cheese cubes in buttery tomato gravy, accompanied by 2 butter rotis, steamed basmati rice, dal tadka, and salad.',
      image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80',
      is_veg: true,
      is_available: true,
      prep_time_minutes: 12,
      is_special: true
    },
    {
      id: 'itm_004',
      name: 'Special Veg Dum Biryani',
      category_id: 'lunch',
      price: 110.00,
      description: 'Aromatic basmati rice slow-cooked with garden fresh vegetables, saffron, whole spices, and served with cucumber raita.',
      image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
      is_veg: true,
      is_available: true,
      prep_time_minutes: 10,
      is_special: false
    },
    {
      id: 'itm_005',
      name: 'Hyderabadi Chicken Biryani',
      category_id: 'lunch',
      price: 150.00,
      description: 'Tender marinated chicken pieces layered with fragrant long-grain rice, caramelized onions, and served with spicy mirchi ka salan.',
      image_url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80',
      is_veg: false,
      is_available: true,
      prep_time_minutes: 12,
      is_special: true
    },
    {
      id: 'itm_006',
      name: 'Crispy Samosa Plate (2 Pcs)',
      category_id: 'snacks',
      price: 30.00,
      description: 'Flaky fried pastry triangles packed with spiced potato-pea filling, served with sweet tamarind and spicy green chutney.',
      image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
      is_veg: true,
      is_available: true,
      prep_time_minutes: 3,
      is_special: false
    },
    {
      id: 'itm_007',
      name: 'Loaded Veg Cheese Burger',
      category_id: 'snacks',
      price: 75.00,
      description: 'Crispy vegetable patty topped with melted cheddar cheese slice, fresh lettuce, tomato, and creamy herb mayonnaise.',
      image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
      is_veg: true,
      is_available: true,
      prep_time_minutes: 8,
      is_special: false
    },
    {
      id: 'itm_008',
      name: 'Chilli Paneer Dry',
      category_id: 'snacks',
      price: 90.00,
      description: 'Wok-tossed paneer cubes with crunchy bell peppers, onions, green chillies, and savory dark soy garlic sauce.',
      image_url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop&q=80',
      is_veg: true,
      is_available: false, // Out of stock to demonstrate edge-case display
      prep_time_minutes: 10,
      is_special: false
    },
    {
      id: 'itm_009',
      name: 'Thick Cold Coffee with Chocolate',
      category_id: 'beverages',
      price: 50.00,
      description: 'Frothy, chilled espresso blended with whole milk, vanilla ice cream, and drizzled with Hershey’s chocolate syrup.',
      image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80',
      is_veg: true,
      is_available: true,
      prep_time_minutes: 4,
      is_special: true
    },
    {
      id: 'itm_010',
      name: 'Ginger Cardamom Kulhad Chai',
      category_id: 'beverages',
      price: 20.00,
      description: 'Freshly brewed strong Indian milk tea infused with crushed ginger root and fragrant cardamom pods.',
      image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
      is_veg: true,
      is_available: true,
      prep_time_minutes: 4,
      is_special: false
    },
    {
      id: 'itm_011',
      name: 'Creamy Mango Lassi',
      category_id: 'beverages',
      price: 45.00,
      description: 'Chilled Punjabi yogurt shake blended with sweet Alphonso mango pulp and topped with slivered pistachios.',
      image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80',
      is_veg: true,
      is_available: true,
      prep_time_minutes: 3,
      is_special: false
    },
    {
      id: 'itm_012',
      name: 'Hot Sizzling Brownie with Ice Cream',
      category_id: 'beverages',
      price: 85.00,
      description: 'Gooey walnut chocolate brownie served warm with a scoop of Madagascar vanilla ice cream and hot fudge.',
      image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
      is_veg: true,
      is_available: true,
      prep_time_minutes: 6,
      is_special: true
    }
  ],

  users: [
    {
      id: 'usr_student',
      name: 'Kanishk Sharma',
      email: 'student@canteen.edu',
      password_hash: 'Student@123',
      phone: '+91 98765 43210',
      role: 'customer',
      wallet_balance: 450.00,
      created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
      id: 'usr_kitchen',
      name: 'Chef Ramesh (Kitchen Counter 1)',
      email: 'kitchen@canteen.edu',
      password_hash: 'Kitchen@123',
      phone: '+91 98765 11223',
      role: 'kitchen',
      wallet_balance: 0.00,
      created_at: new Date(Date.now() - 86400000 * 30).toISOString()
    },
    {
      id: 'usr_admin',
      name: 'Prof. C.K. Mehta (Canteen Manager)',
      email: 'admin@canteen.edu',
      password_hash: 'Admin@123',
      phone: '+91 98765 99887',
      role: 'admin',
      wallet_balance: 0.00,
      created_at: new Date(Date.now() - 86400000 * 60).toISOString()
    }
  ],

  // Seed sample orders across recent days to populate charts & reports out of the box
  orders: [
    {
      id: 'ORD-101',
      user_id: 'usr_student',
      customer_name: 'Kanishk Sharma',
      customer_email: 'student@canteen.edu',
      subtotal: 110.00,
      tax_amount: 5.50,
      grand_total: 115.50,
      payment_method: 'wallet',
      payment_status: 'paid',
      order_status: 'delivered',
      special_instructions: 'Less spicy please',
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
      items: [
        { item_name: 'Crispy Masala Dosa', unit_price: 65.00, quantity: 1, item_total: 65.00 },
        { item_name: 'Steamed Idli Sambar (3 Pcs)', unit_price: 45.00, quantity: 1, item_total: 45.00 }
      ]
    },
    {
      id: 'ORD-102',
      user_id: 'usr_student',
      customer_name: 'Kanishk Sharma',
      customer_email: 'student@canteen.edu',
      subtotal: 200.00,
      tax_amount: 10.00,
      grand_total: 210.00,
      payment_method: 'wallet',
      payment_status: 'paid',
      order_status: 'delivered',
      special_instructions: 'Extra raita',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      items: [
        { item_name: 'Hyderabadi Chicken Biryani', unit_price: 150.00, quantity: 1, item_total: 150.00 },
        { item_name: 'Thick Cold Coffee with Chocolate', unit_price: 50.00, quantity: 1, item_total: 50.00 }
      ]
    },
    {
      id: 'ORD-103',
      user_id: 'usr_student',
      customer_name: 'Kanishk Sharma',
      customer_email: 'student@canteen.edu',
      subtotal: 130.00,
      tax_amount: 6.50,
      grand_total: 136.50,
      payment_method: 'cash',
      payment_status: 'paid',
      order_status: 'delivered',
      special_instructions: '',
      created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
      items: [
        { item_name: 'Paneer Butter Masala Thali', unit_price: 130.00, quantity: 1, item_total: 130.00 }
      ]
    },
    {
      id: 'ORD-104',
      user_id: 'usr_student',
      customer_name: 'Kanishk Sharma',
      customer_email: 'student@canteen.edu',
      subtotal: 125.00,
      tax_amount: 6.25,
      grand_total: 131.25,
      payment_method: 'wallet',
      payment_status: 'paid',
      order_status: 'preparing', // Live preparing order for demo
      special_instructions: 'Serve hot!',
      created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
      items: [
        { item_name: 'Loaded Veg Cheese Burger', unit_price: 75.00, quantity: 1, item_total: 75.00 },
        { item_name: 'Thick Cold Coffee with Chocolate', unit_price: 50.00, quantity: 1, item_total: 50.00 }
      ]
    },
    {
      id: 'ORD-105',
      user_id: 'usr_student',
      customer_name: 'Rohan Verma',
      customer_email: 'rohan@canteen.edu',
      subtotal: 65.00,
      tax_amount: 3.25,
      grand_total: 68.25,
      payment_method: 'cash',
      payment_status: 'pending',
      order_status: 'pending', // Live pending order for demo
      special_instructions: 'Crispy please',
      created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
      items: [
        { item_name: 'Crispy Masala Dosa', unit_price: 65.00, quantity: 1, item_total: 65.00 }
      ]
    }
  ]
};
