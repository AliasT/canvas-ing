var path = require("path");
var htmlPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    app: "./demo/move-1.js"
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "[name].js"
  },
  reslove: {
    extensions: ['.scss']
  },
  module: {
    loaders: [
      { test: /(\.js)|(\.jsx)$/, exclude: /node_modules/, loader: "babel"  },
      { test: /\.scss$/, loaders: ["style", "css", "sass"]}
    ]
  },

  plugins: [
    new htmlPlugin({
      filename: "drawing-arc.html",
      inject: true,
      minify: {
        minifyJs: true,
        hash: true
      }
    })
  ]
};
