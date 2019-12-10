const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  output: {
    filename: '[name].[hash].js',
    // filename: 'antd-local.js',
    // library: 'antdLocal',
    // libraryTarget: 'umd',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: []
})
