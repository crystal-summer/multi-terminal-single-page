import request from '@api/request.js'

// 企业档案-基本信息
export function queryEnt(params) {
  return request.get('/entDetail/queryEnt', { params })
}

// 企业档案-标签
export function queryEntSql(params) {
  return request.get('/entDetail/queryEntSql', { params })
}

// 企业档案-查数据年份
export function findYear(params) {
  return request.get("/common/getAllYear", { params });
}

// 企业档案-工商年报
export function queryAnnualReportEnt(params) {
  return request.get("/common/getAllYear", { params });
}

// 企业档案-指标
export function showEntAdjustAccountsDataEnt(params) {
  return request.get('/entData/showEntAdjustAccountsData', { params })
}

// 企业档案-土地数据
export function showLandData(params) {
  return request.get("/landData/getLandData", { params });
}

// 企业档案-用电数据
export function showElectricData(params) {
  return request.get("/electric/getElectricUsed", { params });
}
