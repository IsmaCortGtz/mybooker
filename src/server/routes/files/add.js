import addFilesCore from "#l/core/files/add";

async function addFile(c) {
  const { 
    extensionId, 
    bookId, 
    volume, 
    title, 
    language, 
    creator, 
    date, // ISO 8601 date
    firstChapterId, 
    lastChapterId 
  } = await c.req.json();

  await addFilesCore(extensionId, bookId, volume, title, language, creator, date, firstChapterId, lastChapterId);
  c.status(204)
  return c.body(null);
}

export default addFile;