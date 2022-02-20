import request from '@/utils/request'

// 投递简历
export function postResume(data, token) {
  return request({
    url: '/api/employee/cvoffer',
    method: 'post',
    data,
    params: { token }
  })
}

export function addResume(data, token) {
  return request({
    url: '/api/employee/cv',
    method: 'post',
    data,
    params: { token }
  })
}

export function fixResume(data, token) {
  return request({
    url: '/api/employee/cv',
    method: 'put',
    data,
    params: { token }
  })
}

export function getResume(token) {
  return request({
    url: '/api/employee/cv',
    method: 'get',
    params: { token }
  })
}

export function getJobInformation_USR(token) {
  return request({
    url: '/api/employee/jobInformation',
    method: 'get',
    params: { token }
  })
}

export function getAllSend(token) {
  return request({
    url: '/api/employee/myJobInformation',
    method: 'get',
    params: { token }
  })
}
