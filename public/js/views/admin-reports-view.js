/**
 * Admin Sales Reports & Export View
 */

const AdminReportsView = {
  activeRange: 'month', // 'today', 'week', 'month', 'custom'
  startDate: '',
  endDate: '',

  render: function(container) {
    const orders = Store.getOrders();
    const now = new Date();

    // Filter orders based on active date range
    const filteredOrders = orders.filter(o => {
      if (o.order_status === 'cancelled') return false; // Exclude cancelled from sales

      const orderDate = new Date(o.created_at);

      if (this.activeRange === 'today') {
        return orderDate.toDateString() === now.toDateString();
      } else if (this.activeRange === 'week') {
        const oneWeekAgo = new Date(now.getTime() - 7 * 86400000);
        return orderDate >= oneWeekAgo;
      } else if (this.activeRange === 'month') {
        return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
      } else if (this.activeRange === 'custom') {
        if (!this.startDate && !this.endDate) return true;
        const start = this.startDate ? new Date(this.startDate) : new Date(0);
        const end = this.endDate ? new Date(this.endDate + 'T23:59:59') : new Date();
        return orderDate >= start && orderDate <= end;
      }
      return true;
    });

    // Compute Metrics
    const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.grand_total, 0);
    const totalTax = filteredOrders.reduce((sum, o) => sum + o.tax_amount, 0);
    const totalOrdersCount = filteredOrders.length;
    const aov = totalOrdersCount > 0 ? (totalRevenue / totalOrdersCount) : 0;

    container.innerHTML = `
      <div class="space-y-6 pb-16">
        
        <!-- Header & Action Buttons -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900">Canteen Sales & Revenue Ledger</h1>
            <p class="text-xs text-slate-500 mt-0.5">Audit transaction history, inspect tax collection, and export fiscal data</p>
          </div>

          <div class="flex items-center gap-2 self-start sm:self-auto">
            <button onclick="AdminReportsView.exportCSV()" class="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs">
              <i data-lucide="download" class="w-3.5 h-3.5 text-emerald-600"></i> Export CSV
            </button>
            <button onclick="window.print()" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i> Print Summary
            </button>
          </div>
        </div>

        <!-- Date Range Filter Buttons -->
        <div class="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button onclick="AdminReportsView.setRange('today')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${this.activeRange === 'today' ? 'bg-brand-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}">
              Today
            </button>
            <button onclick="AdminReportsView.setRange('week')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${this.activeRange === 'week' ? 'bg-brand-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}">
              This Week
            </button>
            <button onclick="AdminReportsView.setRange('month')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${this.activeRange === 'month' ? 'bg-brand-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}">
              This Month
            </button>
            <button onclick="AdminReportsView.setRange('custom')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${this.activeRange === 'custom' ? 'bg-brand-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}">
              Custom Range
            </button>
          </div>

          ${this.activeRange === 'custom' ? `
            <div class="flex items-center gap-2 text-xs">
              <input type="date" id="report-start-date" value="${this.startDate}" onchange="AdminReportsView.handleCustomDate()" class="px-2.5 py-1.5 border border-slate-200 rounded-lg">
              <span class="text-slate-400">to</span>
              <input type="date" id="report-end-date" value="${this.endDate}" onchange="AdminReportsView.handleCustomDate()" class="px-2.5 py-1.5 border border-slate-200 rounded-lg">
            </div>
          ` : ''}
        </div>

        <!-- 4 Metric Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <span class="text-slate-400 text-xs font-semibold block">Net Revenue</span>
            <span class="text-2xl font-black text-slate-900 mt-1 block">₹${totalRevenue.toFixed(2)}</span>
            <span class="text-[10px] text-emerald-600 font-semibold mt-0.5 block">After tax collection</span>
          </div>

          <div class="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <span class="text-slate-400 text-xs font-semibold block">GST / Taxes Collected</span>
            <span class="text-2xl font-black text-slate-900 mt-1 block">₹${totalTax.toFixed(2)}</span>
            <span class="text-[10px] text-slate-500 font-medium mt-0.5 block">5% Campus Rate</span>
          </div>

          <div class="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <span class="text-slate-400 text-xs font-semibold block">Total Orders</span>
            <span class="text-2xl font-black text-slate-900 mt-1 block">${totalOrdersCount}</span>
            <span class="text-[10px] text-blue-600 font-medium mt-0.5 block">Paid & Completed</span>
          </div>

          <div class="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <span class="text-slate-400 text-xs font-semibold block">Avg Order Value (AOV)</span>
            <span class="text-2xl font-black text-slate-900 mt-1 block">₹${aov.toFixed(2)}</span>
            <span class="text-[10px] text-slate-500 font-medium mt-0.5 block">Per ticket</span>
          </div>
        </div>

        <!-- Itemized Sales Records Table -->
        <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th class="py-3 px-4">Token</th>
                  <th class="py-3 px-4">Date</th>
                  <th class="py-3 px-4">Customer</th>
                  <th class="py-3 px-4">Dishes</th>
                  <th class="py-3 px-4">Subtotal</th>
                  <th class="py-3 px-4">Tax (5%)</th>
                  <th class="py-3 px-4">Grand Total</th>
                  <th class="py-3 px-4">Payment</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${filteredOrders.length === 0 ? `
                  <tr>
                    <td colspan="8" class="py-12 text-center text-slate-400">
                      No sales records found for this period.
                    </td>
                  </tr>
                ` : filteredOrders.map(order => `
                  <tr class="hover:bg-slate-50/60 transition-colors">
                    <td class="py-3 px-4 font-bold text-slate-900">${order.id}</td>
                    <td class="py-3 px-4 text-slate-500">${new Date(order.created_at).toLocaleDateString()}</td>
                    <td class="py-3 px-4 font-medium text-slate-800">${order.customer_name}</td>
                    <td class="py-3 px-4 text-slate-600 max-w-xs truncate">
                      ${order.items.map(i => `${i.quantity}x ${i.item_name}`).join(', ')}
                    </td>
                    <td class="py-3 px-4 text-slate-600">₹${order.subtotal.toFixed(2)}</td>
                    <td class="py-3 px-4 text-slate-500">₹${order.tax_amount.toFixed(2)}</td>
                    <td class="py-3 px-4 font-black text-slate-900">₹${order.grand_total.toFixed(2)}</td>
                    <td class="py-3 px-4 uppercase font-semibold text-[10px] text-slate-700">${order.payment_method}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  setRange: function(range) {
    this.activeRange = range;
    this.render(document.getElementById('app-viewport'));
  },

  handleCustomDate: function() {
    this.startDate = document.getElementById('report-start-date').value;
    this.endDate = document.getElementById('report-end-date').value;
    this.render(document.getElementById('app-viewport'));
  },

  exportCSV: function() {
    const orders = Store.getOrders().filter(o => o.order_status !== 'cancelled');
    if (orders.length === 0) {
      Toast.error('No sales data to export.');
      return;
    }

    const headers = ['Order Token', 'Date', 'Customer Name', 'Customer Email', 'Items', 'Subtotal', 'Tax (5%)', 'Grand Total', 'Payment Method', 'Payment Status'];
    const rows = orders.map(o => [
      o.id,
      new Date(o.created_at).toISOString(),
      `"${o.customer_name.replace(/"/g, '""')}"`,
      o.customer_email,
      `"${o.items.map(i => `${i.quantity}x ${i.item_name}`).join('; ').replace(/"/g, '""')}"`,
      o.subtotal.toFixed(2),
      o.tax_amount.toFixed(2),
      o.grand_total.toFixed(2),
      o.payment_method,
      o.payment_status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `canteen-sales-report-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Toast.success('Sales CSV exported successfully!');
  }
};
