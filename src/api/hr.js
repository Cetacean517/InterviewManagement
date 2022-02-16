import request from '@/utils/request'

// 查询建立
export function getJobInformation(token) {
  return request({
    url: '/api/employer/jobInformation',
    method: 'get',
    params: { token }
  })
}

export function addJobInformation(data, token) {
  return request({
    url: '/api/employer/jobInformation',
    method: 'post',
    data,
    params: { token }
  })
}

export function fixJobInformation(id, token) {
  return request({
    url: '/api/employer/jobInformation/' + id,
    method: 'put',
    params: { token }
  })
}

export function deleteJobInformation(id, token) {
  return request({
    url: '/api/employer/jobInformation/' + id,
    method: 'delete',
    params: { token }
  })
}

