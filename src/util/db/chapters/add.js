import run from '#f/util/db/run';

function add(extensionId, bookId, volumeId, chapterId, title, number, read) {
  return run(
    `INSERT INTO chapters (volume_id, remote_id, title, number, read)
    VALUES (
      (
        SELECT id FROM volumes WHERE remote_id = @volumeId AND book_id = (
          SELECT id FROM books WHERE remote_id = @bookId AND extension_id = (
            SELECT id FROM extensions WHERE remote_id = @extensionId
          )
        )
      ),
      @chapterId, @title, @number, @read
    );`, 
    { extensionId, bookId, volumeId, chapterId, title, number, read }
  );
}

export default add;