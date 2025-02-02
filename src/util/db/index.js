import { Database } from "bun:sqlite";
import fs from "node:fs";
import path from "node:path";
import dir from "#l/util/dir";

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
  if (!fs.existsSync(dir.config)) fs.mkdirSync(dir.config, { recursive: true });

  const dbPath = path.join(dir.config, "config.db");
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