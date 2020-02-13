import request from '@/http/axios'

export function getUserInfoApi() {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}
