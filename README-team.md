Booksy Booksy — командний JavaScript-проєкт онлайн-книгарні для GoIT. Каталог,
категорії та деталі книг отримуємо з API. На сторінці також є секції відгуків,
подій і контактів.

Стек: HTML, CSS, JavaScript і Vite. Для спільних стилів використовуємо
modern-normalize та Rubik Variable, для форматування — Prettier.

- Макет Booksy у Figma
- Документація API GoIT Books Запуск у VS Code

1. Встанови Node.js 24 LTS і Git.
2. Вибери File → Open Folder і відкрий корінь Booksy, де лежить package.json.
3. Відкрий Terminal → New Terminal. У терміналі виконай: npm ci npm run dev
4. Відкрий у браузері адресу Local, яку покаже Vite. Щоб зупинити сервер,
   натисни Ctrl+C у терміналі. Структура проєкту Шлях Що тут лежить
   src/index.html Головна сторінка й підключення HTML секцій src/partials/ HTML
   секцій та модальних вікон src/css/styles.css Імпорти спільних стилів і стилів
   секцій src/css/base.css Базовий шрифт, змінні кольорів і .container
   src/main.js Точка входу JavaScript src/img/ Оптимізовані WebP для секцій
   src/public/icons/sprite.svg Спільний SVG-спрайт src/public/favicon.svg
   Фавікон Booksy

Домовленості для верстки

- Використовуй .container всередині секції. Верстка гнучка від 320 px,
  контрольні ширини макета — 375, 768 і 1440 px.
- Для основних кольорів використовуй --color-text, --color-bg і --color-accent
  із base.css.
- Статичні фото бери з src/img/mobile/, src/img/tablet/, src/img/desktop/ та
  src/img/shared/. Обкладинки каталогу бери з поля book_image в API.
- Перед версткою навігації узгодьте ID секцій. Наприклад, посилання
href="#books" має вести на секцію з id="books". Іконка бургера всередині кнопки
з доступною назвою:
<button type="button" aria-label="Open menu">

<svg width="24" height="24" aria-hidden="true">
  <use href="./icons/sprite.svg#menu"></use>
</svg>

</button>
Іконки й символи SVG-спрайта
Усі символи лежать у src/public/icons/sprite.svg. У прикладі бургера вище заміни menu після # на потрібний ID з таблиці.
ID	Призначення
booksy-logo	Основний логотип Booksy
booksy-logo-light	Світлий логотип
booksy-logo-wide	Широкий логотип
booksy-logo-tablet	Варіант логотипа з планшетного макета
booksy-logo-kit	Логотип з UI Kit
booksy-logo-kit-wide	Широкий логотип з UI Kit
booksy-mark	Знак Booksy без тексту
menu	Значок мобільного меню
close	Хрестик для меню та модальних вікон
arrow-left	Темна стрілка ліворуч
arrow-right	Темна стрілка праворуч
arrow-left-variant	Біла стрілка ліворуч
arrow-right-variant	Біла стрілка праворуч
arrow-up	Стрілка вгору
arrow-down	Стрілка вниз
chevron-up	Шеврон вгору
chevron-down	Шеврон вниз для списків та акордеонів
chevron-left	Шеврон ліворуч
chevron-right	Шеврон праворуч
slider-dots	Крапки пагінації слайдера
event-slider-dots	Крапки пагінації слайдера подій
plus	Збільшення кількості
minus	Зменшення кількості
check	Галочка
star	Зірка
email	Електронна пошта
phone	Телефон
location-pin	Мітка адреси
hero-decoration	Декоративний елемент секції Hero
footer-divider	Світла лінія-розділювач у Footer

Фавікон браузера підключений окремим файлом src/public/favicon.svg.

Робота з гілками Перед початком нової задачі онови main і створи свою гілку.

Заміни section-name на назву своєї секції. git switch main git pull --ff-only
origin main git switch -c feat/section-name Перед відкриттям PR перевір
форматування й збірку: npx prettier --check "src/**/*.{html,css,js}" npm run
build Для перевірки зібраної версії запусти npm run preview. Коли задача готова,
відкрий Pull Request зі своєї гілки в main. Коротко опиши зміни та вкажи, що
перевірив. Розгортання GitHub Actions збирає проєкт із main і публікує папку
dist/ через GitHub Pages. Статус публікації видно на вкладці Actions у
репозиторії.
