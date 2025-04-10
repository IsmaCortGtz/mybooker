import fetchOne from '#f/util/db/fetchOne';

async function getDownloaded(extensionId, bookId, volumeId, chapterId) {
  return (await fetchOne(
    `SELECT downloaded FROM chapters
    WHERE remote_id = @chapterId AND volume_id = (
      SELECT id FROM volumes WHERE remote_id = @volumeId AND book_id = (
        SELECT id FROM books WHERE remote_id = @bookId
      )
    );`, 
    { bookId, volumeId, chapterId },
    extensionId
  ))?.downloaded;
}

export default getDownloaded;