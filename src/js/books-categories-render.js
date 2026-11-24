export function setActiveCategory(categoriesList, category) {
  const selectedValue = category ?? '';

  categoriesList.querySelectorAll('.categories__button').forEach(button => {
    const isActive = button.dataset.category === selectedValue;

    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

export function renderBookCategories(
  categoriesList,
  categories,
  categoriesSelect
) {
  const names = (Array.isArray(categories) ? categories : [])
    .map(category =>
      typeof category === 'string' ? category : category?.list_name
    )
    .filter(name => typeof name === 'string' && name.trim());

  const fragment = document.createDocumentFragment();
  const options = document.createDocumentFragment();
  for (const name of ['', ...new Set(names)]) {
    const item = document.createElement('li');
    item.className = 'categories__item';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'categories__button';
    button.dataset.category = name;
    button.textContent = name || 'All categories';

    item.append(button);
    fragment.append(item);
    options.append(
      new Option(button.textContent, name, name === '', name === '')
    );
  }

  categoriesList.replaceChildren(fragment);
  categoriesSelect.replaceChildren(options);

  setActiveCategory(categoriesList, '');
}
