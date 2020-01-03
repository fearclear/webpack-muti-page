import merge from 'webpack-merge'
import common from './webpack.common'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import TerserJSPlugin from 'terser-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import path from 'path'

export default merge(common, {
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
      filename: '[name]/[id].[hash].css'
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
              const reg = new RegExp(`src\\${path.sep}pages\\${path.sep}`)
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
    filename: '[name]/[id].[chunkhash].js',
    publicPath: '/test/',
    path: path.resolve(__dirname, '../dist')
  }
})
