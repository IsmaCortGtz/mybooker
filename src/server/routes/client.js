import fs from 'node:fs';
import dir from '#i/util/dir';

const htmlString = fs.readFileSync(dir.src.server('dist/index.html'), 'utf8');

export default function clien(c) {
  return c.html(htmlString);
}