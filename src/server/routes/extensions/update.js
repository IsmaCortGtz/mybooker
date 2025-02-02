import extensionsUpdate from "#l/core/extensions/update";

async function update(c) {
  await extensionsUpdate();
  return c.json({ message: "Extensions updated" });
}

export default update;