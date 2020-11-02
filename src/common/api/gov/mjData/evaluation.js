import request from '@api/request'
import qs from 'qs'

// 数据年份
export function dataYearList(params) {
  return request.get('/adjustRuleYearHistory/list', { params })
}

// 复制标签
export function copyDictLabel(params) {
  return request.get('/dictLabel/copyDictLabel', { params })
}

// 计算规则设置-从历年复制规则
export function copyData(params) {
  return request.post('/adjustRuleYearHistory/copyData', params)
}

// 加减分项-列表
export function addSubItemList(params) {
  return request.get('/additionalPoint/list', { params })
}

// 获取企业标签
// export function getEnterpriseLabel(params) {
//   return request.post('/entfile/entFileLabel/listLabelTree', params)
// }
// export function showDictLabel(params) {
//   return request.get('/dictLabel/showDictLabel', { params })
// }

export function showDictLabel(params) {
  return request.get('/dictLabel/getAllDictLabel', { params })
}

// 获取全局设置列表
export function getGlobalSetting(params) {
  return request.get('/adjustRuleProcess/listOverall', { params })
}

// 加减分项-新增
export function saveAddSubItem(params) {
  return request.post('/additionalPoint/save', qs.stringify(params))
}

// 加减分项-更新
export function updateAddSubItem(params) {
  return request.post('/additionalPoint/update', qs.stringify(params))
}

// 加减分项-删除
export function deleteAddSubItem(params) {
  return request.post('/additionalPoint/delete', qs.stringify(params))
}

// 新增全局设置
export function addGlobalSetting(params) {
  return request.post('/adjustRuleProcess/addOveralall', qs.stringify(params))
}

// 比例设置-单选框按钮状态
export function getUsingType(params) {
  return request.get('/percentSetting/getUsingType', [params])
}

// 比例设置-列表
export function proportionalSetList(params) {
  return request.get('/percentSetting/list', { params })
}

// 比例设置-切换选择分行业或全行业
export function switchType(params) {
  return request.post('/percentSetting/switchType', qs.stringify(params))
}

// 比例设置-删除
export function deleteProportional(params) {
  return request.post('/percentSetting/deleteById', qs.stringify(params))
}

// 搜索四位行业代码
export function showTertiaryIndustry(params) {
  return request.get('/adjustGrade/showTertiaryIndustry', { params })
}

// 比例设置-新增
export function addProportionalSet(params) {
  return request.post('/percentSetting/saveIndustry', params)
}

// 比例设置-更新
export function updateProportionalSet(params) {
  return request.post('/percentSetting/updateIndustry', params)
}

// 调档项-列表
export function addjustItemList(params) {
  return request.get('/adjustGrade/list', { params })
}

// 调档项-更新
export function updateAddjustItem(params) {
  return request.post('/adjustGrade/update', qs.stringify(params))
}

// 调档项-新增
export function saveAddjustItem(params) {
  return request.post('/adjustGrade/save', qs.stringify(params))
}

// 调档项-删除
export function deleteAddjustItem(params) {
  return request.post('/adjustGrade/delete', qs.stringify(params))
}

// 亩均评价结果-列表
export function listByPage(params) {
  return request.post('/entAdjust/listByPage', params)
}

// 亩均评价结果-综合分核算
export function calculateAdditionalPoint(params) {
  return request.post('/adjustRuleProcess/calculateAdditionalPoint', qs.stringify(params))
}

// 亩均评价结果-乡镇筛选get
export function getCalculateProcess(params) {
  return request.get('/file/getCalculateProcess', { params })
}

// 亩均评价结果-导出数据
export function exportData(params) {
  return request.post('/entAdjust/downAndEntAdjustAccount', params)
}

// 亩均评价结果-修改
export function setFileTransfer(params) {
  return request.post('/entAdjust/setFileTransfer', qs.stringify(params))
}

// 亩均评价结果-调档过程
export function adjustRuleProcess(params) {
  return request.get('/adjustRuleProcess/list', { params })
}

// 亩均评价结果-加减分项设置过程
export function getAdditionPoint(params) {
  return request.get('/entAdjust/getAdditionPoint', { params })
}

// 评分结果下载-列表
export function getDownLoadList(params) {
  return request.get('/entAdjust/getDownLoadList', { params })
}

// 评分结果下载-下载
export function downLoadById(params) {
  return request.downLoad('/entAdjust/downLoadById', params)
}

// 企业调档申诉-列表
export function listTransferByPage(params) {
  return request.get('/entAdjust/listTransferByPage', { params })
}

// 企业调档申诉-详情
export function showTransfer(params) {
  return request.get('/entAdjust/showTransfer', { params })
}

// 企业调档申诉-审核提交
export function submitTC(params) {
  return request.post('/entAdjust/submitTC', qs.stringify(params))
}

// 自核期限设置-列表
export function dataCheckList(params) {
  return request.get('/sys/dataCheckList', { params })
}

// 自核期限设置-修改期限
export function modifyData(params) {
  return request.get('/sys/modifyData', { params })
}
