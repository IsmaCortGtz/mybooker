import fetchOne from '#f/util/db/fetchOne';

async function getContent(extensionId, bookId, volumeId, chapterId) {
  return (await fetchOne(
    `SELECT content FROM chapters
    WHERE remote_id = @chapterId AND volume_id = (
      SELECT id FROM volumes WHERE remote_id = @volumeId AND book_id = (
        SELECT id FROM books WHERE remote_id = @bookId AND extension_id = (
          SELECT id FROM extensions WHERE remote_id = @extensionId
        )
      )
    );`, 
    { extensionId, bookId, volumeId, chapterId }
  ))["content"];
}

export default getContent;