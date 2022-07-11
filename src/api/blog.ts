import axios from '@/utils/request'
const preUrl = '/blog'

export type TSearchBlogReq = {
  title?: string
  status?: 0|1|''
  category?: number|'',
  current: number
  size: number
}
// 查询文章
export function _searchBlog(data: TSearchBlogReq): Promise<Record<string, any>> {
  return axios({
    url: preUrl + '/search',
    method: 'post',
    data,
    headers: { auth: false }
  })
}

// 获取最新文章list
export function _getNewBlogList(current: number): Promise<Record<string, any>> {
  return axios({
    url: preUrl +'/searchTitle',
    params: { current },
    headers: { auth: false }
  })
}

// 根据id获取文章详情
export function _detailsBlog(id: string): Promise<Record<string, any>> {
  return axios({
    url: preUrl +'/details',
    params: { id },
    headers: { auth: false }
  })
}

export type TUpdateBlogReq = {
  id?: string
  title: string
  content: string
  status: 0|1
  location: string
  author: string
  category: number|''
}
// 修改文章
export function _updateBlog(data: TUpdateBlogReq) {
  return axios({
    url: preUrl +'/update',
    method: 'POST',
    data
  })
}

// 根据id删除文章
export function _deleteBlog(id: string) {
  return axios({
    url: preUrl +'/delete',
    params: {id}
  })
}

// 根据id更新文章状态
export function _updateBlogStatus(data : { id: string, status: 0|1 }) {
  return axios({
    url: preUrl +'/updateStatus',
    method: 'POST',
    data
  })
}