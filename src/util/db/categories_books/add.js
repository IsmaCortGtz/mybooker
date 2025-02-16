import run from '#f/util/db/run';

async function add(extensionId, bookId, title, categoryName) {
  return await run(
    `INSERT INTO categories_books (category_id, extension_id, book_id, title) VALUES 
    ((SELECT id FROM categories WHERE name = @categoryName), @extensionId, @bookId, @title);`, 
    { extensionId, bookId, categoryName, title }
  );
}

export default add;