import './index.less'
import './main.css'
import 'libs/css/b.less'
import 'libs/css/a.less'
import '@/components/header/index'
console.log($)
declare global {
  interface Window {
    $: Function
  }
}

$(document).ready(() => {
  console.log('ready')
  console.log('home')
  window.$ = $
})
