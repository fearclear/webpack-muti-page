!(function (name, definition) {
  //检测上下文环境是否为AMD 或 CMD
  var hasDefine = typeof define === 'function',
    //检查上下文环境是否为Node
    hasExports = typeof module !== 'undefined' && module.exports
  if (hasDefine) {
    //AMD或CMD环境
    console.log('AMD或CMD环境')
    define(definition)
  } else if (hasExports) {
    //定义为普通Node 模块
    console.log('定义为普通Node')
    module.exports == definition()
  } else {
    console.log('将模块的执行结果挂在window变量中，在浏览器中this指向window对象')
    //将模块的执行结果挂在window变量中，在浏览器中this指向window对象
    this[name] = definition()
  }
}('hello', function () {
  var hello = function () {

  }
  return hello
}))