/**
 * Kitchen Display Board View
 */

const KitchenView = {
  render: function(container) {
    const orders = Store.getOrders();
    
    // Active orders for kitchen: pending, preparing, ready
    const pendingOrders = orders.filter(o => o.order_status === 'pending');
    const preparingOrders = orders.filter(o => o.order_status === 'preparing');
    const readyOrders = orders.filter(o => o.order_status === 'ready');

    container.innerHTML = `
      <div class="space-y-6 pb-16">
        
        <!-- Kitchen Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-amber-500 animate-ping"></span>
              <h1 class="text-2xl font-bold text-slate-900">Kitchen Display Board</h1>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">Live incoming order queue for culinary and preparation staff</p>
          </div>

          <div class="flex items-center gap-3">
            <span class="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1.5">
              <i data-lucide="chef-hat" class="w-4 h-4 text-amber-600"></i> Active: ${pendingOrders.length + preparingOrders.length + readyOrders.length}
            </span>
            <button onclick="KitchenView.render(document.getElementById('app-viewport'))" class="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors" title="Refresh Board">
              <i data-lucide="refresh-cw" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <!-- 3-Column Kitchen Order Queue -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- Column 1: Pending Orders (New) -->
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 rounded-2xl bg-amber-50 border border-amber-200">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <h3 class="text-xs font-bold text-amber-900 uppercase tracking-wider">1. New Orders (${pendingOrders.length})</h3>
              </div>
              <span class="text-[11px] font-semibold text-amber-700">Needs Cooking</span>
            </div>

            <div class="space-y-3">
              ${pendingOrders.length === 0 ? `
                <div class="p-8 text-center bg-white rounded-2xl border border-slate-100 text-xs text-slate-400">
                  No new pending tickets
                </div>
              ` : pendingOrders.map(order => this.renderOrderCard(order, 'pending')).join('')}
            </div>
          </div>

          <!-- Column 2: In Preparation -->
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 rounded-2xl bg-blue-50 border border-blue-200">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <h3 class="text-xs font-bold text-blue-900 uppercase tracking-wider">2. Cooking (${preparingOrders.length})</h3>
              </div>
              <span class="text-[11px] font-semibold text-blue-700">On Fire</span>
            </div>

            <div class="space-y-3">
              ${preparingOrders.length === 0 ? `
                <div class="p-8 text-center bg-white rounded-2xl border border-slate-100 text-xs text-slate-400">
                  No orders currently cooking
                </div>
              ` : preparingOrders.map(order => this.renderOrderCard(order, 'preparing')).join('')}
            </div>
          </div>

          <!-- Column 3: Ready for Pickup -->
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h3 class="text-xs font-bold text-emerald-900 uppercase tracking-wider">3. Ready for Pickup (${readyOrders.length})</h3>
              </div>
              <span class="text-[11px] font-semibold text-emerald-700">At Counter #1</span>
            </div>

            <div class="space-y-3">
              ${readyOrders.length === 0 ? `
                <div class="p-8 text-center bg-white rounded-2xl border border-slate-100 text-xs text-slate-400">
                  No plates waiting at counter
                </div>
              ` : readyOrders.map(order => this.renderOrderCard(order, 'ready')).join('')}
            </div>
          </div>

        </div>

      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  renderOrderCard: function(order, stage) {
    const timeAgo = Math.max(1, Math.round((Date.now() - new Date(order.created_at).getTime()) / 60000));

    return `
      <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
        
        <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="font-extrabold text-slate-900 text-sm">${order.id}</span>
            <span class="text-[11px] text-slate-400 font-medium">${timeAgo}m ago</span>
          </div>
          <span class="text-xs font-bold text-slate-700">${order.customer_name}</span>
        </div>

        <!-- Dishes Checklist -->
        <div class="space-y-1.5 text-xs">
          ${order.items.map(item => `
            <div class="flex items-center justify-between py-1 bg-slate-50 px-2 rounded-lg">
              <span class="font-bold text-slate-900">${item.quantity}x</span>
              <span class="font-medium text-slate-800 flex-1 ml-2">${item.item_name}</span>
            </div>
          `).join('')}
        </div>

        ${order.special_instructions ? `
          <div class="p-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium">
            <strong>Note:</strong> ${order.special_instructions}
          </div>
        ` : ''}

        <!-- Kitchen Status Advancement Button -->
        <div class="pt-2">
          ${stage === 'pending' ? `
            <button onclick="KitchenView.updateStatus('${order.id}', 'preparing')" class="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5">
              <i data-lucide="flame" class="w-3.5 h-3.5"></i> Start Cooking
            </button>
          ` : stage === 'preparing' ? `
            <button onclick="KitchenView.updateStatus('${order.id}', 'ready')" class="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5">
              <i data-lucide="bell" class="w-3.5 h-3.5"></i> Mark Ready for Pickup
            </button>
          ` : `
            <button onclick="KitchenView.updateStatus('${order.id}', 'delivered')" class="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5">
              <i data-lucide="check" class="w-3.5 h-3.5"></i> Hand Over & Complete
            </button>
          `}
        </div>

      </div>
    `;
  },

  updateStatus: function(orderId, newStatus) {
    const res = Store.updateOrderStatus(orderId, newStatus);
    if (res.success) {
      Toast.success(`Order ${orderId} moved to ${newStatus.toUpperCase()}`);
      this.render(document.getElementById('app-viewport'));
    } else {
      Toast.error(res.message);
    }
  }
};
