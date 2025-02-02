import path from 'node:path';
import dir from "#l/util/dir";

async function info(id) {
  try {
    return await import(path.resolve(dir.extensions, id, 'extension.json'). { assert: { type: 'json' } });
  } catch(e) { return null }
}

export default info;