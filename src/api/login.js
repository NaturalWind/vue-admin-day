import request from '@/http/axios'

export function loginApi(parameter) {
  return request({
    url: '/api/auth/token',
    method: 'post',
    data: parameter
  })
}
