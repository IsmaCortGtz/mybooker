import fs from "node:fs";
import dir from "#i/util/dir";

import extensionListDb from "#f/util/db/extensions/list";
import extensionAdd from "#f/util/db/extensions/add";
import extensionDelete from "#f/util/db/extensions/delete";

import extensionListFs from "#f/util/extensions/list";

async function update() {
  const dbList = await extensionListDb();
  const fsList = await extensionListFs();

  // Get extensions in fs but not in db by object's id
  const newExtensions = fsList.filter(
    (fsExt) => !dbList.some((dbExt) => dbExt.id === fsExt.id)
  );

  // Get extensions in db but not in fs
  const removedExtensions = dbList.filter(
    (dbExt) => !fsList.some((fsExt) => fsExt.id === dbExt.id)
  );

  // Add new extensions to db
  for (const ext of newExtensions) {
    await extensionAdd(ext.id, ext.name, ext.background, ext.foreground, ext.icon);
    fs.mkdirSync(dir.config.cache(ext.id), { recursive: true });
  }

  // Remove extensions from db
  for (const ext of removedExtensions) {
    await extensionDelete(ext.id);
  }
}

// Export the list of extensions
export default update;
