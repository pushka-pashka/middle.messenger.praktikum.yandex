const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const stylesHandler = MiniCssExtractPlugin.loader;

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin()]
});
