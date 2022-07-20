const { resolve } = require("path");

const resolveRelaPath = (path) => {
  return resolve(process.cwd(), path);
};

module.exports = {
  appEntry: resolveRelaPath("./src/index.tsx"),
  appSrc: resolveRelaPath("./src"),
  appDist: resolveRelaPath("./dist"),
  appHtml: resolveRelaPath("./public/index.html"),
  appNodeModule: resolveRelaPath("./node_modules"),
};
