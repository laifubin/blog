import axios from '@/utils/request'

export function _getCategoryList () {
  return axios.get('/category/list').then(res => res.data)
}