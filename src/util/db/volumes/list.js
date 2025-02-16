import fetchAll from '#f/util/db/fetchAll';

function list(extensionId, bookId) {
  return fetchAll(
    `
      SELECT remote_id AS id, title, number
      FROM volumes WHERE book_id = (
        SELECT id FROM books WHERE remote_id = @bookId AND extension_id = (
          SELECT id FROM extensions WHERE remote_id = @extensionId
        )
      );
    `, 
    { extensionId, bookId }
  );
}

export default list;