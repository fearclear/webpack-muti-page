const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          'style-loader',
          "css-loader",
          "less-loader"
        ]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ],
  devServer: {
    contentBase: './src',
    watchContentBase: true,
    overlay: true,
    // proxy: {
    //   "/kcx-commodity-platform/api": {
    //     "target": 'https://www.kcbear.com',
    //     "changeOrigin": true
    //   },
    // },
    hot: true
  }
})
