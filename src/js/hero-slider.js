import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

const hero = document.querySelector('.hero');
const slider = hero?.querySelector('.hero-slider');

if (slider) {
  new Swiper(slider, {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
      1440: { spaceBetween: 24 },
    },
    navigation: {
      prevEl: hero.querySelector('.hero-prev'),
      nextEl: hero.querySelector('.hero-next'),
      addIcons: false,
    },
  });
}
