import getIcon from "#f/util/db/extensions/getIcon";
import dir from "#i/util/dir";

async function getIconPath(id) {
    const icon = await getIcon(id);
    if (!icon) return null;

    return dir.extensions(id, icon);
}

export default getIconPath;