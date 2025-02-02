import fs from 'node:fs';
import addFileDB from '#l/util/db/files/add';
import { randomUUID } from 'node:crypto';
import EPUB from '#l/util/epub';
import getCover from '#l/core/books/icon';
import getChapters from '#l/core/books/chapters';
import getChapterContent from '#l/core/books/content';

async function add(extensionId, bookId, volumeNumber, title, language, creator, date, firstChapterId, lastChapterId) {
  // Register file in the database
  const uuid = randomUUID();
  await addFileDB(extensionId, bookId, volumeNumber, uuid, title, language, creator, date, firstChapterId, lastChapterId);

  // Generathe the EPUB file
  const book = new EPUB();
  book.setMeta({
    title,
    number: volumeNumber,
    language,
    creator,
    date
  });
  
  const coverPath = await getCover(extensionId, bookId);
  if (!coverPath) throw new Error("Cover not found");

  const coverExtension = coverPath.split(".").pop();

  const coverBuffer = fs.readFileSync(coverPath);
  book.setCover(coverBuffer, `cover.${coverExtension}`);

  const volumes = await getChapters(extensionId, bookId);
  
  let started = false;
  
  volumeLoop:
  for (const volume of volumes) {
    for (const chapter of volume.chapters) {
      if (!started && chapter.id !== firstChapterId) continue;
      started = true;

      book.addChapter({
        id: chapter.id,
        title: chapter.title,
        number: chapter.number,
        content: await getChapterContent(extensionId, bookId, volume.id, chapter.id)
      });
      if (chapter.id === lastChapterId) break volumeLoop;
    }
  }
  
  book.save();
}

export default add;