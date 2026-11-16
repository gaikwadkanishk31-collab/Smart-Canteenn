/**
 * Landing Page View
 */

const LandingView = {
  render: function(container) {
    const specials = Store.getMenuItems().filter(i => i.is_special && i.is_available);
    const categories = Store.getCategories().filter(c => c.id !== 'all');

    container.innerHTML = `
      <div class="space-y-12 pb-12">
        
        <!-- Hero Section -->
        <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-amber-600 to-orange-700 text-white p-8 md:p-14 shadow-2xl">
          <div class="relative z-10 max-w-2xl space-y-6">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold tracking-wide uppercase">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-300"></i>
              Campus Dining Reimagined
            </span>
            <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Good Food, <br><span class="text-amber-200">Better Mood.</span>
            </h1>
            <p class="text-sm sm:text-base text-white/90 leading-relaxed font-medium">
              Skip the long lunch counter queues. Browse today's live menu, pre-order your favorite meal, pay seamlessly via your student wallet, and collect it fresh from the counter.
            </p>
            <div class="flex flex-wrap items-center gap-3 pt-2">
              <button onclick="App.navigateTo('#/menu')" class="px-6 py-3.5 rounded-xl bg-white text-brand-700 font-bold text-sm shadow-lg hover:bg-brand-50 transition-all hover:scale-105 flex items-center gap-2">
                <i data-lucide="utensils" class="w-4 h-4"></i>
                Order Food Now
              </button>
              <button onclick="App.openAuthModal('register')" class="px-5 py-3.5 rounded-xl bg-brand-700/60 hover:bg-brand-700/80 border border-white/20 text-white font-semibold text-sm backdrop-blur-sm transition-all flex items-center gap-2">
                <i data-lucide="gift" class="w-4 h-4 text-amber-300"></i>
                Get ₹500 Test Credit
              </button>
            </div>
          </div>
          
          <!-- Decorative Background Elements -->
          <div class="absolute -right-10 -bottom-10 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="hidden lg:block absolute right-12 bottom-6 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80" alt="Fresh Food Bowl" class="w-72 h-72 object-cover rounded-2xl shadow-2xl rotate-3 border-4 border-white/20">
          </div>
        </section>

        <!-- Value Proposition / Fast Highlights -->
        <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <i data-lucide="clock-4" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-900">Zero Wait Queues</h3>
              <p class="text-xs text-slate-500 mt-1">Order right from your desk and pick up when the live status shows ready.</p>
            </div>
          </div>
          <div class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <i data-lucide="wallet" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-900">Canteen Digital Wallet</h3>
              <p class="text-xs text-slate-500 mt-1">One-tap cashless checkout with instant top-up and refund support.</p>
            </div>
          </div>
          <div class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <i data-lucide="activity" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-900">Live Kitchen Tracking</h3>
              <p class="text-xs text-slate-500 mt-1">Follow every stage: Order Placed → Cooking → Ready for Pickup.</p>
            </div>
          </div>
        </section>

        <!-- Today's Special Carousel/Grid -->
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                <h2 class="text-xl font-bold text-slate-900">Chef's Today's Specials</h2>
              </div>
              <p class="text-xs text-slate-500 mt-0.5">Handpicked canteen favorites prepared fresh today</p>
            </div>
            <button onclick="App.navigateTo('#/menu')" class="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
              View Full Menu <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            ${specials.slice(0, 4).map(dish => `
              <div class="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:border-brand-200 transition-all flex flex-col">
                <div class="relative h-44 overflow-hidden bg-slate-100">
                  <img src="${dish.image_url}" alt="${dish.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                  <div class="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span class="${dish.is_veg ? 'dietary-veg' : 'dietary-non-veg'}" title="${dish.is_veg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
                    <span class="px-2 py-0.5 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-[10px] font-semibold">
                      ${dish.prep_time_minutes}m prep
                    </span>
                  </div>
                  <span class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold shadow-sm">
                    Special
                  </span>
                </div>

                <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 class="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-brand-600 transition-colors">${dish.name}</h3>
                    <p class="text-xs text-slate-500 line-clamp-2 mt-1">${dish.description}</p>
                  </div>

                  <div class="flex items-center justify-between pt-2 border-t border-slate-50">
                    <span class="text-base font-extrabold text-slate-900">₹${dish.price.toFixed(2)}</span>
                    <button onclick="App.quickAddToCart('${dish.id}')" class="px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5">
                      <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Categories Section -->
        <section class="space-y-4">
          <h2 class="text-xl font-bold text-slate-900">Explore by Category</h2>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            ${categories.map(cat => `
              <div onclick="App.navigateTo('#/menu?cat=${cat.id}')" class="cursor-pointer p-5 rounded-2xl bg-white border border-slate-100 hover:border-brand-500 hover:shadow-md transition-all text-center group">
                <div class="w-12 h-12 mx-auto rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <i data-lucide="${cat.icon || 'utensils'}" class="w-6 h-6"></i>
                </div>
                <h4 class="text-sm font-bold text-slate-800 group-hover:text-brand-600 transition-colors">${cat.name}</h4>
              </div>
            `).join('')}
          </div>
        </section>

      </div>
    `;

    if (window.lucide) lucide.createIcons();
  }
};
