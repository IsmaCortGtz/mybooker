import extensionList from "#l/core/extensions/list";

async function list(c) {
    const extensions = await extensionList();
    return c.json(extensions);
}

export default list;