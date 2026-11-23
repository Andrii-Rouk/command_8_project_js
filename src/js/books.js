
import {
   getCategoryList,
   getTopBooks,
   getBooksByCategory,
} from './books.api.js';

import './loader.js';



const booksList = document.querySelector('.books__list');
const visibleCount = document.querySelector('.books__visible');
const totalCount = document.querySelector('.books__total');
const showMoreButton = document.querySelector('.books__show-more');

// Custom dropdown
const dropdown = document.querySelector('.category-dropdown');
const dropdownToggle = document.querySelector('.category-dropdown__toggle');
const dropdownMenu = document.querySelector('.category-dropdown__menu');
const dropdownLabel = document.querySelector('.category-dropdown__label');


const categoriesList = document.querySelector('.categories__list');


const categoriesSelect = document.querySelector('.category-select');


const MOBILE_INITIAL_COUNT = 10;
const DESKTOP_INITIAL_COUNT = 24;
const LOAD_MORE_COUNT = 4;

const desktopMedia = window.matchMedia('(min-width: 768px)');

let allBooks = [];
let extraBooks = 0;
let currentCategory = '';
let requestId = 0;



const getInitialCount = () => {
   return desktopMedia.matches
      ? DESKTOP_INITIAL_COUNT
      : MOBILE_INITIAL_COUNT;
};

const getVisibleLimit = () => {
   return getInitialCount() + extraBooks;
};


const removeDuplicates = books => {
   const uniqueBooks = new Map();

   books.forEach(book => {
      if (!book || typeof book !== 'object') return;

      if (book._id) {
         if (!uniqueBooks.has(book._id)) {
            uniqueBooks.set(book._id, book);
         }
      } else {

         uniqueBooks.set(Symbol(), book);
      }
   });

   return [...uniqueBooks.values()];
};


const escapeHTML = value => {
   return String(value ?? '').replace(/[&<>"']/g, char => {
      const entities = {
         '&': '&amp;',
         '<': '&lt;',
         '>': '&gt;',
         '"': '&quot;',
         "'": '&#039;',
      };

      return entities[char];
   });
};


const formatPrice = price => {
   if (price === undefined || price === null || price === '') {
      return '';
   }

   const value = String(price);

   return value.startsWith('$') ? value : `$${value}`;
};


const renderBooks = () => {
   const visibleBooks = allBooks.slice(0, getVisibleLimit());

   booksList.innerHTML = visibleBooks
      .map(book => {
         const title = escapeHTML(book.title || 'Unknown title');
         const author = escapeHTML(book.author || 'Unknown author');
         const image = escapeHTML(book.book_image || '');
         const price = escapeHTML(formatPrice(book.price));
         const bookId = escapeHTML(book._id || '');

         return `
        <li class="books__item">

          <img
            class="books__image"
            src="${image}"
            alt="${title}"
            loading="lazy"
          />

          <div class="books__readme-content">
            <h4 class="books__title">${title}</h4>
            <span class="price">${price}</span>
          </div>

          <p class="books__author">${author}</p>

          <button
            class="books-list__btn"
            type="button"
            data-book-id="${bookId}"
            ${bookId ? '' : 'disabled'}
          >
            Learn More
          </button>

        </li>
      `;
      })
      .join('');


   if (visibleCount) {
      visibleCount.textContent = visibleBooks.length;
   }

   if (totalCount) {
      totalCount.textContent = allBooks.length;
   }


   if (showMoreButton) {
      showMoreButton.hidden =
         visibleBooks.length >= allBooks.length;
   }
};



const updateActiveCategory = category => {

   if (dropdownMenu) {
      dropdownMenu
         .querySelectorAll('.category-dropdown__option')
         .forEach(button => {
            button.classList.toggle(
               'is-active',
               button.dataset.category === category
            );
         });
   }


   if (categoriesList) {
      categoriesList
         .querySelectorAll('.categories__button')
         .forEach(button => {
            button.classList.toggle(
               'is-active',
               button.dataset.category === category
            );
         });
   }

   if (categoriesSelect) {
      categoriesSelect.value = category;
   }


   if (dropdownLabel) {
      const activeButton = dropdownMenu?.querySelector(
         `.category-dropdown__option[data-category="${CSS.escape(category)}"]`
      );

      dropdownLabel.textContent =
         activeButton?.textContent || 'Categories';
   }
};



const loadBooks = async (category = '') => {
   const currentRequest = ++requestId;

   try {
      booksList.innerHTML = '<li>Loading books...</li>';

      if (showMoreButton) {
         showMoreButton.hidden = true;
      }

      let books = [];

      if (category) {
         books = await getBooksByCategory(category);
      } else {
         const categories = await getTopBooks();

         books = categories.flatMap(item => item.books || []);
      }

      if (currentRequest !== requestId) return;

      allBooks = removeDuplicates(books);

      currentCategory = category;
      extraBooks = 0;

      updateActiveCategory(category);
      renderBooks();

      console.log('Books received:', books.length);
      console.log('Unique books:', allBooks.length);

   } catch (error) {
      if (currentRequest !== requestId) return;

      console.error('Error loading books:', error);

      booksList.innerHTML = `
      <li>Something went wrong. Please try again later.</li>
    `;

      if (visibleCount) visibleCount.textContent = '0';
      if (totalCount) totalCount.textContent = '0';

      if (showMoreButton) {
         showMoreButton.hidden = true;
      }
   }
};


const initCategories = async () => {
   try {
      const categories = await getCategoryList();

      categories.forEach(category => {
         const categoryName = category.list_name;
         const categoryValue = category.list_name;


         if (dropdownMenu) {
            const li = document.createElement('li');

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'category-dropdown__option';
            button.dataset.category = categoryValue;
            button.textContent = categoryName;

            li.append(button);
            dropdownMenu.append(li);
         }


         if (categoriesList) {
            const li = document.createElement('li');
            li.className = 'categories__item';

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'categories__button';
            button.dataset.category = categoryValue;
            button.textContent = categoryName;

            li.append(button);
            categoriesList.append(li);
         }


         if (categoriesSelect) {
            const option = document.createElement('option');
            option.value = categoryValue;
            option.textContent = categoryName;

            categoriesSelect.append(option);
         }
      });

   } catch (error) {
      console.error('Error loading categories:', error);
   }
};



if (dropdownToggle && dropdown && dropdownMenu) {
   dropdownToggle.addEventListener('click', () => {
      const isOpen = dropdown.classList.toggle('is-open');

      dropdownMenu.hidden = !isOpen;
      dropdownToggle.setAttribute('aria-expanded', String(isOpen));
   });

   dropdownMenu.addEventListener('click', event => {
      const option = event.target.closest(
         '.category-dropdown__option'
      );

      if (!option) return;

      closeDropdown();
      loadBooks(option.dataset.category);
   });


   document.addEventListener('click', event => {
      if (!dropdown.contains(event.target)) {
         closeDropdown();
      }
   });


   document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
         closeDropdown();
         dropdownToggle.focus();
      }
   });
}

function closeDropdown() {
   if (!dropdown || !dropdownMenu || !dropdownToggle) return;

   dropdown.classList.remove('is-open');
   dropdownMenu.hidden = true;
   dropdownToggle.setAttribute('aria-expanded', 'false');
}


if (categoriesList) {
   categoriesList.addEventListener('click', event => {
      const button = event.target.closest('.categories__button');

      if (!button) return;

      loadBooks(button.dataset.category);
   });
}


if (categoriesSelect) {
   categoriesSelect.addEventListener('change', event => {
      loadBooks(event.target.value);
   });
}



if (showMoreButton) {
   showMoreButton.addEventListener('click', () => {
      extraBooks += LOAD_MORE_COUNT;
      renderBooks();
   });
}


desktopMedia.addEventListener('change', () => {
   renderBooks();
});



const initBooks = async () => {
   if (!booksList) return;

   await initCategories();
   await loadBooks();
};

initBooks();
