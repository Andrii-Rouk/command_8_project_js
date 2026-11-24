const BOOKS_PER_PAGE = 4;

const list = document.querySelector('#shopping-list');
const emptyMessage = document.querySelector('#shopping-list-empty');
const pagination = document.querySelector('#shopping-pagination');
const previousButton = document.querySelector('#shopping-prev');
const nextButton = document.querySelector('#shopping-next');
const pageLabel = document.querySelector('#shopping-page');

function readShoppingList() {
  try {
    const books = JSON.parse(localStorage.getItem('shopping-list') ?? '[]');
    return Array.isArray(books) ? books : [];
  } catch (error) {
    console.error('Не вдалося прочитати Shopping List:', error);
    return [];
  }
}

const books = readShoppingList();
const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);
let currentPage = 1;

function renderPage() {
  const offset = (currentPage - 1) * BOOKS_PER_PAGE;
  const pageBooks = books.slice(offset, offset + BOOKS_PER_PAGE);

  list.replaceChildren(
    ...pageBooks.map(book => {
      const item = document.createElement('li');
      item.textContent = `${book.title} — ${book.author} · Quantity: ${book.quantity}`;
      return item;
    })
  );

  emptyMessage.hidden = books.length > 0;
  pagination.hidden = totalPages <= 1;
  previousButton.disabled = currentPage <= 1;
  nextButton.disabled = currentPage >= totalPages;
  pageLabel.textContent = `Page ${currentPage} of ${totalPages}`;
}

previousButton.addEventListener('click', () => {
  if (currentPage <= 1) return;
  currentPage -= 1;
  renderPage();
});

nextButton.addEventListener('click', () => {
  if (currentPage >= totalPages) return;
  currentPage += 1;
  renderPage();
});

renderPage();
