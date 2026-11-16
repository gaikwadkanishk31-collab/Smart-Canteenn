/**
 * Order History View
 */

const HistoryView = {
  render: function(container) {
    const user = Store.getCurrentUser();
    let orders = Store.getOrders();

    // If customer, only show customer's own orders
    if (user && user.role === 'customer') {
      orders = orders.filter(o => o.user_id === user.id);
    }

    container.innerHTML = `
      <div class="max-w-4xl mx-auto space-y-6 pb-12">
        
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Your Order History</h1>
          <p class="text-xs text-slate-500 mt-0.5">Track and view receipts of all your past canteen meals</p>
        </div>

        ${orders.length === 0 ? `
          <div class="py-16 text-center bg-white rounded-3xl border border-slate-100 p-8 space-y-3">
            <div class="w-14 h-14 mx-auto rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center">
              <i data-lucide="receipt" class="w-7 h-7"></i>
            </div>
            <h3 class="text-base font-bold text-slate-800">No past orders found</h3>
            <p class="text-xs text-slate-500 max-w-sm mx-auto">
              You haven't ordered any food yet. Browse our delicious daily menu!
            </p>
            <button onclick="App.navigateTo('#/menu')" class="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 shadow-md">
              Start Ordering
            </button>
          </div>
        ` : `
          <div class="space-y-4">
            ${orders.map(order => {
              const statusColors = {
                pending: 'bg-amber-50 text-amber-700 border-amber-200',
                preparing: 'bg-blue-50 text-blue-700 border-blue-200',
                ready: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                delivered: 'bg-slate-100 text-slate-700 border-slate-200',
                cancelled: 'bg-rose-50 text-rose-700 border-rose-200'
              };

              return `
                <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div class="space-y-2">
                    <div class="flex items-center gap-2.5">
                      <span class="font-extrabold text-sm text-slate-900">${order.id}</span>
                      <span class="px-2.5 py-0.5 rounded-full border text-[11px] font-bold uppercase ${statusColors[order.order_status] || 'bg-slate-100 text-slate-700'}">
                        ${order.order_status}
                      </span>
                      <span class="text-xs text-slate-400 font-medium">
                        ${new Date(order.created_at).toLocaleDateString()} at ${new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <!-- Items Summary snippet -->
                    <p class="text-xs text-slate-600 line-clamp-1">
                      ${order.items.map(i => `${i.quantity}x ${i.item_name}`).join(', ')}
                    </p>
                  </div>

                  <!-- Right summary & actions -->
                  <div class="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <div class="text-left sm:text-right">
                      <span class="text-base font-extrabold text-slate-900">₹${order.grand_total.toFixed(2)}</span>
                      <span class="text-[10px] text-slate-400 block">${order.payment_method.toUpperCase()} (${order.payment_status})</span>
                    </div>

                    <button onclick="App.navigateTo('#/tracker?id=${order.id}')" class="px-4 py-2 bg-slate-50 hover:bg-brand-50 hover:text-brand-700 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5">
                      <i data-lucide="eye" class="w-3.5 h-3.5"></i> Details
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}

      </div>
    `;

    if (window.lucide) lucide.createIcons();
  }
};
