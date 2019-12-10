import axios from 'axios'
import _ from 'lodash'
import qs from 'qs'

// create an axios instance
const request = axios.create({
  baseURL: '/kcx-commodity-platform/api',
  // baseUrl: 'https://www.kcbear.com',
  timeout: 300000 // request timeout
})

// request interceptor
request.interceptors.request.use(
  requestConfig => {
    // Do something before request is sent
    const cloneData = _.cloneDeep(requestConfig.data)
    if(requestConfig.method === 'post' || requestConfig.method === 'put') {
      requestConfig.headers['Content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'
      requestConfig.data = qs.stringify(requestConfig.data)
    }else {
      requestConfig.params = cloneData
    }
    return requestConfig
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  response => {
    if(response && response instanceof Object) {
      let { data } = response
      if(!_.isObject(data)) {
        data = {}
      }
      if(data instanceof Array) {
        data = {
          list: data
        }
      }
      data.success = true
      data.status = response.status
      return Promise.resolve(data)
    }else {
      let data = {
        success: true
      }
      return Promise.resolve(data)
    }
  },
  error => {
    const { response } = error
    let msg
    let status
    if(response && response instanceof Object) {
      const { data, statusText } = response
      status = response.statusText
      msg = data.text || statusText
    } else {
      status = 600
      msg = error.message || "网络错误"
    }
    return Promise.resolve({ success: false, status, message: msg })
  }
)


export default request
