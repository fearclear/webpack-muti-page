const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require("clean-webpack-plugin")
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    runtimeChunk: {
      name: entrypoint => entrypoint.name
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          filename: 'vendor/[id].[hash].bundle.js',
          test: /\.js$/,
          chunks: 'all',
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
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
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: "file-loader",
          options: {
            outputPath(url, resourcePath, context) {
              const relativePath = path.relative(context, resourcePath)
              const reg = new RegExp('src' + `\\${path.sep}` + 'pages' + `\\${path.sep}`)
              if (reg.test(relativePath)) {
                let filePath = relativePath.replace(reg, '')
                const pathList = filePath.split(path.sep)
                pathList.pop()
                filePath = pathList.join('/')
                return `${filePath}/${url}`
              }
              return `assets/${url}`
            }
          }
        }]
      },
    ]
  },
  output: {
    filename: '[name]/[name].[chunkhash].js',
    publicPath: '/test/',
    path: path.resolve(__dirname, '../dist')
  }
})
