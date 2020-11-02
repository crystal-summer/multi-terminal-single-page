import request from '@api/request'
// export function queryRole(data) {
//   return request({
//     url: '/organization/role/getAllList',
//     method: 'get',
//     params:data
//   })
// }

export const queryRole = (params) => {
  return request.get('/organization/role/getAllList', { params })
}

export function geMenuList(params) {
  return request.get('/organization/role/geMenuList', { params })
}

export function getDomianList() {
  return request.get('/organization/role/getDomianList')
}

export function getRoleDetail(params) {
  return request.get('/organization/role/getRoleDetail', { params })
}
export function addRole(data) {
  return request.post('/organization/role/add', data)
}

export function deleteRole(data) {
  return request.post('/organization/role/deleteRole', data)
}

export function getRole(id) {
  return request({
    url: '/organization/role/' + id,
    method: 'get'
  })
}

export function getAllRoles() {
  return request({
    url: '/organization/role/all',
    method: 'get'
  })
}

// export function addRole(data) {
//   return request({
//     url: '/organization/role/add',
//     method: 'post',
//     data
//   })
// }

export function updateRole(data) {
  return request({
    url: '/organization/role/' + data.id,
    method: 'put',
    data
  })
}

