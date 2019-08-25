const path = require('path')

module.exports = {
  devtool: 'cheap-module-source-map', // chrome-extension用
  entry: {
    view: './src/view.ts',
	 	background: './src/background.ts',
	 	'content-script': './src/content-script.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  }
}