import run from '#f/util/db/run';

function updateContent(extensionId, bookId, volumeId, chapterId, downloaded) {
  return run(
    `UPDATE chapters SET downloaded = @downloaded 
    WHERE remote_id = @chapterId AND volume_id = (
      SELECT id FROM volumes WHERE remote_id = @volumeId AND book_id = (
        SELECT id FROM books WHERE remote_id = @bookId
      )
    );`, 
    { bookId, volumeId, chapterId, downloaded },
    extensionId
  );
}

export default updateContent;