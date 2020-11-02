import request from '@api/request'

// 个人中心

// 修改用户邮箱
export function changeMail(data) {
  return request.post('/organization/userInfo/changeMail', data)
}

// 修改用户手机号
export function changeMobile(data) {
  return request.post('/organization/userInfo/changeMobile', data)
}

// 第三方应用
export function thirdPlatList(params) {
  return request.get('/organization/userInfo/thirdPlatList', { params })
}

// 修改密码
export function changePassword(data) {
  return request.post('/organization/userInfo/changePassword', data)
}

// 发送短信验证码
export function getCodeReq(data) {
  return request.post('/organization/userInfo/sendMobileCode', data)
}

// 修改基本信息
export function changeBasicInfo(data) {
  return request.post('/organization/userInfo/changeBasicInfo', data)
}

// 上传头像
export function uploadHeaderLogo(data, config) {
  return request.upload(process.env.VUE_APP_BASE_API + '/userInfo/uploadHeaderLogo', data, config)
}
