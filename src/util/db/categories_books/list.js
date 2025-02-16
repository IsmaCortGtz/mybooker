import fetchAll from '#f/util/db/fetchAll';

function list(categoryId) {
  return fetchAll(
    `SELECT books.remote_id AS id, extensions.remote_id AS extension_id, books.title FROM books 
    JOIN categories_books ON books.id = categories_books.book_id
    JOIN extensions ON books.extension_id = extensions.id
    WHERE categories_books.category_id = ? ORDER BY books.id;`, 
    [categoryId]
  );
}

export default list;