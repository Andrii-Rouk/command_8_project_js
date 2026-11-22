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

function openModal() {
  backdrop.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  backdrop.classList.add('is-hidden');
  document.body.style.overflow = '';
}

document.addEventListener('click', event => {
  const learnMoreButton = event.target.closest('.books-list__btn');

  if (!learnMoreButton) {
    return;
  }

  const bookId = learnMoreButton.dataset.bookId;
  console.log('Book ID:', bookId); // Временно проверяем, что ID получен

  openModal();
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
