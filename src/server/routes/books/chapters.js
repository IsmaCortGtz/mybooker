import bookChapters from "#f/core/books/chapters";

async function chapters(c) {
    const chapters = await bookChapters(c.req.param("extensionId"), c.req.param("bookId"));
    if (!chapters) return c.json({ message: "Extension error" }, 404);
    return c.json(chapters);
}

export default chapters;