import request from '@api/request'
import md5 from 'js-md5'

// 政务端登录接口
export function login(data) {
  const form = {
    username: data.username,
    password: md5(data.password),
    grant_type: 'password',
    scope: 'read'
  }
  return request({
    url: '/authentication-server/oauth/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic dGVzdF9jbGllbnQ6dGVzdF9zZWNyZXQ='
    },
    method: 'post',
    params: form
  })
  // return axios.post('/authentication-server/oauth/token',form)
}

export function check(params) {
  return request({
    url: '/usr/check',
    method: 'get',
    params
  })
}

export function getInfo(token) {
  return request({
    url: '/organization/userInfo/currentUser',
    method: 'get',
    params: {}
  })
}

export function logout() {
  return Promise.resolve({
    code: '000000',
    mesg: '成功',
    time: new Date()
  })
}

// 企业端修改密码接口
export function changePwd(params) {
  // return request.post('/user/changePwd',  params)
  return request.post("/organization/userInfo/changePassword", params);
}

export const uploadFileUrlGov = process.env.VUE_APP_BASE_API + process.env.VUE_APP_REQUEST_PREFIX + '/file/upload'

export const uploadFileUrlEnt = process.env.VUE_APP_BASE_API + process.env.VUE_APP_REQUEST_PREFIX2 + '/file/upload'

// 获取乡镇列表
export function getTownList(params) {
  return request.get('/common/getTownList', { params })
}

// 年份筛选
export function getAllYear(params) {
  return request.get('/common/getAllYear', { params })
}

// 获取主营业务选择列表
export function getDictIndustrycoList(params) {
  return request.get('/common/getDictIndustrycoList', { params })
}
// ent端获取登录状态
export function changeLoginStatus(params) {
  return request.get("/usr/changeLoginStatus", { params });
}