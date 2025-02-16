import run from '#f/util/db/run';

function add(extensionId, bookId, volumeId, title, number) {
  return run(
    `INSERT INTO volumes (book_id, remote_id, title, number)
    VALUES (
      (SELECT id FROM books WHERE remote_id = @bookId),
      @volumeId, @title, @number
    );`,
    { bookId, volumeId, title, number },
    extensionId
  );
}

export default add;