const { Configuration } = require("webpack");
const common = require("./webpack.config");
const { merge } = require("webpack-merge");
const { appDist } = require("./paths");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

/**
 * @type {Configuration}
 */
const mergeDev = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: appDist,
    compress: true,
    open: true,
    historyApiFallback: true,
    port: 5000,
    hot: true,
    client: {
      overlay: true,
    },
  },
  plugins: [new FriendlyErrorsWebpackPlugin()],
});

module.exports = mergeDev;
