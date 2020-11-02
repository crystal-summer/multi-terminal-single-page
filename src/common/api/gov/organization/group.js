import request from '@api/request'

export function getList(params) {
  return request.get('/organization/group/findTree', { params })
}
// 获取组织详情
export function findById(params) {
  return request.get('/organization/group/findById', { params })
}
// 获取当前架构下的用户
export function findUserByGroupId(data) {
  return request.post('/organization/group/findUserByGroupId', data)
}
// 获取行政代码
export function listArea() {
  return request.get('/organization/group/listArea')
}
export function queryRegions(params) {
  return request.get('/organization/group/queryRegions', { params })
}

// 修改组织架构
export function updateGroup(data) {
  return request.post('/organization/group/update', data)
}
// 新增组织架构
export function addGroup(data) {
  return request.post('/organization/group/add', data)
}
// 添加用户 调整部门
export function addUserBatch(data) {
  return request.post('/organization/group/addUserBatch', data)
}

// 删除用户组
export function deleteUserGroup(data) {
  return request.post('/organization/group/deleteUserBatch', data)
}

// 排序
export function sortGroupUser(data) {
  return request.post('/organization/group/sortGroupUser', data)
}

// 删除组织架构
export function deleteGroup(data) {
  return request.post('/organization/group/delete', data)
}

