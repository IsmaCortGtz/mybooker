import fs from 'node:fs';
import dir from '#i/util/dir';


function isIncludeValid(includePath, extension) {
  if (!includePath || !extension) throw new Error('Invalid parameters');

  const fullIncludePath = dir.extensions(extension, includePath);
  return fs.existsSync(fullIncludePath);
}



function loadCode(includeString, extension) {
  if (!extension || !includeString) throw new Error('Invalid parameters');
  if (!includeString.endsWith('.js')) throw new Error('Invalid include path');

  try {
    if (!isIncludeValid(includeString, extension)) throw new Error('Invalid include path');
  
    const includePath = dir.extensions(extension, includeString);
    return fs.readFileSync(includePath);
  } catch (e) { throw e; }
}

export default loadCode;