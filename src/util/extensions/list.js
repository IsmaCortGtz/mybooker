import fs from "node:fs";
import dir from "#l/util/dir";


async function list() {
  const dirents = fs.readdirSync(dir.extensions(), { withFileTypes: true });
  const direntsFiltered = dirents.filter(dirent => {
    if (dirent.isFile()) return false;
    return fs.existsSync(dir.extensions(dirent.name, "extension.json"));
  });
  
  
  return await Promise.all(
    direntsFiltered.map(async (fileDIr) => {
      const extension = await import(dir.extensions(fileDIr.name, "extension.json"), { assert: { type: "json" } });
      return { 
        id: fileDIr.name, 
        name: extension.name, 
        background: extension.background, 
        foreground: extension.foreground, 
        icon: extension.icon 
      };
    })
  );
}

export default list;