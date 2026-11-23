import {
  getBooksByCategory,
  getCategoryList,
  getTopBooks,
} from './books.api.js';

const categoriesList = document.querySelector('.books-section__categories');
const booksList = document.querySelector('.books-section__list');
const bookCount = document.querySelector('.books-section__count');
const status = document.querySelector('.books-section__status');
const showMoreButton = document.querySelector('.books-section__show-more');

if (categoriesList && booksList && bookCount && status && showMoreButton) {
  const initialBookCount = () =>
    window.matchMedia('(min-width: 768px)').matches ? 24 : 10;
  const desktopMediaQuery = window.matchMedia('(min-width: 768px)');

  let currentBooks = [];
  let visibleBookCount = initialBookCount();
  let activeCategory = null;
  let requestId = 0;
  let hasExpandedBookList = false;
  let hasLoadedBooks = false;

  const normalizeBooks = response => {
    if (!Array.isArray(response)) return [];

    const books = response.flatMap(item =>
      item && Array.isArray(item.books) ? item.books : item ? [item] : []
    );
    const uniqueBooks = new Map();

    books.forEach(book => {
      if (!book) return;
      const key = book._id || book.primary_isbn13 || book.title;
      if (key && !uniqueBooks.has(key)) uniqueBooks.set(key, book);
    });

    return [...uniqueBooks.values()];
  };

  const formatPrice = price => {
    if (price === null || price === undefined || price === '') return '';

    const numericPrice = Number(price);
    return Number.isFinite(numericPrice) ? `$${numericPrice.toFixed(2)}` : '';
  };

  const createBookCard = book => {
    const item = document.createElement('li');
    item.className = 'books-section__item';

    const image = document.createElement('img');
    image.className = 'books-section__image';
    image.src = book.book_image || '';
    image.alt = `Обложка книги «${book.title || 'Без названия'}»`;
    image.loading = 'lazy';
    if (book.book_image_width) image.width = Number(book.book_image_width);
    if (book.book_image_height) image.height = Number(book.book_image_height);

    const title = document.createElement('h4');
    title.className = 'books-section__book-title';
    title.textContent = book.title || 'Без названия';

    const author = document.createElement('p');
    author.className = 'books-section__author';
    author.textContent = book.author || '';

    const footer = document.createElement('div');
    footer.className = 'books-section__card-footer';

    const price = document.createElement('p');
    price.className = 'books-section__price';
    price.textContent = formatPrice(book.price);

    const detailsButton = document.createElement('button');
    detailsButton.className = 'books-list__btn books-section__details-button';
    detailsButton.type = 'button';
    detailsButton.dataset.bookId = book._id || '';
    detailsButton.textContent = 'Learn More';
    detailsButton.setAttribute(
      'aria-label',
      `Learn more about ${book.title || 'this book'}`
    );
    footer.append(price, detailsButton);
    item.append(image, title, author, footer);
    return item;
  };

  const renderBooks = () => {
    const displayedBooks = currentBooks.slice(0, visibleBookCount);
    const fragment = document.createDocumentFragment();

    displayedBooks.forEach(book => fragment.append(createBookCard(book)));
    booksList.replaceChildren(fragment);

    const shownCount = displayedBooks.length;
    bookCount.textContent = `Showing ${shownCount} of ${currentBooks.length}`;
    showMoreButton.hidden = shownCount >= currentBooks.length;
  };

  const loadBooks = async category => {
    const currentRequestId = ++requestId;
    activeCategory = category;
    visibleBookCount = initialBookCount();
    hasExpandedBookList = false;
    hasLoadedBooks = false;
    booksList.replaceChildren();
    bookCount.textContent = '';
    showMoreButton.hidden = true;
    status.textContent = 'Loading books…';

    try {
      const response = category
        ? await getBooksByCategory(category)
        : await getTopBooks();
      if (currentRequestId !== requestId) return;

      currentBooks = normalizeBooks(response);
      visibleBookCount = initialBookCount();
      hasLoadedBooks = true;
      status.textContent = currentBooks.length
        ? ''
        : 'No books found in this category.';
      renderBooks();
    } catch {
      if (currentRequestId !== requestId) return;

      currentBooks = [];
      status.textContent = 'Could not load books. Please try again later.';
      bookCount.textContent = '';
      booksList.replaceChildren();
    }
  };

  const renderCategories = categories => {
    const fragment = document.createDocumentFragment();
    const allCategories = [
      { label: 'All Categories', value: null },
      ...categories
        .map(category => {
          const value =
            typeof category === 'string' ? category : category?.list_name;
          return value ? { label: value, value } : null;
        })
        .filter(Boolean),
    ];

    allCategories.forEach(({ label, value }, index) => {
      const item = document.createElement('li');
      item.className = 'books-section__category-item';

      const button = document.createElement('button');
      button.className = 'books-section__category-button';
      button.type = 'button';
      button.textContent = label;
      button.dataset.category = value || '';
      button.setAttribute('aria-pressed', String(index === 0));
      if (index === 0) button.classList.add('is-active');

      item.append(button);
      fragment.append(item);
    });

    categoriesList.replaceChildren(fragment);
  };

  categoriesList.addEventListener('click', event => {
    const button = event.target.closest('.books-section__category-button');
    if (!button || !categoriesList.contains(button)) return;

    const category = button.dataset.category || null;
    if (category === activeCategory) return;

    categoriesList
      .querySelectorAll('.books-section__category-button')
      .forEach(item => {
        const isActive = item === button;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });

    loadBooks(category);
  });

  showMoreButton.addEventListener('click', () => {
    hasExpandedBookList = true;
    visibleBookCount += 4;
    renderBooks();
  });

  desktopMediaQuery.addEventListener('change', () => {
    if (!hasLoadedBooks) return;

    const nextInitialBookCount = initialBookCount();
    visibleBookCount = hasExpandedBookList
      ? Math.max(visibleBookCount, nextInitialBookCount)
      : nextInitialBookCount;
    renderBooks();
  });

  const initialize = async () => {
    status.textContent = 'Loading catalog…';

    const [categoriesResult, booksResult] = await Promise.allSettled([
      getCategoryList(),
      getTopBooks(),
    ]);

    if (categoriesResult.status === 'fulfilled') {
      renderCategories(
        Array.isArray(categoriesResult.value) ? categoriesResult.value : []
      );
    } else {
      categoriesList.replaceChildren();
    }

    if (booksResult.status === 'rejected') {
      status.textContent = 'Could not load books. Please try again later.';
      return;
    }

    currentBooks = normalizeBooks(booksResult.value);
    visibleBookCount = initialBookCount();
    hasLoadedBooks = true;
    status.textContent =
      categoriesResult.status === 'rejected'
        ? 'Books are available, but categories could not be loaded.'
        : currentBooks.length
          ? ''
          : 'No books found in this category.';
    renderBooks();
  };

  initialize();
}
