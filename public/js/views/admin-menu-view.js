/**
 * Admin Menu Management View
 */

const AdminMenuView = {
  render: function(container) {
    const items = Store.getMenuItems();
    const categories = Store.getCategories();

    container.innerHTML = `
      <div class="space-y-6 pb-16">
        
        <!-- Header & Add Button -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900">Menu Catalog Management</h1>
            <p class="text-xs text-slate-500 mt-0.5">Add new dishes, update pricing, and toggle instant item availability</p>
          </div>

          <button onclick="AdminMenuView.openItemModal()" class="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-500/25 flex items-center gap-1.5 transition-all self-start sm:self-auto">
            <i data-lucide="plus-circle" class="w-4 h-4"></i> Add New Dish
          </button>
        </div>

        <!-- Menu Table -->
        <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th class="py-3 px-4">Dish</th>
                  <th class="py-3 px-4">Category</th>
                  <th class="py-3 px-4">Price</th>
                  <th class="py-3 px-4">Dietary</th>
                  <th class="py-3 px-4">Prep Time</th>
                  <th class="py-3 px-4">Availability</th>
                  <th class="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${items.map(item => `
                  <tr class="hover:bg-slate-50/60 transition-colors">
                    
                    <!-- Dish Name & Thumbnail -->
                    <td class="py-3 px-4">
                      <div class="flex items-center gap-3">
                        <img src="${item.image_url}" alt="${item.name}" class="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0">
                        <div>
                          <span class="font-bold text-slate-900 block">${item.name}</span>
                          <span class="text-[10px] text-slate-400 line-clamp-1 max-w-xs">${item.description || 'No description'}</span>
                        </div>
                      </div>
                    </td>

                    <!-- Category -->
                    <td class="py-3 px-4">
                      <span class="px-2 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold uppercase text-[10px]">
                        ${item.category_id}
                      </span>
                    </td>

                    <!-- Price -->
                    <td class="py-3 px-4 font-extrabold text-slate-900">
                      ₹${item.price.toFixed(2)}
                    </td>

                    <!-- Dietary -->
                    <td class="py-3 px-4">
                      <span class="${item.is_veg ? 'dietary-veg' : 'dietary-non-veg'}" title="${item.is_veg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
                    </td>

                    <!-- Prep Time -->
                    <td class="py-3 px-4 text-slate-600">
                      ${item.prep_time_minutes} min
                    </td>

                    <!-- Availability Toggle Button -->
                    <td class="py-3 px-4">
                      <button onclick="AdminMenuView.toggleAvailability('${item.id}')" class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                        item.is_available 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' 
                          : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                      }">
                        ${item.is_available ? '● Available' : '○ Sold Out'}
                      </button>
                    </td>

                    <!-- Actions -->
                    <td class="py-3 px-4 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        <button onclick="AdminMenuView.openItemModal('${item.id}')" class="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" title="Edit Dish">
                          <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
                        </button>
                        <button onclick="AdminMenuView.deleteItem('${item.id}')" class="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete Dish">
                          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                        </button>
                      </div>
                    </td>

                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Add/Edit Modal Container -->
      <div id="dish-modal" class="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 hidden">
        <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-100 overflow-y-auto max-h-[90vh]">
          <button onclick="AdminMenuView.closeItemModal()" class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
          
          <h2 id="dish-modal-title" class="text-lg font-bold text-slate-900 mb-4">Add Menu Dish</h2>

          <form id="dish-form" onsubmit="AdminMenuView.handleSaveDish(event)" class="space-y-4 text-xs">
            <input type="hidden" id="dish-id">

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Dish Name *</label>
              <input type="text" id="dish-name" required placeholder="e.g. Masala Dosa" class="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500">
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Category *</label>
                <select id="dish-category" required class="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 bg-white">
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch & Meals</option>
                  <option value="snacks">Snacks</option>
                  <option value="beverages">Beverages</option>
                </select>
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Price (₹) *</label>
                <input type="number" id="dish-price" step="0.5" required placeholder="50.00" class="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Dietary Type *</label>
                <select id="dish-veg" class="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 bg-white">
                  <option value="true">Vegetarian</option>
                  <option value="false">Non-Vegetarian</option>
                </select>
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Prep Time (Mins)</label>
                <input type="number" id="dish-prep" value="10" min="1" class="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500">
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Image URL</label>
              <input type="url" id="dish-image" placeholder="https://images.unsplash.com/..." class="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500">
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Ingredients & Description</label>
              <textarea id="dish-desc" rows="2" placeholder="Brief summary of ingredients and flavor profile..." class="w-full text-xs px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500"></textarea>
            </div>

            <div class="flex items-center gap-2 pt-1">
              <input type="checkbox" id="dish-special" class="rounded text-brand-600 focus:ring-brand-500">
              <label for="dish-special" class="font-semibold text-slate-700">Mark as "Today's Special"</label>
            </div>

            <div class="pt-4 flex justify-end gap-2 border-t border-slate-100">
              <button type="button" onclick="AdminMenuView.closeItemModal()" class="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200">
                Cancel
              </button>
              <button type="submit" class="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md">
                Save Dish
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  toggleAvailability: function(id) {
    const isAvail = Store.toggleItemAvailability(id);
    Toast.info(`Dish is now marked ${isAvail ? 'Available' : 'Sold Out'}`);
    this.render(document.getElementById('app-viewport'));
  },

  deleteItem: function(id) {
    if (confirm('Are you sure you want to delete this menu dish?')) {
      Store.deleteMenuItem(id);
      Toast.success('Dish removed from catalog.');
      this.render(document.getElementById('app-viewport'));
    }
  },

  openItemModal: function(itemId = null) {
    const modal = document.getElementById('dish-modal');
    if (!modal) return;

    const titleEl = document.getElementById('dish-modal-title');
    const idInput = document.getElementById('dish-id');
    const nameInput = document.getElementById('dish-name');
    const catInput = document.getElementById('dish-category');
    const priceInput = document.getElementById('dish-price');
    const vegInput = document.getElementById('dish-veg');
    const prepInput = document.getElementById('dish-prep');
    const imgInput = document.getElementById('dish-image');
    const descInput = document.getElementById('dish-desc');
    const specialInput = document.getElementById('dish-special');

    if (itemId) {
      const item = Store.getMenuItems().find(i => i.id === itemId);
      if (item) {
        titleEl.textContent = 'Edit Menu Dish';
        idInput.value = item.id;
        nameInput.value = item.name;
        catInput.value = item.category_id;
        priceInput.value = item.price;
        vegInput.value = item.is_veg ? 'true' : 'false';
        prepInput.value = item.prep_time_minutes || 10;
        imgInput.value = item.image_url || '';
        descInput.value = item.description || '';
        specialInput.checked = !!item.is_special;
      }
    } else {
      titleEl.textContent = 'Add New Menu Dish';
      idInput.value = '';
      nameInput.value = '';
      catInput.value = 'breakfast';
      priceInput.value = '';
      vegInput.value = 'true';
      prepInput.value = '10';
      imgInput.value = '';
      descInput.value = '';
      specialInput.checked = false;
    }

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  closeItemModal: function() {
    const modal = document.getElementById('dish-modal');
    if (modal) modal.classList.add('hidden');
  },

  handleSaveDish: function(e) {
    e.preventDefault();
    const id = document.getElementById('dish-id').value;
    const dishData = {
      name: document.getElementById('dish-name').value,
      category_id: document.getElementById('dish-category').value,
      price: document.getElementById('dish-price').value,
      is_veg: document.getElementById('dish-veg').value === 'true',
      prep_time_minutes: document.getElementById('dish-prep').value,
      image_url: document.getElementById('dish-image').value,
      description: document.getElementById('dish-desc').value,
      is_special: document.getElementById('dish-special').checked
    };

    if (id) {
      Store.updateMenuItem(id, dishData);
      Toast.success('Dish updated successfully!');
    } else {
      Store.addMenuItem(dishData);
      Toast.success('New dish added to canteen menu!');
    }

    this.closeItemModal();
    this.render(document.getElementById('app-viewport'));
  }
};
