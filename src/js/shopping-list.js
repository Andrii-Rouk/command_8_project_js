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

let books = readShoppingList();
let totalPages = 0;
let currentPage = 1;

function saveShoppingList(updatedBooks) {
  try {
    localStorage.setItem('shopping-list', JSON.stringify(updatedBooks));
    books = updatedBooks;
    return true;
  } catch (error) {
    console.error('Не вдалося зберегти Shopping List:', error);
    return false;
  }
}

function renderPage() {
  totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);
  currentPage = Math.min(currentPage, Math.max(1, totalPages));
  const offset = (currentPage - 1) * BOOKS_PER_PAGE;
  const pageBooks = books.slice(offset, offset + BOOKS_PER_PAGE);

  list.replaceChildren(
    ...pageBooks.map(book => {
      const item = document.createElement('li');
      item.className = 'shopping-list-card';

      if (book.book_image) {
        const image = document.createElement('img');
        image.className = 'shopping-list-cover';
        image.src = book.book_image;
        image.alt = '';
        image.loading = 'lazy';
        item.append(image);
      }

      const details = document.createElement('div');
      details.className = 'shopping-list-details';

      const title = document.createElement('h2');
      title.textContent = book.title || 'Untitled';

      const author = document.createElement('p');
      author.textContent = book.author || 'Unknown author';

      const actions = document.createElement('div');
      actions.className = 'shopping-list-actions';

      const quantity = document.createElement('span');
      let currentQuantity = book.quantity;

      const decrease = document.createElement('button');
      decrease.type = 'button';
      decrease.textContent = '−';
      decrease.setAttribute(
        'aria-label',
        `Decrease quantity for ${title.textContent}`
      );

      const increase = document.createElement('button');
      increase.type = 'button';
      increase.textContent = '+';
      increase.setAttribute(
        'aria-label',
        `Increase quantity for ${title.textContent}`
      );

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Remove';
      remove.setAttribute('aria-label', `Remove ${title.textContent}`);

      function updateQuantity(value) {
        quantity.textContent = `Quantity: ${value}`;
        decrease.disabled = value <= 1;
      }

      function changeQuantity(step) {
        const nextQuantity = currentQuantity + step;
        if (!Number.isSafeInteger(nextQuantity) || nextQuantity < 1) return;

        const updatedBooks = books.map(savedBook =>
          savedBook === book
            ? { ...savedBook, quantity: nextQuantity }
            : savedBook
        );

        if (saveShoppingList(updatedBooks)) {
          book = updatedBooks.find(savedBook => savedBook._id === book._id);
          currentQuantity = nextQuantity;
          updateQuantity(currentQuantity);
        }
      }

      decrease.addEventListener('click', () => changeQuantity(-1));
      increase.addEventListener('click', () => changeQuantity(1));
      remove.addEventListener('click', () => {
        if (saveShoppingList(books.filter(savedBook => savedBook !== book))) {
          renderPage();
        }
      });

      updateQuantity(currentQuantity);
      actions.append(decrease, quantity, increase, remove);
      details.append(title, author, actions);

      item.append(details);

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
