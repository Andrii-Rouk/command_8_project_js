import {
  getBooksByCategory,
  getCategoryList,
  getTopBooks,
} from './books.api.js';
import { renderBookCategories } from './books-categories-render.js';
import { renderBooksList } from './books-list-render.js';
import { initBooksFilter } from './books-filter.js';
import { initBooksShowMore } from './books-show-more.js';
import './loader.js';

const section = document.querySelector('#books');

let latestBooksRequest = 0;
let updateOnResize;
let showMoreController;

async function initBookCategories() {
  const categoriesList = section?.querySelector('.categories__list');
  const categoriesSelect = section?.querySelector('.category-select');

  if (!categoriesList || !categoriesSelect) return;

  const categories = await getCategoryList().catch(() => []);
  renderBookCategories(categoriesList, categories, categoriesSelect);

  initBooksFilter({
    categoriesList,
    categoriesSelect,
    loadBooks: initTopBooks,
  });
}

function getBooksLimit() {
  if (window.innerWidth >= 1440) return 24;
  if (window.innerWidth >= 768) return 16;
  return 10;
}

async function initTopBooks(category = '') {
  const booksList = section?.querySelector('.books__list');
  const visibleCount = section?.querySelector('.books__visible');
  const totalCount = section?.querySelector('.books__total');
  const showMoreButton = section?.querySelector('.books__show-more');
  const counter = section?.querySelector('.books__count');

  if (
    !booksList ||
    !visibleCount ||
    !totalCount ||
    !showMoreButton ||
    !counter
  ) {
    return;
  }

  const requestId = ++latestBooksRequest;

  showMoreController?.destroy();
  showMoreController = undefined;
  showMoreButton.hidden = true;

  if (updateOnResize) {
    window.removeEventListener('resize', updateOnResize);
  }

  try {
    const response = category
      ? await getBooksByCategory(category)
      : await getTopBooks();

    if (requestId !== latestBooksRequest) return;

    const books = category
      ? response
      : response.flatMap(group => group.books ?? []);

    totalCount.textContent = books.length;

    let currentLimit = 0;
    let extraBooks = 0;

    function updateVisibleBooks() {
      const limit = getBooksLimit();
      if (limit === currentLimit) return;

      renderBooksList(booksList, books, limit + extraBooks);

      const shown = booksList.children.length;
      visibleCount.textContent = shown;
      currentLimit = limit;

      showMoreController?.reset({
        totalBooks: books.length,
        initialCount: shown,
      });
    }

    updateVisibleBooks();

    showMoreController = initBooksShowMore({
      button: showMoreButton,
      counter,
      totalBooks: books.length,
      initialCount: booksList.children.length,

      loadBooks: ({ offset, limit }) => books.slice(offset, offset + limit),

      renderBooks(nextBooks) {
        const fragment = document.createDocumentFragment();
        renderBooksList(fragment, nextBooks, nextBooks.length);
        booksList.append(fragment);
        extraBooks += nextBooks.length;
      },
    });

    updateOnResize = updateVisibleBooks;
    window.addEventListener('resize', updateOnResize);
  } catch {
    if (requestId !== latestBooksRequest) return;

    visibleCount.textContent = '0';
    totalCount.textContent = '0';

    const message = document.createElement('li');
    message.textContent = 'Could not load books. Please try again later.';
    booksList.replaceChildren(message);
  }
}

initBookCategories();
initTopBooks();
