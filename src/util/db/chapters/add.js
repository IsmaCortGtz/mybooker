import run from '#f/util/db/run';

function add(extensionId, bookId, volumeId, chapterId, title, number, downloaded, read) {
  return run(
    `INSERT INTO chapters (volume_id, remote_id, title, number, downloaded, read)
    VALUES (
      (
        SELECT id FROM volumes WHERE remote_id = @volumeId AND book_id = (
          SELECT id FROM books WHERE remote_id = @bookId
        )
      ),
      @chapterId, @title, @number, @downloaded, @read
    );`, 
    { bookId, volumeId, chapterId, title, number, downloaded, read },
    extensionId
  );
}

export default add;