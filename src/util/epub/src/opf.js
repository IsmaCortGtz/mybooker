import fs from 'node:fs';
import dir from '#l/util/dir';

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

export default function createOPF(metadata) {
  let templateContent = loadTemplate();
  const manifest = createManifest(metadata.chapters);
  const spine = createSpine(metadata.chapters);
  templateContent = templateContent.replace("{{title}}", metadata.title);
  templateContent = templateContent.replace("{{language}}", metadata.language);
  templateContent = templateContent.replace("{{creator}}", metadata.creator);
  templateContent = templateContent.replace("{{date}}", metadata.date);
  templateContent = templateContent.replace("{{identifier}}", metadata.identifier);
  templateContent = templateContent.replace("{{manifest}}", manifest);
  templateContent = templateContent.replace("{{spine}}", spine);
  return templateContent;
}

export function createManifest(chapters) {
  let manifest = ``;
  chapters.forEach(chapter => {
    manifest += `\n    <item href="Text/${chapter.id}.html" id="${chapter.id}.html" media-type="text/html" />`;
  });
  return manifest;
}

export function createSpine(chapters) {
  let spine = ``;
  chapters.forEach(chapter => {
    spine += `\n    <itemref idref="${chapter.id}.html" />`;
  });
  return spine;
}


export function loadTemplate() {
  const templatePath = dir.src.util("epub", 'templates', `content.opf`);
  if (!fs.existsSync(templatePath)) throw new Error(`Template not found`);
  return fs.readFileSync(templatePath, 'utf-8');
}