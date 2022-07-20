const { resolve } = require("path");

const resolveRelativePath = (relative) => {
  return resolve(process.cwd(), relative);
};

module.exports = {
  appIndex: resolveRelativePath("./src/index.tsx"),
  appSrc: resolveRelativePath("./src"),
  appDist: resolveRelativePath("./dist"),
  appNodeModule: resolveRelativePath("./node_modules"),
  appHtml: resolveRelativePath("./public/index.html"),
};
