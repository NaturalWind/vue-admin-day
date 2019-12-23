import request from '@/http/axios'

export function getUserMenuApi(query) {
  return request({
    url: '/user/menu',
    method: 'get',
    params: query
  })
}
