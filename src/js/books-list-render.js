const DESKTOP_BREAKPOINT = 1440;
const DESKTOP_BOOKS_LIMIT = 24;
const MOBILE_BOOKS_LIMIT = 10;

function getDefaultBooksLimit() {
  return window.innerWidth >= DESKTOP_BREAKPOINT
    ? DESKTOP_BOOKS_LIMIT
    : MOBILE_BOOKS_LIMIT;
}

function createBookCardMarkup(book) {
  const id = book._id || '';
  const image = book.book_image || '';
  const title = book.title || 'Untitled';
  const author = book.author || 'Unknown author';
  const price = book.price || '';

  return `
    <li class="books-list__item" data-book-id="${id}">
      <img
        class="books-list__image"
        src="${image}"
        alt="${title}"
        loading="lazy"
      />
      <h3 class="books-list__title">${title}</h3>
      <p class="books-list__author">${author}</p>
      <p class="books-list__price">${price}</p>
      <button
        class="books-list__btn"
        type="button"
        data-book-id="${id}"
      >
        Learn More
      </button>
    </li>
  `;
}

export function renderBooksList(
  listElement,
  books,
  limit = getDefaultBooksLimit()
) {
  if (!listElement || !Array.isArray(books)) {
    return;
  }

  const visibleBooks =
    typeof limit === 'number' ? books.slice(0, limit) : books;
  const markup = visibleBooks.map(createBookCardMarkup).join('');

  listElement.innerHTML = markup;
}
