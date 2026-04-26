/* ═══════════════════════════════════════════════════════════════════
   تـدّبير — Features UI Controller
   ───────────────────────────────────────────────────────────────────
   يربط الميزات الجديدة بواجهة المستخدم:
   - يفتح dialogs للزكاة، القرض، التحديات
   - يدير الـ event handlers
   - يربط Voice Input (Web Speech API)
═══════════════════════════════════════════════════════════════════ */

var FeaturesUI = (() => {
  
  /* ───────────────────────────────────────────
     ZAKAT CALCULATOR DIALOG
  ─────────────────────────────────────────── */
  function openZakat() {
    if (!window.ZakatCalculator) {
      window.Toast?.show?.('الميزة لم تكتمل التحميل', 'warn');
      return;
    }
    
    const Z = window.ZakatCalculator;
    const estimated = Z.estimateFromAppData() || 0;
    const hawl = Z.checkHawl();
    
    const dialog = document.createElement('div');
    dialog.className = 'feature-overlay';
    dialog.innerHTML = `
      <div class="feature-modal zakat-modal">
        <div class="feature-modal-header">
          <h2>🤲 حاسبة الزكاة</h2>
          <button class="feature-close" aria-label="إغلاق">✕</button>
        </div>
        
        <div class="feature-modal-body">
          ${hawl ? `
            <div class="hawl-status">
              <div class="hawl-progress">
                <div class="hawl-bar" style="width:${hawl.progress}%"></div>
              </div>
              <div class="hawl-text">
                ${hawl.isComplete 
                  ? '✅ مرّ حول كامل — حان وقت الزكاة'
                  : `باقي ${hawl.daysRemaining} يوم على إخراج الزكاة`
                }
              </div>
            </div>
          ` : ''}
          
          <div class="zakat-form">
            <div class="zakat-section">
              <h3>💰 المال النقدي</h3>
              <label>
                <span>السيولة (نقد + حساب بنكي)</span>
                <input type="number" id="zCash" value="${estimated || ''}" min="0" step="0.01">
              </label>
              <label>
                <span>المدخرات والاستثمارات</span>
                <input type="number" id="zSavings" value="0" min="0" step="0.01">
              </label>
              <label>
                <span>قروض على الآخرين (مأمون استرجاعها)</span>
                <input type="number" id="zLoans" value="0" min="0" step="0.01">
              </label>
              <label>
                <span>الديون المستحقة عليك</span>
                <input type="number" id="zDebts" value="0" min="0" step="0.01">
              </label>
            </div>
            
            <div class="zakat-section">
              <h3>🪙 الذهب والفضة</h3>
              <label>
                <span>الذهب (جرام) — النصاب 85جم</span>
                <input type="number" id="zGold" value="0" min="0" step="0.5">
              </label>
              <label>
                <span>الفضة (جرام) — النصاب 595جم</span>
                <input type="number" id="zSilver" value="0" min="0" step="0.5">
              </label>
            </div>
            
            <div class="zakat-section">
              <h3>🏪 عروض التجارة (اختياري)</h3>
              <label>
                <span>قيمة البضاعة</span>
                <input type="number" id="zBizInv" value="0" min="0" step="0.01">
              </label>
              <label>
                <span>السيولة التجارية</span>
                <input type="number" id="zBizCash" value="0" min="0" step="0.01">
              </label>
              <label>
                <span>الديون التجارية</span>
                <input type="number" id="zBizDebt" value="0" min="0" step="0.01">
              </label>
            </div>
            
            <button class="zakat-calc-btn" id="zCalcBtn">احسب الزكاة</button>
            
            <div class="zakat-result-area" id="zResult"></div>
            
            <div class="zakat-info">
              <p><strong>النصاب الحالي:</strong> ${Z.currentNisab().toFixed(2)} ﷼ (يساوي 85 جرام ذهب)</p>
              <p><strong>المعدل:</strong> 2.5% من المال الذي مرّ عليه حول كامل</p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(dialog);
    
    dialog.querySelector('.feature-close').onclick = () => dialog.remove();
    
    dialog.querySelector('#zCalcBtn').onclick = () => {
      const input = {
        cash: parseFloat(dialog.querySelector('#zCash').value) || 0,
        savings: parseFloat(dialog.querySelector('#zSavings').value) || 0,
        loans: parseFloat(dialog.querySelector('#zLoans').value) || 0,
        debts: parseFloat(dialog.querySelector('#zDebts').value) || 0,
        goldGrams: parseFloat(dialog.querySelector('#zGold').value) || 0,
        silverGrams: parseFloat(dialog.querySelector('#zSilver').value) || 0,
        businessInventory: parseFloat(dialog.querySelector('#zBizInv').value) || 0,
        businessCash: parseFloat(dialog.querySelector('#zBizCash').value) || 0,
        businessDebts: parseFloat(dialog.querySelector('#zBizDebt').value) || 0
      };
      
      const result = Z.calculateAll(input);
      const resultEl = dialog.querySelector('#zResult');
      
      let html = '<div class="zakat-result">';
      
      if (result.totalEligible) {
        html += `
          <div class="zakat-amount">${result.totalZakat.toFixed(2)} ﷼</div>
          <div class="zakat-message zakat-eligible">الزكاة الواجبة عليك</div>
          <div class="zakat-breakdown">
            ${result.money.eligible ? `<div>💰 زكاة المال: ${result.money.zakat.toFixed(2)} ﷼</div>` : ''}
            ${result.gold.eligible ? `<div>🪙 زكاة الذهب: ${result.gold.zakat.toFixed(2)} ﷼</div>` : ''}
            ${result.silver.eligible ? `<div>🥈 زكاة الفضة: ${result.silver.zakat.toFixed(2)} ﷼</div>` : ''}
            ${result.business.eligible ? `<div>🏪 زكاة التجارة: ${result.business.zakat.toFixed(2)} ﷼</div>` : ''}
          </div>
          <button class="zakat-pay-btn" id="zPayBtn">✓ تم إخراج الزكاة</button>
        `;
      } else {
        html += `
          <div class="zakat-amount">0</div>
          <div class="zakat-message zakat-not-eligible">لم تبلغ النصاب</div>
          <div class="zakat-breakdown">
            ${result.money.message ? `<div>${result.money.message}</div>` : ''}
            ${result.gold.message && result.gold.value > 0 ? `<div>${result.gold.message}</div>` : ''}
          </div>
        `;
      }
      html += '</div>';
      resultEl.innerHTML = html;
      
      // ربط زر "تم إخراج الزكاة"
      const payBtn = resultEl.querySelector('#zPayBtn');
      if (payBtn) {
        payBtn.onclick = () => {
          if (confirm('هل تأكدت من إخراج الزكاة؟ سيبدأ حول جديد.')) {
            Z.recordPayment(result.totalZakat);
            window.Toast?.show?.('تم تسجيل إخراج الزكاة 🤲', 'success');
            dialog.remove();
          }
        };
      }
    };
  }
  
  /* ───────────────────────────────────────────
     LOAN SIMULATOR DIALOG
  ─────────────────────────────────────────── */
  function openLoan() {
    if (!window.LoanSimulator) {
      window.Toast?.show?.('الميزة لم تكتمل التحميل', 'warn');
      return;
    }
    
    const L = window.LoanSimulator;
    const safe = L.suggestSafe();
    
    const dialog = document.createElement('div');
    dialog.className = 'feature-overlay';
    dialog.innerHTML = `
      <div class="feature-modal">
        <div class="feature-modal-header">
          <h2>🏦 محاكي التمويل</h2>
          <button class="feature-close" aria-label="إغلاق">✕</button>
        </div>
        
        <div class="feature-modal-body">
          ${safe ? `
            <div class="loan-suggestion">
              <strong>💡 اقتراح آمن:</strong> بناءً على دخلك، أقصى قرض يُنصح به: 
              <span class="loan-suggested-amt">${safe.maxAmount.toLocaleString('ar-SA')} ﷼</span>
              (قسط ${safe.safeMonthly} ﷼ شهرياً، 5 سنوات بنسبة 5%)
            </div>
          ` : ''}
          
          <div class="loan-form">
            <label>
              <span>مبلغ القرض (﷼)</span>
              <input type="number" id="loanAmt" value="100000" min="1000" step="1000">
            </label>
            <label>
              <span>الدفعة المقدمة (﷼)</span>
              <input type="number" id="loanDown" value="0" min="0" step="1000">
            </label>
            <label>
              <span>النسبة السنوية (%)</span>
              <input type="number" id="loanRate" value="5" min="0" max="50" step="0.1">
            </label>
            <label>
              <span>المدة (شهور)</span>
              <input type="number" id="loanMonths" value="60" min="6" max="360" step="6">
            </label>
            
            <button class="loan-calc-btn" id="loanCalcBtn">احسب</button>
            
            <div id="loanResult"></div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(dialog);
    
    dialog.querySelector('.feature-close').onclick = () => dialog.remove();
    
    dialog.querySelector('#loanCalcBtn').onclick = () => {
      const principal = parseFloat(dialog.querySelector('#loanAmt').value) || 0;
      const downPayment = parseFloat(dialog.querySelector('#loanDown').value) || 0;
      const rate = parseFloat(dialog.querySelector('#loanRate').value) || 0;
      const months = parseInt(dialog.querySelector('#loanMonths').value) || 12;
      
      const result = L.analyze({
        principal,
        downPayment,
        annualRate: rate / 100,
        months
      });
      
      if (result.error) {
        dialog.querySelector('#loanResult').innerHTML = 
          `<div class="loan-error">${result.error}</div>`;
        return;
      }
      
      const impact = L.impactOnBudget(result.monthlyPayment);
      
      dialog.querySelector('#loanResult').innerHTML = `
        <div class="loan-result-grid">
          <div class="loan-result-item">
            <div class="loan-result-num">${result.monthlyPayment.toFixed(0)} ﷼</div>
            <div class="loan-result-lbl">القسط الشهري</div>
          </div>
          <div class="loan-result-item">
            <div class="loan-result-num">${result.totalInterest.toFixed(0)} ﷼</div>
            <div class="loan-result-lbl">إجمالي الفوائد</div>
          </div>
          <div class="loan-result-item">
            <div class="loan-result-num">${result.totalPaid.toFixed(0)} ﷼</div>
            <div class="loan-result-lbl">إجمالي المدفوع</div>
          </div>
          <div class="loan-result-item">
            <div class="loan-result-num">${(result.simpleRate * 100).toFixed(2)}%</div>
            <div class="loan-result-lbl">النسبة السنوية البسيطة</div>
          </div>
        </div>
        
        ${!impact.error ? `
          <div class="loan-verdict" style="background:${impact.color}20; color:${impact.color}; border:1px solid ${impact.color}40;">
            ${impact.verdict}
          </div>
          <div class="loan-impact-detail">
            توفيرك بعد القسط: <strong>${impact.newSavings.toFixed(0)} ﷼</strong>
            (${impact.newSavingsPct}% من الدخل)
          </div>
        ` : ''}
      `;
    };
  }
  
  /* ───────────────────────────────────────────
     BUDGET CHALLENGES DIALOG
  ─────────────────────────────────────────── */
  function openChallenges() {
    if (!window.BudgetChallenges) return;
    
    const BC = window.BudgetChallenges;
    const active = BC.getActive();
    const available = BC.getAvailable();
    const stats = BC.getStats();
    
    const dialog = document.createElement('div');
    dialog.className = 'feature-overlay';
    dialog.innerHTML = `
      <div class="feature-modal">
        <div class="feature-modal-header">
          <h2>🎯 التحديات</h2>
          <button class="feature-close" aria-label="إغلاق">✕</button>
        </div>
        
        <div class="feature-modal-body">
          <div class="challenges-stats">
            <div class="cs-item">
              <div class="cs-num">${stats.totalCompleted}</div>
              <div class="cs-lbl">مكتمل</div>
            </div>
            <div class="cs-item">
              <div class="cs-num">${stats.successRate}%</div>
              <div class="cs-lbl">نسبة النجاح</div>
            </div>
            <div class="cs-item">
              <div class="cs-num">${stats.totalRewards}</div>
              <div class="cs-lbl">إجمالي النقاط</div>
            </div>
          </div>
          
          ${active.length > 0 ? `
            <h3 class="ch-section-title">🔥 تحديات نشطة (${active.length})</h3>
            <div class="challenges-list">
              ${active.map(c => {
                const ev = BC.evaluate(c) || c;
                return `
                  <div class="challenge-card active">
                    <div class="challenge-icon">${c.icon}</div>
                    <div class="challenge-info">
                      <div class="challenge-title">${c.title}</div>
                      <div class="challenge-desc">${ev.detailMessage || c.description}</div>
                      <div class="challenge-progress">
                        <div class="challenge-progress-bar" style="width:${ev.progress || 0}%"></div>
                      </div>
                    </div>
                    <button class="challenge-abandon" data-id="${c.id}" title="إلغاء">✕</button>
                  </div>
                `;
              }).join('')}
            </div>
          ` : ''}
          
          ${available.length > 0 ? `
            <h3 class="ch-section-title">💪 تحديات متاحة</h3>
            <div class="challenges-list">
              ${available.map(c => `
                <div class="challenge-card">
                  <div class="challenge-icon">${c.icon}</div>
                  <div class="challenge-info">
                    <div class="challenge-title">
                      <span class="challenge-difficulty ${c.difficulty}">${
                        c.difficulty === 'easy' ? 'سهل' : 
                        c.difficulty === 'medium' ? 'متوسط' : 'صعب'
                      }</span>
                      ${c.title}
                    </div>
                    <div class="challenge-desc">${c.description}</div>
                  </div>
                  <button class="challenge-start" data-id="${c.id}">ابدأ</button>
                  <div class="challenge-reward">+${c.reward}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
    
    document.body.appendChild(dialog);
    
    dialog.querySelector('.feature-close').onclick = () => dialog.remove();
    
    dialog.querySelectorAll('.challenge-start').forEach(btn => {
      btn.onclick = () => {
        BC.start(btn.dataset.id);
        dialog.remove();
        setTimeout(openChallenges, 500); // refresh
      };
    });
    
    dialog.querySelectorAll('.challenge-abandon').forEach(btn => {
      btn.onclick = () => {
        if (confirm('هل تريد إلغاء هذا التحدي؟')) {
          BC.abandon(btn.dataset.id);
          dialog.remove();
          setTimeout(openChallenges, 500);
        }
      };
    });
  }
  
  /* ───────────────────────────────────────────
     VOICE INPUT (Web Speech API)
  ─────────────────────────────────────────── */
  const VoiceInput = (() => {
    function isSupported() {
      return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    }
    
    function start() {
      if (!isSupported()) {
        window.Toast?.show?.('المتصفح لا يدعم الإدخال الصوتي', 'warn');
        return;
      }
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'ar-SA';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      const overlay = document.createElement('div');
      overlay.className = 'voice-overlay';
      overlay.innerHTML = `
        <div class="voice-modal">
          <button class="voice-close" aria-label="إغلاق">✕</button>
          <div class="voice-title-row">
            <span class="voice-mic-emoji">🎙️</span>
            <span class="voice-h1">سجّل بصوتك</span>
          </div>
          <div class="voice-sub">قل مصروفك بلغتك الطبيعية</div>
          <button class="voice-mic-btn" aria-label="ابدأ التسجيل">
            <span class="voice-mic-icon">🎤</span>
          </button>
          <div class="voice-status">اضغط على الميكروفون للبدء</div>
          <div class="voice-examples">
            <div class="voice-examples-title">💡 جرّب مثلاً:</div>
            <ul>
              <li>"صرفت 50 ريال على القهوة"</li>
              <li>"أخذت راتبي 8000 ريال"</li>
              <li>"دفعت 200 للبنزين"</li>
              <li>"عطيت هدية 100 ريال"</li>
            </ul>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      
      let isListening = false;
      const micBtn = overlay.querySelector('.voice-mic-btn');
      const status = overlay.querySelector('.voice-status');
      
      function close() {
        try { recognition.abort(); } catch {}
        if (overlay.parentNode) overlay.remove();
      }
      
      // ─── X button (top-left in RTL, top-right visually) ───
      overlay.querySelector('.voice-close').onclick = close;
      
      // ─── Click outside to close ───
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
      });
      
      // ─── Escape key to close ───
      const escHandler = (e) => {
        if (e.key === 'Escape') {
          close();
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);
      
      // ─── Mic button click → start recognition ───
      micBtn.onclick = () => {
        if (isListening) {
          try { recognition.abort(); } catch {}
          return;
        }
        try {
          recognition.start();
          isListening = true;
          micBtn.classList.add('listening');
          status.textContent = '🎙️ تكلّم الآن...';
        } catch (e) {
          window.Toast?.show?.('لا يمكن بدء التسجيل', 'warn');
        }
      };
      
      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        close();
        document.removeEventListener('keydown', escHandler);
        parseAndSave(text);
      };
      
      recognition.onerror = (event) => {
        isListening = false;
        micBtn.classList.remove('listening');
        if (event.error === 'no-speech') {
          status.textContent = 'لم أسمع شيئاً، حاول مرة أخرى';
        } else if (event.error === 'not-allowed') {
          status.textContent = '⚠️ السماح بالميكروفون مرفوض';
        } else {
          status.textContent = 'فشل التسجيل: ' + event.error;
        }
      };
      
      recognition.onend = () => {
        isListening = false;
        micBtn.classList.remove('listening');
      };
    }
    
    /**
     * يحلّل النص ويستخرج المبلغ والاسم
     */
    function parseAndSave(text) {
      // استخرج الرقم
      const arabicNums = { '٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9' };
      let normalized = text;
      for (const [ar, en] of Object.entries(arabicNums)) {
        normalized = normalized.replace(new RegExp(ar, 'g'), en);
      }
      
      const numMatch = normalized.match(/\d+(?:[.,]\d+)?/);
      const amount = numMatch ? parseFloat(numMatch[0].replace(',', '.')) : null;
      
      if (!amount) {
        window.Toast?.show?.('لم أفهم المبلغ، حاول مرة أخرى', 'warn');
        return;
      }
      
      // استخرج اسم البند (أزل كلمات شائعة)
      const stopWords = ['صرفت','دفعت','اشتريت','على','من','بـ','ريال','﷼','الريال','sar'];
      const words = text.split(/\s+/).filter(w => 
        !stopWords.includes(w.toLowerCase()) && 
        !/\d/.test(w) && 
        w.length > 1
      );
      const name = words.join(' ').trim() || 'مصروف صوتي';
      
      // اقترح فئة
      const cat = window.SmartCategorizer?.suggest(name) || '➕';
      
      // احفظ
      try {
        window.App.Entries.addVariable({ name, amt: amount, cat });
        window.Toast?.show?.(`✅ +${amount} ﷼ ${cat} ${name}`, 'success');
        window.SmartCategorizer?.learn(name, cat);
        window.Renderers?.scheduledAll?.();
      } catch (e) {
        window.Toast?.show?.('فشل الحفظ', 'danger');
      }
    }
    
    return { start, isSupported };
  })();
  
  /* ───────────────────────────────────────────
     SETUP BUTTONS — يربط الأزرار في HTML
  ─────────────────────────────────────────── */
  function setupButtons() {
    // زر الزكاة
    document.querySelectorAll('[data-feature="zakat"]').forEach(btn => {
      btn.addEventListener('click', openZakat);
    });
    
    // زر القرض
    document.querySelectorAll('[data-feature="loan"]').forEach(btn => {
      btn.addEventListener('click', openLoan);
    });
    
    // زر التحديات
    document.querySelectorAll('[data-feature="challenges"]').forEach(btn => {
      btn.addEventListener('click', openChallenges);
    });
    
    // زر تصوير الفاتورة
    document.querySelectorAll('[data-feature="scan-bill"]').forEach(btn => {
      btn.addEventListener('click', () => window.BillScanner?.scanAndAdd?.());
    });
    
    // زر التقرير السنوي
    document.querySelectorAll('[data-feature="year-wrapped"]').forEach(btn => {
      btn.addEventListener('click', () => window.YearWrapped?.show?.());
    });
    
    // زر Voice Input
    document.querySelectorAll('[data-feature="voice"]').forEach(btn => {
      btn.addEventListener('click', () => VoiceInput.start());
      if (!VoiceInput.isSupported()) btn.style.display = 'none';
    });
    
    // زر Backup
    document.querySelectorAll('[data-feature="backup"]').forEach(btn => {
      btn.addEventListener('click', () => window.AdvancedExport?.exportJSON?.());
    });
    
    // زر Restore
    document.querySelectorAll('[data-feature="restore"]').forEach(btn => {
      btn.addEventListener('click', () => window.AdvancedExport?.importJSON?.());
    });
    
    // زر Export Year
    document.querySelectorAll('[data-feature="export-year"]').forEach(btn => {
      btn.addEventListener('click', () => window.AdvancedExport?.exportYearCSV?.());
    });
    
    // زر Email Summary
    document.querySelectorAll('[data-feature="email-summary"]').forEach(btn => {
      btn.addEventListener('click', () => window.AdvancedExport?.emailMonthlySummary?.());
    });
    
    // زر Custom Theme
    document.querySelectorAll('[data-feature="theme-custom"]').forEach(btn => {
      btn.addEventListener('click', () => window.ExtraThemes?.openCustomPicker?.());
    });
    
    // أزرار الثيمات الجديدة (data-theme-id)
    document.querySelectorAll('[data-theme-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const themeId = btn.dataset.themeId;
        if (themeId === 'custom') {
          window.ExtraThemes?.openCustomPicker?.();
        } else {
          window.ExtraThemes?.apply?.(themeId);
        }
      });
    });
  }
  
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupButtons, { once: true });
    } else {
      setupButtons();
    }
  }
  
  return {
    init,
    openZakat,
    openLoan,
    openChallenges,
    VoiceInput,
    setupButtons
  };
})();

window.Tdbeer = window.Tdbeer || {};
window.Tdbeer.FeaturesUI = FeaturesUI;
window.FeaturesUI = FeaturesUI;
window.VoiceInput = FeaturesUI.VoiceInput;
