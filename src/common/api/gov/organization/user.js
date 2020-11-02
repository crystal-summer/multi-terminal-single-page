import request from '@api/request'

export const queryUser = (params) => {
  return request.get('/organization/user/search', { params })
}

// 获取所有角色
export const getAllRole = (params) => {
  return request.get('/organization/user/getAllRole', { params })
}

// 获取用户详情
export const getUserDetail = (params) => {
  return request.get('/organization/user/getUserDetail', { params })
}

// 新增或编辑用户
export function addUser(data) {
  return request.post('/organization/user/add', data)
}

export function deleteUser(data) {
  return request.post('/organization/user/deleteUser', data)
}
// 下载模板

export function downUserModel(params, filename) {
  return request.downLoad('/organization/user/downUserModel', params, filename)
}

// 上传
export function userUpload(data, config) {
  return request.upload(process.env.VUE_APP_BASE_API + '/organization/user/userUpload', data, config)
}

// /预览 user/previewOnHtml
export function previewOnHtml(params) {
  return request.downLoad('/organization/user/previewOnHtml', params)
}
