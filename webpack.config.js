const path = require('path');
const webpack = require('webpack');

const srcDir = path.join(__dirname,'src');
const appDir = path.join(__dirname,'app');

module.exports = {
  context: srcDir,
  entry: './index.js',
  output: {
    path: appDir,
    filename: "index.bundle.js"
  },
  resolve: {
    extensions: ['.js', '.es6', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|es6)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  watch: true,
};
