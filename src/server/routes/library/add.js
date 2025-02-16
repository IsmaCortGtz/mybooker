import addBooksCore from "#f/core/categories/addBook";

async function addBook(c) {
  const {  categoryName } = c.req.param();
  const { extensionId, bookId } = await c.req.json();

  await addBooksCore(extensionId, bookId, categoryName);
  c.status(204)
  return c.body(null);
}

export default addBook;