/**
 * @description 企业诉求
 * @author xiaomeng
*/
import request from '@api/request'

// 企业诉求

// 查询企业招聘列表
export function queryEntRecruitByPage(params) {
  return request.get('/entDemand/queryEntRecruitByPage', { params })
}

// 查询房产出租/转让列表 type 1-房产出租,2-房产转让
export function queryEntEstateByPage(params) {
  return request.get('/entDemand/queryEntEstateByPage', { params })
}

// 查询设备转让列表
export function queryEntDeviceTransferByPage(params) {
  return request.get('/entDemand/queryEntDeviceTransferByPage', { params })
}

// 查询产品销售列表
export function queryEntProductSaleByPage(params) {
  return request.get('/entDemand/queryEntProductSaleByPage', { params })
}

// 查询其他需求列表
export function queryEntOtherDemandByPage(params) {
  return request.get('/entDemand/queryEntOtherDemandByPage', { params })
}

// 新增企业招聘
export function createEntRecruit(params) {
  return request.post('/entDemand/createEntRecruit', params)
}

// 新增房产出租/转让
export function createEntEstate(params) {
  return request.post('/entDemand/createEntEstate', params)
}

// 新增设备转让
export function createEntDeviceTransfer(params) {
  return request.post('/entDemand/createEntDeviceTransfer', params)
}

// 新增产品销售
export function createEntProductSale(params) {
  return request.post('/entDemand/createEntProductSale', params)
}

// 新增其他需求
export function createEntOtherDemand(params) {
  return request.post('/entDemand/createEntOtherDemand', params)
}

// 删除企业招聘
export function deleteEntRecruit(params) {
  return request.post('/entDemand/deleteEntRecruit', params)
}

// 删除房产出租/转让
export function deleteEntEstate(params) {
  return request.post('/entDemand/deleteEntEstate', params)
}

// 删除设备转让
export function deleteEntDeviceTransfer(params) {
  return request.post('/entDemand/deleteEntDeviceTransfer', params)
}

// 删除产品销售
export function deleteEntProductSale(params) {
  return request.post('/entDemand/deleteEntProductSale', params)
}

// 删除其他需求
export function deleteEntOtherDemand(params) {
  return request.post('/entDemand/deleteEntOtherDemand', params)
}

// 获取企业招聘详情
export function getEntRecruitById(params) {
  return request.get('/entDemand/getEntRecruitById', { params })
}

// 获取房产出租/转让详情
export function getEntEstatebyId(params) {
  return request.get('/entDemand/getEntEstatebyId', { params })
}

// 获取设备转让详情
export function getEntDeviceTransferbyId(params) {
  return request.get('/entDemand/getEntDeviceTransferbyId', { params })
}

// 获取产品销售详情
export function getEntProductSaleById(params) {
  return request.get('/entDemand/getEntProductSaleById', { params })
}

// 获取其他需求详情
export function getEntOtherDemandById(params) {
  return request.get('/entDemand/getEntOtherDemandById', { params })
}

// 修改企业招聘
export function updateEntRecruit(params) {
  return request.post('/entDemand/updateEntRecruit', params)
}

// 修改房产出租/转让
export function updateEntEstate(params) {
  return request.post('/entDemand/updateEntEstate', params)
}

// 修改设备转让
export function updateEntDeviceTransfer(params) {
  return request.post('/entDemand/updateEntDeviceTransfer', params)
}

// 修改产品销售
export function updateEntProductSale(params) {
  return request.post('/entDemand/updateEntProductSale', params)
}

// 修改其他需求
export function updateEntOtherDemand(params) {
  return request.post('/entDemand/updateEntOtherDemand', params)
}

// 乡镇筛选
export function getTownList(params) {
  return request.get('/common/getTownList', { params })
}

// 上传图片URL
export const uploadImgUrl = process.env.VUE_APP_BASE_API + process.env.VUE_APP_REQUEST_PREFIX + '/file/upload'

// 企业招聘详情上下架
export function isOnShelfEntRecruit(params) {
  return request.get('/entDemand/isOnShelfEntRecruit', { params })
}

// 房产出租/转让详情上下架
export function isOnShelfEntEstate(params) {
  return request.get('/entDemand/isOnShelfEntEstate', { params })
}

// 设备转让详情上下架
export function isOnShelfEntDeviceTransfer(params) {
  return request.get('/entDemand/isOnShelfEntDeviceTransfer', { params })
}

// 产品销售详情上下架
export function isOnShelfEntProductSale(params) {
  return request.get('/entDemand/isOnShelfEntProductSale', { params })
}

// 其他需求详情上下架
export function isOnShelfEntOtherDemand(params) {
  return request.get('/entDemand/isOnShelfEntOtherDemand', { params })
}
