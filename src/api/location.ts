import axios from '@/utils/request';

// const URL = 'http://pv.sohu.com/cityjson?ie=utf-8'

export function _getLocation () { 
  return axios.get('/location/cityjson?ie=utf-8', { headers: { auth: false }})
    .then((data) => {
      return (data as any as string).split('cname')[1].slice(4, -3)
    })
}