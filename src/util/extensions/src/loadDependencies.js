const dependencies = {
  "dependencies.global.fetch": { name: "fetch", data: async () => fetch },
  "dependencies.import.cheerio": {
    name: "cheerio",
    data: async () => await import("cheerio"),
  },
};

async function loadDependencies(askedDependencies) {
  if (!askedDependencies) return {};
  const loaded = {};

  for (const dep of askedDependencies) {
    if (!dependencies[dep]) throw new Error(`Dependencie ${dep} is not allowed.`);
    loaded[dependencies[dep].name] = await dependencies[dep].data();
  };

  return loaded;
}

export default loadDependencies;
