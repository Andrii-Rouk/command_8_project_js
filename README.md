# Booksy

Booksy — командний проєкт GoIT. Це адаптивний сайт книгарні з каталогом,
відгуками, подіями, контактами та окремою сторінкою Shopping List.

- [Відкрити Booksy](https://mykhailoslonskyi.github.io/Project_OctaTeam/)
- [Макет у Figma](https://www.figma.com/design/J4qaWDWuYDrOyKKS8fYZqI/Booksy--Copy-?node-id=5999-10563)
- [Документація GoIT Books API](https://books-backend-v2.b.goit.study/api-docs/)

## Можливості

- Перегляд каталогу книг із фільтрацією за категоріями та кнопкою **Show More**.
- Перегляд інформації про книгу в модальному вікні та додавання до Shopping
  List.
- Shopping List з обкладинками, зміною кількості, видаленням книг і пагінацією
  по чотири книги на сторінку. Список зберігається в `localStorage` поточного
  браузера.
- Слайдери, мобільне меню, індикатор завантаження та кнопка повернення нагору.

## Технології

HTML, CSS, JavaScript, Vite, Axios, Swiper і Accordion JS. Для базових стилів
використано modern-normalize, для форматування коду — Prettier.

## Локальний запуск

Встанови Node.js 24 LTS. Відкрий термінал у корені проєкту й виконай:

```bash
npm ci
npm run dev
```

Відкрий адресу `Local`, яку покаже Vite. Щоб перевірити зібрану версію, виконай:

```bash
npm run build
npm run preview
```

## Структура проєкту

| Шлях                       | Призначення                                     |
| -------------------------- | ----------------------------------------------- |
| `src/index.html`           | Головна сторінка                                |
| `src/shopping-list.html`   | Сторінка зі збереженими книгами                 |
| `src/partials/`            | Спільний хедер, футер, секції та модальні вікна |
| `src/css/`                 | Базові стилі та стилі сторінок                  |
| `src/main.js` і `src/js/`  | Точка входу та модулі JavaScript                |
| `src/img/` і `src/public/` | Зображення, SVG-спрайт і фавікон                |

## Команда

| Учасник                                                             | Роль               | Внесок у проєкт                              |
| ------------------------------------------------------------------- | ------------------ | -------------------------------------------- |
| [MykhailoSlonskyi](https://github.com/MykhailoSlonskyi)             | Team Lead          | Hero, Shopping List, інтеграція та валідація |
| [Yuliia-7](https://github.com/Yuliia-7)                             | Scrum Master       | Footer, Books API та Loader                  |
| [Andrii-Rouk](https://github.com/Andrii-Rouk)                       | Frontend Developer | Article і рендер карток книг                 |
| [darynakhitko](https://github.com/darynakhitko)                     | Frontend Developer | Модальне вікно книги                         |
| [dashkashablevska-cpu](https://github.com/dashkashablevska-cpu)     | Frontend Developer | Location і кнопка Show More                  |
| [dziubenko27061987-byte](https://github.com/dziubenko27061987-byte) | Frontend Developer | Feedbacks і слайдер відгуків                 |
| [egorkagit](https://github.com/egorkagit)                           | Frontend Developer | Books і логіка каталогу                      |
| [LeonidSirovatko](https://github.com/LeonidSirovatko)               | Frontend Developer | Header, мобільне меню та категорії книг      |
| [sergey-filatov1](https://github.com/sergey-filatov1)               | Frontend Developer | Events і підключення форми реєстрації        |
| [vladyslava537](https://github.com/vladyslava537)                   | Frontend Developer | Contact Modal і кнопка Scroll Up             |

## Розгортання

Після оновлення гілки `main` GitHub Actions збирає проєкт і публікує папку
`dist/` через GitHub Pages. Статус публікації видно у вкладці **Actions**.

Інструкції для учасників команди та перелік SVG-іконок є в
[README-team.md](./README-team.md).
