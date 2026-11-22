import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';

const feedbacksSection = document.querySelector('.feedbacks');
const sliderEl = feedbacksSection?.querySelector('.feedbacks-slider');
const prevBtn = feedbacksSection?.querySelector('.feedbacks-btn--prev');
const nextBtn = feedbacksSection?.querySelector('.feedbacks-btn--next');
const dots = Array.from(feedbacksSection?.querySelectorAll('.feedbacks-dot') || []);

if (sliderEl) {
  const swiper = new Swiper(sliderEl, {
    modules: [Navigation, Pagination, Keyboard],
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    spaceBetween: 24,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1440: {
        slidesPerView: 3,
      },
    },
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
      addIcons: false,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });

  function updateControlsState() {
    if (prevBtn) {
      prevBtn.disabled = swiper.isBeginning;
    }
    if (nextBtn) {
      nextBtn.disabled = swiper.isEnd;
    }

    dots.forEach((dot, index) => {
      const isActive = index === swiper.activeIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      swiper.slideTo(index);
    });
  });

  swiper.on('slideChange', updateControlsState);
  updateControlsState();
}
