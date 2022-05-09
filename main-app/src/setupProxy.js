const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/sample-data",
    createProxyMiddleware({
      target: "https://nooverfly.github.io",
      changeOrigin: true,
    })
  );
};
