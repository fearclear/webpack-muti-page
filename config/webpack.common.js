const path = require("path")
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { entry, htmlWebPackTemplate } = require('../src/router')

const htmlPlugins = htmlWebPackTemplate.map(item =>new HtmlWebpackPlugin(item))

module.exports =  {
  entry,
  plugins: [
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
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
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
        use: ["html-loader?interpolate"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      libs: path.resolve(__dirname, '../src/libs'),
      components: path.resolve(__dirname, '../src/components')
    }
  }
}
