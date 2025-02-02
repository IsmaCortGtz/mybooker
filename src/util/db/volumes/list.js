import fetchAll from "#l/util/db/fetchAll";

function list(extensionId, bookId) {
  return fetchAll(
    `
      SELECT remote_id AS id, title, number
      FROM volumes WHERE book_id = (
        SELECT id FROM books WHERE remote_id = ?2 AND extension_id = (
          SELECT id FROM extensions WHERE remote_id = ?1
        )
      );
    `, 
    [extensionId, bookId]
  );
}

export default list;