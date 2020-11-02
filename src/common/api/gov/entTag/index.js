import request from '@api/request'
import qs from 'qs'

// 企业库-工商企业（列表/详情接口）
const BASE_URL = '/entfile'
// /标签树
export function listLabelTree(data) {
  return request.post(BASE_URL + '/entFileLabel/listLabelTree', data)
}

// 导入历史
export function queryRecordList(params) {
  return request.get(BASE_URL + '/entFileLabel/queryRecordList', { params })
}
// 导入失败详情
export function queryRecordListDetail(params) {
  return request.get(BASE_URL + '/entFileLabel/queryRecordListDetail', { params })
}

// 保存标签
export function saveLabel(data) {
  return request.post(BASE_URL + '/entFileLabel/saveLabel', data)
}

// 标签下的企业列表
export function queryEntFile(data) {
  return request.post(BASE_URL + '/entFileLabel/queryEntFile', data)
}
// 精准添加
export function addEntFileLabel(data) {
  return request.post(BASE_URL + '/entFileLabel/addEntFileLabel', data)
}

// 企业档案-全国企业搜索
export function queryCountryEnt(params) {
  return request.get(BASE_URL + '/entFileLabel/queryCountryEnt', { params })
}

// 批量删除标签
export function deleteLabelBatch(data) {
  return request.post(BASE_URL + '/entFileLabel/deleteEntLabelBatch', data)
}

export function deleteLabel(data) {
  return request.post(BASE_URL + '/entFileLabel/deleteEntLabel', data)
}
// 删除标签
export function deleteById(data) {
  return request.post(BASE_URL + '/entFileLabel/deleteLabel', data)
}

// 上传企业标签
export function uploadLabelFile(data, config) {
  return request.upload(process.env.VUE_APP_BASE_API + '/entfile/entFileLabel/uploadLabelFile', data, config)
}

// entFileLabel/downloadLabelTemplate 下载模板
export function downloadLabelTemplate(params, filename) {
  return request.downLoad(process.env.VUE_APP_BASE_API + '/entfile/entFileLabel/downloadLabelTemplate', params, filename)
}

// 获取公开的标签列表
export function queryEntLabel(params) {
  return request.get('/entfile/entFileData/queryEntLabel', { params })
}

// ========================企业标签改造版本的接口====================================
// 获取企业标签
// export function showDictLabel(params) {
//   return request.get('/dictLabel/showDictLabel', { params })
// }
// 获取企业标签2
export function showDictLabel(params) {
  return request.get('/dictLabel/getAllDictLabel', { params })
}

// 获取标签对应的企业
export function getEntList(params) {
  return request.get('/dictLabel/getLabel', { params })
}

// 获取精准添加的全部企业
export function getEntData(params) {
  return request.get('/dictLabel/getEntDataAll', { params })
}

// 新增文件夹、标签
export function addDictLabel(params) {
  return request.post('/dictLabel/addDictLabel',  qs.stringify(params))
}

// 编辑文件夹、标签
export function updateDictLabel(params) {
  return request.post('/dictLabel/updateDictLabel',  qs.stringify(params))
}

// 删除文件夹、标签
export function deleteDictLabel(params) {
  return request.post('/dictLabel/deleteDictLabel',  qs.stringify(params))
}

// 移动字标签至某个文件夹下
export function moveDictLabel(params) {
  return request.post('/dictLabel/moveDictLabel',  qs.stringify(params))
}

// 模板下载
export function downloadModel(params) {
  return request.downLoad('/dictLabel/downloadModel',  params)
}

// 精准添加
export function insertEnt(params) {
  return request.post('/dictLabel/insertEnt',  qs.stringify(params))
}

// 数据导出
export function downloadEntLabel(params) {
  return request.downLoad('/dictLabel/downloadEntLabel',  params)
}

// 移除企业
export function deleteEntLable(params) {
  return request.get('/dictLabel/deleteEntLable', { params })
}

// 清空标签下所有企业
export function deleteEntLableForAll(params) {
  return request.get('/dictLabel/deleteEntLableForAll', { params })
}

// 获取文件上传列表
export function getLableUpHistoryList(params) {
  return request.get('/dictLabel/getLableUpHistoryList', { params })
}

// 上传文件
// export function importIndustryLabel(params) {
//   return request.upload(process.env.VUE_APP_BASE_API + '/dictLabel/importIndustryLabel',  params )
// }
export const importIndustryLabel = process.env.VUE_APP_BASE_API + process.env.VUE_APP_REQUEST_PREFIX + '/dictLabel/importIndustryLabel'

// 获取上传失败列表
export function getLabelFailList(params) {
  return request.get('/dictLabel/getLabelFailList', { params })
}
