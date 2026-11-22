import { getBooksById } from './books.api.js';
import Accordion from 'accordion-js';

new Accordion('.book-modal-accordion');

document.querySelectorAll('.book-modal-accordion .ac-panel').forEach(panel => {
  panel.style.overflow = 'hidden';
});

const backdrop = document.querySelector('.book-modal-backdrop');
const closeButton = document.querySelector('.book-modal-close');

const bookImage = document.querySelector('.book-modal-image');
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

function openModal() {
  backdrop.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  backdrop.classList.add('is-hidden');
  document.body.style.overflow = '';
}

function fillModal(book) {
  bookImage.src = book.book_image || '';
  bookImage.alt = book.title || 'Обкладинка обраної книги';

  bookTitle.textContent = book.title || '';
  bookAuthor.textContent = book.author || '';
  bookPrice.textContent = book.price || '';

  description.textContent = book.description || '';
  shipping.textContent = book.shipping || '';
  returns.textContent = book.returns || '';

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
  console.log('Кількість книг у кошику:', Number(quantityInput.value));
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
