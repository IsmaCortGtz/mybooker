import fs from 'node:fs';
import { get } from '#l/util/dir';

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
  const templatePath = get("src", "util", "epub", 'templates', 'Text', `${template}.html`);
  if (!fs.existsSync(templatePath)) throw new Error(`Template ${template} not found`);
  return fs.readFileSync(templatePath, 'utf-8');
}