function applyLanguage(lang, translations) {
    const t = translations[lang];
    if (t.page_title) document.title = t.page_title;
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.dataset.key;
        if (t[key] !== undefined) {
            el.innerHTML = t[key];
        }
    });
    document.documentElement.lang = lang === 'zh' ? 'zh-cn' : 'en';
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'zh' ? 'EN' : '中';
    if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise();
    }
}

function initLang(translations) {
    const saved = localStorage.getItem('lang') || 'en';
    applyLanguage(saved, translations);
    document.getElementById('lang-toggle').addEventListener('click', () => {
        const current = localStorage.getItem('lang') || 'zh';
        const next = current === 'zh' ? 'en' : 'zh';
        localStorage.setItem('lang', next);
        applyLanguage(next, translations);
    });
}
