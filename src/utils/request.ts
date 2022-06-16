import axios from 'axios';
import NProgress from 'nprogress'
import type { AxiosRequestConfig } from 'axios'
import {serialize} from './utils'

const instance = axios.create({
  baseURL: '/api',
  // 默认超时时间
  // timeout: 30000,
  // 返回其他状态码
  // validateStatus(status) {
  //   return status >= 200 && status <= 500
  // },
  // 跨域请求，允许保存cookie
  // withCredentials: true
})

NProgress.configure({
  showSpinner: false
})


// http request拦截
instance.interceptors.request.use<AxiosRequestConfig>((config: any) => {
  if (config.url === '') return

  // 开启 progress bar
  NProgress.start()

  // 确保GET请求是最新的
  // if (config.method === 'get') {
  //   config.params = Object.assign({ _: Date.now() }, config.params || {})
  // }

  // headers中配置serialize为true开启序列化
  if (config.method === 'post' && config.meta?.isSerialize === true) {
    config.data = serialize(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})

// http response 拦截
instance.interceptors.response.use(async (res: any) => {
  // 关闭 progress bar
  NProgress.done()
  const data = res.data

  // 获取状态码
  const status = data.code || res.status
  const message = data.msg || '未知错误'
 
  // 如果请求为非200否者默认统一处理
  if (status !== 200) {
    const err = new Error(message)
    return Promise.reject(err)
  }
  return data
}, error => {
  NProgress.done()
  return Promise.reject(new Error(error))
})

export default instance