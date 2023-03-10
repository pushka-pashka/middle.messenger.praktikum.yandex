// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const ENVIRONMENT_VARIABLES = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  DEBUG: process.env.DEBUG || true,
  WS_ENDPOINT: "wss://ya-praktikum.tech/ws/chats",
  API_ENDPOINT: "https://ya-praktikum.tech/api/v2"
};

const isProduction = process.env.NODE_ENV == "production";

// const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    open: true,
    host: "localhost",
    historyApiFallback: true
  },
  plugins: [
    new webpack.EnvironmentPlugin(ENVIRONMENT_VARIABLES),

    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })

    // new MiniCssExtractPlugin()

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset"
      },
      {
        test: /\.hbs/,
        type: "asset/source"
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    alias: {
      handlebars: "handlebars/dist/handlebars.min.js",
      core: path.resolve(__dirname, "src/core/"),
      utils: path.resolve(__dirname, "src/utils"),
      pages: path.resolve(__dirname, "src/pages"),
      helpers: path.resolve(__dirname, "src/helpers"),
      api: path.resolve(__dirname, "src/api"),
      components: path.resolve(__dirname, "src/components"),
      services: path.resolve(__dirname, "src/services")
    }
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
