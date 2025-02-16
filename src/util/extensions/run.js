import fs from "node:fs";
import vm from "node:vm";
import dir from '#i/util/dir';

import stringifyParam from "#f/util/extensions/src/stringifyParam";
import loadCode from "#f/util/extensions/src/loadCode";
import loadDependencies from "#f/util/extensions/src/loadDependencies";

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