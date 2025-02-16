import fetchOne from '#f/util/db/fetchOne';

function getInfo(extensionId, bookId) {
  return fetchOne(
    `SELECT remote_id AS id, title, cover, state, rate 
    FROM books WHERE remote_id = @bookId;`, 
    { bookId },
    extensionId
  );
}

export default getInfo;