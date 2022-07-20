const { Configuration } = require("webpack");
const common = require("./webpack.config");
const { merge } = require("webpack-merge");
const { appDist } = require("./paths");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

/**
 * @types {Configuration}
 */
module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    port: 5500,
    static: appDist,
    open: true,
    historyApiFallback: true,
    hot: true,
    client: {
      overlay: true,
    },
  },
  plugins: [new FriendlyErrorsWebpackPlugin()],
});
