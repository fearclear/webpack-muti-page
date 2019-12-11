const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    runtimeChunk:{
      name: entrypoint => entrypoint.name
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          filename: 'vendor/[id].[hash].bundle.js',
          test: /\.(ts|js)$/,
          chunks: 'all',
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/[name].[hash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader"
        ]
      },
    ]
  },
  output: {
    filename: '[name]/[name].[chunkhash].js',
    publicPath: '/test/',
    path: path.resolve(__dirname, '../dist')
  }
})
