const { Configuration, ProvidePlugin } = require("webpack");
const { appIndex, appDist, appSrc, appHtml } = require("./paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { name } = require("../package.json");

/**
 * @type {Configuration}
 */
module.exports = {
  entry: appIndex,
  output: {
    path: appDist,
    publicPath: "",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@": appSrc,
      process: "process/browser",
    },
    fallback: {
      buffer: require.resolve("buffer/"),
      util: require.resolve("util/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
      },
    ],
  },
  plugins: [
    new ProvidePlugin({
      process: "process/browser",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: name,
      template: appHtml,
      filename: "index.html",
    }),
  ],
};
