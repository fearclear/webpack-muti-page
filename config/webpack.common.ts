import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { entry, htmlWebPackTemplate } from './router'

const htmlPlugins = htmlWebPackTemplate.map(item =>new HtmlWebpackPlugin(item))

export default {
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
      },
      {
        test: /\.ejs$/,
        use: ["html-loader?interpolate", "ejs-html-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "libs": path.resolve(__dirname, '../src/libs'),
      "@": path.resolve(__dirname, '../src')
    }
  }
}
