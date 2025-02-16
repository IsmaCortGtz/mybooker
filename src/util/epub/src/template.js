import fs from 'node:fs';
import dir from '#i/util/dir';

/* data: [
  {
    "template_name": "title",
    "value": "The Title"
  }, {...}
] */
export default function text(data, template = "DEFAULT") {
  let templateContent = loadTemplate(template);
  data.forEach(({ template_name, value }) => {
    templateContent = templateContent.replace(`{{${template_name}}}`, value);
  });

  return templateContent;
}


export function loadTemplate(template) {
  const templatePath = dir.src.util("epub", 'templates', 'Text', `${template}.html`);
  if (!fs.existsSync(templatePath)) throw new Error(`Template ${template} not found`);
  return fs.readFileSync(templatePath, 'utf-8');
}