import { quarterOption, monthOption } from '../constant'
/**
 * 获取从fromYear年开始到当前时间的前一年年份
 * parameter 单位
 */
export const yearFromLastYear = (fromYear, parameter = '') => {
  const ny = new Date().getFullYear() - 1
  const yearNumber = ny - fromYear + 1

  return new Array(yearNumber)
    .fill(1)
    .map((v, i) => {
      return {
        label: parameter ? ny - i + parameter : ny - i,
        value: ny - i
      }
    })
    .reverse()
}

/**
 * 获取从fromYear年开始到当前时间的年分
 * parameter 单位
 */
export const yearFromCurYear = (fromYear, parameter = '') => {
  const ny = new Date().getFullYear()
  const yearNumber = ny - fromYear + 1

  return new Array(yearNumber)
    .fill(1)
    .map((v, i) => {
      return {
        label: parameter ? ny - i + parameter : ny - i,
        value: ny - i
      }
    })
    .reverse()
}

export const yearFromYear = (fromYear, parameter = '', isIncludeCurrentYear) => {
  const ny = new Date().getFullYear() - (isIncludeCurrentYear ? 0 : 1)
  const yearNumber = ny - fromYear + 1

  return new Array(yearNumber)
    .fill(1)
    .map((v, i) => {
      return {
        label: parameter ? ny - i + parameter : ny - i,
        value: ny - i
      }
    })
    .reverse()
}

/**
 * 获取从fromYear年开始到当前时间的年分
 * parameter 单位
 */
export const yearFromYearTo = (fromYear, parameter = '') => {
  const ny = new Date().getFullYear()
  const yearNumber = ny - fromYear + 1

  return new Array(yearNumber).fill(1).map((v, i) => {
    return {
      label: parameter ? ny - i + parameter : ny - i,
      value: ny - i
    }
  }).reverse()
}

//isIncludeCurrentYear 是否包含当前年
export const getYearList = (isIncludeCurrentYear, selectYear) => {
  let year = new Date().getFullYear() - (isIncludeCurrentYear ? 0 : 1)
  let minYear = selectYear ? selectYear : 2019
  let yearArr = []
  while (year >= minYear) {
    yearArr.push(minYear++)
  }
  return yearArr
}

// 判断当前季度
export const getCurrentQuerty = (month) => {
  if (month >= 1 && month <= 3) {
    return 1
  } else if (month >= 4 && month <= 6) {
    return 2
  } else if (month >= 7 && month <= 9) {
    return 3
  } else if (month >= 10 && month <= 12) {
    return 4
  } else {
    return false
  }
}
export const getQuertyOption = (querty) => {
  let temp = JSON.parse(JSON.stringify(quarterOption))
  return temp.splice(0, querty)
}

// 返回月份筛选
export const getMonthOption = (month) => {
  let temp = JSON.parse(JSON.stringify(monthOption))
  return temp.splice(0, month)
}