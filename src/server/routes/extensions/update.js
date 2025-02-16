import extensionsUpdate from "#f/core/extensions/update";

async function update(c) {
  await extensionsUpdate();
  return c.json({ message: "Extensions updated" });
}

export default update;