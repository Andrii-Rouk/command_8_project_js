const scrollUpBtn = document.querySelector('.scroll-up');

function showScroll() {
    scrollUpBtn.classList.remove('is-hidden');
}

function hideScroll() {
  scrollUpBtn.classList.add('is-hidden');
}

scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    showScroll();
  } else {
    hideScroll();
  }
});