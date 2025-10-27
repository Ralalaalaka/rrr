document.addEventListener('DOMContentLoaded', function() {
  const langBtn = document.querySelector('[data-lang-toggle]');
  let currentLang = localStorage.getItem('lang') || 'ar'; // default Arabic

  function updateTextContent() {
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
      const keys = el.getAttribute('data-i18n-key').split('.');
      let value = window.translations; // all YAML data injected below
      for (let k of keys) value = value[k];
      if (value && value[currentLang]) el.textContent = value[currentLang];
    });
  }

  // Inject YAML data into JS (from Liquid)
  window.translations = {{ site.data | jsonify }};

  // Set initial text
  updateTextContent();
  if (langBtn) langBtn.textContent = (currentLang === 'ar') ? 'EN' : 'عربي';

  // Toggle language
  if (langBtn) {
    langBtn.addEventListener('click', function(e) {
      e.preventDefault();
      currentLang = (currentLang === 'ar') ? 'en' : 'ar';
      localStorage.setItem('lang', currentLang);
      updateTextContent();
      langBtn.textContent = (currentLang === 'ar') ? 'EN' : 'عربي';
    });
  }
});
