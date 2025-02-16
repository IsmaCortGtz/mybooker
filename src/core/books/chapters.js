import extensionRun from "#f/util/extensions/run";
import extensionActions from "#f/util/extensions/actions";

import addVolume from "#f/util/db/volumes/add";
import addChapter from "#f/util/db/chapters/add";

import volumeListDB from "#f/util/db/volumes/list";
import chapterListDB from "#f/util/db/chapters/list";


async function getChapters(extensionId, bookId) {

  const volumes = await volumeListDB(extensionId, bookId);
  if (Array.isArray(volumes) && volumes.length > 0) {
    // Get chapters from the database
    for (const volume of volumes) {
      volume.chapters = await chapterListDB(extensionId, bookId, volume.id);
    }

    return volumes;
  }

  // Get book content from the extension
  const bookContent = await extensionRun(extensionId, extensionActions.GET_BOOK, bookId);
  if (!bookContent) return null;
  console.log(bookContent[0].chapters);

  // Add new volumes and chapters to the database
  for (const volume of bookContent) {
    // Add current volume to the database
    await addVolume(extensionId, bookId, volume.id, volume.title, volume.number);

    // Add chapters to the database
    for (const chapter of volume.chapters) {
      await addChapter(extensionId, bookId, volume.id, chapter.id, chapter.title, chapter.number, chapter.read);
    }
  }

  return bookContent;
}

export default getChapters;