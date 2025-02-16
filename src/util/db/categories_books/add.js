import run from '#f/util/db/run';

function add(extensionId, bookId, categoryName) {
  return run(
    `INSERT INTO categories_books (category_id, book_id) VALUES 
    ((SELECT id FROM categories WHERE name = ?), (
      SELECT id FROM books WHERE remote_id = ? AND extension_id = (
        SELECT id FROM extensions WHERE remote_id = ?
      )
    ));`, 
    [categoryName, bookId, extensionId]
  );
}

export default add;