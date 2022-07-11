import request from '@/utils/request'

export const _register = (data: {name: string, password: string}) => {
  return request({
    url: '/register',
    method: 'POST',
    data,
    headers: { auth: false }
  })
}
// 登录
export const _login = (data: {name: string, password: string}) => {
  return request({
    url: '/login',
    method: 'POST',
    data,
    headers: { auth: false }
  })
}

// 刷新token
export const _refresh = () => {
  return request({
    url: '/refreshToken',
    method: 'POST'
  })
}