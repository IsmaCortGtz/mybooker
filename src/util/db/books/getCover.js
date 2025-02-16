import fetchOne from '#f/util/db/fetchOne';

async function getCover(extensionId, bookId) {
  return (await fetchOne(
    `SELECT cover FROM books 
    WHERE remote_id = @bookId AND extension_id = (
      SELECT id FROM extensions WHERE remote_id = @extensionId
    );`,
    { extensionId, bookId }
  ))?.cover;
}

export default getCover;