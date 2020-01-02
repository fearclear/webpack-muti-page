import webpack from 'webpack'

const pluginName = 'ConsoleLogOnBuildWebpackPlugin'

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler: webpack.Compiler) {
    compiler.hooks.compile.tap(pluginName, compilation => {
      if (compilation) {

      }
      console.log("webpack 构建过程开始！")
    })

    compiler.hooks.done.tap(pluginName, compilation => {
      if(compilation)
      console.log('webpack done')
    })
  }
}

export default ConsoleLogOnBuildWebpackPlugin
