import booksList from "#l/core/categories/books";

async function list(c) {
  const books = await booksList(c.req.param("categoryName"));
  if (!books) return c.json({ message: "Extension error" }, 404);
  return c.json(books);
}

export default list;