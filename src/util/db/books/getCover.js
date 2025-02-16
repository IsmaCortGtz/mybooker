import fetchOne from '#f/util/db/fetchOne';

async function getCover(extensionId, bookId) {
  return (await fetchOne(
    `SELECT cover FROM books 
    WHERE remote_id = @bookId;`,
    { bookId },
    extensionId
  ))?.cover;
}

export default getCover;