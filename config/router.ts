import fs from 'fs'
import path from 'path'

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath: string): string[] {
  function _fileDisplay(filePath: string, fileList: string[]): string[] {
    const files = fs.readdirSync(filePath)
    for (let i = 0; i < files.length; i++) {
      const filename = files[i]
      const filedir = path.join(filePath, filename)
      const stats = fs.statSync(filedir)
      const isFile = stats.isFile()
      const isDir = stats.isDirectory()
      if (isFile) {
        fileList.push(filedir)
      }
      // __开头的文件夹和.开头的文件夹不处理
      if (isDir && filedir.charAt(0) !== '.' && !filedir.startsWith('__')) {
        _fileDisplay(filedir, fileList)
      }
    }
      return fileList
  }

  return _fileDisplay(filePath, [])
}

/**
 *
 * @param {string} fileDir
 * @param {Array} extensions
 * @description 获取文件路径
 */
function findPath(fileDir, name, extensions) {
  // 寻找当前目录下文件
  for (let i = 0; i < extensions.length; i++) {
    let filePath = path.resolve(fileDir, name + extensions[i])
    const file = fs.existsSync(filePath)
    if (file) {
      return filePath
    }
  }
  return ''
}

/**
 * 生成路由主文件
 */

const root = path.resolve(__dirname, '../src/pages')

// 扩展名(支持的文件扩展列表)
const extensions = {
  default: {
    html: '.html',
    js: '.ts'
  },
  html: [".html"],
  js: [".ts", ".js"]
}

const entry = {}
const htmlWebPackTemplate: object[] = []

//获取文件列表
const fileList = fileDisplay(root)
for (let i = 0; i < fileList.length; i++) {
  const filePath = fileList[i]
  // 是否在支持的模板列表里
  if (extensions.html.some(item => new RegExp(`\\${item}$`).test(filePath))) {
    const fileInfo = path.parse(filePath)
    switch (fileInfo.name) {
      case 'index':
        const entryFile = findPath(fileInfo.dir, fileInfo.name, extensions.js)
        if (entryFile) {
          const base = path.relative(root, fileInfo.dir)
          const chunk = base.replace(path.sep, '/') || 'index'
          entry[chunk] = entryFile
          const filename = base ? `${base}${path.sep}${fileInfo.base}` : fileInfo.base
          htmlWebPackTemplate.push({
            chunks: [chunk],
            filename,
            template: filePath
          })
        }
        break
      default:
        break
    }
  }
}

export {
  entry,
  htmlWebPackTemplate
}

