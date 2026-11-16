/**
 * Admin Master Orders Management View
 */

const AdminOrdersView = {
  activeStatusFilter: 'all',
  searchQuery: '',

  render: function(container) {
    let orders = Store.getOrders();

    if (this.activeStatusFilter !== 'all') {
      orders = orders.filter(o => o.order_status === this.activeStatusFilter);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      orders = orders.filter(o => 
        o.id.toLowerCase().includes(q) || 
        o.customer_name.toLowerCase().includes(q) ||
        o.customer_email.toLowerCase().includes(q)
      );
    }

    const statuses = ['all', 'pending', 'preparing', 'ready', 'delivered', 'cancelled'];

    container.innerHTML = `
      <div class="space-y-6 pb-16">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900">All Canteen Orders</h1>
            <p class="text-xs text-slate-500 mt-0.5">Filter, audit, and update kitchen tickets in real time</p>
          </div>

          <!-- Search Box -->
          <div class="relative sm:w-64">
            <i data-lucide="search" class="w-4 h-4 absolute left-3 top-3 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Search token or student..." 
              value="${this.searchQuery}"
              oninput="AdminOrdersView.handleSearch(this.value)"
              class="w-full text-xs pl-9 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500"
            >
          </div>
        </div>

        <!-- Status Filter Pills -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          ${statuses.map(st => `
            <button 
              onclick="AdminOrdersView.setStatusFilter('${st}')" 
              class="px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                this.activeStatusFilter === st 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }"
            >
              ${st}
            </button>
          `).join('')}
        </div>

        <!-- Orders Table -->
        <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th class="py-3 px-4">Token</th>
                  <th class="py-3 px-4">Timestamp</th>
                  <th class="py-3 px-4">Customer</th>
                  <th class="py-3 px-4">Dishes Ordered</th>
                  <th class="py-3 px-4">Payment</th>
                  <th class="py-3 px-4">Order Status</th>
                  <th class="py-3 px-4 text-right">Total</th>
                  <th class="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${orders.length === 0 ? `
                  <tr>
                    <td colspan="8" class="py-12 text-center text-slate-400">
                      No orders found matching the filter criteria.
                    </td>
                  </tr>
                ` : orders.map(order => `
                  <tr class="hover:bg-slate-50/60 transition-colors">
                    <td class="py-3 px-4 font-black text-slate-900">${order.id}</td>
                    <td class="py-3 px-4 text-slate-500">
                      ${new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td class="py-3 px-4">
                      <span class="font-bold text-slate-900 block">${order.customer_name}</span>
                      <span class="text-[10px] text-slate-400">${order.customer_email}</span>
                    </td>
                    <td class="py-3 px-4 text-slate-600 max-w-xs truncate">
                      ${order.items.map(i => `${i.quantity}x ${i.item_name}`).join(', ')}
                    </td>
                    <td class="py-3 px-4">
                      <span class="font-bold uppercase text-[10px] ${order.payment_method === 'wallet' ? 'text-emerald-700' : 'text-blue-700'}">
                        ${order.payment_method} (${order.payment_status})
                      </span>
                    </td>
                    <td class="py-3 px-4">
                      <select 
                        onchange="AdminOrdersView.handleStatusChange('${order.id}', this.value)"
                        class="text-[11px] font-bold px-2 py-1 rounded-lg border bg-white focus:outline-none ${
                          order.order_status === 'delivered' ? 'text-slate-700 border-slate-200' :
                          order.order_status === 'ready' ? 'text-emerald-700 border-emerald-300 bg-emerald-50' :
                          order.order_status === 'preparing' ? 'text-blue-700 border-blue-300 bg-blue-50' :
                          order.order_status === 'cancelled' ? 'text-rose-700 border-rose-300 bg-rose-50' :
                          'text-amber-700 border-amber-300 bg-amber-50'
                        }"
                      >
                        <option value="pending" ${order.order_status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="preparing" ${order.order_status === 'preparing' ? 'selected' : ''}>Preparing</option>
                        <option value="ready" ${order.order_status === 'ready' ? 'selected' : ''}>Ready</option>
                        <option value="delivered" ${order.order_status === 'delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="cancelled" ${order.order_status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                      </select>
                    </td>
                    <td class="py-3 px-4 text-right font-extrabold text-slate-900">
                      ₹${order.grand_total.toFixed(2)}
                    </td>
                    <td class="py-3 px-4 text-right">
                      <button onclick="App.navigateTo('#/tracker?id=${order.id}')" class="p-1.5 text-slate-400 hover:text-brand-600 rounded-lg" title="View Full Details">
                        <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                      </button>
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
  },

  setStatusFilter: function(status) {
    this.activeStatusFilter = status;
    this.render(document.getElementById('app-viewport'));
  },

  handleSearch: function(q) {
    this.searchQuery = q;
    this.render(document.getElementById('app-viewport'));
  },

  handleStatusChange: function(orderId, newStatus) {
    const res = Store.updateOrderStatus(orderId, newStatus);
    if (res.success) {
      Toast.success(`Order ${orderId} updated to ${newStatus.toUpperCase()}`);
    } else {
      Toast.error(res.message);
    }
    this.render(document.getElementById('app-viewport'));
  }
};
