var path = require('path');
var webpack = require('webpack');
 
module.exports = {

  entry: './src/js/main.js',
  output: {   
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  watch: 'true'
};