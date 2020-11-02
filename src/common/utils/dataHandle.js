// 数组嵌套 children为[]时 改成null
export const handleChild = (arr, childStr) => {
  let handledArr = arr.map(item => {
    if (!item[childStr] || item[childStr].length === 0) {
      item[childStr] = null
    } else {
      let childArr = handleChild(item[childStr], childStr)
      item[childStr] = childArr
    }
    return item
  })
  return handledArr
}

// 过滤路由，children 加 sons
export const filterRouters = (route) => {
  let tempRoute = route.filter(cu => { return !cu.hidden })
  for (let i = 0; i < tempRoute.length; i++) {
    if (tempRoute[i].children && tempRoute[i].children.length > 0) {
      tempRoute[i].sons = tempRoute[i].children
      filterRouters(tempRoute[i].children)
    }
  }
  return tempRoute
}
