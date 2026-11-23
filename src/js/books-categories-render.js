const categoryButtonClass = ‘books-section__category-button’;

export function setActiveCategory(categoriesList, category) {
  const selectedValue = category ?? ‘’;

  categoriesList.querySelectorAll(.${categoryButtonClass}).forEach(button => {
    const isActive = button.dataset.category === selectedValue;

    button.classList.toggle(‘is-active’, isActive);
    button.setAttribute(‘aria-pressed’, String(isActive));
  });
}

export function renderBookCategories(categoriesList, categories) {
  const names = (Array.isArray(categories) ? categories : [])
    .map(category =>
      typeof category === ‘string’ ? category : category?.list_name
    )
    .filter(name => typeof name === ‘string’ && name.trim());

  const fragment = document.createDocumentFragment();

  for (const name of [‘’, ...new Set(names)]) {
    const item = document.createElement(‘li’);
    item.className = ‘books-section__category-item’;

    const button = document.createElement(‘button’);
    button.type = ‘button’;
    button.className = categoryButtonClass;
    button.dataset.category = name;
    button.textContent = name || ‘All Categories’;

    item.append(button);
    fragment.append(item);
  }

  categoriesList.replaceChildren(fragment);
  setActiveCategory(categoriesList, ‘’);
}