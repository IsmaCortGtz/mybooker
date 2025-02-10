import fs from "node:fs";
import vm from "node:vm";
import dir from "#l/util/dir";

import stringifyParam from "./src/stringifyParam";
import loadCode from "./src/loadCode";
import loadDependencies from "./src/loadDependencies";

async function run(extensionName, action, ...args) {
  try {
    const extensionJsonPath = dir.extensions(extensionName, "extension.json");
    
    const extensionString = fs.readFileSync(extensionJsonPath);
    const extension = JSON.parse(extensionString);

    const dependencies = await loadDependencies(extension.permisions);
    const context = vm.createContext(dependencies);

    extension.actions[action].forEach((include) => {
      const includeCode = loadCode(include, extensionName);
      vm.runInContext(includeCode, context);
    });

    const stringParams = stringifyParam(args);
    return vm.runInContext(`${action}(${stringParams})`, context);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default run