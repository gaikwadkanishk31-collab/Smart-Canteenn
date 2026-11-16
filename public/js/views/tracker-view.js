/**
 * Live Order Status Tracker View
 */

const TrackerView = {
  render: function(container, orderId) {
    let order = null;
    const orders = Store.getOrders();

    if (orderId) {
      order = Store.getOrderById(orderId);
    } else {
      // Find latest active order or latest overall order
      order = orders.find(o => ['pending', 'preparing', 'ready'].includes(o.order_status)) || orders[0];
    }

    if (!order) {
      container.innerHTML = `
        <div class="py-20 text-center max-w-md mx-auto space-y-4">
          <div class="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <i data-lucide="package-search" class="w-8 h-8"></i>
          </div>
          <h2 class="text-xl font-bold text-slate-800">No Orders to Track</h2>
          <p class="text-xs text-slate-500">You haven't placed any food orders yet.</p>
          <button onclick="App.navigateTo('#/menu')" class="px-5 py-2.5 bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md">
            Browse Menu & Order
          </button>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    const steps = [
      { key: 'pending', title: 'Order Placed', desc: 'Received by Canteen', icon: 'check' },
      { key: 'preparing', title: 'Preparing', desc: 'Cooking in Kitchen', icon: 'flame' },
      { key: 'ready', title: 'Ready for Pickup', desc: 'At Counter #1', icon: 'bell-ring' },
      { key: 'delivered', title: 'Collected', desc: 'Enjoy your meal!', icon: 'utensils' }
    ];

    const statusWeights = {
      'pending': 1,
      'preparing': 2,
      'ready': 3,
      'delivered': 4,
      'cancelled': 0
    };

    const currentWeight = statusWeights[order.order_status] || 1;
    const isCancelled = order.order_status === 'cancelled';

    container.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-8 pb-16">
        
        <!-- Header Banner -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Order Token</span>
              <span class="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-extrabold text-sm">${order.id}</span>
            </div>
            <h1 class="text-2xl font-black text-slate-900 mt-1">Order Status</h1>
            <p class="text-xs text-slate-500 mt-0.5">Placed on ${new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • ${new Date(order.created_at).toLocaleDateString()}</p>
          </div>

          <!-- Current Status Badge -->
          <div>
            ${isCancelled ? `
              <span class="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-2">
                <i data-lucide="x-circle" class="w-4 h-4 text-rose-600"></i> Cancelled & Refunded
              </span>
            ` : order.order_status === 'ready' ? `
              <span class="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 flex items-center gap-2 animate-bounce">
                <i data-lucide="bell" class="w-4 h-4"></i> Ready for Pickup!
              </span>
            ` : order.order_status === 'preparing' ? `
              <span class="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold shadow-md shadow-amber-500/20 flex items-center gap-2">
                <i data-lucide="flame" class="w-4 h-4 animate-pulse"></i> In Kitchen (Preparing)
              </span>
            ` : order.order_status === 'delivered' ? `
              <span class="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold flex items-center gap-2">
                <i data-lucide="check-check" class="w-4 h-4 text-blue-600"></i> Order Completed
              </span>
            ` : `
              <span class="px-4 py-2 rounded-xl bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold flex items-center gap-2">
                <i data-lucide="clock" class="w-4 h-4 text-brand-600"></i> Order Placed (Pending)
              </span>
            `}
          </div>
        </div>

        <!-- 4-Stage Stepper Tracker -->
        ${!isCancelled ? `
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
            <h3 class="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
              <i data-lucide="activity" class="w-4 h-4 text-brand-600"></i> Live Preparation Progress
            </h3>

            <div class="relative flex items-center justify-between">
              ${steps.map((step, idx) => {
                const stepNum = idx + 1;
                const isPassed = currentWeight >= stepNum;
                const isCurrent = currentWeight === stepNum;

                return `
                  <div class="relative z-10 flex flex-col items-center text-center max-w-[80px] sm:max-w-[120px]">
                    <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-xs transition-all ${
                      isCurrent 
                        ? 'bg-brand-600 text-white ring-4 ring-brand-100 scale-110 shadow-lg' 
                        : isPassed 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-100 text-slate-400'
                    }">
                      <i data-lucide="${step.icon}" class="w-5 h-5"></i>
                    </div>
                    <span class="text-xs font-bold text-slate-800 mt-2.5 ${isCurrent ? 'text-brand-600' : ''}">${step.title}</span>
                    <span class="text-[10px] text-slate-400 hidden sm:block mt-0.5">${step.desc}</span>
                  </div>
                `;
              }).join(`
                <div class="flex-1 h-1 mx-2 sm:mx-4 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full bg-brand-600 transition-all duration-500" style="width: 100%;"></div>
                </div>
              `)}
            </div>

            <!-- Helpful Pickup Instructions -->
            <div class="mt-8 p-4 rounded-2xl ${order.order_status === 'ready' ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-slate-50 text-slate-700'} text-xs flex items-start gap-3">
              <i data-lucide="info" class="w-4 h-4 text-brand-600 shrink-0 mt-0.5"></i>
              <div>
                <span class="font-bold">Collection Instructions:</span>
                ${order.order_status === 'ready' 
                  ? 'Your food is hot and packed! Please proceed to Canteen Counter #1 with Token <strong>' + order.id + '</strong>.' 
                  : 'Relax at your desk or canteen table. You will see this board update to "Ready" the moment the chef prepares your meal.'}
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Order Items & Invoice Details -->
        <div id="printable-receipt" class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 class="text-sm font-bold text-slate-900">Order Summary</h3>
              <p class="text-xs text-slate-500">Items ordered for preparation</p>
            </div>
            <button onclick="window.print()" class="no-print text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-200 hover:bg-brand-50 transition-colors">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i> Print Receipt
            </button>
          </div>

          <!-- Items Table -->
          <div class="divide-y divide-slate-100 text-xs">
            ${order.items.map(item => `
              <div class="py-2.5 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-slate-700 w-5">${item.quantity}x</span>
                  <span class="font-medium text-slate-900">${item.item_name}</span>
                </div>
                <span class="font-bold text-slate-800">₹${item.item_total.toFixed(2)}</span>
              </div>
            `).join('')}
          </div>

          <!-- Special instructions if present -->
          ${order.special_instructions ? `
            <div class="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-900">
              <span class="font-bold">Cooking Note:</span> "${order.special_instructions}"
            </div>
          ` : ''}

          <!-- Cost Calculations -->
          <div class="pt-4 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
            <div class="flex justify-between">
              <span>Item Subtotal</span>
              <span class="font-medium text-slate-900">₹${order.subtotal.toFixed(2)}</span>
            </div>
            <div class="flex justify-between">
              <span>GST (5%)</span>
              <span class="font-medium text-slate-900">₹${order.tax_amount.toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-sm font-bold text-slate-900 pt-1.5 border-t border-slate-200">
              <span>Grand Total</span>
              <span class="text-brand-600 font-extrabold text-base">₹${order.grand_total.toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-[11px] text-slate-500 pt-1">
              <span>Settlement Method</span>
              <span class="font-semibold uppercase text-slate-700">
                ${order.payment_method === 'wallet' ? 'Canteen Digital Wallet (Paid)' : 'Cash / UPI at Counter (' + order.payment_status.toUpperCase() + ')'}
              </span>
            </div>
          </div>

          <!-- Cancellation Button (Active Only in Pending state) -->
          <div class="no-print pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            ${order.order_status === 'pending' ? `
              <button onclick="TrackerView.handleCancelOrder('${order.id}')" class="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5">
                <i data-lucide="x" class="w-3.5 h-3.5"></i> Cancel This Order
              </button>
              <span class="text-[11px] text-slate-400">Order can be cancelled while in Pending state. Full wallet refund issued instantly.</span>
            ` : order.order_status === 'cancelled' ? `
              <span class="text-xs text-rose-600 font-semibold italic">This order was cancelled.</span>
            ` : `
              <span class="text-xs text-slate-400 italic flex items-center gap-1">
                <i data-lucide="lock" class="w-3.5 h-3.5"></i> Preparation started. Cancellation is locked.
              </span>
            `}
          </div>

        </div>

      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  handleCancelOrder: function(orderId) {
    if (!confirm('Are you sure you want to cancel this order? If paid via wallet, funds will be refunded immediately.')) {
      return;
    }

    const res = Store.cancelOrder(orderId);
    if (res.success) {
      Toast.success('Order cancelled successfully! Wallet refunded.');
      this.render(document.getElementById('app-viewport'), orderId);
    } else {
      Toast.error(res.message);
    }
  }
};
