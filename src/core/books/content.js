import extensionRun from "#l/util/extensions/run";
import extensionActions from "#l/util/extensions/actions";

import getContentDb from "#l/util/db/chapters/content";
import setContentDb from "#l/util/db/chapters/setContent";

async function getContent(extensionId, bookId, volumeId, chapterId) {
  const chapterContentDb = await getContentDb(extensionId, bookId, volumeId, chapterId);
  if (!!chapterContentDb) return chapterContentDb;

  const chapterContent = await extensionRun(extensionId, extensionActions.GET_CHAPTER, bookId, volumeId, chapterId)
  if (!chapterContent) return null;

  // Save the content in the database
  await setContentDb(extensionId, bookId, volumeId, chapterId, chapterContent);
  return chapterContent;
}

export default getContent;