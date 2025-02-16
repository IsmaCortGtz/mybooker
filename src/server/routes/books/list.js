import booksList from "#f/core/books/list";

async function list(c) {
    const books = await booksList(c.req.param("id"));
    if (!books) return c.json({ message: "Extension error" }, 404);
    return c.json(books);
}

export default list;