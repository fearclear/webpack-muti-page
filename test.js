var fs = require('fs')
var path = require('path')

//解析需要遍历的文件夹，我这以E盘根目录为例
var filePath = path.resolve(__dirname, './src/pages')

//调用文件遍历方法
fileDisplay(filePath)

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err)
    } else {
      files.forEach(function (filename) {
        var filedir = path.join(filePath, filename)
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败')
          } else {
            var isFile = stats.isFile()//是文件
            var isDir = stats.isDirectory()//是文件夹
            if (isFile) {
              // console.log(filedir, path.basename(filedir))
            }
            if (isDir) {
              fileDisplay(filedir)//递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        })
      })
    }
  })
}
console.log(new RegExp(`src\\${path.sep}pages\\${path.sep}`))
