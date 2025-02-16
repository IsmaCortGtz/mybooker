import run from '#f/util/db/run';

function add(extensionId, bookId, volumeId, title, number) {
  return run(
    `INSERT INTO volumes (book_id, remote_id, title, number)
    VALUES (
      (SELECT id FROM books WHERE extension_id = (
        SELECT id FROM extensions WHERE remote_id = @extensionId
      ) AND remote_id = @bookId),
      @volumeId, @title, @number
    );`,
    { extensionId, bookId, volumeId, title, number }
  );
}

export default add;