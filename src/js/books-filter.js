export function initBooksFilter({
  categoriesList,
  categoriesSelect,
  loadBooks,
}) {
  function selectCategory(category) {
    categoriesList?.querySelectorAll('.categories__button').forEach(button => {
      const isActive = button.dataset.category === category;

      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    if (categoriesSelect) {
      categoriesSelect.value = category;
    }

    return loadBooks(category);
  }

  categoriesList?.addEventListener('click', event => {
    const button = event.target.closest('.categories__button');

    if (!button || !categoriesList.contains(button)) return;

    selectCategory(button.dataset.category);
  });

  categoriesSelect?.addEventListener('change', event => {
    selectCategory(event.currentTarget.value);
  });

  return selectCategory;
}
