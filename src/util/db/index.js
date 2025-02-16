import { Database } from "bun:sqlite";
import fs from "node:fs";
import dir from "#i/util/dir";

import initExtensions from "#f/util/db/extensions/init";
import initBooks from "#f/util/db/books/init";
import initVolumes from "#f/util/db/volumes/init";
import initChapters from "#f/util/db/chapters/init";
import initFiles from "#f/util/db/files/init";
import initCategories from "#f/util/db/categories/init";
import initCategoriesBooks from "#f/util/db/categories_books/init";

const data = {
  alreadyOpen: false,
  db: null
};

// Open the database only once
(() => {
  if (data.alreadyOpen) return;
  fs.mkdirSync(dir.config.db(), { recursive: true });
  const dbPath = dir.config.db("config.db");
  data.db = new Database(dbPath);
  data.alreadyOpen = true;

  // Initialize the database
  initExtensions(data.db);
  initBooks(data.db);
  initVolumes(data.db);
  initChapters(data.db);
  initFiles(data.db);
  initCategories(data.db);
  initCategoriesBooks(data.db);
})();

// Export the database object
export default data.db;