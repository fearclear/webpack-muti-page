const fs = require('fs')
const path = require('path')

function fileDisplay(filePath) {
  let todos = 0, ended = false
  function _fileDisplay(filePath, fileList) {
    const files = fs.readdirSync(filePath)
    todos += files.length
    for (let i = 0; i < files.length; i++) {
      const filename = files[i]
      const filedir = path.join(filePath, filename)
      const stats = fs.statSync(filedir)
      const isFile = stats.isFile()
      const isDir = stats.isDirectory()
      todos--
      if (isFile && /\.[tj]s/.test(filedir)) {
        fileList.push(filedir)
        if (todos === 0) {
          ended = true
          break
        }
      }
      // __开头的文件夹和.开头的文件夹不处理
      if (isDir &&　filedir.charAt(0) !== '.' && !filedir.startsWith('__')) {
        _fileDisplay(filedir, fileList)
      }
    }
    if (ended) {
      return fileList
    }
  }

  const fileList = _fileDisplay(filePath, [])
  return fileList
}

const fileList = fileDisplay(path.resolve(__dirname, '../mock'))

module.exports = fileList
