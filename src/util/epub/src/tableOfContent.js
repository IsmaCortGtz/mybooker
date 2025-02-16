import dir from '#f/util/epub/src/template';

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

export default function createTable(metadata) {
  const content = createContent(metadata.chapters);
  return text([
    { template_name: "title", value: "Índice" },
    { template_name: "content", value: content }
  ]);
}

export function createContent(chapters) {
  let content = `<h1>Tabla de Contenido</h1>\n  <ul>`;
  chapters.forEach(chapter => {
    content += `\n    <li><a href="${chapter.id}.html">${chapter.number}. ${chapter.title}</a></li>`;
  });
  content += `\n  </ul>`;
  return content;
}