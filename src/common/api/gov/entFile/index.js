import request from '@api/request'

// 企业库-工商企业（列表/详情接口）
const BASE_URL = '/entfile'

// 企业详情-企业信息头
export function queryEntInfoByCreditCode(params) {
  return request.get(BASE_URL + '/entFileData/queryEntInfo', { params })
}

// 企业档案-全国企业搜索
export function queryCountryEnt(params) {
  return request.get(BASE_URL + '/entFileData/queryCountryEnt', { params })
}

// 企业档案-根据条件获取企业列表
export function queryEntList(data) {
  return request.post(BASE_URL + '/entFileData/queryEntList', data)
}

// 企业档案配置-配置模块列表
export function queryList(params) {
  return request.get(BASE_URL + '/entFileConfig/queryList', { params })
}

// 获取企业详情-工商年报
export function queryAnnualReportGov(params) {
  return request.get(BASE_URL + '/entFileData/queryAnnualReport', { params })
}

// 照面信息
export function queryEntInfo(params) {
  return request.get(BASE_URL + '/entFileData/queryEntInfo', { params })
}

// 地区列表
export function queryRegionList(params) {
  return request.get(BASE_URL + '/entFileData/queryRegionList', { params })
}

// 行业列表
export function queryIndustrycoList(params) {
  return request.get(BASE_URL + '/entFileData/queryIndustrycoList', { params })
}

// 亩均数据-基本信息
export function getSimpleEntData(params) {
  return request.get('/entData/getSimpleEntData', { params })
}

// 亩均数据-亩均指标
export function getMuIndex(params) {
  return request.get('/entAdjust/getMuIndex', { params })
}

// 亩均数据-土地数据
export function getLandData(params) {
  return request.get('/landData/getLandData', { params })
}

// 亩均数据-税务、经信、科技、排污数据
export function getEntOtherData(params) {
  return request.get('/entData/getEntOtherData', { params })
}

// 亩均数据-用电数据
export function getElectricUsed(params) {
  return request.get('/electric/getElectricUsed', { params })
}

// 亩均数据-获取企业规模
export function getEntRule(params) {
  return request.get('/entData/getEntRule', { params })
}

// ========================  新接口 ================================

// 获取企业列表
export function getEntList(params) {
  return request.post('/entDossier/getEntList', params)
}

// 根据企业统代和年份获取标签
export function getLabelByEnt(params) {
  return request.get('/entDossier/getLabelByEnt', { params })
}

// export function showDictLabel(params) {
//   return request.get('/dictLabel/showDictLabel', { params })
// }

export function showDictLabel(params) {
  return request.get('/dictLabel/getAllDictLabel', { params })
}

// 企业档案-指标
export function showEntAdjustAccountsDataGov(params) {
  return request.get('/entData/showEntAdjustAccountsData', { params })
}
