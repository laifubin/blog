import axios from '@/utils/request'

export const _test = ()=> axios({
  url: '/test/index'
}).then(res=>res.data)

// 表格
export function getTableList(params: any): Promise<any> {
  return axios({
  url: '/table/getList',
  method: 'post',
  data: params
  })
}
export function deleteTableList(params: any): Promise<any> {
  return axios({
  url: '/table/delete',
  method: 'post',
  data: params
  })
}
export function updateTableList(params: any): Promise<any> {
  return axios({
  url: '/table/update',
  method: 'post',
  data: params
  })
}
