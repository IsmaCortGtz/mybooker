import fetchAll from "#l/util/db/fetchAll";

function list(extensionId, bookId, volumeId) {
  return fetchAll(
    `SELECT remote_id AS id, title, read, number, id AS db_id, (content IS NOT NULL) AS content 
    FROM chapters WHERE volume_id = (
      SELECT id FROM volumes WHERE remote_id = ?3 AND book_id = (
        SELECT id FROM books WHERE remote_id = ?2 AND extension_id = (
          SELECT id FROM extensions WHERE remote_id = ?1
        )
      )
    ) ORDER BY chapters.id;`, 
    [extensionId, bookId, volumeId]
  );
}

export default list;