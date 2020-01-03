import webpack from 'webpack'
import fs from 'fs'

const pluginName = 'ConsoleLogOnBuildWebpackPlugin'

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler: webpack.Compiler) {
    compiler.hooks.compile.tap(pluginName, compilation => {
      if (compilation) {
        console.log(pluginName, 'pluginName')
      }
      console.log("webpack 构建过程开始！")
    })

    compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
      console.log('This is an example plugin!')
      console.log('Here\'s the `compliation` object whitch represents a single build of assets:')
      // 在生成文件中，创建一个头部字符串：
      var filelist = 'In this build:\n\n'

      // 遍历所有编译过的资源文件，
      // 对于每个文件名称，都添加一行内容。
      for (var filename in compilation.assets) {
        filelist += '- ' + filename + '\n'
      }

      // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
      compilation.assets['filelist.md'] = {
        source: function() {
          return filelist
        },
        size: function() {
          return filelist.length
        }
      }

      callback()
      // compilation.addModule()
    })

    compiler.hooks.done.tap(pluginName, compilation => {
      if (compilation)
        console.log('webpack done')
    })
  }
  addLayout(html, options) {
    if (options.layout) {
      const replace = options.replace || 'children'
      const layout = fs.readFileSync(options.layout, 'utf-8')
      const reg = new RegExp(`{{${replace}}}`)
      html = layout.replace(reg, html)
    }
    return html
  }
}

export default ConsoleLogOnBuildWebpackPlugin
