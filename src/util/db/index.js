import { Database } from "bun:sqlite";
import dir from "#l/util/dir";
import fs from "node:fs";

import initExtensions from "./extensions/init";
import initBooks from "./books/init";
import initVolumes from "./volumes/init";
import initChapters from "./chapters/init";
import initFiles from "./files/init";
import initCategories from "./categories/init";
import initCategoriesBooks from "./categories_books/init";

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