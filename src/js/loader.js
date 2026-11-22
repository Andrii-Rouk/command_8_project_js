const loader = document.querySelector('.loader');

export const showLoader = () => {
  loader.classList.remove('is-hidden');
};

export const hideLoader = () => {
  loader.classList.add('is-hidden');
};
