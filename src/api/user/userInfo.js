import request from '@/http/axios'

export function getUserInfoApi() {
  return request({
    url: '/user/userInfo',
    method: 'get'
  })
}
