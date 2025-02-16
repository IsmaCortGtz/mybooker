import run from '#f/util/db/run';

async function add(extensionId, bookId, volumeNumber, uuid, title, language, creator, date, firstChapterId, lastChapterId) {
  return run(
    `INSERT INTO files (book_id, volume, identifier, title, language, creator, date, first_chapter_id, last_chapter_id)
    VALUES (
      (
        SELECT id FROM books WHERE remote_id = ? AND extension_id = (
          SELECT id FROM extensions WHERE remote_id = ?
        )
      ),
      ?, ?, ?, ?, ?, ?, ?, ?
    );`, 
    [bookId, extensionId, volumeNumber, uuid, title, language, creator, date, firstChapterId, lastChapterId]
  );
}

export default add;