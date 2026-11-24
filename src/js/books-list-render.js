function createBookCard(book) {
  const card = document.createElement('li');
  card.className = 'books__item';

  const title = document.createElement('h3');
  title.className = 'books__title';
  title.textContent = book.title || 'Untitled';

  if (book.book_image) {
    const image = document.createElement('img');
    image.className = 'books__image';
    image.src = book.book_image;
    image.alt = title.textContent;
    image.loading = 'lazy';
    card.append(image);
  }

  const price = document.createElement('span');
  price.className = 'price';
  if (book.price != null && book.price !== '') {
    price.textContent = `$${book.price}`;
  }

  const heading = document.createElement('div');
  heading.className = 'books__readme-content';
  heading.append(title, price);

  const author = document.createElement('p');
  author.className = 'books__author';
  author.textContent = book.author || 'Unknown author';

  const button = document.createElement('button');
  button.className = 'books-list__btn';
  button.type = 'button';
  button.textContent = 'Learn More';
  button.dataset.bookId = book._id || '';
  button.disabled = !book._id;

  card.append(heading, author, button);
  return card;
}

export function getBooksLimit() {
  if (window.innerWidth >= 1440) return 24;
  if (window.innerWidth >= 768) return 16;
  return 10;
}

export function renderBooksList(
  listElement,
  books,
  limit = window.innerWidth >= 1440 ? 24 : 10
) {
  if (!listElement || !Array.isArray(books)) return;

  const visibleBooks =
    typeof limit === 'number' ? books.slice(0, limit) : books;
  listElement.replaceChildren(...visibleBooks.map(createBookCard));
}
