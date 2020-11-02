import request from '@api/request'

// 获取政策列表
export function getPolicyByPage(params) {
  return request.get('/besNews/getPolicyByPage', { params })
}

// 删除政策
export function deletePolicy(params) {
  return request.post('/besNews/deletePolicy', params)
}

// 获取政策详情
export function getPolicyDetailById(params) {
  return request.get('/besNews/getPolicyDetailById', { params })
}

// 编辑/添加政策
export function incrementOrUpdatePolicy(params) {
  return request.post('/besNews/incrementOrUpdatePolicy', params)
}

// 置顶/取消置顶
export function placedAtTheTop(params) {
  return request.post('/besNews/placedAtTheTop', params)
}

// 发布/保存/下架政策
export function publish(params) {
  return request.post('/besNews/publish', params)
}

// 上传照片
export function uploadFile(data, config) {
  return request.upload(process.env.VUE_APP_BASE_API + process.env.VUE_APP_REQUEST_PREFIX + '/file/upload', data, config)
}

export const uploadFileUrl = process.env.VUE_APP_BASE_API + process.env.VUE_APP_REQUEST_PREFIX + '/file/upload'
