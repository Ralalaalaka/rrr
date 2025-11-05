document.addEventListener('DOMContentLoaded', function() {
  const langBtn = document.querySelector('[data-lang-toggle]');
  let currentLang = localStorage.getItem('lang') || 'ar'; // default Arabic
  let translations = window.translations || {}; // YAML data injected via Liquid

  function updateHtmlLangDir() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';
  }

  function updateTextContent() {
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
      const keyPath = el.getAttribute('data-i18n-key').split('.');
      let value = translations;

      for (let k of keyPath) {
        // Handle numeric indices for arrays
        if (value && (value[k] !== undefined || (!isNaN(k) && value[parseInt(k)] !== undefined))) {
          value = value[k] !== undefined ? value[k] : value[parseInt(k)];
        } else {
          value = null;
          break;
        }
      }

      if (value && value[currentLang] !== undefined) {
        el.textContent = value[currentLang];
      }
    });
  }

  // ✅ Check if translations exist
  if (!window.translations) {
    console.error('No translations found. Make sure {{ site.data | jsonify }} is defined.');
  }


  // Initialize
  updateHtmlLangDir();
  updateTextContent();

  // Attach click listener to **all language toggle buttons**
  document.querySelectorAll('[data-lang-toggle]').forEach(langBtn => {
    langBtn.textContent = (currentLang === 'ar') ? 'EN' : 'عربي';

    langBtn.addEventListener('click', function(e) {
      e.preventDefault();
      currentLang = (currentLang === 'ar') ? 'en' : 'ar';
      localStorage.setItem('lang', currentLang);

      updateHtmlLangDir();
      updateTextContent();

      // Update all buttons
      document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
        btn.textContent = (currentLang === 'ar') ? 'EN' : 'عربي';
    });
  });
  });
});
