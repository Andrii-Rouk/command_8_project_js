import { openModal } from './contact-modal.js';

const eventsList = document.querySelector('.events__list');
const eventsSection = eventsList?.closest('.events');
const prevEvent = eventsSection?.querySelector('[data-events-prev]');
const nextEvent = eventsSection?.querySelector('[data-events-next]');
const eventDots = eventsSection?.querySelectorAll('.events__dot');

eventsList?.addEventListener('click', event => {
  const registerButton = event.target.closest('[data-event-register]');
  if (!registerButton) return;

  const eventCard = registerButton.closest('.events__card');
  const eventTitle = eventCard
    .querySelector('.events__name')
    .textContent.trim();

  openModal(eventTitle);
});

if (eventsList && prevEvent && nextEvent) {
  function getEventStep() {
    const [first, second] = eventsList.children;
    if (!second) return eventsList.clientWidth;

    return (
      second.getBoundingClientRect().left - first.getBoundingClientRect().left
    );
  }

  function updateEventNavigation() {
    const { scrollLeft, scrollWidth, clientWidth } = eventsList;
    const lastPosition = scrollWidth - clientWidth;
    const activeIndex = Math.round(scrollLeft / (getEventStep() || 1));

    prevEvent.disabled = scrollLeft <= 1;
    nextEvent.disabled = scrollLeft >= lastPosition - 1;

    eventDots.forEach((dot, index) => {
      dot.classList.toggle('events__dot--active', index === activeIndex);
    });
  }

  prevEvent.addEventListener('click', () => {
    eventsList.scrollBy({ left: -getEventStep(), behavior: 'smooth' });
  });

  nextEvent.addEventListener('click', () => {
    eventsList.scrollBy({ left: getEventStep(), behavior: 'smooth' });
  });

  eventsList.addEventListener('scroll', updateEventNavigation);
  window.addEventListener('resize', updateEventNavigation);
  updateEventNavigation();
}
