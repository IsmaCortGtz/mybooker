import run from "#l/util/db/run";

function add(extensionId, bookId, volumeId, chapterId, title, number, read) {
  return run(
    `INSERT INTO chapters (volume_id, remote_id, title, number, read)
    VALUES (
      (
        SELECT id FROM volumes WHERE remote_id = ?3 AND book_id = (
          SELECT id FROM books WHERE remote_id = ?2 AND extension_id = (
            SELECT id FROM extensions WHERE remote_id = ?1
          )
        )
      ),
      ?4, ?5, ?6, ?7
    );`, 
    [extensionId, bookId, volumeId, chapterId, title, number, read]
  );
}

export default add;