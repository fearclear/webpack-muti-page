import merge from 'webpack-merge'
import webpack from 'webpack'
import common from './webpack.common'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import apiMocker from 'mocker-api'
import fileList from './mockFIle'

export default merge(common, {
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
      apiMocker(app, fileList)
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
