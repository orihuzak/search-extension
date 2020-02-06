const path = require('path')

const config = {
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
    extensions: ['.tsx', '.ts', '.js']
  },
  optimization: {
    minimize: false // minifyしない
  }
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    // config.devtool = 'inline-source-map'
    config.devtool = 'cheap-module-source-map' // chrome-extension用
  } else if (argv.mode === 'production') {

  }
  return config
}