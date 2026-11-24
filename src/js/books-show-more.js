const BOOKS_PER_PAGE = 4;

export function initBooksShowMore({
  button,
  counter,
  loadBooks,
  renderBooks,
  totalBooks = 0,
  initialCount = 0,
}) {
  if (!button || !counter) {
    console.error('Show More: button or counter not found');
    return null;
  }

  if (typeof loadBooks !== 'function' || typeof renderBooks !== 'function') {
    console.error('Show More: required functions are missing');
    return null;
  }

  let visibleCount = initialCount;
  let total = totalBooks;
  let isLoading = false;

  function updateUI() {
    const visibleElement = counter.querySelector('.books__visible');
    const totalElement = counter.querySelector('.books__total');

    if (visibleElement && totalElement) {
      visibleElement.textContent = visibleCount;
      totalElement.textContent = total;
    } else {
      counter.textContent = `Showing ${visibleCount} of ${total}`;
    }

    button.hidden = visibleCount >= total;
  }

  async function handleShowMore() {
    if (isLoading || visibleCount >= total) return;

    isLoading = true;
    button.disabled = true;

    try {
      const remaining = total - visibleCount;
      const limit = Math.min(BOOKS_PER_PAGE, remaining);

      const books = await loadBooks({
        page: Math.floor(visibleCount / BOOKS_PER_PAGE) + 1,
        limit,
        offset: visibleCount,
      });

      if (!Array.isArray(books)) {
        throw new Error('Invalid books data');
      }

      if (books.length === 0) {
        total = visibleCount;
        updateUI();
        return;
      }

      const nextBooks = books.slice(0, limit);

      await renderBooks(nextBooks);

      visibleCount += nextBooks.length;

      if (nextBooks.length < limit) {
        total = visibleCount;
      }

      updateUI();
    } catch (error) {
      console.error('Failed to load more books:', error);
    } finally {
      isLoading = false;
      button.disabled = false;
    }
  }

  button.addEventListener('click', handleShowMore);

  updateUI();

  return {
    reset({ totalBooks: newTotal, initialCount: newCount = 0 }) {
      total = newTotal;
      visibleCount = newCount;
      updateUI();
    },

    destroy() {
      button.removeEventListener('click', handleShowMore);
    },
  };
}
