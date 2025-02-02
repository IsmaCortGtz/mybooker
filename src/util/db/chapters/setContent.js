import run from "#l/util/db/run";

function updateContent(extensionId, bookId, volumeId, chapterId, content) {
  return run(
    `UPDATE chapters SET content = ?5 
    WHERE remote_id = ?4 AND volume_id = (
      SELECT id FROM volumes WHERE remote_id = ?3 AND book_id = (
        SELECT id FROM books WHERE remote_id = ?2 AND extension_id = (
          SELECT id FROM extensions WHERE remote_id = ?1
        )
      )
    );`, 
    [extensionId, bookId, volumeId, chapterId, content]
  );
}

export default updateContent;