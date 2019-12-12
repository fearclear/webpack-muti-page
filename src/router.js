const fs = require('fs')
const path = require('path')

const extensions = {
  html: [".html"],
  js: [".ts", ".js"]
}

// 页面路由
const route = [
  { path: 'home', models: ['home'] },
  { path: 'share', models: ['share'] },
  { path: 'test1', models: ['test1'] },
  { path: 'test2', models: ['test2'] },
  { path: 'test3', models: ['test3'] },
]

/**
 *
 * @param {string} name
 * @param {Array} extensions
 * @description 获取文件路径
 */
function findPath(name, extensions) {
  // 寻找当前目录下文件
  for (let i = 0; i < extensions.length; i++) {
    let tempName = name + extensions[i]
    let filePath = path.resolve(__dirname, 'pages', tempName)
    const file = fs.existsSync(filePath)
    if (file) {
      return filePath
    }
  }
  // 寻找文件目录下index文件
  for (let i = 0; i < extensions.length; i++) {
    let tempName = 'index' + extensions[i]
    let filePath = path.resolve(__dirname, 'pages', name, tempName)
    const file = fs.existsSync(filePath)
    if (file) {
      return filePath
    }
  }
  return ''
}

// 获取文件名称
function getFileName(name, extensions) {
  // 寻找当前目录下文件
  for (let i = 0; i < extensions.length; i++) {
    let tempName = name + extensions[i]
    let filePath = path.resolve(__dirname, 'pages', tempName)
    const file = fs.existsSync(filePath)
    if (file) {
      return tempName
    }
  }
  // 寻找文件目录下index文件
  for (let i = 0; i < extensions.length; i++) {
    let tempName = 'index' + extensions[i]
    let filePath = path.resolve(__dirname, 'pages', name, tempName)
    const file = fs.existsSync(filePath)
    if (file) {
      return `${name}/${tempName}`
    }
  }
  return ''
}

/**
 * @param {object} route
 * @returns {Array}
 * @description 用来生成入口文件
 */
function genEntries(route) {
  const entry = {}
  for (let t = 0; t < route.length; t++) {
    let item = route[t]
    const filePath = findPath(item.path, extensions.js)
    if (!filePath) {
      console.warn(`File "${item.path}" not found.FileType: js.`)
      continue
    }
    entry[item.path] = filePath
  }
  return entry
}

/**
 * @param {object} route
 * @returns {Array}
 * @description 用来生成html模板文件
 */
function genTemplate(route) {
  const templateList = []
  for (let t = 0; t < route.length; t++) {
    let item = route[t]
    const templateParams = {
      chunks: []
    }
    item.models = item.models || []
    const filePath = findPath(item.path, extensions.html)
    if (!filePath) {
      console.warn(`File "${item.path}" not found.FileType: html.`)
      continue
    }
    templateParams.filename = getFileName(item.path, extensions.html)
    templateParams.template = filePath
    for (let i = 0; i < item.models.length; i++) {
      let model = item.models[i]
      if (entry[model]) {
        templateParams.chunks.push(model)
      }
    }
    templateList.push(templateParams)
  }
  return templateList
}

const entry = genEntries(route)
const htmlWebPackTemplate = genTemplate(route)

module.exports = {
  entry,
  htmlWebPackTemplate
}



// {
//   filename: 'home',
//   template: path.resolve(__dirname, "../src/pages/home/index.html"),
//   chunks: ['home']
// }
