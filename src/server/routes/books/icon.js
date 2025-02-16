import { readFile } from 'node:fs/promises';
import { lookup } from 'mime-types';
import path from 'node:path';
import bookIcon from '#f/core/books/icon';

async function icon(c) {
  const iconPath = await bookIcon(c.req.param("extensionId"), c.req.param("bookId"));
  if (!iconPath) return c.json({ message: "Icon not found" }, 404);

  try {
    const icon = await readFile(path.resolve(iconPath));
    return c.body(icon, 200, { 'Content-Type': lookup(iconPath) });
  } catch (error) {
    return c.json({ message: "Error reading icon file" }, 500);
  }
}

export default icon;
