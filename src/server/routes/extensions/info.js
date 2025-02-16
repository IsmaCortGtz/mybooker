import extensionInfo from "#f/core/extensions/info";

async function info(c) {
  const id = c.req.param("id");
  const info = await extensionInfo(id);
  if (!info) return c.json({ message: `Extension '${id}' didn't found` }, 404);
  return c.json(info);
}

export default info;