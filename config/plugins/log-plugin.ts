const pluginName = 'ConsoleLogOnBuildWebpackPlugin'

console.log('get')

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, compilation => {
      if (compilation) {

      }
      console.log("webpack 构建过程开始！")
    })
  }
}

export default ConsoleLogOnBuildWebpackPlugin
