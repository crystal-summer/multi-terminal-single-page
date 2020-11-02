/**
 * @description 融资需求
 * @author xiaomeng
*/
import request from '@api/request'

// 删除融资需求
export function deleteBesFinancialReq(params) {
  return request.post('/entFinancing/deleteBesFinancialReq',  params)
}
// 查询融资需求
export function queryBesFinancialReqByPage(params) {
  return request.get('/entFinancing/queryBesFinancialReqByPage', { params })
}
// 处理融资需求
export function handleBesFinancialReq(params) {
  return request.post('/entFinancing/handleBesFinancialReq', params)
}
// 查询融资产品列表
export function queryBesProductApplyByPage(params) {
  return request.get('/entFinancing/queryBesProductApplyByPage', { params })
}
// 处理融资产品列表
export function handleBesProductApply(params) {
  return request.post('/entFinancing/handleBesProductApply',  params)
}

// 删除融资产品列表
export function deleteBesProductApply(params) {
  return request.post('/entFinancing/deleteBesProductApply',  params)
}

