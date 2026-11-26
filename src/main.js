import '@/tw.css';
import '@/styles/main.scss';

import { initThemeToggle } from '/src/js/common/theme.js';
import { initAbout } from '/src/js/app/aboutPage.js';
initThemeToggle();


let cleanupFunction = () => {};

initAbout()
    .then(abortFn => {
        cleanupFunction = abortFn;
        console.log('Ініціалізація About Page завершена. Функція скасування збережена.');
    })
    .catch(error => {
        console.error('Помилка при ініціалізації About Page:', error);
    });