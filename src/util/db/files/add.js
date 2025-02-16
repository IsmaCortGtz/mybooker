import run from '#f/util/db/run';

async function add(extensionId, bookId, volumeNumber, uuid, title, language, creator, date, firstChapterId, lastChapterId) {
  return run(
    `INSERT INTO files (book_id, volume, identifier, title, language, creator, date, first_chapter_id, last_chapter_id)
    VALUES (
      (
        SELECT id FROM books WHERE remote_id = @bookId
      ),
      @volumeNumber, @uuid, @title, @language, @creator, @date, @firstChapterId, @lastChapterId
    );`, 
    { bookId, volumeNumber, uuid, title, language, creator, date, firstChapterId, lastChapterId },
    extensionId
  );
}

export default add;