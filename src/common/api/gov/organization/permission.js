import request from '@api/request'

// 功能权限
export function queryMenu(data) {
  return request({
    url: '/organization/menu/conditions',
    method: 'post',
    data
  })
}
export function getMenuList(params) {
  return request.get('/organization/menu/findTree', { params })
}

export function getMenuDetail(params) {
  return request.get('/organization/menu/findById', { params })
}

export function addMenu(data) {
  return request.post('/organization/menu/add', data)
}

export function getUserMenu(params) {
  return request.get('/organization/userInfo/getUserMenu', { params })
}

export function updateMenu(data) {
  return request.post('/organization/menu/update', data)
}
export function deleteMenu(data) {
  return request.post('/organization/menu/delete', data)
}
export function sortMenu(data) {
  return request.post('/organization/menu/sortMenu', data)
}

// 数据权限模块

// 列表
export function domianList(data) {
  return request.post('/organization/domain/list', data)
}

// 删除
export function batchDeleteDomain(data) {
  return request.post('/organization/domain/deleteBatch', data)
}
// 新增
export function addDomain(data) {
  return request.post('/organization/domain/add', data)
}

// 修改
export function updateDomain(data) {
  return request.post('/organization/domain/update', data)
}

// 列出数据模型tree
export function listModelDomain(params) {
  return request.get('/organization/domain/listDomainModel', { params })
}

// /domain/findById 获取数据权限
export function findDomainById(params) {
  return request.get('/organization/domain/findById', { params })
}

// /domain/findById 获取数据权限
export function findModelDetailByModelId(params) {
  return request.get('/organization/domainModel/findModelDetailByModelId', { params })
}

// 列出数据条件
export function listCondition(params) {
  return request.get('/organization/domain/listCondition', { params })
}

// 数据类型接口

export function addModelDetail(data) {   // 新增数据模型属性
  return request({
    url: '/organization/domainModel/addModelDetail',
    method: 'post',
    data
  })
}

export function addOrUpateGroup(data) {   // 新增编辑数据分组
  return request({
    url: '/organization/domainModel/saveModels',
    method: 'post',
    data
  })
}

export function deleteModel(data) {   // 删除数据模型属性
  return request({
    url: '/organization/domainModel/deleteModels',
    method: 'post',
    data
  })
}
export function deleteModelDetail(data) {   // 删除数据模型详情
  return request({
    url: '/organization/domainModel/deleteModelDetail',
    method: 'post',
    data
  })
}

// 获取用户详情
export const findModelDetail = (params) => {
  return request.get('/organization/domainModel/findModelDetail', { params })
}

export function listModel(data) {   // 列出数据模型
  return request({
    url: '/organization/domainModel/listModel',
    method: 'post',
    data
  })
}

export function updateModelDetail(data) {   // 修改数据模型属性
  return request({
    url: '/organization/domainModel/updateModelDetail',
    method: 'post',
    data
  })
}

