import { randomUUID } from 'node:crypto';
import addFileDB from '#f/util/db/files/add';
import create from '#f/core/files/create';


export default async function add(extensionId, bookId, volumeNumber, title, language, creator, date, firstChapterId, lastChapterId) {
  // Register file in the database
  const uuid = randomUUID();
  await addFileDB(extensionId, bookId, volumeNumber, uuid, title, language, creator, date, firstChapterId, lastChapterId);

  // Generathe the EPUB file
  await create(extensionId, bookId, uuid);
}