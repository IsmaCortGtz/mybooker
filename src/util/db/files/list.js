import fetchAll from '#f/util/db/fetchAll';

function list(extensionId, bookId) {
  return fetchAll(
    `SELECT * FROM files WHERE book_id = (
      SELECT id FROM books WHERE remote_id = @bookId
    );`, 
    { bookId },
    extensionId
  );
}

export default list;