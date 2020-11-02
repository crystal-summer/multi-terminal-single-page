import request from '@api/request'
import qs from 'qs'
// 差别化施策

export const differentSituation = (params) => request.get('/differentiationImplementationl/differentSituation', {params})

export const total = (params) => request.get('/differentiationImplementationl/total', {params})

export const listDifferentByPage = (params) => {
    return request.get('/differentiationImplementationl/listDifferentByPage', { params })
}

export const getHitory = (params) => request.get('/import/getHitory', {params})

export const downloadFile = (params, fileName) => request.downLoad('/import/downloadFile', params, fileName)

// export const upload = (params) => request.upload('/import/upload', params)

export const getExcelTitle = (params) => request.post('/import/getExcelTitle', qs.stringify(params))

export const getNameList = params => request.get('/import/getNameList', params)

export const parseExcel = params => request.post('/import/parseExcel', qs.stringify(params))

export const downLoadByUser = (params, fileName) => request.downLoad('/differentiationImplementationl/downLoadByUser', params, fileName)

export const listPolicyByPage = (params) => request.get('/differentiationImplementationl/listPolicyByPage', params)

export const getChoose = (params) => request.get('/differentiationImplementationl/getChoose', params)

export const updateOrAddPolicy = (params) => request.get('/differentiationImplementationl/updateOrAddPolicy', params)

export const deletePolicyById = (params) => request.get('/differentiationImplementationl/deletePolicyById', params)

export const getQuarty = (params) => request.get('/differentiationImplementationl/getQuarty', params) // 获取当前默认季度

export const delEntData = (params) => request.post('/differentiationImplementationl/delete', qs.stringify(params)) // 删除企业填写数据

export const updateEntData = (params) => request.post('/differentiationImplementationl/update', qs.stringify(params)) // 更新企业填写数据

export const downloadModel = (params, fileName) => request.downLoad('/differentiationImplementationl/downloadModel', params, fileName) // 模板导出

export const importData = (params) => request.postFormData('/differentiationImplementationl/import', params) // 数据导入

export const getCommonYear = (params) => request.get('common/getAllYear', {params}) // 获取年份列表
