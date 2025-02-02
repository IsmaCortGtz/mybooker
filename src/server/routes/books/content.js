import chapterContent from "#l/core/books/content";

async function getContent(c) {
    const params = { 
        extensionId: c.req.param("extensionId"), 
        bookId: c.req.param("bookId"), 
        volumeId: c.req.param("volumeId"), 
        chapterId: c.req.param("chapterId") 
    };
    
    const books = await chapterContent(params.extensionId, params.bookId, params.volumeId, params.chapterId);
    if (!books) return c.json({ message: "Extension error" }, 404);
    return c.json(books);
}

export default getContent;