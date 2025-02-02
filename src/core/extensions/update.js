import extensionListDb from "#l/util/db/extensions/list";
import extensionAdd from "#l/util/db/extensions/add";
import extensionDelete from "#l/util/db/extensions/delete";

import extensionListFs from "#l/util/extensions/list";

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
  }

  // Remove extensions from db
  for (const ext of removedExtensions) {
    await extensionDelete(ext.id);
  }
}

// Export the list of extensions
export default update;
