/**
 * 如果字符串为空 null undefined ，则返回placeholder
 * @param str
 * @param placeholder
 * @returns {*|string}
 */
export const toHtmlStr = (str, placeholder = '') => {
  if (str === undefined || str === null || str === 'null') {
    return placeholder
  } else if (str === 999999999) {
    return `<span style="font-size:18px;">∞</span>`
  } else if (str === 'null') {
    return 'null'
  }
  return str
}
/**
 * 调整表格固定列高度(用于出现横向滚动条的elementUI table组件)
 * 
 */
export const resetFixedBox = () => {
  setTimeout(function () {
      let fixedBox = document.getElementsByClassName("el-table__fixed").item(0);
      if (fixedBox) {
          let boxHeight = fixedBox.offsetHeight + 9 + 'px'
          fixedBox.style.height = boxHeight
      }
      let fixedRightBox = document.getElementsByClassName("el-table__fixed-right").item(0);
      if (fixedRightBox) {
          let boxRightHeight = fixedRightBox.offsetHeight + 9 + 'px'
          fixedRightBox.style.height = boxRightHeight
      }

  }, 0)
};