import getCoverDb from "#f/util/db/books/getCover";
import dir from "#i/util/dir";

async function getCover(extensionId, bookId) {
  const bookCover = await getCoverDb(extensionId, bookId);
  if (!bookCover) return null;

  return dir.config.cache(extensionId, bookId, bookCover);
}

export default getCover;