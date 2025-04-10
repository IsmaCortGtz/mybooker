import filesList from "#f/util/db/files/list";

export default async function list(extensionId, bookId) {
  return await filesList(extensionId, bookId);
}

