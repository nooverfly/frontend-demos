module.exports = {
  outputDir: "../docs/demo-antdv",
  publicPath: "/frontend-demos/demo-antdv",
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    port: 5000,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
