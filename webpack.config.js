const path = require('path');

module.exports = {
  entry: './src/popup.ts',
  // mode: "development",
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: [ '.tsx', '.ts', '.js'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'built')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};