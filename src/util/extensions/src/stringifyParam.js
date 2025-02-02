function stringifyParam(arrayArgs = []) {
  if (Array.isArray(arrayArgs) === false) return arrayArgs;
  if (arrayArgs.length === 0) return '';
  //if (arrayArgs.length === 1 || Array.isArray(arrayArgs[0])) return param(arrayArgs[0]);

  return arrayArgs.map(arg => {
    if (arg === null) return 'null';
    if (arg === undefined) return 'undefined';
    if (typeof arg === 'string') return `'${arg}'`;
    return arg;
  }).toString();
}

export default stringifyParam;