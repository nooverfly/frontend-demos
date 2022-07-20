const { Configuration } = require("webpack");
const { appIndex, appDist, appSrc, appHtml } = require("./paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { name } = require("../package.json");
const { resolve } = require("path");

const env = process.env.NODE_ENV;
const isEnvDevelopment = env === "development";
const miniCssExtractPluginConfig = {
  loader: MiniCssExtractPlugin.loader,
  options: {},
};

const cssModule = {
  localIdentName: "[local]_[hash:base64:5]",
  auto: true
};

/**
 * @type {Configuration}
 */
module.exports = {
  entry: appIndex,
  output: {
    publicPath: "",
    path: appDist,
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
          {
            loader: "css-loader",
            options: {
              modules: cssModule,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          isEnvDevelopment ? "style-loader" : miniCssExtractPluginConfig,
          {
            loader: "css-loader",
            options: {
              modules: cssModule,
            },
          },
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
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, "../node_modules/libpag/lib/libpag.wasm"),
          to: "../dist",
        },
      ],
    }),
  ],
};
