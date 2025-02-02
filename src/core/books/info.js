import getInfoDb from "#l/util/db/books/info";

async function getInfo(extensionId, bookId) {
  const bookInfo = await getInfoDb(extensionId, bookId);
  if (!bookInfo) return null;

  return bookInfo;
}

export default getInfo;