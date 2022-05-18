import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/business/company/adminCompanyView/',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/business/company/adminCompanyView/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/business/company/adminCompanyView/',
    method: 'put',
    data
  })
}

export function listEmployee(data) {
  return request({
    url: 'api/business/company/companyEmployeeView/?companyId=' + data,
    method: 'get',
    data: data
  })
}

export function listJob(data, jobStatus, jobStatusNot) {
  return request({
    url: 'api/business/job/?companyId=' + data.id + '&jobStatus=' + jobStatus + '&jobStatusNot=' + jobStatusNot,
    method: 'get',
    data: data
  })
}

export default { add, edit, del }
