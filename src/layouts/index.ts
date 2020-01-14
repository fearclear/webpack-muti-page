// const foot = import('./header/index.html')

export default templateData => {
  console.log(templateData)
  const head = require('html-loader!./header/index.html').default
  return (
    head+
    `${head}`
  )
}
