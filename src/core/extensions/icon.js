import getIcon from "#l/util/db/extensions/getIcon";
import path from "node:path";
import dir from "#l/util/dir";

async function getIconPath(id) {
    const icon = await getIcon(id);
    if (!icon) return null;

    return path.join(dir.extensions, id, icon);
}

export default getIconPath;