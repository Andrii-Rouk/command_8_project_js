import { openModal } from './contact-modal.js';

const eventsList = document.querySelector('.events__list');

eventsList.addEventListener('click', event => {
  const registerButton = event.target.closest('[data-event-register]');

  if (!registerButton) {
    return;
  }

  const eventCard = registerButton.closest('.events__card');
  const eventTitle = eventCard
    .querySelector('.events__name')
    .textContent.trim();

  openModal(eventTitle);
});
