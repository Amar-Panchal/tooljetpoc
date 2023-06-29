/** @format */

var HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const environment =
  process.env.NODE_ENV === "production" ? "production" : "development";

const ASSET_PATH = process.env.ASSET_PATH || "";

module.exports = {
  mode: environment,
  entry: "./src/index.js",

  target: "web",
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".png",
      ".wasm",
      ".tar",
      ".data",
      ".svg",
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".json",
    ],
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@ee": path.resolve(__dirname, "ee/"),
      "@assets": path.resolve(__dirname, "assets/"),
    },
  },
  devtool: environment === "development" ? "inline-source-map" : false,
  module: {
    rules: [
      {
        test: /\.ttf$/,
        use: ["file-loader"],
      },
      {
        test: /\.wasm$/,
        use: ["file-loader"],
      },
      {
        test: /\.tar$/,
        use: ["file-loader"],
      },
      {
        test: /\.data$/,
        use: ["file-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".js", ".jsx"],
        },
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              [
                "import",
                {
                  libraryName: "lodash",
                  libraryDirectory: "",
                  camel2DashComponentName: false,
                },
                "lodash",
              ],
            ],
          },
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.ejs",
      favicon: "./assets/images/favicon.svg",
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      algorithm: "gzip",
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /(en)$/),
    new webpack.DefinePlugin({
      "process.env.ASSET_PATH": JSON.stringify(ASSET_PATH),
      "process.env.SERVE_CLIENT": JSON.stringify(process.env.SERVE_CLIENT),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      process: "process/browser.js",
    }),
  ],
  devServer: {
    open: true,
    historyApiFallback: true,
    port: "8082",

    static: {
      directory: path.resolve(__dirname, "assets"),
      publicPath: "/assets/",
    },
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "build"),
  },
};
