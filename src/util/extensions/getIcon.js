import dir from '#i/util/dir';

async function getIconPath(id) {
    try {
        const packageJsonPath = dir.extensions(id, "extension.json");
        const packageJSON = await import(packageJsonPath, { assert: { type: "json" } });
        if (packageJSON.icon) return dir.extensions(id, packageJSON.icon);
        return null;
    } catch (e) {
        return null;
    }
}

export default getIconPath;