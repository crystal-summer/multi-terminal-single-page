/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor', 'zhoutaoo']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

// 表单验证方式，提示文案统一

// 非空，必填
export const notEmpty = (str) => ({ required: true, message: '请输入' + str, trigger: 'blur' })
export const notEmptySelect = str => ({ required: true, message: '请选择' + str, trigger: 'change' })
// 输入长度限制
export const maxLength = (num) => ({ max: num, message: '最多输入' + num + '字符', trigger: 'blur' })

export const betweenLength = (min, max) => ({ min: min, max: max, message: '长度在' + min + '到' + max + '字符', trigger: 'blur' })

// 9位数字，最多2位小数
export const isDecimalWithTwo = (str) => {
  return ({ pattern: /^[0-9]{0,9}([.]{1}[0-9]{0,2}){0,1}$/, message: `必须为数字, 小数部分至多两位`, trigger: 'change' })
}

// 不能有空格
export const noBlank = () => ({ pattern: /^(\S)+$/, message: '不能有空格', trigger: 'blur' })

// input 只支持数字和英文
export const onlyNumEng = (str) => ({ pattern: /^[A-Za-z0-9]+$/, message: str + '仅支持输入英文和数字', trigger: 'blur' })

// 邮箱验证
export const isEmail = (str) => ({ pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: str + '格式不正确', trigger: 'blur' })

// 筛选
export const notSelect = (str) => ({ required: true, message: '请选择' + str, trigger: 'change' })
// 数字校验
export const isNumberRule = (str) => ({ type: 'number', message: str + '必须为数字值', trigger: 'blur' })

// 必须为数字
export const isNumberBetween = (min, max) => {
  const reg = new RegExp(`^(\d){${min},${max}}$`)
  return ({ pattern: /^(\d){}$/, message: `必须为${min}至${max}的数字`, trigger: 'blur' })
}

// 必须为数字/中文
export const isNumberOrCN = (str) => {
  return ({ pattern: /^[(\u4e00-\u9fa5)|(0-9)]+$/, message: `${str}仅支持数字和中文`, trigger: 'blur' })
}

// 手机号
export const isPhone = () => ({ pattern: /^1[34578]\d{9}$/, message: '不是合法的手机号', trigger: 'blur' })

// 必须是数字
export const mustNumber = () => {
  return ({ type: 'number', message: `必须为数字`, trigger: 'blur' })
}

// 链接
export const isHttp = (str) => ({ required: true, pattern: /^(http|https)\S*/, message: '开头必须是http或者https', trigger: 'blur' })

/**
 *
 * @desc 判断使用的是手机 还是 pc
 */
export function isMobile() {
  var userAgentInfo = navigator.userAgent
  var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  var flag = false
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > -1) {
      flag = true
      break
    }
  }
  return flag
}

/**
 * 验证是不是数字
 * @param val
 * @returns {boolean}
 */
export const isNumber = (val) => {
  if (val === null || val === undefined || Math.abs(val) === Infinity) return false
  return !isNaN(parseFloat(val - 0))
}
/** 验证数值大于0 */
export const validateNum = (rule, value, callback) => {
  if (Number(value) > 0) {
    callback()
  } else {
    callback(new Error('填写的数值须大于0'))
  }
}
// 必须为数字，可以是小数
export const isDecimal = (str) => {
  return ({ pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/, message: str + `必须为数字值`, trigger: 'blur' })
}
// 必须为数字，可以是两位小数
export const isDecimal1 = (str) => {
  return { pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/, message: str + `必须为数字值,两位小数`, trigger: 'blur' }
}

// 20位数字，最多两位小数
export const isDecimalWithFixedTwo = (str) => {
  return /^[0-9]{0,20}([.]{1}[0-9]{0,2}){0,1}$/.test(str)
}
/** 最多两位小数的数值 */
export const isFloat2Num = (str) => {
  return ({
    pattern: /^[0-9]+([.]{1}[0-9]{0,2}){0,1}$/,
    message: `${str}必须为数值且最多两位小数`,
    trigger: 'blur'
  })
}
/**
 * 验证正整数
 * @param num
 * @returns {boolean}
 */
export const isPosInteger = (num) => {
  num = num - 0
  return num !== 0 && /^[0-9]+$/.test(num)
}

/**
 * 验证手机号
 * @param phone
 * @returns {boolean}
 */
export const checkPhone = (phone) => {
  return /^1[3,4,5,7,8][0-9]{9}$/.test(phone)
}

export const checkTelPhone = (tp) => {
  return /^(0\d{2,3}(-|\s|)\d{7,8})$/.test(tp)
}

// 验证密码6-16位，区分大小写
export const checkPassword = (password) => {
  // return /^(\d{6,16})|((?! )(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9_]{6,16})$/.test(password)
  return /^(?=.*[a-zA-Z])(?=.*[\d])[\w\W]{6,16}$/.test(password)
}

export const isEmptyString = (str) => {
  // return /^(\d{6,16})|((?! )(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9_]{6,16})$/.test(password)
  return !str || str.trim().length === 0
}

/**
 * 验证字符串中是否包含字母
 * @param str
 * @returns {boolean}
 */
export const hasLetter = (str) => {
  return /[a-z]/i.test(str + '')
}

/**
 * 判断字符串是否以数字开头
 * @param str
 * @returns {boolean}
 */
export const isStartWithNum = (str) => {
  return /^[1-9]/.test(str)
}

/*
 *去除标签
 */
export const delLabel = (label) => {
  if (!label) return label
  var temp = label.replace(/<\/?.+?>/g, '')
  let result = temp.replace(/ /g, '')//
  result = result.replace(/&nbsp;/g, ' ')
  return result
}
/*
 *去除word粘贴的样式
 */
export const delWordLabel = (src) => {
  if (!src) {
    return ''
  }
  src = src.replace(/[ ]|[\r\n]/g, '')
  src = src.replace(/&nbsp;/g, ' ')
  src = src.replace(/Normal.*NONE/g, '')
  src = src.replace(/@font-face.*}/g, '')
  src = src.replace(/<o:p>&nbsp;<\/o:p>/g, '')
  src = src.replace(/<FONT>/g, '')
  src = src.replace(/<font>/g, '')
  src = src.replace(/o:/g, '')
  src = src.replace(/<P>/g, '')
  src = src.replace(/<\/P>/g, '')
  src = src.replace(/<span>/g, '')
  src = src.replace(/<SPAN>/g, '')
  src = src.replace(/<SPANlang=EN-US>/g, '')
  src = src.replace(/<\/SPAN>/g, '')
  let handleJson = src.replace(/<.*?>/g, '')
  handleJson = handleJson.replace(/\/.*\//g, '')
  handleJson = handleJson.replace(/[<!--]/g, '')
  // console.log(handleJson);
  return handleJson
}

export const isWexin = () => {
  const ua = navigator.userAgent.toLowerCase()
  const isWeixin = ua.indexOf('micromessenger') != -1
  if (isWeixin) {
    return true
  } else {
    return false
  }
}

export const isddTalk = () => {
  // 判断是不是钉钉
  var ua = navigator.userAgent.toLowerCase()
  return ua.indexOf('dingtalk') >= 0
}

export const regIdCard = (str) => {
  return {
    pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
    message: str + '格式不正确',
    trigger: 'blur'
  }
}
