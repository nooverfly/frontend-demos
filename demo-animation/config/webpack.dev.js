const { Configuration } = require("webpack");
const common = require("./webpack.config");
const { merge } = require("webpack-merge");
const { appDist } = require("./paths");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

/**
 * @type {Configuration}
 */
const devConfig = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    open: true,
    hot: true,
    port: 6600,
    historyApiFallback: true,
    compress: true,
    static: appDist,
    client: {
      overlay: true,
    },
  },
  plugins: [new FriendlyErrorsWebpackPlugin()],
};

module.exports = merge(common, devConfig);
