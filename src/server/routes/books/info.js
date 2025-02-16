import bookInfo from '#f/core/books/info';

async function info(c) {
  const book = await bookInfo(c.req.param("extensionId"), c.req.param("bookId"));
  if (!book) return c.json({ message: "Info not found" }, 404);
  return c.json(book);
}

export default info;
