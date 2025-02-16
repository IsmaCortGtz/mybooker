import fetchAll from '#f/util/db/fetchAll';

function list(categoryId) {
  return fetchAll(
    `SELECT book_id AS id, extension_id, title
    FROM categories_books WHERE category_id = @categoryId;`, 
    { categoryId }
  );
}

export default list;