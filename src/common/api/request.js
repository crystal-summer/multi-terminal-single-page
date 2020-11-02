import axios from 'axios'
import { Message } from 'element-ui'
import govStore from '@/gov/store'
import entStore from '@/ent/store'
import { getToken, getToken1, removeToken, removeToken1 } from '@utils'
const POST = 'POST'
const GET = 'GET'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

/**
 * 修改axios的baseURL
 * 标准版：/prod-api
 * 政务端：大多数接口走/prod-api/mj-server,少数走/prod-api/mj-qingtian
 * 企业端/prod-api/mj-qingtian
 */
// 政务端标准版接口
const govMap = [
  '/authentication-server/oauth/token',
  '/organization/',
  '/entFileData/queryEntInfo',
  '/entFileData/queryAnnualReport',
  '/entFileConfig/'
]
// 政务端少数走/prod-api/mj-qingtian的接口
const govMjQingtian = [
  '/dataImport/downloadModelByType',
  '/dataImport/depDataExport'
]
// 政务端走/prod-api/monitor-server的接口：可视化
const govMonitorServer = [
  // 园区大脑
  // '/parkBrain/',
  // // 运行监测
  // '/showye/',
  // '/technical/',
  // '/dzdt/',
  // '/hyfx/',
  // '/entErprise/',
  // '/digitalEconomy/',
  // // 产业云地图
  // '/industryCloud/',
  '/mutiAnalysis/',
  '/decisionAnalysis/'
]
// 企业端标准版接口/dataImport/downloadModelByType
const entMap = ['/authentication-server/oauth/token', '/organization/']
const entServer = [
  "/landData/getLandData",
  "/electric/getElectricUsed",
  "/entData/showEntAdjustAccountsData",
  "/file/upload"
];
// vuex store
let store = null
function configBaseUrl(config) {
  let baseURL = null
  let temp = null
  let temp2 = null
  let temp3 = null
  if (process.env.VUE_APP_PORT === 'gov') {
    temp = govMap.find(cu => {
      return config.url.indexOf(cu) !== -1
    })
    temp2 = govMjQingtian.find(cu => {
      return config.url.indexOf(cu) !== -1
    })
    temp3 = govMonitorServer.find(cu => {
      return config.url.indexOf(cu) !== -1
    })
    store = govStore
  } else {
    temp = entMap.find(cu => {
      return config.url.indexOf(cu) !== -1
    })
    temp2 = entServer.find(cu => {
      return config.url.indexOf(cu) !== -1
    })
    store = entStore
  }
  baseURL = temp
    ? config.baseURL
    : temp2
      ? process.env.VUE_APP_BASE_API + process.env.VUE_APP_REQUEST_PREFIX2
      : temp3
        ? process.env.VUE_APP_BASE_API + process.env.VUE_APP_REQUEST_PREFIX3
        : process.env.VUE_APP_BASE_API + process.env.VUE_APP_REQUEST_PREFIX
  return baseURL
}

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.baseURL = configBaseUrl(config)
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken()
      if (process.env.VUE_APP_PORT === 'gov') {
        config.headers['token'] = `${getToken1()}`
      } else {
        config.headers['token'] = getToken()
      }
    }
    // 解决登录接口 basic 认证，浏览器弹用户名密码框问题
    if (config.url === '/authentication-server/oauth/token') {
      config.headers.Authorization = 'Basic dGVzdF9jbGllbnQ6dGVzdF9zZWNyZXQ='
    }
    if (config.url.indexOf('/jeecg-boot') != -1) {
      config.baseURL = '/'
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截 错误时
function resInterceptors(err) {
  const error = err.response
  if (error.status) {
    switch (error.status) {
      // 401: 未登录
      case 401:
        Message.error('未登录，请先登录')
        removeToken()
        removeToken1()
        setTimeout(() => {
          location.reload()
        }, 1000)
        setTimeout(() => {
          location.href = location.origin + location.pathname + '/#/login'
        }, 2000)
        break
      // 403 token过期
      case 403:
        Message.error('登录过期，请重新登录')
        removeToken()
        removeToken1()
        setTimeout(() => {
          location.reload()
        }, 1000)
        setTimeout(() => {
          location.href = location.origin + location.pathname + '/#/login'
        }, 2000)
        break
      // 其他错误，直接抛出错误提示
      case 406:
        Message.error('权限不足')
        break
      case 500:
        Message.error(
          error.data.mesg == '无效授权'
            ? error.data.data || '账号或密码错误!'
            : '服务器错误'
        )
        break
      case 503:
        Message.error('服务器繁忙')
        break
      default:
        Message.error(
          error.data.mesg == '无效授权'
            ? '账号或密码错误!'
            : error.data.mesg || error.data.msg
        )
        console.log('[response error] ' + error)
    }
    // console.log(error)
    return Promise.reject(error)
  }
  // 处理 response 时发生异常（包括请求超时，但不包括服务端正常返回的 非2xx 响应）
  // console.log(error)
  return Promise.reject(error)
}

// 在响应之前拦截它们
service.interceptors.response.use(function(response) {
  // console.log(response)
  if (
    response.config.baseURL.includes("/mj-server") ||
    response.config.baseURL.includes("/mj-qingtian") ||
    response.config.baseURL.includes("/monitor-server")
  ) {
    if (response.data.code === "0000") {
      return response.data.data;
    }
    if (response.data.code === "0001") {
      Message({
        message: response.data.msg,
        type: "error",
        center: true
      });
      return Promise.reject(response.data.msg);
    }
    debugger;
    if (response.data.code === "-1") {
      Message({
        message: response.data.mesg,
        type: "error",
        center: true
      });
      return Promise.reject(response.data.msg);
    }
    if (response.data.code === "9999") {
      Message({
        message: "服务器异常",
        type: "error",
        center: true
      });
      return Promise.reject("服务器异常");
    }
  } else {
    return response;
  }
}, resInterceptors)

/**
 * @desc download
 * @ params {  }
 */
const download = (url, params = {}, filename, onProgress) => {
  const baseURL = configBaseUrl({ url, baseURL: process.env.VUE_APP_BASE_API })
  axios
    .request({
      url: baseURL + url,
      method: 'get',
      params,
      headers: { Authorization: 'Bearer ' + getToken() },
      responseType: 'blob',
      onDownloadProgress: onProgress
    })
    .then(res => {
      if (!(res.data instanceof Blob)) {
        Message({
          type: 'error',
          message: '下载失败'
        })
      } else {
        const blob = res.data
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, file.fileName)
        } else {
          const aEle = document.createElement('a')
          aEle.href = window.URL.createObjectURL(blob)
          if (!filename) {
            // 没传文件名，就用后台的filename， 后台也没有传就。。。。
            const res_header = res.headers['content-disposition']
            if (res_header.indexOf('fileName=') !== -1) {
              filename = res_header.split('fileName=')[1]
            } else {
              filename = res_header.split('fileName=')[1]
            }
            filename = decodeURIComponent(filename || '')
          }
          aEle.download = filename
          aEle.click()
          window.URL.revokeObjectURL(aEle.href)
        }
      }
    })
}

/**
 * upload 方式：POST Content-Type: mutipart/form-data
 * @param {*} url
 * @param {*} data
 */
const upload = (url, data, config) => {
  return new Promise(function(resolve, reject) {
    // config.headers['Authorization'] = 'Bearer ' + getToken()
    // console.log(config);
    axios
      .post(url, data, config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const request = ({ url, method = POST, params = {}, emulateJSON = true, timeout = false, ...config }) => {
  let reqConf = { method, url, ...config }
  if (method === POST && emulateJSON) {
    params.emulateJSON = true
  }
  if (method === GET) {
    params.timestamp = new Date().getTime()
  }
  reqConf[method === POST ? 'data' : 'params'] = params
  if (timeout) {
    service.defaults.timeout = 100000
  }
  return new Promise((resolve, reject) => {
    service(reqConf).then(res => {
      console.log(res)
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}
/**
 * 请求方法: POST, Content-Type: application/x-www-from-urlencoded
 * @param {*} url
 * @param {*} data
 */
const postFormData = (url, data) => {
  return request({ url, params: data, emulateJSON: true })
}
service.downLoad = download
service.upload = upload
service.postFormData = postFormData

export default service

