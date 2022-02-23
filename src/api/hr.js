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

export function fixJobInformation(id, data, token) {
  return request({
    url: '/api/employer/jobInformation/' + id,
    method: 'put',
    data,
    params: { token }
  })
}

export function deleteJobInformation(data, id, token) {
  return request({
    url: '/api/employer/jobInformation/' + id,
    method: 'delete',
    data,
    params: { token }
  })
}

// 查看某招聘的所有简历信息
export function getAllResume(id, token) {
  return request({
    url: '/api/employer/cvoffer/' + id,
    method: 'get',
    params: { token }
  })
}

// 通过/不通过某条简历
export function passResume(id, data, token) {
  return request({
    url: '/api/employer/cvoffer/' + id,
    method: 'patch',
    data,
    params: { token }
  })
}

