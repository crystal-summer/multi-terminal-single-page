import request from '@api/request'
const BASE_URL = '/entfile'

// 获取 企业档案配置-配置模块列表
export function queryList(params) {
  return request.get(BASE_URL + '/entFileConfig/queryList', { params })
}

// 编辑模块
export function updateModule(data) {
  return request.post(BASE_URL + '/entFileConfig/update', data)
}

// 改变可见状态
export function modifyVisible(params) {
  return request.get(BASE_URL + '/entFileConfig/modifyVisible', { params })
}

// 排序模块
export function moveModule(params) {
  return request.get(BASE_URL + '/entFileConfig/moveModule', { params })
}

// 新增模块
export function addModule(data) {
  return request.post(BASE_URL + '/entFileConfig/add', data)
}

// 删除模块
export function deleteModule(params) {
  return request.get(BASE_URL + '/entFileConfig/delete', { params })
}

