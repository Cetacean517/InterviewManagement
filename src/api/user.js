import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/user/role',
    method: 'get'
  })
}

export function register(data) {
  return request({
    url: '/api/user',
    method: 'post',
    data
  })
}
