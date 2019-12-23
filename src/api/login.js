import request from '@/http/axios'

export function loginApi(parameter) {
  return request({
    url: '/user/login',
    method: 'post',
    data: parameter
  })
}
