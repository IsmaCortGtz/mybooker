import getIcon from "#l/util/db/extensions/getIcon";
import dir from "#l/util/dir";

async function getIconPath(id) {
    const icon = await getIcon(id);
    if (!icon) return null;

    return dir.extensions(id, icon);
}

export default getIconPath;