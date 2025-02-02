import path from 'node:path';
import dir from "#l/util/dir";

async function getIconPath(id) {
    try {
        const packageJsonPath = path.join(dir.extensions, id, "extension.json");
        const packageJSON = await import(packageJsonPath, { assert: { type: "json" } });
        if (packageJSON.icon) return path.join(dir.extensions, id, packageJSON.icon);
        return null;
    } catch (e) {
        return null;
    }
}

export default getIconPath;