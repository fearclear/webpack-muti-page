const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require('path')
const apiMocker = require('mocker-api')
const fileList = require('./mockFile')
// const LogPlugin = require('./plugins/log-plugin')

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
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
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
    contentBase: path.resolve(__dirname, '../src'),
    watchContentBase: true,
    before(app) {
      apiMocker(app, fileList, {
        httpProxy: {
          options: {
            ignorePath: true,
          },
          listeners: {
            proxyReq: function (proxyReq, req, res, options) {
              console.log('proxyReq')
            },
          },
        },
      })
    },
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
