import fs from 'node:fs';

import getFile from '#f/util/db/files/info';
import EPUB from '#i/util/epub';
import getCover from '#f/core/books/icon';
import getChapters from '#f/core/books/chapters';
import getChapterContent from '#f/core/books/content';

export default async function create(extensionId, bookId, uuid) {
  // Get the file information
  const file = await getFile(extensionId, bookId, uuid);
  if (!file) throw new Error("File not found");
  
  // Generathe the EPUB file
  const book = new EPUB();
  book.setMeta({
    title: file.title,
    number: file.volume,
    language: file.language,
    creator: file.creator,
    date : file.date,
    identifier: uuid
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
      if (!started && chapter.id !== file.first_chapter_id) continue;
      started = true;

      book.addChapter({
        id: chapter.id,
        title: chapter.title,
        number: chapter.number,
        content: await getChapterContent(extensionId, bookId, volume.id, chapter.id)
      });
      if (chapter.id === file.last_chapter_id) break volumeLoop;
    }
  }
  
  book.save(extensionId, bookId);
}
