const KEY = 'theme';

function systemPrefersDark() {
    return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
}

export function applyTheme(theme) {
    const root = document.documentElement;
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);

    const toggleBtn = document.getElementById('theme-toggle');
    toggleBtn?.setAttribute('aria-pressed', String(isDark));
    toggleBtn?.setAttribute('aria-label', isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему');
}

export function initThemeToggle() {
    let saved;
    try {
        const stored = localStorage.getItem(KEY);
        saved = stored === 'dark' || stored === 'light' ? stored : null;
    } catch {
        // Перемикання теми працює і без доступу до сховища браузера.
    }
    const theme = saved ?? (systemPrefersDark() ? 'dark' : 'light');
    applyTheme(theme);

    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(next);
        try {
            localStorage.setItem(KEY, next);
        } catch {
            // Застосовуємо тему навіть тоді, коли її неможливо зберегти.
        }
    });
}
