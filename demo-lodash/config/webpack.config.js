const { Configuration } = require("webpack");
const {
  appEntry,
  appDist,
  appSrc,
  appHtml,
  appNodeModule,
} = require("./paths");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { name } = require("../package.json");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const env = process.env.NODE_ENV;
const isEnvDevelopment = env === "development";
const miniCssExtractPluginConfig = {
  loader: MiniCssExtractPlugin.loader,
  options: {},
};

/**
 * @type {Configuration}
 */
module.exports = {
  entry: appEntry,
  output: {
    path: appDist,
    publicPath: "",
  },
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@": appSrc,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: appSrc,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.css$/,
        use: [
          isEnvDevelopment ? "style-loader" : miniCssExtractPluginConfig,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          isEnvDevelopment ? "style-loader" : miniCssExtractPluginConfig,
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: name,
      template: appHtml,
      filename: "index.html",
    }),
  ],
};
