import fetchOne from '#f/util/db/fetchOne';

function getInfo(extensionId, bookId, identifier) {
  return fetchOne(
    `SELECT * FROM files 
    WHERE book_id = (
      SELECT id FROM books WHERE remote_id = @bookId
    ) AND identifier = @identifier;`, 
    { bookId, identifier },
    extensionId
  );
}

export default getInfo;