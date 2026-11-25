import { getBooksById } from './books.api.js';
import Accordion from 'accordion-js';

new Accordion('.book-modal-accordion');

document.querySelectorAll('.book-modal-accordion .ac-panel').forEach(panel => {
  panel.style.overflow = 'hidden';
});

const backdrop = document.querySelector('.book-modal-backdrop');
const closeButton = document.querySelector('.book-modal-close');

const bookImage = document.querySelector('.book-modal-image');
const bookImagePlaceholder = bookImage.getAttribute('src');
const bookTitle = document.querySelector('.book-modal-title');
const bookAuthor = document.querySelector('.book-modal-author');
const bookPrice = document.querySelector('.book-modal-price');

const quantityInput = document.querySelector('.quantity-input');
const decreaseButton = document.querySelector('.quantity-decrease');
const increaseButton = document.querySelector('.quantity-increase');
const addToCartButton = document.querySelector('.book-modal-add-to-cart');

const description = document.querySelector('.book-modal-description');
const shipping = document.querySelector('.book-modal-shipping');
const returns = document.querySelector('.book-modal-returns');
const orderForm = document.querySelector('.book-order-form');
const SHOPPING_LIST_KEY = 'shopping-list';
let selectedBook = null;

function openModal() {
  backdrop.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  backdrop.classList.add('is-hidden');
  document.body.style.overflow = '';
}

const SHIPPING_TEXT =
  'We ship across the United States within 2–5 business days. All orders are processed through USPS or a reliable courier service. Enjoy free standard shipping on orders over $50.';

const RETURNS_TEXT =
  'You can return an item within 14 days of receiving your order, provided it hasn’t been used and is in its original condition. To start a return, please contact our support team — we’ll guide you through the process quickly and hassle-free.';

function fillModal(book) {
  selectedBook = book;
  bookImage.src = book.book_image || bookImagePlaceholder;
  bookImage.alt = book.title || 'Обкладинка обраної книги';

  bookTitle.textContent = book.title || 'Book details';
  bookAuthor.textContent = book.author || '';
  bookPrice.textContent = book.price || '';

  description.textContent = book.description || '';
  shipping.textContent = book.shipping || SHIPPING_TEXT;
  returns.textContent = book.returns || RETURNS_TEXT;

  quantityInput.value = 1;
}

decreaseButton.addEventListener('click', () => {
  const quantity = Number(quantityInput.value);
  quantityInput.value = Math.max(1, quantity - 1);
});

increaseButton.addEventListener('click', () => {
  const quantity = Number(quantityInput.value);
  quantityInput.value = quantity + 1;
});

addToCartButton.addEventListener('click', () => {
  if (!selectedBook?._id) return;

  const quantity = Number(quantityInput.value);
  if (!Number.isSafeInteger(quantity) || quantity < 1) return;

  try {
    const shoppingList = JSON.parse(
      localStorage.getItem(SHOPPING_LIST_KEY) ?? '[]'
    );

    const existingBook = shoppingList.find(
      book => book._id === selectedBook._id
    );

    if (existingBook) {
      existingBook.quantity = (Number(existingBook.quantity) || 0) + quantity;
    } else {
      shoppingList.push({ ...selectedBook, quantity });
    }

    localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(shoppingList));
    console.log('Кількість книг у кошику:', quantity);
  } catch (error) {
    console.error('Не вдалося зберегти книгу в Shopping List:', error);
  }
});

orderForm.addEventListener('submit', event => {
  event.preventDefault();
  alert('Дякуємо за покупку');
});

document.addEventListener('click', async event => {
  const learnMoreButton = event.target.closest('.books-list__btn');

  if (!learnMoreButton) {
    return;
  }

  const bookId = learnMoreButton.dataset.bookId;

  try {
    const book = await getBooksById(bookId);
    fillModal(book);
    openModal();
  } catch (error) {
    console.error('Не вдалося знайти книгу', error.message);
  }
});

closeButton.addEventListener('click', closeModal);

backdrop.addEventListener('click', event => {
  if (event.target === backdrop) {
    closeModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !backdrop.classList.contains('is-hidden')) {
    closeModal();
  }
});
