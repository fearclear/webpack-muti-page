const path = require("path")
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = {
  entry: {
    home: path.resolve(__dirname, "../src/pages/home/index.ts"),
    share: path.resolve(__dirname, "../src/pages/share/index.ts")
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'home/index.html',
      template: path.resolve(__dirname, "../src/pages/home/index.html"),
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      filename: 'share/index.html',
      template: path.resolve(__dirname, "../src/pages/share/index.html"),
      chunks: ['share']
    }),
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
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
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
