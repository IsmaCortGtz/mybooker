import run from '#f/util/db/run';

function updateContent(extensionId, bookId, volumeId, chapterId, content) {
  return run(
    `UPDATE chapters SET content = ? 
    WHERE remote_id = ? AND volume_id = (
      SELECT id FROM volumes WHERE remote_id = ? AND book_id = (
        SELECT id FROM books WHERE remote_id = ? AND extension_id = (
          SELECT id FROM extensions WHERE remote_id = ?
        )
      )
    );`, 
    [content, chapterId, volumeId, bookId, extensionId ]
  );
}

export default updateContent;