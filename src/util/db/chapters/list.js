import fetchAll from '#f/util/db/fetchAll';

function list(extensionId, bookId, volumeId) {
  return fetchAll(
    `SELECT remote_id AS id, title, read, number, id AS db_id, downloaded 
    FROM chapters WHERE volume_id = (
      SELECT id FROM volumes WHERE remote_id = @volumeId AND book_id = (
        SELECT id FROM books WHERE remote_id = @bookId
      )
    ) ORDER BY chapters.id;`, 
    { bookId, volumeId },
    extensionId
  );
}

export default list;