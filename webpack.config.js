const path = require("path");
const slsw = require("serverless-webpack");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  entry: slsw.lib.entries,
  devtool: "source-map",
  externals: [nodeExternals()],
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
  },
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  },
  plugins: [new webpack.ContextReplacementPlugin(/.*/)],
  target: "node",
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          happyPackMode: true,
          transpileOnly: true
        },
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  }
};
