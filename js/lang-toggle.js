document.addEventListener('DOMContentLoaded', function() {
  const langBtn = document.querySelector('[data-lang-toggle]');
  let currentLang = localStorage.getItem('lang') || 'ar'; // default Arabic
  let translations = {}; // will hold your JSON data

  function updateHtmlLangDir() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';
  }

  function updateTextContent() {
    // Find all elements with data-i18n-key
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
      const keyPath = el.getAttribute('data-i18n-key').split('.');
      let value = translations;

      // Drill down using the key path (e.g., "services.0.title")
      for (let k of keyPath) {
        if (value[k] !== undefined) {
          value = value[k];
        } else {
          value = null;
          break;
        }
      }

      // Set text if found
      if (value && value[currentLang] !== undefined) {
        el.textContent = value[currentLang];
      }
    });
  }

  // Load translations JSON
  fetch('/data/translations.json')
    .then(res => res.json())
    .then(data => {
      translations = data;
      updateTextContent();
    });

  // Initialize
  updateHtmlLangDir();
  if (langBtn) langBtn.textContent = (currentLang === 'ar') ? 'EN' : 'عربي';

  // Toggle language on click
  if (langBtn) {
    langBtn.addEventListener('click', function(e) {
      e.preventDefault();
      currentLang = (currentLang === 'ar') ? 'en' : 'ar';
      localStorage.setItem('lang', currentLang);

      updateHtmlLangDir();
      langBtn.textContent = (currentLang === 'ar') ? 'EN' : 'عربي';
      updateTextContent();
    });
  }
});
