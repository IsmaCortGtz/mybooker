import findCategory from "#l/util/db/categories/find";
import listBooks from "#l/util/db/categories_books/list";

async function list(categoryName) {
  const categoryId = await findCategory(categoryName);
  if (!categoryId) return null;
  
  const books = await listBooks(categoryId);
  if (!books) return null;

  return books;
}

export default list;
