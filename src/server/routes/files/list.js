import listFilesCore from "#f/core/files/list";

export default async function listFiles(c) {
  const { extensionId, bookId } = c.req.param();
  const result = await listFilesCore(extensionId, bookId);
  return c.json(result);
}