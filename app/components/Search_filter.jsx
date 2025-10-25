export function filterBooks(books = [], query = '') {
  const normalized = (query || '').trim().toLowerCase();
  if (!normalized) return books;

  return books.filter((b) => {
    const title = (b.title || '').toLowerCase();
    const author = (b.author || '').toLowerCase();
    const category = (b.category || '').toLowerCase();
    const publisher = (b.publisher || '').toLowerCase();
    const language = (b.language || '').toLowerCase();

    const price = b.price != null ? String(b.price).toLowerCase() : '';
    const year = b.publishedYear != null ? String(b.publishedYear).toLowerCase() : '';

    return (
      title.includes(normalized) ||
      author.includes(normalized) ||
      category.includes(normalized) ||
      publisher.includes(normalized) ||
      language.includes(normalized) ||
      price.includes(normalized) ||
      year.includes(normalized)
    );
  });
}
