const menuToggle = document.querySelector('.headermenu-toggle');
const navigation = document.querySelector('.headernavigation');

if (menuToggle && navigation) {
  const navLinks = navigation.querySelectorAll('a');
  const desktopMediaQuery = window.matchMedia('(min-width: 768px)');

  const setMenuState = isOpen => {
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    navigation.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      menuToggle.focus();
    }
  });

  desktopMediaQuery.addEventListener('change', event => {
    if (event.matches) setMenuState(false);
  });
}