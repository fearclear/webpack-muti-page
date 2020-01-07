import merge from 'webpack-merge'
import webpack from 'webpack'
import common from './webpack.common'
import path from 'path'
import apiMocker from 'mocker-api'
import fileList from './mockFile'
import ConsoleLogOnBuildWebpackPlugin from './plugins/log-plugin'

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
    new ConsoleLogOnBuildWebpackPlugin()
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
