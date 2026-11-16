# Smart Canteen Management System (SCMS)
> **Tagline:** *Good Food, Better Mood*  
> **Setting:** College Campus Canteen  
> **Architecture:** Modern Reactive Single-Page Application (SPA) + Windows HTTP Server & Node.js Express REST API  

---

## 🚀 Quick Start Guide

### Option 1: Zero-Dependency Local Web Server (Windows)
Double-click or run the included PowerShell script (requires **no** Node.js or npm installed):
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```
The server will start at **`http://localhost:3000`** and automatically open in your default browser!

### Option 2: Direct Browser Launch (Any OS)
You can directly double-click or open the static file:
```
public/index.html
```
in any web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Option 3: Node.js & Express (If Node is installed)
```bash
npm install
npm start
```

---

## 🔑 Demo Accounts & Pre-configured Logins

You can log in manually or use the one-click credential chips inside the login dialog:

| Role | Email | Password | Starting Wallet | Access Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Student / Customer** | `student@canteen.edu` | `Student@123` | **₹450.00** | Browse Menu, Cart, Digital Wallet, Order Tracking, Cancel Pending Orders |
| **Kitchen Staff** | `kitchen@canteen.edu` | `Kitchen@123` | N/A | Live Kitchen Display Board (`Pending` → `Preparing` → `Ready` → `Delivered`) |
| **Canteen Admin** | `admin@canteen.edu` | `Admin@123` | N/A | Executive Dashboard, Visual Sales Charts, Menu CRUD, All Orders, Sales Reports (CSV/Print) |

*You can also use the **Role Switcher** in the top navigation bar at any time to instantly preview the application from any role's perspective!*

---

## ✨ Features Implemented

### 1. Customer Experience
* **Categorized Menu Catalog:** Filter by *All Dishes*, *Breakfast*, *Lunch & Meals*, *Snacks*, and *Beverages*.
* **Dietary Markers:** Clear Green circle (Veg) and Red triangle (Non-Veg) indicators.
* **Instant Keyword Search:** Real-time search by food name or ingredients.
* **Sold Out States:** Clearly marks out-of-stock dishes and prevents ordering them.
* **Dynamic Shopping Tray:** Slide-over cart with item increments/decrements (+/-), item removal, cooking notes, and automatic 5% GST tax calculation.
* **Dual Payment Settlement:** 
  1. *Canteen Digital Wallet:* Instant cashless checkout with one-click top-up (+₹100, +₹200, +₹500).
  2. *Cash at Counter:* Pay at pickup with cash or UPI.
* **Live 4-Stage Stepper Tracking:** Real-time visual progress: `Order Placed` → `Cooking in Kitchen` → `Ready for Pickup` → `Delivered`.
* **Pending Order Cancellation:** Customers can cancel orders while in `Pending` status and receive an instant 100% wallet refund.
* **Order History & Printable Receipts:** View past meal tickets and print itemized bills.

### 2. Kitchen Display Board
* Dedicated real-time board for kitchen staff.
* Three visual preparation columns:
  1. **New Orders:** Advance to "Start Cooking".
  2. **Cooking:** Advance to "Mark Ready for Pickup".
  3. **Ready for Pickup:** Advance to "Hand Over & Complete".
* Shows preparation notes and elapsed time per ticket.

### 3. Canteen Admin Management
* **Executive Dashboard:** Live metric KPI cards (Total Sales, Total Orders, Pending Orders, Menu Items).
* **Interactive Chart.js Visualizations:**
  * Weekly revenue trend bar chart.
  * Category distribution doughnut chart.
* **Menu Catalog Management:** Add new dishes, edit price/category/prep time, toggle availability on/off instantly, and delete items.
* **Master Order Management:** Filter all orders by status (`Pending`, `Preparing`, `Ready`, `Delivered`, `Cancelled`), search by student, and update statuses.
* **Sales Reports & Ledger:**
  * Filter by `Today`, `This Week`, `This Month`, or `Custom Date Range`.
  * Computes Net Sales, 5% GST collected, and Average Order Value (AOV).
  * **Export to CSV** file with one click.
  * Printable summary audit report.

---

## 📂 Project Structure

```
smart-canteen/
├── public/
│   ├── index.html                 # Main Single Page Application HTML shell
│   ├── css/
│   │   └── styles.css             # Tailwind utilities, dietary badges & print styling
│   └── js/
│       ├── app.js                 # SPA router, event coordinator & role switcher
│       ├── store.js               # Reactive centralized store & localStorage engine
│       ├── seed-data.js           # Pre-loaded menu, users, and 7-day sample orders
│       ├── components/
│       │   └── toast.js           # Global toast notifications
│       └── views/
│           ├── landing-view.js    # Hero, specials, and quick category cards
│           ├── menu-view.js       # Searchable catalog, veg filter, food cards
│           ├── tracker-view.js    # 4-stage stepper tracker & cancel trigger
│           ├── history-view.js    # Customer order log and receipts
│           ├── profile-view.js    # Student profile and wallet top-up
│           ├── kitchen-view.js    # Live Kitchen Display Board
│           ├── admin-dash-view.js # Admin KPI cards & Chart.js visual charts
│           ├── admin-menu-view.js # Menu CRUD & availability toggles
│           ├── admin-orders-view.js# Master order filter and status management
│           └── admin-reports-view.js# Sales reports with date filters & CSV export
├── server.js                      # Production Express REST API backend
├── server.ps1                     # Native Windows one-click local HTTP server
├── schema.sql                     # Full relational database DDL & indexes
├── package.json                   # Node.js dependencies
└── README.md                      # Documentation
```
