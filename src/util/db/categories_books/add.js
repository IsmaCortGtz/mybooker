import run from '#l/util/db/run';

function add(extensionId, bookId, categoryName) {
  return run(
    `INSERT INTO categories_books (category_id, book_id) VALUES 
    ((SELECT id FROM categories WHERE name = ?3), (
      SELECT id FROM books WHERE remote_id = ?2 AND extension_id = (
        SELECT id FROM extensions WHERE remote_id = ?1
      )
    ));`, 
    [extensionId, bookId, categoryName]
  );
}

export default add;