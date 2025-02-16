import fetchOne from '#f/util/db/fetchOne';

function getInfo(extensionId, bookId) {
  return fetchOne(
    `SELECT remote_id AS id, title, cover, state, rate FROM books 
    WHERE remote_id = @bookId AND extension_id = (
      SELECT id FROM extensions WHERE remote_id = @extensionId
    );`, 
    { extensionId, bookId }
  );
}

export default getInfo;