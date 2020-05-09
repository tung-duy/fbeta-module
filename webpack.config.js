const webpack = require("webpack");
const { resolve } = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const extractStyles = new ExtractTextPlugin({
  filename: "styles.min.css",
});
const nodeEnv = process.env.NODE_ENV;

const plugins = [
  extractStyles,
  new webpack.DefinePlugin({
    GOOGLE: JSON.stringify({
      API: "myapikey",
    }),
    "process.env.NODE_ENV": `"${nodeEnv || "development"}"`,
  }),
];

if (nodeEnv === "production") {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new UglifyJsPlugin({})
  );
}

module.exports = {
  entry: resolve(__dirname, "src/index.js"),
  output: {
    path: resolve(__dirname, "dist"),
    filename: "fbeta-module.js",
    library: "fbeta",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },

      {
        test: /\.scss$/,
        exclude: /node_module/,
        use: extractStyles.extract({
          use: [
            {
              loader: "css-loader", // translates CSS into CommonJS
            },
            {
              loader: "sass-loader", // compiles Sass to CSS
            },
          ],
        }),
      },
    ],
  },
  externals: {
    lodash: {
      commonjs: "lodash",
      commonjs2: "lodash",
      amd: "lodash",
      root: "_",
    },
  },
  resolve: {
    modules: ["node_modules", resolve(__dirname, "src")],
    extensions: [".js", ".jsx"],
  },
  plugins,
};
