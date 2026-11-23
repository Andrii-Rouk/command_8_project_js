const categoryButtonClass = 'books-section__category-button';

export function setActiveCategory(categoriesList, category) {
  const selectedValue = category ?? '';

  categoriesList.querySelectorAll(`.${categoryButtonClass}`).forEach(button => {
    const isActive = button.dataset.category === selectedValue;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

export function renderBookCategories(categoriesList, categories) {
  const categoryNames = (Array.isArray(categories) ? categories : [])
    .map(category =>
      typeof category === 'string' ? category : category?.list_name
    )
    .filter(name => typeof name === 'string' && name.trim());

  const entries = [
    { label: 'All Categories', value: '' },
    ...Array.from(new Set(categoryNames), name => ({
      label: name,
      value: name,
    })),
  ];

  const fragment = document.createDocumentFragment();

  for (const { label, value } of entries) {
    const item = document.createElement('li');
    item.className = 'books-section__category-item';

    const button = document.createElement('button');
    button.className = categoryButtonClass;
    button.type = 'button';
    button.textContent = label;
    button.dataset.category = value;

    item.append(button);
    fragment.append(item);
  }

  categoriesList.replaceChildren(fragment);
  setActiveCategory(categoriesList, null);
}
