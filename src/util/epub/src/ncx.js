import fs from 'node:fs';
import dir from '#i/util/dir';

/*
metadata = {
  title,
  number,
  language,
  creator,
  date,
  identifier,
  chapters: [{
    id,
    title,
    number,
  }, {...}]
}
*/

export default function createNCX(metadata) {
  let templateNCX = loadTemplate();
  const navMap = createNavMap(metadata.chapters);
  templateNCX = templateNCX.replace("{{title}}", metadata.title);
  templateNCX = templateNCX.replace("{{creator}}", metadata.creator);
  templateNCX = templateNCX.replace("{{identifier}}", metadata.identifier);
  templateNCX = templateNCX.replace("{{navmap}}", navMap);
  return templateNCX;
}

export function createNavPoint(chapter, count) {
  let spine = `\n\n    <navPoint id="${chapter.id}.html" playOrder="${count}">`;
  spine += `\n      <navLabel><text>${chapter.number}. ${chapter.title}</text></navLabel>`;
  spine += `\n      <content src="Text/${chapter.id}.html"/>`;
  spine += `\n    </navPoint>`;
  return spine;
}

export function createNavMap(chapters) {
  return chapters.map((chapter, index) => createNavPoint(chapter, index + 3)).join('');
}


export function loadTemplate() {
  const templatePath = dir.src.util("epub", 'templates', `toc.ncx`);
  if (!fs.existsSync(templatePath)) throw new Error(`Template not found`);
  return fs.readFileSync(templatePath, 'utf-8');
}