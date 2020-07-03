import merge from 'webpack-merge'
import webpack from 'webpack'
import common from './webpack.common'
import path from 'path'
import apiMocker from 'mocker-api'
import fileList from './mockFile'

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
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            publicPath: '/',
            esModule: false
          }
        }]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../src'),
    watchContentBase: true,
    before(app) {
      apiMocker(app, fileList, {bodyParserConf: {
        defaultCharset: 'utf-8'
      }})
    },
    overlay: true,
    // proxy: {
    //   "/dev/api": {
    //     "target": 'https://www.baidu.com',
    //     "changeOrigin": true
    //   },
    // },
    hot: true
  }
})
