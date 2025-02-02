import getCoverDb from "#l/util/db/books/getCover";
import { get } from "#l/util/dir";

async function getCover(extensionId, bookId) {
  const bookCover = await getCoverDb(extensionId, bookId);
  if (!bookCover) return null;

  return get("config", "cache", bookCover);
}

export default getCover;