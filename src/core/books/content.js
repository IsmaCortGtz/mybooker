import fs from "node:fs";
import extensionRun from "#f/util/extensions/run";
import extensionActions from "#f/util/extensions/actions";
import isDownloadedDb from "#f/util/db/chapters/isDownloaded";
import dir from "#i/util/dir";


export default async function getContent(extensionId, bookId, volumeId, chapterId) {
  const downloaded = await isDownloadedDb(extensionId, bookId, volumeId, chapterId);
  const content = getFsContent(extensionId, bookId, volumeId, chapterId);
  if (downloaded && content) return content;

  const chapterContent = await extensionRun(extensionId, extensionActions.GET_CHAPTER, bookId, volumeId, chapterId)
  if (!chapterContent) throw new Error("Chapter not found in extension");

  if (downloaded) {
    fs.mkdirSync(dir.config.cache(extensionId, bookId, "content", volumeId), { recursive: true });
    fs.writeFileSync(dir.config.cache(extensionId, bookId, "content", volumeId, `${chapterId}.html`), chapterContent, { encoding: "utf8" });
  }

  return chapterContent;
}


function getFsContent(extensionId, bookId, volumeId, chapterId) {
  const contentPath = dir.config.cache(extensionId, bookId, "content", volumeId, `${chapterId}.html`);
  if (!fs.existsSync(contentPath)) return null;
  return fs.readFileSync(contentPath, "utf8");
}