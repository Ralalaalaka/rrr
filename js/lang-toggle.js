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
      if (Array.isArray(value) && !isNaN(k)) k = parseInt(k, 10);

      if (value && value[k] !== undefined) {
        value = value[k];
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
  // ✅ Use inline injected data instead of fetching JSON
  if (!window.translations) {
    console.error('No translations found. Make sure {{ site.data | jsonify }} is defined.');
  }

  // Initialize
  updateHtmlLangDir();
  updateTextContent();
  if (langBtn) langBtn.textContent = (currentLang === 'ar') ? 'EN' : 'عربي';

  // Toggle language on click
  if (langBtn) {
    langBtn.addEventListener('click', function(e) {
      e.preventDefault();
      currentLang = (currentLang === 'ar') ? 'en' : 'ar';
      localStorage.setItem('lang', currentLang);

      updateHtmlLangDir();
      updateTextContent();
      langBtn.textContent = (currentLang === 'ar') ? 'EN' : 'عربي';
    });
  }
});
