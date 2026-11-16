/**
 * Customer Profile & Canteen Wallet View
 */

const ProfileView = {
  render: function(container) {
    const user = Store.getCurrentUser();

    if (!user) {
      container.innerHTML = `
        <div class="py-20 text-center max-w-md mx-auto space-y-4">
          <h2 class="text-xl font-bold text-slate-800">Please Sign In</h2>
          <p class="text-xs text-slate-500">You must be logged in to view your profile and manage your canteen wallet.</p>
          <button onclick="App.openAuthModal('login')" class="px-5 py-2.5 bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md">
            Sign In Now
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-8 pb-16">
        
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Account & Campus Wallet</h1>
          <p class="text-xs text-slate-500 mt-0.5">Manage your student profile, dining wallet balance, and preferences</p>
        </div>

        <!-- Canteen Wallet Card -->
        <div class="rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div class="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div class="space-y-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold tracking-wide uppercase">
                <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-300"></i> Smart Canteen Wallet
              </span>
              <p class="text-xs text-emerald-100 font-medium">Available Cashless Dining Balance</p>
              <h2 class="text-4xl font-extrabold tracking-tight">₹${(user.wallet_balance || 0).toFixed(2)}</h2>
            </div>

            <!-- Fast Top Up Action -->
            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-3 sm:w-72">
              <span class="text-xs font-bold text-white block">Quick Top-Up Balance</span>
              <div class="grid grid-cols-3 gap-2">
                <button onclick="ProfileView.handleTopUp(100)" class="px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-emerald-900 text-xs font-bold transition-all">
                  + ₹100
                </button>
                <button onclick="ProfileView.handleTopUp(200)" class="px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-emerald-900 text-xs font-bold transition-all">
                  + ₹200
                </button>
                <button onclick="ProfileView.handleTopUp(500)" class="px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-emerald-900 text-xs font-bold transition-all">
                  + ₹500
                </button>
              </div>
              
              <!-- Custom Amount Form -->
              <div class="flex gap-1.5">
                <input type="number" id="custom-topup-val" placeholder="Amount (₹)" min="10" class="w-full text-xs px-3 py-1.5 rounded-lg bg-white/15 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:bg-white/25">
                <button onclick="ProfileView.handleCustomTopUp()" class="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-xs rounded-lg transition-colors shrink-0">
                  Add
                </button>
              </div>
            </div>
          </div>

          <!-- Subtle Background Decoration -->
          <div class="absolute -right-8 -bottom-8 w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        <!-- Personal Info Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
              <i data-lucide="user" class="w-4 h-4 text-brand-600"></i> Profile Information
            </h3>
            <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              Role: ${user.role}
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span class="text-slate-400 block mb-0.5">Full Name</span>
              <span class="font-bold text-slate-800 text-sm">${user.name}</span>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span class="text-slate-400 block mb-0.5">Campus Email</span>
              <span class="font-bold text-slate-800 text-sm">${user.email}</span>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span class="text-slate-400 block mb-0.5">Contact Phone</span>
              <span class="font-bold text-slate-800 text-sm">${user.phone || 'Not provided'}</span>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span class="text-slate-400 block mb-0.5">Account Status</span>
              <span class="font-bold text-emerald-600 text-sm flex items-center gap-1">
                <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Verified Student / Staff
              </span>
            </div>
          </div>

          <!-- Session Controls -->
          <div class="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <button onclick="App.handleLogout()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5">
              <i data-lucide="log-out" class="w-3.5 h-3.5"></i> Sign Out
            </button>
            <button onclick="ProfileView.handleResetData()" class="px-3 py-1.5 text-slate-400 hover:text-rose-600 text-[11px] font-medium transition-colors">
              Reset Test Data to Factory Defaults
            </button>
          </div>
        </div>

      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  handleTopUp: function(amount) {
    if (Store.topUpWallet(amount)) {
      Toast.success(`Added ₹${amount}.00 to your Canteen Wallet!`);
      this.render(document.getElementById('app-viewport'));
    }
  },

  handleCustomTopUp: function() {
    const input = document.getElementById('custom-topup-val');
    if (!input || !input.value) return;
    const amount = parseFloat(input.value);
    if (isNaN(amount) || amount <= 0) {
      Toast.error('Please enter a valid deposit amount.');
      return;
    }
    this.handleTopUp(amount);
  },

  handleResetData: function() {
    if (confirm('This will restore all default seed dishes, orders, and reset balances. Continue?')) {
      Store.resetToSeedData();
      Toast.info('Database restored to original seed demo values.');
      App.navigateTo('#/');
    }
  }
};
