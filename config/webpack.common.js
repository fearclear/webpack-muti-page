const path = require("path")
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const { entry, htmlWebPackTemplate } = require('../src/router')

const htmlPlugins = htmlWebPackTemplate.map(item =>new HtmlWebpackPlugin(item))

module.exports = {
  entry,
  plugins: [
    new CleanWebpackPlugin(),
    ...htmlPlugins,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      libs: path.resolve(__dirname, '../src/libs')
    }
  }
}
