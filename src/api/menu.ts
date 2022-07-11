import axios from '@/utils/request'

export function _getMenu () {
  return axios.post('/menu').then(res => res.data)
}