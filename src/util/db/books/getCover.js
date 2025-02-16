import fetchOne from '#f/util/db/fetchOne';

async function getCover(extensionId, bookId) {
  return (await fetchOne(
    `SELECT cover FROM books 
    WHERE remote_id = ?2 AND extension_id = (
      SELECT id FROM extensions WHERE remote_id = ?1  
    );`,
    [extensionId, bookId]
  ))?.cover;
}

export default getCover;