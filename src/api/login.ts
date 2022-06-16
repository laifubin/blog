import request from '@/utils/request'

export const _login = (data: {account: string, password: string}) => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}