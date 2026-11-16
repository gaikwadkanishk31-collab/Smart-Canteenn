/**
 * Menu Catalog View
 */

const MenuView = {
  activeCategory: 'all',
  activeDietFilter: 'all', // 'all' or 'veg'
  searchQuery: '',

  render: function(container, queryParams = {}) {
    if (queryParams.cat) {
      this.activeCategory = queryParams.cat;
    }

    const categories = Store.getCategories();
    let items = Store.getMenuItems();
    const cart = Store.getCart();

    // Filter by Category
    if (this.activeCategory !== 'all') {
      items = items.filter(i => i.category_id === this.activeCategory);
    }

    // Filter by Dietary preference
    if (this.activeDietFilter === 'veg') {
      items = items.filter(i => i.is_veg === true);
    }

    // Filter by Search Query
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter(i => 
        i.name.toLowerCase().includes(q) || 
        (i.description && i.description.toLowerCase().includes(q))
      );
    }

    container.innerHTML = `
      <div class="space-y-6 pb-12">
        
        <!-- Header & Search Bar -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900">Canteen Daily Menu</h1>
            <p class="text-xs text-slate-500 mt-0.5">Explore freshly cooked meals prepared upon order</p>
          </div>

          <!-- Search & Filter Controls -->
          <div class="flex flex-wrap items-center gap-2 sm:gap-3">
            <div class="relative flex-1 sm:w-64">
              <i data-lucide="search" class="w-4 h-4 absolute left-3 top-3 text-slate-400"></i>
              <input 
                type="text" 
                id="menu-search-input" 
                placeholder="Search dosas, burgers, tea..." 
                value="${this.searchQuery}"
                oninput="MenuView.handleSearch(this.value)"
                class="w-full text-xs pl-9 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 shadow-xs"
              >
              ${this.searchQuery ? `
                <button onclick="MenuView.handleSearch('')" class="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600">
                  <i data-lucide="x" class="w-4 h-4"></i>
                </button>
              ` : ''}
            </div>

            <!-- Veg Only Toggle -->
            <button 
              onclick="MenuView.toggleDietFilter()" 
              class="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${this.activeDietFilter === 'veg' ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}"
            >
              <span class="dietary-veg"></span>
              <span>Veg Only</span>
            </button>
          </div>
        </div>

        <!-- Category Filter Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          ${categories.map(cat => {
            const isActive = this.activeCategory === cat.id;
            return `
              <button 
                onclick="MenuView.setCategory('${cat.id}')"
                class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25 scale-[1.02]' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                }"
              >
                <i data-lucide="${cat.icon || 'utensils'}" class="w-3.5 h-3.5"></i>
                <span>${cat.name}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Food Dishes Grid -->
        ${items.length === 0 ? `
          <div class="py-16 text-center bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-3">
            <div class="w-14 h-14 mx-auto rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center">
              <i data-lucide="frown" class="w-7 h-7"></i>
            </div>
            <h3 class="text-base font-bold text-slate-800">No dishes found</h3>
            <p class="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any dishes matching your search query or dietary filters.
            </p>
            <button onclick="MenuView.resetFilters()" class="px-4 py-2 bg-brand-50 text-brand-700 rounded-xl text-xs font-bold hover:bg-brand-100">
              Reset Filters
            </button>
          </div>
        ` : `
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            ${items.map(dish => {
              const inCart = cart.find(c => c.item.id === dish.id);
              return `
                <div class="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:border-brand-200 transition-all flex flex-col ${!dish.is_available ? 'opacity-70 bg-slate-50/50' : ''}">
                  
                  <!-- Dish Image -->
                  <div class="relative h-44 overflow-hidden bg-slate-100">
                    <img src="${dish.image_url}" alt="${dish.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${!dish.is_available ? 'grayscale' : ''}">
                    
                    <!-- Dietary & Prep Badge -->
                    <div class="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span class="${dish.is_veg ? 'dietary-veg' : 'dietary-non-veg'}" title="${dish.is_veg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
                      <span class="px-2 py-0.5 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-[10px] font-semibold">
                        ${dish.prep_time_minutes} min
                      </span>
                    </div>

                    ${!dish.is_available ? `
                      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center">
                        <span class="px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-lg">
                          Sold Out
                        </span>
                      </div>
                    ` : dish.is_special ? `
                      <span class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold shadow-sm">
                        Today's Special
                      </span>
                    ` : ''}
                  </div>

                  <!-- Details -->
                  <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div class="flex items-start justify-between gap-2">
                        <h3 class="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-brand-600 transition-colors">${dish.name}</h3>
                      </div>
                      <p class="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">${dish.description || 'Delicious freshly prepared canteen specialty.'}</p>
                    </div>

                    <!-- Price & Cart Controls -->
                    <div class="flex items-center justify-between pt-2 border-t border-slate-50">
                      <div>
                        <span class="text-base font-extrabold text-slate-900">₹${dish.price.toFixed(2)}</span>
                        <span class="text-[10px] text-slate-400 block -mt-1">+ 5% tax</span>
                      </div>

                      ${!dish.is_available ? `
                        <span class="text-xs text-slate-400 font-medium italic">Unavailable</span>
                      ` : inCart ? `
                        <div class="flex items-center gap-1.5 bg-brand-50 border border-brand-200 rounded-lg p-1">
                          <button onclick="Store.updateCartQuantity('${dish.id}', ${inCart.quantity - 1})" class="w-6 h-6 rounded-md bg-white text-brand-700 font-bold flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors shadow-2xs">
                            <i data-lucide="minus" class="w-3.5 h-3.5"></i>
                          </button>
                          <span class="w-5 text-center text-xs font-bold text-brand-900">${inCart.quantity}</span>
                          <button onclick="Store.updateCartQuantity('${dish.id}', ${inCart.quantity + 1})" class="w-6 h-6 rounded-md bg-white text-brand-700 font-bold flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors shadow-2xs">
                            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                          </button>
                        </div>
                      ` : `
                        <button onclick="App.quickAddToCart('${dish.id}')" class="px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-sm shadow-brand-500/20 flex items-center gap-1.5">
                          <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add
                        </button>
                      `}
                    </div>
                  </div>

                </div>
              `;
            }).join('')}
          </div>
        `}

      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  setCategory: function(catId) {
    this.activeCategory = catId;
    App.navigateTo(`#/menu?cat=${catId}`);
  },

  toggleDietFilter: function() {
    this.activeDietFilter = this.activeDietFilter === 'veg' ? 'all' : 'veg';
    this.render(document.getElementById('app-viewport'));
  },

  handleSearch: function(val) {
    this.searchQuery = val;
    this.render(document.getElementById('app-viewport'));
  },

  resetFilters: function() {
    this.activeCategory = 'all';
    this.activeDietFilter = 'all';
    this.searchQuery = '';
    this.render(document.getElementById('app-viewport'));
  }
};
