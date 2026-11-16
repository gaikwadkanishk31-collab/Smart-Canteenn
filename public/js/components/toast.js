/**
 * Toast Notification Component
 */

const Toast = (function() {
  function show(message, type = 'info', duration = 3200) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold pointer-events-auto transform transition-all duration-300 translate-y-2 opacity-0`;

    let iconName = 'info';
    if (type === 'success') {
      toast.classList.add('bg-emerald-50', 'border-emerald-200', 'text-emerald-900');
      iconName = 'check-circle-2';
    } else if (type === 'error') {
      toast.classList.add('bg-rose-50', 'border-rose-200', 'text-rose-900');
      iconName = 'alert-triangle';
    } else if (type === 'warning') {
      toast.classList.add('bg-amber-50', 'border-amber-200', 'text-amber-900');
      iconName = 'alert-circle';
    } else {
      toast.classList.add('bg-slate-900', 'border-slate-800', 'text-white');
    }

    toast.innerHTML = `
      <i data-lucide="${iconName}" class="w-4 h-4 shrink-0"></i>
      <span class="flex-1">${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    // Trigger enter animation
    setTimeout(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    // Auto dismiss
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  return {
    success: (msg) => show(msg, 'success'),
    error: (msg) => show(msg, 'error'),
    warning: (msg) => show(msg, 'warning'),
    info: (msg) => show(msg, 'info')
  };
})();
