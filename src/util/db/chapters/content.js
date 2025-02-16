import fetchOne from '#f/util/db/fetchOne';

async function getContent(extensionId, bookId, volumeId, chapterId) {
  return (await fetchOne(
    `SELECT content FROM chapters
    WHERE remote_id = ?4 AND volume_id = (
      SELECT id FROM volumes WHERE remote_id = ?3 AND book_id = (
        SELECT id FROM books WHERE remote_id = ?2 AND extension_id = (
          SELECT id FROM extensions WHERE remote_id = ?1
        )
      )
    );`, 
    [extensionId, bookId, volumeId, chapterId]
  ))["content"];
}

export default getContent;