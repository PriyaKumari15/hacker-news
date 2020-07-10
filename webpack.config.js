const path = require("path");
// const { dirname } = require("path");
module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        excludes: /node_module/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extention: [".tsx", ".ts", ".js"],
  },
  output: {
    file_name: "bundle.js",
    // path: path.resolve(._dirname, "dist"),
  },
};
