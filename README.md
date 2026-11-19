# Booksy

Booksy — командний проєкт GoIT. Створюємо адаптивний односторінковий сайт
книгарні з каталогом книг, відгуками, подіями та контактами.

**Стек** — HTML, CSS, JavaScript, Vite, modern-normalize, Rubik Variable і
Prettier.

- [Макет у Figma](https://www.figma.com/design/J4qaWDWuYDrOyKKS8fYZqI/Booksy--Copy-?node-id=5999-10563)
- [Документація GoIT Books API](https://books-backend-v2.b.goit.study/api-docs/)

## Локальний запуск

Встанови Node.js 24 LTS і виконай у корені проєкту:

```bash
npm ci
npm run dev
```

Відкрий локальну адресу, яку покаже Vite в терміналі.

## Структура проєкту

| Шлях                 | Призначення                                                  |
| -------------------- | ------------------------------------------------------------ |
| `src/index.html`     | Головна сторінка, яка підключає HTML секцій                  |
| `src/partials/`      | Розмітка секцій і модальних вікон                            |
| `src/css/styles.css` | Підключення базових стилів і стилів секцій                   |
| `src/css/base.css`   | Спільні кольори, шрифт і `.container`                        |
| `src/main.js`        | Точка входу JavaScript                                       |
| `src/js/`            | Модулі для меню, слайдерів, каталогу, API та модальних вікон |
| `src/img/`           | Оптимізовані WebP-зображення                                 |
| `src/public/`        | Favicon і SVG-спрайт                                         |

## Робота в команді

- Створюй окрему гілку від актуальної `main` для кожної задачі.
- Перед додаванням якірного посилання узгодь ID секції з командою. Значення
  `href` має збігатися з відповідним `id`, наприклад `href="#books"` і
  `id="books"`.
- Перед відкриттям pull request перевір збірку й форматування.

```bash
npm run build
npx prettier --check "src/**/*.{html,css,js}" README.md
```

## Команда

| GitHub                                                              | Роль і зона відповідальності |
| ------------------------------------------------------------------- | ---------------------------- |
| [MykhailoSlonskyi](https://github.com/MykhailoSlonskyi)             | Team Lead                    |
| [Yuliia-7](https://github.com/Yuliia-7)                             | Scrum Master                 |
| [darynakhitko](https://github.com/darynakhitko)                     | Уточнюється                  |
| [Andrii-Rouk](https://github.com/Andrii-Rouk)                       | Уточнюється                  |
| [vladyslava537](https://github.com/vladyslava537)                   | Уточнюється                  |
| [LeonidSirovatko](https://github.com/LeonidSirovatko)               | Уточнюється                  |
| [egorkagit](https://github.com/egorkagit)                           | Уточнюється                  |
| [dashkashablevska-cpu](https://github.com/dashkashablevska-cpu)     | Уточнюється                  |
| [dziubenko27061987-byte](https://github.com/dziubenko27061987-byte) | Уточнюється                  |

## Розгортання

GitHub Actions збирає проєкт із гілки `main` і публікує папку `dist/` через
GitHub Pages. Статус розгортання видно у вкладці **Actions**.
