const { resolve } = require("path");

const resolveRelative = (relativePath) => {
  return resolve(process.cwd(), relativePath);
};

module.exports = {
  appIndex: resolveRelative("./src/index.tsx"),
  appDist: resolveRelative("./dist"),
  appSrc: resolveRelative("./src"),
  appHtml: resolveRelative("./public/index.html"),
  appNodeModule: resolveRelative("./node_modules"),
};
