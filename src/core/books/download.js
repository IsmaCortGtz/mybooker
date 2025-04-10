import fs from "node:fs";
import extensionRun from "#f/util/extensions/run";
import extensionActions from "#f/util/extensions/actions";
import isDownloadedDb from "#f/util/db/chapters/isDownloaded";
import setDownloadedDb from "#f/util/db/chapters/setDownloaded";
import dir from "#i/util/dir";


export default async function downloadContent(extensionId, bookId, volumeId, chapterId) {
  // Check if the chapter is already downloaded
  const downloaded = await isDownloadedDb(extensionId, bookId, volumeId, chapterId);
  if (downloaded) return;

  // Get the chapter content from the extension
  const chapterContent = await extensionRun(extensionId, extensionActions.GET_CHAPTER, bookId, volumeId, chapterId)
  if (!chapterContent) throw new Error("Chapter not found in extension");

  // Save the chapter content to the cache
  const contentPath = dir.config.cache(extensionId, bookId, "content", volumeId, `${chapterId}.html`);
  const volumePath = dir.config.cache(extensionId, bookId, "content", volumeId);
  if (!fs.existsSync(volumePath)) fs.mkdirSync(volumePath, { recursive: true });
  fs.writeFileSync(contentPath, chapterContent, { encoding: "utf8" });

  // Update the database
  await setDownloadedDb(extensionId, bookId, volumeId, chapterId, true);
}