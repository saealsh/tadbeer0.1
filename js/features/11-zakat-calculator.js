/* ═══════════════════════════════════════════════════════════════════
   تـدّبير — Zakat Calculator (حاسبة الزكاة)
   ───────────────────────────────────────────────────────────────────
   تحسب الزكاة على:
   - المال (نقد + ودائع)
   - الذهب (>= 85 جرام)
   - الفضة (>= 595 جرام)
   - عروض التجارة
   مع تنبيه عند مرور حول كامل (سنة هجرية).
═══════════════════════════════════════════════════════════════════ */

var ZakatCalculator = (() => {
  // ثوابت شرعية
  const ZAKAT_RATE = 0.025;        // 2.5%
  const NISAB_GOLD_GRAMS = 85;     // نصاب الذهب
  const NISAB_SILVER_GRAMS = 595;  // نصاب الفضة
  const HIJRI_YEAR_DAYS = 354;     // السنة الهجرية ~354 يوم
  
  // أسعار افتراضية (يجب على المستخدم تحديثها)
  // هذي تأخذ من Tdbeer.GOLD_PRICE / SILVER_PRICE الموجودين
  function getGoldPrice() {
    return window.Tdbeer?.GOLD_PRICE || 220;
  }
  function getSilverPrice() {
    return window.Tdbeer?.SILVER_PRICE || 3.2;
  }
  
  /**
   * يحسب نصاب المال الحالي بناءً على سعر الذهب
   */
  function currentNisab() {
    return NISAB_GOLD_GRAMS * getGoldPrice();
  }
  
  /**
   * يحسب الزكاة على المال
   * @param {number} cash - النقد الحالي
   * @param {number} savings - المدخرات
   * @param {number} debts - الديون المستحقة (تُخصم)
   * @param {number} loans - القروض المُعطاة (تُضاف لو مأمون استرجاعها)
   */
  function calculateMoney({ cash = 0, savings = 0, debts = 0, loans = 0 }) {
    const total = (cash + savings + loans) - debts;
    const nisab = currentNisab();
    
    if (total < nisab) {
      return {
        eligible: false,
        total,
        nisab,
        zakat: 0,
        message: `المبلغ (${total.toFixed(2)} ﷼) أقل من النصاب (${nisab.toFixed(2)} ﷼)`,
        shortBy: nisab - total
      };
    }
    
    return {
      eligible: true,
      total,
      nisab,
      zakat: total * ZAKAT_RATE,
      message: `الزكاة الواجبة: ${(total * ZAKAT_RATE).toFixed(2)} ﷼`
    };
  }
  
  /**
   * يحسب الزكاة على الذهب
   * @param {number} grams - وزن الذهب بالجرامات
   * @param {number} pricePerGram - سعر الجرام (اختياري، default GOLD_PRICE)
   */
  function calculateGold(grams, pricePerGram) {
    const price = pricePerGram || getGoldPrice();
    const value = grams * price;
    
    if (grams < NISAB_GOLD_GRAMS) {
      return {
        eligible: false,
        grams,
        nisabGrams: NISAB_GOLD_GRAMS,
        value,
        zakat: 0,
        message: `وزن الذهب (${grams}جم) أقل من النصاب (${NISAB_GOLD_GRAMS}جم)`,
        shortBy: NISAB_GOLD_GRAMS - grams
      };
    }
    
    return {
      eligible: true,
      grams,
      nisabGrams: NISAB_GOLD_GRAMS,
      value,
      zakat: value * ZAKAT_RATE,
      message: `الزكاة: ${(value * ZAKAT_RATE).toFixed(2)} ﷼ (تُخرج من قيمة الذهب أو من الذهب نفسه)`
    };
  }
  
  /**
   * يحسب الزكاة على الفضة
   */
  function calculateSilver(grams, pricePerGram) {
    const price = pricePerGram || getSilverPrice();
    const value = grams * price;
    
    if (grams < NISAB_SILVER_GRAMS) {
      return {
        eligible: false,
        grams,
        nisabGrams: NISAB_SILVER_GRAMS,
        value,
        zakat: 0,
        message: `وزن الفضة (${grams}جم) أقل من النصاب (${NISAB_SILVER_GRAMS}جم)`,
        shortBy: NISAB_SILVER_GRAMS - grams
      };
    }
    
    return {
      eligible: true,
      grams,
      nisabGrams: NISAB_SILVER_GRAMS,
      value,
      zakat: value * ZAKAT_RATE,
      message: `الزكاة: ${(value * ZAKAT_RATE).toFixed(2)} ﷼`
    };
  }
  
  /**
   * زكاة عروض التجارة
   * @param {number} inventory - قيمة البضاعة بسعر السوق
   * @param {number} cash - السيولة من النشاط التجاري
   * @param {number} debts - الديون التجارية المستحقة
   */
  function calculateBusiness({ inventory = 0, cash = 0, debts = 0 }) {
    const total = inventory + cash - debts;
    const nisab = currentNisab();
    
    if (total < nisab) {
      return {
        eligible: false,
        total,
        nisab,
        zakat: 0,
        message: `قيمة البضاعة (${total.toFixed(2)} ﷼) أقل من النصاب`
      };
    }
    
    return {
      eligible: true,
      total,
      nisab,
      zakat: total * ZAKAT_RATE,
      message: `زكاة عروض التجارة: ${(total * ZAKAT_RATE).toFixed(2)} ﷼`
    };
  }
  
  /**
   * حساب شامل لكل أنواع الزكاة
   */
  function calculateAll(input) {
    const { 
      cash = 0, savings = 0, debts = 0, loans = 0,
      goldGrams = 0, silverGrams = 0,
      businessInventory = 0, businessCash = 0, businessDebts = 0
    } = input;
    
    const money    = calculateMoney({ cash, savings, debts, loans });
    const gold     = calculateGold(goldGrams);
    const silver   = calculateSilver(silverGrams);
    const business = calculateBusiness({ 
      inventory: businessInventory, 
      cash: businessCash, 
      debts: businessDebts 
    });
    
    const total = money.zakat + gold.zakat + silver.zakat + business.zakat;
    
    return {
      money,
      gold,
      silver,
      business,
      totalZakat: total,
      totalEligible: money.eligible || gold.eligible || silver.eligible || business.eligible
    };
  }
  
  // ─── Hawl tracking (تتبع الحول) ────────────────────────────────
  
  /**
   * يحفظ تاريخ بدء الحول (أول مرة وصل المال للنصاب)
   */
  function startHawl() {
    const today = Date.now();
    window.Storage?.save('zakatHawlStart', today);
    return today;
  }
  
  /**
   * يحسب كم باقي على إخراج الزكاة
   */
  function checkHawl() {
    const start = window.Storage?.load('zakatHawlStart', null);
    if (!start) return null;
    
    const now = Date.now();
    const daysPassed = Math.floor((now - start) / (24 * 60 * 60 * 1000));
    const daysRemaining = HIJRI_YEAR_DAYS - daysPassed;
    
    return {
      startDate: new Date(start),
      daysPassed,
      daysRemaining,
      isComplete: daysPassed >= HIJRI_YEAR_DAYS,
      progress: Math.min(100, Math.round((daysPassed / HIJRI_YEAR_DAYS) * 100))
    };
  }
  
  /**
   * يسجّل إخراج الزكاة (يبدأ حول جديد)
   */
  function recordPayment(amount) {
    const today = Date.now();
    const history = window.Storage?.load('zakatHistory', []) || [];
    history.push({
      date: today,
      amount: Number(amount) || 0,
      hijriYear: getHijriYear(today)
    });
    // احتفظ بآخر 20 إخراج
    if (history.length > 20) history.shift();
    window.Storage?.save('zakatHistory', history);
    
    // ابدأ حول جديد
    window.Storage?.save('zakatHawlStart', today);
    
    return history;
  }
  
  /**
   * تقديري - السنة الهجرية تقريبية
   */
  function getHijriYear(timestamp) {
    const gregorianYear = new Date(timestamp).getFullYear();
    // تقريب: 1 ميلادي = ~622 هجري farther
    return Math.round((gregorianYear - 622) * (33 / 32));
  }
  
  /**
   * تقدير الزكاة من البيانات الموجودة في التطبيق
   * (يأخذ مدخرات المستخدم من store)
   */
  function estimateFromAppData() {
    if (!window.App?.store) return null;
    
    try {
      const data = window.App.store.get('data') || {};
      let totalSaved = 0;
      
      // اجمع التوفير من كل الأشهر
      for (const [key, monthData] of Object.entries(data)) {
        const income = (monthData.income || []).reduce((s, x) => s + (Number(x.amt) || 0), 0);
        const fixed = (monthData.fixed || []).reduce((s, x) => s + (Number(x.amt) || 0), 0);
        const variable = (monthData.variable || []).reduce((s, x) => s + (Number(x.amt) || 0), 0);
        
        let dailyOut = 0;
        for (const arr of Object.values(monthData.daily || {})) {
          for (const e of arr) {
            if (e.type === 'out') dailyOut += (Number(e.amt) || 0);
          }
        }
        
        totalSaved += income - fixed - variable - dailyOut;
      }
      
      return Math.max(0, totalSaved);
    } catch (e) {
      return null;
    }
  }
  
  return {
    // Calculations
    calculateMoney,
    calculateGold,
    calculateSilver,
    calculateBusiness,
    calculateAll,
    currentNisab,
    
    // Hawl tracking
    startHawl,
    checkHawl,
    recordPayment,
    
    // Helpers
    estimateFromAppData,
    
    // Constants
    ZAKAT_RATE,
    NISAB_GOLD_GRAMS,
    NISAB_SILVER_GRAMS
  };
})();

window.Tdbeer = window.Tdbeer || {};
window.Tdbeer.ZakatCalculator = ZakatCalculator;
window.ZakatCalculator = ZakatCalculator;
