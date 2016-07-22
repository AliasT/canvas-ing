var path = require("path");
module.exports = {
  entry: {
    app: "./demo/shape-demo.js"
  },
  output: {
    path: path.resolve(__dirname, './assets'),
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
  }
};
