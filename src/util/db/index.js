import { Database } from "bun:sqlite";
import fs from "node:fs";
import path from "node:path";
import dir from "#i/util/dir";

import initExtensions from "#f/util/db/extensions/init";
import initBooks from "#f/util/db/books/init";
import initVolumes from "#f/util/db/volumes/init";
import initChapters from "#f/util/db/chapters/init";
import initFiles from "#f/util/db/files/init";
import initCategories from "#f/util/db/categories/init";
import initCategoriesBooks from "#f/util/db/categories_books/init";

const databases = {
  app: null,
  extension: {},
};


// Export the database object
export default function db(name = null) {
  const dbPath = dir.config.db(name ? `extensions/${name}.db` : "app.db");
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  if (!name) {
    if (!databases.app) {
      databases.app = new Database(dbPath, { strict: true });
      initExtensions(databases.app);
      initCategories(databases.app);
      initCategoriesBooks(databases.app);
    }

    return databases.app;
  }

  if (!databases.extension[name]) {
    databases.extension[name] = new Database(dbPath, { strict: true });
    initBooks(databases.extension[name]);
    initVolumes(databases.extension[name]);
    initChapters(databases.extension[name]);
    initFiles(databases.extension[name]);
  }
  return databases.extension[name];
}