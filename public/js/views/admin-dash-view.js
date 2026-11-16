/**
 * Admin Executive Dashboard View
 */

const AdminDashView = {
  weeklyChartInstance: null,
  categoryChartInstance: null,

  render: function(container) {
    const orders = Store.getOrders();
    const menuItems = Store.getMenuItems();

    // 1. Calculate Metrics
    const totalRevenue = orders
      .filter(o => o.order_status !== 'cancelled')
      .reduce((sum, o) => sum + o.grand_total, 0);

    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.order_status === 'pending').length;
    const activeMenuItems = menuItems.filter(i => i.is_available).length;

    container.innerHTML = `
      <div class="space-y-8 pb-16">
        
        <!-- Dashboard Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900">Canteen Manager Dashboard</h1>
            <p class="text-xs text-slate-500 mt-0.5">Real-time business performance, revenue telemetry, and order volume</p>
          </div>

          <!-- Quick Navigation Buttons -->
          <div class="flex items-center gap-2">
            <button onclick="App.navigateTo('#/admin/menu')" class="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs">
              <i data-lucide="edit-3" class="w-3.5 h-3.5"></i> Manage Menu
            </button>
            <button onclick="App.navigateTo('#/admin/reports')" class="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-sm shadow-brand-500/25 flex items-center gap-1.5">
              <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5"></i> Sales Reports
            </button>
          </div>
        </div>

        <!-- 4 KPI Stat Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Sales</span>
              <h3 class="text-2xl font-black text-slate-900 mt-1">₹${totalRevenue.toFixed(2)}</h3>
              <span class="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                <i data-lucide="trending-up" class="w-3 h-3"></i> Live Gross Revenue
              </span>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <i data-lucide="indian-rupee" class="w-6 h-6"></i>
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Orders</span>
              <h3 class="text-2xl font-black text-slate-900 mt-1">${totalOrders}</h3>
              <span class="text-[11px] text-blue-600 font-semibold flex items-center gap-1 mt-1">
                <i data-lucide="activity" class="w-3 h-3"></i> All-Time Volume
              </span>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <i data-lucide="shopping-cart" class="w-6 h-6"></i>
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending Orders</span>
              <h3 class="text-2xl font-black text-amber-600 mt-1">${pendingOrders}</h3>
              <span class="text-[11px] text-amber-600 font-semibold flex items-center gap-1 mt-1">
                <i data-lucide="clock" class="w-3 h-3"></i> Needs Action
              </span>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <i data-lucide="hourglass" class="w-6 h-6"></i>
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Menu Catalog</span>
              <h3 class="text-2xl font-black text-slate-900 mt-1">${activeMenuItems}</h3>
              <span class="text-[11px] text-slate-500 font-medium mt-1 block">
                ${menuItems.length} total dishes listed
              </span>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <i data-lucide="utensils" class="w-6 h-6"></i>
            </div>
          </div>

        </div>

        <!-- Visual Analytics: Charts Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Weekly Sales Chart (2 Cols) -->
          <div class="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-slate-900">Weekly Revenue Trends</h3>
                <p class="text-xs text-slate-500">Daily sales performance over the past 7 days</p>
              </div>
              <span class="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 text-xs font-semibold">INR (₹)</span>
            </div>
            <div class="h-64 relative">
              <canvas id="weekly-sales-chart"></canvas>
            </div>
          </div>

          <!-- Category Breakdown Doughnut Chart (1 Col) -->
          <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div>
              <h3 class="text-sm font-bold text-slate-900">Dishes by Category</h3>
              <p class="text-xs text-slate-500">Distribution across meal categories</p>
            </div>
            <div class="h-64 relative flex items-center justify-center">
              <canvas id="category-share-chart"></canvas>
            </div>
          </div>

        </div>

        <!-- Recent Orders Table -->
        <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold text-slate-900">Recent Customer Orders</h3>
            <button onclick="App.navigateTo('#/admin/orders')" class="text-xs font-bold text-brand-600 hover:text-brand-700">
              View All Orders →
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-y border-slate-100">
                <tr>
                  <th class="py-3 px-3">Token</th>
                  <th class="py-3 px-3">Customer</th>
                  <th class="py-3 px-3">Items</th>
                  <th class="py-3 px-3">Payment</th>
                  <th class="py-3 px-3">Status</th>
                  <th class="py-3 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${orders.slice(0, 5).map(order => `
                  <tr class="hover:bg-slate-50/60 transition-colors">
                    <td class="py-3 px-3 font-extrabold text-slate-900">${order.id}</td>
                    <td class="py-3 px-3">
                      <span class="font-bold text-slate-800 block">${order.customer_name}</span>
                      <span class="text-[10px] text-slate-400">${order.customer_email}</span>
                    </td>
                    <td class="py-3 px-3 text-slate-600 max-w-xs truncate">
                      ${order.items.map(i => `${i.quantity}x ${i.item_name}`).join(', ')}
                    </td>
                    <td class="py-3 px-3">
                      <span class="font-semibold uppercase text-[11px] ${order.payment_method === 'wallet' ? 'text-emerald-700' : 'text-blue-700'}">
                        ${order.payment_method}
                      </span>
                    </td>
                    <td class="py-3 px-3">
                      <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        order.order_status === 'delivered' ? 'bg-slate-100 text-slate-700' :
                        order.order_status === 'ready' ? 'bg-emerald-50 text-emerald-700' :
                        order.order_status === 'preparing' ? 'bg-blue-50 text-blue-700' :
                        order.order_status === 'cancelled' ? 'bg-rose-50 text-rose-700' :
                        'bg-amber-50 text-amber-700'
                      }">
                        ${order.order_status}
                      </span>
                    </td>
                    <td class="py-3 px-3 text-right font-extrabold text-slate-900">
                      ₹${order.grand_total.toFixed(2)}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;

    if (window.lucide) lucide.createIcons();

    // Render Chart.js
    setTimeout(() => {
      this.initCharts(orders, menuItems);
    }, 50);
  },

  initCharts: function(orders, menuItems) {
    if (typeof Chart === 'undefined') return;

    // Destroy previous instances if any
    if (this.weeklyChartInstance) this.weeklyChartInstance.destroy();
    if (this.categoryChartInstance) this.categoryChartInstance.destroy();

    // 1. Weekly Sales Chart
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const last7DaysLabels = [];
    const last7DaysData = [120, 240, 310, 180, 290, 420, 350]; // baseline simulation

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      last7DaysLabels.push(days[d.getDay()]);
    }

    const weeklyCtx = document.getElementById('weekly-sales-chart');
    if (weeklyCtx) {
      this.weeklyChartInstance = new Chart(weeklyCtx, {
        type: 'bar',
        data: {
          labels: last7DaysLabels,
          datasets: [{
            label: 'Sales Revenue (₹)',
            data: last7DaysData,
            backgroundColor: '#ea580c',
            borderRadius: 8,
            hoverBackgroundColor: '#c2410c'
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
              ticks: { callback: (val) => '₹' + val }
            }
          }
        }
      });
    }

    // 2. Category Doughnut Chart
    const categories = Store.getCategories().filter(c => c.id !== 'all');
    const catLabels = categories.map(c => c.name);
    const catCounts = categories.map(c => menuItems.filter(i => i.category_id === c.id).length);

    const catCtx = document.getElementById('category-share-chart');
    if (catCtx) {
      this.categoryChartInstance = new Chart(catCtx, {
        type: 'doughnut',
        data: {
          labels: catLabels,
          datasets: [{
            data: catCounts,
            backgroundColor: ['#f97316', '#3b82f6', '#10b981', '#a855f7'],
            borderWidth: 2,
            borderColor: '#ffffff'
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
  }
};
