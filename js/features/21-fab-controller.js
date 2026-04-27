/* ═══════════════════════════════════════════════════════════════════
   تـدّبير — FAB Bottom Sheet Controller
   ───────────────────────────────────────────────────────────────────
   يربط زر "+" في Bottom Nav بالـ Bottom Sheet
   ويتعامل مع كل actions (manual, voice, scan-bill, manual-income)
═══════════════════════════════════════════════════════════════════ */

var FabController = (() => {
  
  function open() {
    const overlay = document.getElementById('fabSheetOverlay');
    if (!overlay) return;
    overlay.classList.add('show');
    try { navigator.vibrate?.(10); } catch {}
  }
  
  function close() {
    const overlay = document.getElementById('fabSheetOverlay');
    if (!overlay) return;
    overlay.classList.remove('show');
  }
  
  function handleAction(action) {
    close();
    
    setTimeout(() => {
      switch (action) {
        case 'manual-expense':
          openManualEntry('out');
          break;
        case 'manual-income':
          openManualEntry('in');
          break;
        case 'scan-bill':
          if (window.BillScanner) {
            window.BillScanner.scanAndAdd();
          } else {
            window.Toast?.show?.('الميزة قيد التحميل...', 'warn');
          }
          break;
        case 'voice-input':
          // استخدم الـ Voice الموجود في التطبيق الأصلي
          const voiceBtn = document.getElementById('btnOpenVoice');
          if (voiceBtn) {
            voiceBtn.click();
          } else {
            window.Toast?.show?.('ميزة الإدخال الصوتي غير متاحة', 'warn');
          }
          break;
      }
    }, 250);
  }
  
  /**
   * Modal بسيط لإدخال يدوي
   */
  function openManualEntry(type = 'out') {
    const isIncome = type === 'in';
    const dialog = document.createElement('div');
    dialog.className = 'quick-expense-overlay';
    dialog.innerHTML = `
      <div class="quick-expense-modal">
        <h3>${isIncome ? '💵 إضافة دخل' : '✏️ إضافة مصروف'}</h3>
        <input type="text" id="meName" placeholder="${isIncome ? 'مصدر الدخل (مثل: راتب)' : 'الاسم (مثل: قهوة)'}" autofocus maxlength="60">
        <input type="number" id="meAmt" placeholder="المبلغ" min="0" step="0.01">
        <input type="text" id="meCat" placeholder="${isIncome ? '💵' : '🍔'}" maxlength="4" value="${isIncome ? '💵' : '➕'}">
        <div class="qe-actions">
          <button class="qe-cancel">إلغاء</button>
          <button class="qe-save">💾 حفظ</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(dialog);
    
    const nameInput = dialog.querySelector('#meName');
    const amtInput = dialog.querySelector('#meAmt');
    const catInput = dialog.querySelector('#meCat');
    
    // Auto-suggest category
    nameInput.addEventListener('input', () => {
      if (window.SmartCategorizer && nameInput.value.length > 2 && !isIncome) {
        const suggested = window.SmartCategorizer.suggest(nameInput.value);
        if (suggested && suggested !== '➕') {
          catInput.value = suggested;
        }
      }
    });
    
    nameInput.focus();
    
    function save() {
      const name = nameInput.value.trim();
      const amt = parseFloat(amtInput.value);
      const cat = catInput.value.trim() || (isIncome ? '💵' : '➕');
      
      if (!name || !amt || amt <= 0) {
        window.Toast?.show?.('أكمل البيانات', 'warn');
        return;
      }
      
      try {
        if (isIncome) {
          // اضف للـ daily في نفس اليوم كنوع دخل
          const today = new Date();
          const day = today.getDate();
          const data = window.App.store.get('data') || {};
          const year = window.App.store.get('year');
          const month = window.App.store.get('month');
          const monthKey = `${year}_m${month}`;
          
          if (!data[monthKey]) data[monthKey] = {};
          if (!data[monthKey].daily) data[monthKey].daily = {};
          if (!data[monthKey].daily[day]) data[monthKey].daily[day] = [];
          
          data[monthKey].daily[day].push({
            id: window.Tdbeer?.U?.uid?.() || `e_${Date.now()}`,
            name, amt, cat,
            type: 'in'
          });
          
          window.App.store.set('data', data);
          window.Toast?.show?.(`✅ +${amt} ﷼ ${cat} ${name}`, 'success');
        } else {
          window.App.Entries.addVariable({ name, amt, cat });
          window.Toast?.show?.(`✅ +${amt} ﷼ ${cat} ${name}`, 'success');
        }
        
        window.SmartCategorizer?.learn?.(name, cat);
        window.Renderers?.scheduledAll?.();
        dialog.remove();
      } catch (e) {
        if (window.Logger) window.Logger.warn('FabController.manual', e?.message);
        window.Toast?.show?.('فشل الحفظ', 'danger');
      }
    }
    
    dialog.querySelector('.qe-save').onclick = save;
    dialog.querySelector('.qe-cancel').onclick = () => dialog.remove();
    
    [nameInput, amtInput, catInput].forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') save();
        if (e.key === 'Escape') dialog.remove();
      });
    });
  }
  
  let initialized = false;
  
  function init() {
    if (initialized) return;
    initialized = true;
    
    // 1. زر FAB
    const fabBtn = document.getElementById('fabAddBtn');
    if (fabBtn) {
      fabBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        open();
      });
    }
    
    // 2. Overlay click → close
    const overlay = document.getElementById('fabSheetOverlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
      });
    }
    
    // 3. Cancel button
    const cancelBtn = document.querySelector('.fab-sheet-cancel');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', close);
    }
    
    // 4. Action buttons
    document.querySelectorAll('[data-fab-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        handleAction(btn.dataset.fabAction);
      });
    });
    
    // 5. Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const ovr = document.getElementById('fabSheetOverlay');
        if (ovr?.classList.contains('show')) close();
      }
    });
  }
  
  return { init, open, close, handleAction, openManualEntry };
})();

window.Tdbeer = window.Tdbeer || {};
window.Tdbeer.FabController = FabController;
window.FabController = FabController;
