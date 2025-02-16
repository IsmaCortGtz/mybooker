import addBookDB from "#f/util/db/categories_books/add";
import getBook from "#f/util/db/books/info";

export default async function addBook(extensionId, bookId, categoryName) {
  const bookInfo = await getBook(extensionId, bookId);
  if (!bookInfo || !bookInfo.title) throw new Error("Book not found");

  await addBookDB(extensionId, bookId, bookInfo.title, categoryName);
  return true;
};
