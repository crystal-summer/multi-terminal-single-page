import $ from 'jquery'
var data
var chart = null
var orderNo = ''
var orderNoMore = ''
var availableTags = []
var isShowItem = false
var companyName
var DetailInfo = {}
var isShowOnes = false
var focusNodeid
var focusNodesone = []
var isShowYCNode = false
var YCNodeList = []
var searchList = []
var searchListSX
var flag = 0

// scale
var scale = 0
var gufenFilterTwo = ['国家股', '人股', '流通股', '公众股', '工股', '股东', 'A股', 'H股', 'B股', '上市股', '基本社员', '集体股', '合作股', '募集股']
var companyFilterException2 = ['财政部', '国务院', '国资委']
// hover
var isHover = !0
var pathIdsHover = {}
// highlight
var isHighlight = !1
var chooseState = [2, ['吊销', '注销'], [], 0]
var searchListOk = []
var lineColor = {
  '在营（开业）': 'green',
  '吊销': 'red',
  '注销': '#f3bd00'
}
// 定义筛选按钮功能
var touzileixing = $('input.menu-touzi:checkbox')
touzileixing = touzileixing.slice(1)

data = { 'nodes': [], 'links': [] }

function isCompany(name) {
  let companyFilter = {
    companyFilterOne: ['有限', '无限', '集团', '合作', '会社', '合伙', '企业'],
    companyFilterTwo: ['厂', '公司', '行', '社', '中心', '网吧', '院', '部', '处', '股', '队', '委员会', '合作', '库', '局', '村', '团', '站', '店', '所', '段', '厅', '组', '工作室', '研究中心', '办公室', '商场', '大学'],
    companyFilterThree: ['Co.', 'Limited', 'LIMITED', 'LTD.', 'INC.', 'LLC.'],
    companyFilterException: ['委派代表'],
    companyFilterException2: ['财政部', '国务院', '国资委'],
    gufenFilterTwo: ['国家股', '人股', '流通股', '公众股', '工股', '股东', 'A股', 'H股', 'B股', '上市股', '基本社员', '集体股', '合作股', '募集股']
  }

  if (!name) {
    return false
  }
  if (name.length > 4) {
    for (var i = 0, length = companyFilter.companyFilterOne.length; i < length; i++) {
      if (name.indexOf(companyFilter.companyFilterOne[i]) > -1) {
        return true
      }
    }
    for (var j = 0, length = companyFilter.companyFilterTwo.length; j < length; j++) {
      if (name.indexOf(companyFilter.companyFilterTwo[j]) > -1) {
        return true
      }
    }
    for (var k = 0, length = companyFilter.companyFilterThree.length; k < length; k++) {
      if (name.indexOf(companyFilter.companyFilterThree[k]) > -1) {
        return true
      }
    }
    for (var l = 0, lengthException = companyFilter.companyFilterException.length; l < lengthException; l++) {
      if (name.indexOf(companyFilter.companyFilterException[l]) > -1) {
        return true
      }
    }
  }
  for (var m = 0, length = companyFilter.companyFilterException2.length; m < length; m++) {
    if (name.indexOf(companyFilter.companyFilterException2[m]) > -1) {
      return true
    }
  }
  if (name.length == 4 && name.indexOf('大学') > -1) return true
  return false
}

function getEntNameMap(orderNo, token) {
  let tempUrl = ''
  if (process.env.VUE_APP_PORT  == 'gov') {
    tempUrl = '/entfile/entFileData/queryAssociationMap?key='
  } else {
    tempUrl = '/mj-qingtian/entDetail/postEntNameMap?entName='
  }
  $.ajax({
    url: process.env.VUE_APP_BASE_API  + tempUrl + orderNo,
    type: 'GET',
    timeout: 600000,
    headers: { 'Authorization': token, token: token },
    success: function(response) {
      if (!response.data) {
        // alert('很抱歉，查询失败了');
        $('.gxtupu').hide().next('.noData').css({ display: 'flex' })
        return
      }
      orderNoMore = response.data.orderNo
      data = conver_tree(response.data)
      companyName = response.data.basicList[0].entName
      $('.big-title').text(companyName)
      searchList = data.nodes
      var options = {
        container: document.getElementById('demo'),
        data: { preloaded: data },
        navigation: { mode: 'showall', numberOfFocusNodes: 0 },
        // legend: {
        //     enabled: true,
        //     maxLineSymbols: 10,
        //     padding: 0,
        //     panel: {
        //         floating:true,
        //         side: "left",
        //         align: "bottom",
        //         padding: 20,
        //         margin: 30
        //     },
        //     text: {
        //         font: "12px Arial",
        //         fillColor: '#fff',
        //         outlineColor:null
        //     },
        //     interaction: {
        //         click: false
        //     }
        // },
        style: {
          nodeStyleFunction: nodeStyle,
          linkStyleFunction: linkStyle,
          nodeDetailMinZoom: 0,
          nodeDetailMinSize: 0,
          nodeLabel: {
            textStyle: { font: '30px', fillColor: '#050505' },
            backgroundStyle: { fillColor: '' },
            scaleWithSize: !1,
            scaleWithZoom: !1
          }
          // multilinkSpacing: 20,
          // linkLabelScaleBase:0.7,
          // linkLabel: {
          //     padding:0,
          //     borderRadius: 999,  //make as round as possible
          //     textStyle: {fillColor: "black",font:"13px Arial"},
          //     backgroundStyle: {fillColor: "", lineColor: ""},
          //     rotateWithLink:true,
          //     scaleWithSize:true,
          // },
          // nodeClasses: [
          //     {className: "当前节点", style: {fillColor: "#c00000",}},
          //     {className: "股东", style: {fillColor: "#003873",}},
          //     {className: "董监高法", style: {fillColor: "#f49002",}},
          //     {className: "投资公司", style: {fillColor: "#3399cc",}},
          //     {className: "交叉持股", style: {fillColor: "#3399cc", lineColor: "#003873"}},
          // ],
          // linkClasses: [
          //     {className: "任职", style: {fillColor: "#0eacb1", lineDash: [3, 3]}},
          //     {className: "投资", style: {fillColor: "#3b9df4", toDecoration: "arrow",}},
          // ]
        },
        events: {
          onHoverChange: function(event) {
            if (isShowOnes) return
            if (event.preventDefault()) return false
            pathIdsHover = []
            if (event.hoverNode && event.hoverNode.radius) {
              changeHoverNode(event.hoverNode)
            } else {
              isHover = !1
              chart.updateStyle()
            }
          },

          onClick: function(event, args) {

          },

          onDoubleClick: function(event) {
            if (!event.clickNode) {
              // 屏蔽双击放大事件
              if (event.preventDefault()) return false
              isHover = false
              isHighlight = false
              isShowOnes = false
              focusNodeid = null
              chart.updateStyle()
            } else {
              if (event.preventDefault()) return false
              $('#targetNodeId-1-ddi').val(event.clickNode.id)
              if (focusNodeid == event.clickNode.id) {
                isShowOnes = false
                focusNodeid = null
                chart.updateStyle()
                return
              }
              focusNodeid = event.clickNode.id
              highLightOnes(event.clickNode.id)
              showListOfKeyword(event.clickNode.id)
            }
          }

        },
        interaction: {
          zooming: {
            zoomExtent: [0.4, 4]
          },
          selection: {
            allowMoveNodesOffscreen: false,
            lockNodesOnMove: false
          }
        },
        nodeMenu: {
          enabled: false
          // showData:true
        },
        linkMenu: {
          enabled: false
          // showData:true
        },
        toolbar: {
          enabled: true, // unshow toolbar
          items: [
            { item: 'zoomControl', side: 'right', align: 'bottom' },
            { item: 'rearrange', side: 'right', align: 'bottom' },
            { item: 'freeze', side: 'bottom', align: 'right' },
            { item: 'fullscreen', side: 'bottom', align: 'right' }
          ]
        },
        filters: {
          nodeFilter: filterNode
        }
      }
      // console.log(123);
      /* ----- define end -----------*/
      chart = new NetChart(options)

      // 排序，按层级，企业在前，汉字拼音首字母在前
      var searchList_level = [[], [], [], [], []]
      for (var i in searchList) {
        switch (searchList[i].level) {
          case 0:
            searchList_level[0].push(searchList[i])
            break
          case 1:
            searchList_level[1].push(searchList[i])
            break
          case 2:
            searchList_level[2].push(searchList[i])
            break
          case 3:
            searchList_level[3].push(searchList[i])
            break
          case 4:
            searchList_level[4].push(searchList[i])
            break
        }
      }
      var searchList_type = [[[], []], [[], []], [[], []], [[], []], [[], []]]
      for (var i = 0; i < searchList_level.length; i++) {
        for (var j = 0; j < searchList_level[i].length; j++) {
          if (isCompany(searchList_level[i][j].id)) {
            searchList_type[i][0].push(searchList_level[i][j])
          } else {
            searchList_type[i][1].push(searchList_level[i][j])
          }
        }
        searchList_type[i][0].sort(function(a, b) {
          return a.id.localeCompare(b.id)
        })
        searchList_type[i][1].sort(function(a, b) {
          return a.id.localeCompare(b.id)
        })
        searchList_level[i] = searchList_type[i][0].concat(searchList_type[i][1])
        searchListOk = searchListOk.concat(searchList_level[i])
      }
      var enterpriseName = searchListOk[0] && searchListOk[0].id

      // 筛选搜素列表，与图谱中的点保持一致
      setTimeout(updateSearchList, 200)
    },

    error: function() {
      data = { 'nodes': [], 'links': [] }
      searchList = []
    }
  })
}

function filterNode(nodeData) {
  return isCengshu(nodeData, chooseState[0]) && isStatus(nodeData, chooseState[1]) && isTouzi(nodeData, chooseState[2]) && isBili(nodeData, chooseState[3])
}

function nodeStyle(node) {
  if (!node.dataLinks || node.dataLinks.length == 0) {
    node.radius = 0
  } else {
    node.radius = 20
    if (node.data.colorType[0].split('-')[2] === 'target') {
      node.radius = 40
    } else if (node.data.colorType[0].split('-')[2] == 'dwtz') {
      node.radius = 20
    }
  }

  if (isShowYCNode) {
    if (YCNodeList.indexOf(node.id) > -1) {
      node.lineWidth = 2
      node.lineColor = '#03fd91'
    }
  }

  // if (isShowOnes) {
  //     node.items = [];
  //     if (node.data.id == focusNodeid) {
  //         node.label = node.data.id;
  //         node.fillColor = '#c00000';
  //         node.radius = 40;
  //     } else if (focusNodesone.indexOf(node.data.id) > -1) {
  //         node.label = node.data.id;
  //         node.radius = 30;
  //         if (DetailInfo[focusNodeid] && DetailInfo[focusNodeid].data[node.data.id]) {
  //             var _data = DetailInfo[focusNodeid].data[node.data.id];
  //             if (_data.type2.indexOf('gd') > -1) {
  //                 node.fillColor = '#fff';
  //             } else if (_data.type2.indexOf('djg') > -1) {
  //                 node.fillColor = '#000';
  //             } else {
  //                 node.fillColor = '#3399cc';
  //             }
  //         } else {
  //
  //         }
  //     } else {
  //         node.label = '';
  //         node.radius = 10;
  //         if (!node.dataLinks || node.dataLinks.length == 0) {
  //             node.radius = 0;
  //             node.label = '';
  //             node.items = [];
  //         }
  //     }
  //
  //     if (isCompany(node.data.id)) {
  //         node.display = 'image';
  //         node.image = basePath + "../plugins/images/node-icons-male.png";
  //         node.imageSlicing = [0, 0, 239, 239];
  //     }
  //     return false;
  // }

  // label
  node.label = ''
  // item
  if (isShowItem && node.dataLinks.length) {
    node.items = [
      {
        text: node.id,
        aspectRatio: 0, // force single line
        px: 0, py: -1, x: 0, y: -5,
        textStyle: { fillColor: 'black' },   // font: '20px Arial',
        backgroundStyle: { fillColor: '' }
      }]
  } else {
    node.items = []
  }

  if (isCompany(node.id)) {
    if (node.data.colorType[0].split('-')[2] === 'target') {
      node.fillColor = 'rgba(0, 80, 255, 1)'
      node.lineColor = 'rgba(0, 80, 255, 0.5)'
      node.lineWidth = '20'
    } else if (node.data.colorType[0].split('-')[2] == 'gd') {
      node.display = 'image'
      node.image = '/static/images/gd.png'
    } else if (node.data.colorType[0].split('-')[2] == 'dwtz') {
      node.fillColor = '#0AADFF'
    } else {
      node.fillColor = '#0AADFF'
    }
  } else {
    if (node.data.colorType[0].split('-')[2] == 'gd') {
      node.display = 'image'
      node.image =  '/static/images/gd.png'
    } else if (node.data.colorType[0].split('-')[2] == 'djg' && node.data.level == '2') {
      node.display = 'image'
      node.image =  '/static/images/rz.png'
    } else if (node.data.colorType[0].split('-')[2] == 'djg') {
      node.display = 'image'
      node.image =  '/static/images/djg.png'
    } else {
      node.fillColor = '#0AADFF'
    }
  }

  if (isHover) {
    if (pathIdsHover[node.id]) {
      // node item
      node.items = [
        {
          text: node.id,
          aspectRatio: 0, // force single line
          px: 0, py: -1, x: 0, y: -12,
          textStyle: { fillColor: '#444', font: '16px Arial' },
          backgroundStyle: { fillColor: '' }
        }]
    } else {
      if (isShowItem) {
        node.items = [
          {
            text: node.id,
            aspectRatio: 0, // force single line
            px: 0, py: -1, x: 0, y: -5,
            textStyle: { fillColor: '#444', font: '16px Arial' },
            backgroundStyle: { fillColor: '' }
          }]
      } else {
        node.items = []
      }
      // node.fillColor = "#9E9E9E";
      // node.lable = "";
    }
    if (!node.dataLinks || node.dataLinks.length == 0) {
      node.radius = 0
      node.label = ''
      node.items = []
    }
  }
}

function linkStyle(link) {
  if (link.data.flag === 'position') {
    link.fillColor = '#0eacb1'
    link.lineDash = [5, 5]
  } else if (link.data.flag === 'inv') {
    link.fillColor = '#3b9df4'
    link.toDecoration = 'arrow'
  }

  if (isShowOnes) {
    if (link.data.from == focusNodeid || link.data.to == focusNodeid) {
      link.radius += 2
    } else {
      link.fillColor = '#ccc'
      link.radius = 1
    }
  }
}

function changeHoverNode(node) {
  isHover = !0
  var links = node.links
  pathIdsHover[node.id] = true
  for (var i = 0; i < links.length; i++) {
    var link = links[i]
    pathIdsHover[link.id] = true
    pathIdsHover[link.otherEnd(node).id] = true
  }
  chart.updateStyle()
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
    var subjectString = this.toString()
    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
      position = subjectString.length
    }
    position -= searchString.length
    var lastIndex = subjectString.indexOf(searchString, position)
    return lastIndex !== -1 && lastIndex === position
  }
}

function isGufen(id) {
  if (id.indexOf('股') == -1) {
    return false
  }
  for (var i = 0, length = gufenFilterTwo.length; i < length; i++) {
    if (id.indexOf(gufenFilterTwo[i]) > -1) {
      return true
    }
  }
  return false
}

function isNotCompany(id) {
  for (var i = 0, lengthException2 = companyFilterException2.length; i < lengthException2; i++) {
    if (id.indexOf(companyFilterException2[i]) > -1) {
      return true
    }
  }
  for (var i = 0, lengthException2 = gufenFilterTwo.length; i < lengthException2; i++) {
    if (id.indexOf(gufenFilterTwo[i]) > -1) {
      return true
    }
  }
  return false
}

// 显示层级筛选
function isCengshu(node, n) {
  if (node.level <= n || node.level == undefined) return true
  return false
}

// 经营状态筛选
function isStatus(node, arr) {
  if (node.type[0] == 'target') return true
  if (arr.length == 2) return true
  var status = node.entStatus || node.enterpriseStatus
  if (status != '吊销' && status != '注销') return true
  if (arr.indexOf(status) > -1) return true
  return false
}

// 投资类型筛选
function isTouzi(node, arr) {
  if (arr.length == 0) return true
  if (node.flag[0] == 'target') return true
  if (arr.indexOf('gdtz') > -1 && data.touzis.gdtz.indexOf(node.id) > -1) return true
  if (arr.indexOf('djgtz') > -1 && data.touzis.djgtz.indexOf(node.id) > -1) return true
  if (arr.indexOf('dwtz') > -1 && data.touzis.dwtz.indexOf(node.id) > -1) return true
  return false
}

// 投资比例筛选
function isBili(node, n) {
  if (node.type[0] == 'target') return true
  if (node.flag.indexOf('position') > -1) return true
  var share = node.fundedRatio || node.share
  if (!share) {
    for (var i = 0; i < node.belong2.length; i++) {
      if (node.type[i] == 'gd') {
        share = node.belong2[i].split('-')[1]
      }
    }
  }
  if (!share) share = '100%'
  if (parseFloat(share) > n) return true

  return false
}

// 定义数组中是否存在某元素
function updateSearchList() {
  searchListSX = []
  availableTags = []
  for (var i = 0, length = searchListOk.length; i < length; i++) {
    if (searchListOk[i].level > chooseState[0]) break

    if (!isStatus(searchListOk[i], chooseState[1])) continue
    if (!isBili(searchListOk[i], chooseState[3])) continue
    if (!isTouzi(searchListOk[i], chooseState[2])) continue
    searchListSX.push(searchListOk[i])
    availableTags.push(searchListOk[i].id)
  }
  if (chooseState[3] > 0) {
    setTimeout(function() {
      for (var i = 0; i < searchListSX.length; i++) {
        if (!chart.getNode(searchListSX[i].id)) continue
        var l = chart.getNode(searchListSX[i].id).links.length
        if (l == 0 && searchListSX[i].id != searchListSX[i].enterpriseName) {
          searchListSX.splice(i, 1)
          availableTags.splice(i, 1)
          i--
        }
      }
    }, 1000)
  } else {
  }
  // 每次筛选，都要重新加载搜索列表页
  setTimeout(function() {
    findOne()
  }, 1000)
}

// 页面加载完成后，延迟200执行搜索列表页加载函数

// 计算筛选节点的一度关联关系
function findOne() {
  // 重置仓库
  DetailInfo = []
  // 遍历所有节点
  for (var i = 0, length = searchListSX.length; i < length; i++) {
    // 给对于仓库，加入初始化数值
    DetailInfo[searchListSX[i].id] = {}
    DetailInfo[searchListSX[i].id].gdnum = 0
    DetailInfo[searchListSX[i].id].djgnum = 0
    DetailInfo[searchListSX[i].id].tzentnum = 0
    DetailInfo[searchListSX[i].id].rzentnum = 0
    DetailInfo[searchListSX[i].id].data = []
    var _node = chart.getNode(searchListSX[i].id)
    if (!_node) continue
    var _links = _node.links
    var type = itemType(searchListSX[i].type)
    // 已不同的节点类型，分类处理
    if (isCompany(searchListSX[i].id)) {
      var otherNodeIdCar = []
      for (var j = 0; j < _links.length; j++) {
        var _other = _links[j].otherEnd(_node)
        var _otherdata = _other.data
        if (otherNodeIdCar.indexOf(_otherdata.id) > -1) {
          if (_links[j].data.id.split('-')[1] == 'inv') {
            if (_links[j].data.id.split('-')[2] == searchListSX[i].id) {
              _otherdata.type2.push('gd')
              _otherdata.share2 = _links[j].data.share || '--'
              DetailInfo[searchListSX[i].id].gdnum += 1
              DetailInfo[searchListSX[i].id].data[_otherdata.id] = $.extend(true, {}, _otherdata)
            } else {
              DetailInfo[searchListSX[i].id].tzentnum += 1
              _otherdata.type2.push('tzent')
              _otherdata.share2 = _links[j].data.share || '--'
              DetailInfo[searchListSX[i].id].data[_otherdata.id] = $.extend(true, {}, _otherdata)
            }
          } else {
            DetailInfo[searchListSX[i].id].djgnum += 1
            _otherdata.type2.push('djg')
            _otherdata.position = findItsPositon(_otherdata.id, searchListSX[i]) || findItsPositon(searchListSX[i].id, _otherdata) || '暂无信息'
            DetailInfo[searchListSX[i].id].data[_otherdata.id] = $.extend(true, {}, _otherdata)
          }
        } else {
          otherNodeIdCar.push(_otherdata.id)
          if (_links[j].data.id.split('-')[1] == 'inv') {
            if (_links[j].data.id.split('-')[2] == searchListSX[i].id) {
              _otherdata.type2 = ['gd']
              _otherdata.share2 = _links[j].data.share || '--'
              DetailInfo[searchListSX[i].id].gdnum += 1
              DetailInfo[searchListSX[i].id].data[_otherdata.id] = $.extend(true, {}, _otherdata)
            } else {
              DetailInfo[searchListSX[i].id].tzentnum += 1
              _otherdata.type2 = ['tzent']
              _otherdata.share2 = _links[j].data.share || '--'
              DetailInfo[searchListSX[i].id].data[_otherdata.id] = $.extend(true, {}, _otherdata)
            }
          } else {
            DetailInfo[searchListSX[i].id].djgnum += 1
            _otherdata.type2 = ['djg']
            _otherdata.position = findItsPositon(_otherdata.id, searchListSX[i]) || findItsPositon(searchListSX[i].id, _otherdata) || '暂无信息'
            DetailInfo[searchListSX[i].id].data[_otherdata.id] = $.extend(true, {}, _otherdata)
          }
        }
      }
    } else {
      var otherNodeIdCar = []
      for (var j = 0; j < _links.length; j++) {
        var _other = _links[j].otherEnd(_node)
        var _otherdata = _other.data
        if (!otherNodeIdCar.indexOf(_otherdata.id) > -1) {
          otherNodeIdCar.push(_otherdata.id)
          if (_links[j].data.id.split('-')[1] == 'inv') {
            DetailInfo[searchListSX[i].id].tzentnum += 1
            _otherdata.type2 = ['tzent']
            _otherdata.share2 = _links[j].data.share || '--'
            DetailInfo[searchListSX[i].id].data[_otherdata.id] = $.extend(true, {}, _otherdata)
          } else {
            DetailInfo[searchListSX[i].id].rzentnum += 1
            _otherdata.type2 = ['rzent']
            _otherdata.position = findItsPositon(_otherdata.id, searchListSX[i]) || findItsPositon(searchListSX[i].id, _otherdata) || '暂无信息'
            DetailInfo[searchListSX[i].id].data[_otherdata.id] = $.extend(true, {}, _otherdata)
          }
        } else {
          if (_links[j].data.id.split('-')[1] == 'inv') {
            DetailInfo[searchListSX[i].id].tzentnum += 1
            _otherdata.type2.push('tzent')
            _otherdata.share2 = _links[j].data.share || '--'
            DetailInfo[searchListSX[i].id].data[_otherdata.id] = $.extend(true, {}, _otherdata)
          } else {
            DetailInfo[searchListSX[i].id].rzentnum += 1
            _otherdata.type2.push('rzent')
            _otherdata.position = findItsPositon(_otherdata.id, searchListSX[i]) || findItsPositon(searchListSX[i].id, _otherdata) || '暂无信息'
            DetailInfo[searchListSX[i].id].data[_otherdata.id] = $.extend(true, {}, _otherdata)
          }
        }
      }
    }
  }
}

// 传入id和另一方data，返回任职关系
function findItsPositon(id, data) {
  var position = []
  if (id == data.frName || id == data.name) position.push('法人')
  for (var i = 0; i < data.belong2.length; i++) {
    if (data.belong2[i].split('-')[0] == id && data.flag[i] == 'position') {
      var _pos = data.belong2[i].split('-')[1]
      if (_pos && !position.indexOf(_pos) > -1) {
        position.push(_pos)
      }
    }
  }
  if (position.length) {
    return position.join('&')
  } else {
    return false
  }
}

// 判断节点类型
function itemType(type) {
  if (type[0] == 'target') return 'target'
  if (type.indexOf('djg') > -1) return 'djg'
  if (type.indexOf('gd') > -1) return 'gd'
  if (type.indexOf('dwtz') > -1) return 'zjtz'
  if (type.indexOf('djgtz') > -1) return 'djgtz'
  if (type.indexOf('djgrz') > -1) return 'djgrz'
}

// 根据关键字显示搜索列表项
function showListOfKeyword(key) {
  $('#tishixinxi').remove()
  if (!key) {
    $('.search-list-li').removeAttr('style')
    return
  }
  var index = 0
  $('.entnameorname').each(function() {
    var _id = $(this).html()
    if (_id.indexOf(key) < 0) {
      $(this).parent().css('display', 'none')
    } else {
      $(this).parent().removeAttr('style')
      index++
    }
  })
  if (!index) {
    var str = '<p id="tishixinxi">没有找到匹配的企业，请根据搜索提示重新搜索！<a>返回</a></p>'
    $('.search-list-ol').append($(str))
    $('#tishixinxi').off('click').on('click', function() {
      showListOfKeyword(false)
    })
  } else {
    var str = '<p id="tishixinxi">共找到' + index + '家匹配的企业，重新搜索请点击<a>返回</a>或直接在搜索框输入企业、个人名称</p>'
    $('.search-list-ol').append($(str))
    $('#tishixinxi').off('click').on('click', function() {
      showListOfKeyword(false)
    })
  }
}

// 高亮某节点及其一度关系
function highLightOnes(id) {
  isHighlight = !1
  if (!chart.getNode(id)) {
    if (isShowOnes) {
      isShowOnes = false
      chart.updateStyle()
    }
    $('.msg-jujiao').css('display', 'block')
    setTimeout(function() {
      $('.msg-jujiao').removeAttr('style')
    }, 2000)
    $('#btn1-1').html('聚焦')
    return
  }
  focusNodesone = []
  for (var i in DetailInfo[id].data) {
    focusNodesone.push(i)
  }
  isShowOnes = true
  chart.updateStyle()
  $('#btn1-1').html('取消')
}

function conver_tree(tree) {
  var data = {}
  var nodes = []
  var links = []
  var collection = {}

  // 股东列表
  var shareholderList = []
  // 主要人员列表
  var personList = []
  var touziContainer = { 'dwtz': [], 'gdtz': [], 'djgtz': [] }

  // target  目标企业
  var root = tree.basicList[0]
  root.id = root.entName
  root.flag = ['target']
  root.belong = ['target']
  root.belong2 = ['target-target']
  root.position = ['目标企业']
  root.type = ['target']
  root.level = 0
  root.colorType = ['0-0-target']
  collection[root.id] = root    // +
  touziContainer.dwtz.push(root.id)
  touziContainer.gdtz.push(root.id)
  touziContainer.djgtz.push(root.id)

  // fr   ---- 法人
  var fr = {}
  fr.id = root.frName
  fr.flag = ['position']
  fr.belong = [root.id]
  fr.belong2 = [root.id + '-法人']
  collection[root.id].djgnum += 1
  fr.position = ['法人']
  fr.level = 1
  fr.type = ['djg']
  fr.colorType = ['1-2-djg']
  collection[fr.id] = fr
  collection[fr.id].rzentnum += 1

  // dwtz -- 企业对外投资
  // entInvSubMap  ---- 孙公司
  for (var i = 0; i < tree.entinvItemList.length; i++) {
    var entinvNode = $.extend({}, tree.entinvItemList[i])
    entinvNode.id = entinvNode.entName
    if (!entinvNode.id) continue
    if (collection[entinvNode.id]) {
      collection[entinvNode.id].flag.push('inv')
      collection[entinvNode.id].belong.push(root.id)
      collection[entinvNode.id].belong2.push(root.id + '-' + entinvNode.fundedRatio)
      collection[entinvNode.id].position.push('投资')
      collection[entinvNode.id].type.push('dwtz')
      collection[entinvNode.id].level = 1
      collection[entinvNode.id].colorType.push('1-3-dwtz')
    } else {
      entinvNode.flag = ['inv']
      entinvNode.belong = [root.id]
      entinvNode.belong2 = [root.id + '-' + entinvNode.fundedRatio]
      entinvNode.position = ['投资']
      entinvNode.type = ['dwtz']
      entinvNode.level = 1
      entinvNode.colorType = ['1-3-dwtz']
      collection[entinvNode.id] = entinvNode
    }
    touziContainer.dwtz.push(entinvNode.id)
    if (!touziContainer.dwtz.indexOf(root.id) > -1) touziContainer.dwtz.push(root.id)
    // 孙公司
    if (!tree.entInvSubMap) tree.entInvSubMap = []
    if (tree.entInvSubMap[entinvNode.id]) {
      var entInvSubList = tree.entInvSubMap[entinvNode.id]
      for (var j = 0; j < entInvSubList.length; j++) {
        var entInvSubNode = $.extend({}, entInvSubList[j])
        entInvSubNode.id = entInvSubNode.entName
        if (!entInvSubNode.id) continue
        if (collection[entInvSubNode.id]) {
          collection[entInvSubNode.id].belong.push(entinvNode.id)
          collection[entInvSubNode.id].belong2.push(entinvNode.id + '-' + entInvSubNode.fundedRatio)
          collection[entInvSubNode.id].flag.push('inv')
          collection[entInvSubNode.id].position.push('投资')
          collection[entInvSubNode.id].type.push('dwtz')
          if (collection[entInvSubNode.id].level > 2) {
            collection[entInvSubNode.id].level = 2
          }
          collection[entInvSubNode.id].colorType.push('2-3-dwtz')
        } else {
          entInvSubNode.belong = [entinvNode.id]
          entInvSubNode.belong2 = [entinvNode.id + '-' + entInvSubNode.fundedRatio]
          entInvSubNode.flag = ['inv']
          entInvSubNode.position = ['投资']
          entInvSubNode.level = 2
          entInvSubNode.type = ['dwtz']
          entInvSubNode.colorType = ['2-3-dwtz']
          collection[entInvSubNode.id] = entInvSubNode
        }
        if (!touziContainer.dwtz.indexOf(entInvSubNode.id) > -1) touziContainer.dwtz.push(entInvSubNode.id)
      }
    }

    // 对外投资企业的股东
    if (tree.entInvShareMap && tree.entInvShareMap[entinvNode.id]) {
      var entInvShareList = tree.entInvShareMap[entinvNode.id]
      for (var j = 0; j < entInvShareList.length; j++) {
        var entInvShareNode = $.extend({}, entInvShareList[j])
        // 如果子公司股东的投资比例没有，则取股东投资子公司投资比例
        if (!entInvShareNode.fundedRatio) {
          entInvShareNode.fundedRatio = entinvNode.fundedRatio
        }
        entInvShareNode.id = entInvShareNode.shareholderName
        if (!entInvShareNode.id) continue
        if (isGufen(entInvShareNode.id)) entInvShareNode.id += '_' + entinvNode.id
        if (entInvShareNode.id !== fr.id && personList.indexOf(entInvShareNode.id) === -1 && shareholderList.indexOf(entInvShareNode.id) === -1) {
          if (collection[entInvShareNode.id]) {
            if (collection[entInvShareNode.id].level > 2) {
              collection[entInvShareNode.id].level = 2
            }
            collection[entInvShareNode.id].type.push('gd')
            collection[entInvShareNode.id].belong.push(entinvNode.id)
            collection[entInvShareNode.id].belong2.push(entinvNode.id + '-' + entInvShareNode.fundedRatio)
            collection[entInvShareNode.id].flag.push('inv')
            collection[entInvShareNode.id].colorType.push('2-1-gd')
            collection[entInvShareNode.id].position.push('投资')
          } else {
            entInvShareNode.belong = [entinvNode.id]
            entInvShareNode.belong2 = [entinvNode.id + '-' + entInvShareNode.fundedRatio]
            entInvShareNode.flag = ['inv']
            entInvShareNode.position = ['投资']
            entInvShareNode.level = 2
            entInvShareNode.type = ['gd']
            entInvShareNode.colorType = ['2-1-gd']
            collection[entInvShareNode.id] = entInvShareNode
          }
        }
      }
    }
    // 对外投资企业的任职
    if (tree.entInvPersonMap && tree.entInvPersonMap[entinvNode.id]) {
      var entInvPersonList = tree.entInvPersonMap[entinvNode.id]
      for (var n = 0; n < entInvPersonList.length; n++) {
        var entInvPersonNode = $.extend({}, entInvPersonList[n])
        entInvPersonNode.id = entInvPersonNode.name
        if (!entInvPersonNode.id) continue
        if (entInvPersonNode.id !== fr.id && personList.indexOf(entInvPersonNode.id) === -1 && shareholderList.indexOf(entInvPersonNode.id) === -1) {
          if (collection[entInvPersonNode.id]) {
            var eip = collection[entInvPersonNode.id]
            if (eip.level > 2) {
              eip.level = 2
            }
            var firstIndex = eip.belong.indexOf(entInvPersonNode.id)
            var lastIndex = eip.belong.lastIndexOf(entInvPersonNode.id)
            // if(firstIndex !== -1){
            if (false) {
              if (firstIndex === lastIndex) {
                if (eip.flag[firstIndex] === 'djg') {
                  eip.position[firstIndex].indexOf(entInvPersonNode.position) > -1 ? '' : (eip.position[firstIndex] += ('&' + entInvPersonNode.position))
                } else {
                  eip.flag.push('position')
                  eip.type.push('djg')
                  eip.colorType.push('2-4-position')
                  eip.belong.push(entinvNode.id)
                  eip.belong2.push(entinvNode.id + '-' + entInvPersonNode.position)
                  eip.position.push(entInvPersonNode.position)
                }
              } else {
                if (eip.flag[firstIndex] === 'djg') {
                  eip.position[firstIndex] += ('&' + entInvPersonNode.position)
                }
                if (eip.flag[lastIndex] === 'djg') {
                  eip.position[lastIndex] += ('&' + entInvPersonNode.position)
                }
              }
            } else {
              eip.flag.push('position')
              eip.type.push('djg')
              eip.colorType.push('2-4-position')
              eip.belong.push(entinvNode.id)
              eip.belong2.push(entinvNode.id + '-' + entInvPersonNode.position)
              eip.position.push(entInvPersonNode.position)
            }
          } else {
            entInvPersonNode.belong = [entinvNode.id]
            entInvPersonNode.belong2 = [entinvNode.id + '-' + entInvPersonNode.position]
            entInvPersonNode.flag = ['position']
            entInvPersonNode.position = [entInvPersonNode.position]
            entInvPersonNode.level = 2
            entInvPersonNode.type = ['djg']
            entInvPersonNode.colorType = ['2-4-position']
            collection[entInvPersonNode.id] = entInvPersonNode
          }
        }
      }
    }
  }

  // gd   shareHolderList 股东
  for (var i = 0; i < tree.shareHolderList.length; i++) {
    var shareHolderNode = $.extend({}, tree.shareHolderList[i])
    shareHolderNode.id = shareHolderNode.shareholderName
    if (!shareHolderNode.id) continue
    shareholderList.push(shareHolderNode.id)
    if (isGufen(shareHolderNode.id)) shareHolderNode.id += '_' + root.id
    if (collection[shareHolderNode.id]) {
      var shn = collection[shareHolderNode.id]
      if (shn.level > 1) {
        shn.level = 1
      }
      if (shn.flag.indexOf('gd') !== -1) {
        shn.position[shn.flag.indexOf('gd')] += '&股东'
      } else {
        shn.flag.push('inv')
        shn.type.push('gd')
        shn.position.push('投资')
        shn.colorType.push('1-1-gd')
        shn.belong.push(root.id)
        shn.belong2.push(root.id + '-' + shareHolderNode.fundedRatio)
      }
    } else {
      shareHolderNode.belong = [root.id]
      shareHolderNode.belong2 = [root.id + '-' + shareHolderNode.fundedRatio]
      shareHolderNode.flag = ['inv']
      shareHolderNode.position = ['投资']
      shareHolderNode.level = 1
      shareHolderNode.type = ['gd']
      shareHolderNode.colorType = ['1-1-gd']
      collection[shareHolderNode.id] = shareHolderNode
    }
    if (!touziContainer.gdtz.indexOf(shareHolderNode.id) > -1) touziContainer.gdtz.push(shareHolderNode.id)
    if (shareHolderNode.id == fr.id && touziContainer.djgtz.indexOf(shareHolderNode.id) > -1) touziContainer.djgtz.push(shareHolderNode.id)
    // shareInvMap  股东对外投资
    var shareInvList = tree.shareInvMap[shareHolderNode.id]
    if (shareInvList) {
      for (var j = 0; j < shareInvList.length; j++) {
        var shareInvNode = $.extend({}, shareInvList[j])
        shareInvNode.id = shareInvNode.entName
        if (!shareInvNode.id) continue
        if (shareInvNode.id !== root.id) {
          if (collection[shareInvNode.id]) {
            if (collection[shareInvNode.id].level > 2) {
              collection[shareInvNode.id].level = 2
            }
            collection[shareInvNode.id].type.push('dwtz')
            collection[shareInvNode.id].flag.push('inv')
            collection[shareInvNode.id].belong.push(shareHolderNode.id)
            collection[shareInvNode.id].belong2.push(shareHolderNode.id + '-' + shareInvNode.fundedRatio)
            collection[shareInvNode.id].position.push('投资')
            collection[shareInvNode.id].colorType.push('2-3-dwtz')
          } else {
            shareInvNode.belong = [shareHolderNode.id]
            shareInvNode.belong2 = [shareHolderNode.id + '-' + shareInvNode.fundedRatio]
            shareInvNode.flag = ['inv']
            shareInvNode.position = ['投资']
            shareInvNode.level = 2
            shareInvNode.type = ['dwtz']
            shareInvNode.colorType = ['2-3-dwtz']
            collection[shareInvNode.id] = shareInvNode
          }
          if (!touziContainer.gdtz.indexOf(shareInvNode.id) > -1) touziContainer.gdtz.push(shareInvNode.id)
        }
      }
    }

    // sharePostionMap  股东对外任职
    var sharePostionList = tree.sharePostionMap[shareHolderNode.id]
    if (sharePostionList) {
      for (var j = 0; j < sharePostionList.length; j++) {
        var sharePositionNode = $.extend({}, sharePostionList[j])
        sharePositionNode.id = sharePositionNode.entName
        if (!sharePositionNode.id) continue
        if (collection[sharePositionNode.id]) {
          var spn = collection[sharePositionNode.id]
          var firstIndex = spn.belong.indexOf(shareHolderNode.id)
          var lastIndex = spn.belong.lastIndexOf(shareHolderNode.id)
          if (spn.level > 2) {
            spn.level = 2
          }
          spn.flag.push('position')
          spn.type.push('djgrz')
          spn.colorType.push('2-4-position')
          spn.belong.push(shareHolderNode.id)
          spn.belong2.push(shareHolderNode.id + '-' + sharePositionNode.position)
          spn.position.push(sharePositionNode.position)
        } else {
          sharePositionNode.belong = [shareHolderNode.id]
          sharePositionNode.belong2 = [shareHolderNode.id + '-' + sharePositionNode.position]
          collection[shareHolderNode.id].rzentnum += 1
          sharePositionNode.flag = ['position']
          sharePositionNode.position = [sharePositionNode.position]
          sharePositionNode.level = 2
          sharePositionNode.type = ['djgrz']
          sharePositionNode.colorType = ['2-4-position']
          collection[sharePositionNode.id] = sharePositionNode
        }
      }
    }

    // 企业股东的股东信息   entShareInvMap
    var entShareInvList = tree.entShareInvMap && tree.entShareInvMap[shareHolderNode.id]
    if (entShareInvList) {
      for (var j = 0; j < entShareInvList.length; j++) {
        var entShareInvNode = $.extend({}, entShareInvList[j])
        entShareInvNode.id = entShareInvNode.shareholderName
        if (!entShareInvNode.id) continue
        if (isGufen(entShareInvNode.id)) entShareInvNode.id += '_' + shareHolderNode.id
        if (entShareInvNode.id !== fr.id && personList.indexOf(entShareInvNode.id) === -1 && shareholderList.indexOf(entShareInvNode.id) === -1) {
          if (collection[entShareInvNode.id]) {
            if (collection[entShareInvNode.id].level > 2) {
              collection[entShareInvNode.id].level = 2
            }
            collection[entShareInvNode.id].type.push('gd')
            collection[entShareInvNode.id].flag.push('inv')
            collection[entShareInvNode.id].colorType.push('2-1-gd')
            collection[entShareInvNode.id].belong.push(shareHolderNode.id)
            collection[entShareInvNode.id].belong2.push(shareHolderNode.id + '-' + entShareInvNode.fundedRatio)
            collection[entShareInvNode.id].position.push('投资')
          } else {
            entShareInvNode.flag = ['inv']
            entShareInvNode.belong = [shareHolderNode.id]
            entShareInvNode.belong2 = [shareHolderNode.id + '-' + entShareInvNode.fundedRatio]
            entShareInvNode.position = ['投资']
            entShareInvNode.level = 2
            entShareInvNode.type = ['gd']
            entShareInvNode.colorType = ['2-1-gd']
            collection[entShareInvNode.id] = entShareInvNode
          }
        }
      }
    }

    // 企业股东的人员信息 entSharePersonMap
    var entSharePersonList = tree.entSharePersonMap && tree.entSharePersonMap[shareHolderNode.id]
    if (entSharePersonList) {
      for (var j = 0; j < entSharePersonList.length; j++) {
        var entSharePersonNode = $.extend({}, entSharePersonList[j])
        entSharePersonNode.id = entSharePersonNode.name
        if (!entSharePersonNode.id) continue
        if (entSharePersonNode.id !== fr.id && personList.indexOf(entSharePersonNode.id) === -1 && shareholderList.indexOf(entSharePersonNode.id) === -1) {
          if (collection[entSharePersonNode.id]) {
            var esp = collection[entSharePersonNode.id]
            if (esp.level > 2) {
              esp.level = 2
            }
            esp.flag.push('position')
            esp.type.push('djg')
            esp.colorType.push('2-2-djg')
            esp.belong.push(shareHolderNode.id)
            esp.belong2.push(shareHolderNode.id + '-' + entSharePersonNode.position)
            esp.position.push(entSharePersonNode.position)
          } else {
            entSharePersonNode.belong = [shareHolderNode.id]
            entSharePersonNode.belong2 = [shareHolderNode.id + '-' + entSharePersonNode.position]
            entSharePersonNode.flag = ['position']
            entSharePersonNode.position = [entSharePersonNode.position]
            entSharePersonNode.level = 2
            entSharePersonNode.type = ['djg']
            entSharePersonNode.colorType = ['2-2-djg']
            collection[entSharePersonNode.id] = entSharePersonNode
          }
        }
      }
    }
  }

  // frinv   法人对外投资
  for (var i = 0; i < tree.frinvList.length; i++) {
    var frinvNode = $.extend({}, tree.frinvList[i])
    frinvNode.id = frinvNode.entName
    if (!frinvNode.id) continue
    if (collection[frinvNode.id]) {
      if (collection[frinvNode.id] > 2) {
        collection[frinvNode.id].level = 2
      }
      collection[frinvNode.id].type.push('djgtz')
      collection[frinvNode.id].flag.push('inv')
      collection[frinvNode.id].colorType.push('2-3-dwtz')
      collection[frinvNode.id].belong.push(fr.id)
      collection[frinvNode.id].belong2.push(fr.id + '-' + frinvNode.fundedRatio)
      collection[frinvNode.id].position.push('投资')
    } else {
      frinvNode.flag = ['inv']
      frinvNode.belong = [fr.id]
      frinvNode.belong2 = [fr.id + '-' + frinvNode.fundedRatio]
      frinvNode.position = ['投资']
      frinvNode.level = 2
      frinvNode.type = ['djgtz']
      frinvNode.colorType = ['2-3-dwtz']
      collection[frinvNode.id] = frinvNode
    }
    if (!touziContainer.djgtz.indexOf(frinvNode.id) > -1) touziContainer.djgtz.push(frinvNode.id)
    if (!touziContainer.djgtz.indexOf(fr.id) > -1) touziContainer.djgtz.push(fr.id)
    for (var s = 0; s < tree.shareHolderList.length; s++) {
      if (tree.shareHolderList[s].shareholderName == fr.id) {
        if (!touziContainer.gdtz.indexOf(frinvNode.id) > -1) touziContainer.gdtz.push(frinvNode.id)
        if (!touziContainer.gdtz.indexOf(fr.id) > -1) touziContainer.gdtz.push(fr.id)
      }
    }
  }

  // frPosition   法人对外任职
  for (var i = 0; i < tree.frPositionList.length; i++) {
    var frPositionNode = $.extend({}, tree.frPositionList[i])
    frPositionNode.id = frPositionNode.entName
    if (!frPositionNode.id) continue
    if (collection[frPositionNode.id]) {
      var frn = collection[frPositionNode.id]

      if (frn.lever > 2) {
        frn.level = 2
      }
      frn.flag.push('position')
      frn.type.push('djgrz')
      frn.colorType.push('2-4-position')
      frn.belong.push(fr.id)
      frn.belong2.push(fr.id + '-' + frPositionNode.position)
      frn.position.push(frPositionNode.position)
    } else {
      frPositionNode.flag = ['position']
      frPositionNode.belong = [fr.id]
      frPositionNode.belong2 = [fr.id + '-' + frPositionNode.position]
      frPositionNode.position = [frPositionNode.position]
      frPositionNode.level = 2
      frPositionNode.type = ['djgrz']
      frPositionNode.colorType = ['2-4-position']
      collection[frPositionNode.id] = frPositionNode
    }
  }

  // 股东是企业的信息
  for (var i in tree.shareSelfMap) {
    var shareHolderId = tree.shareSelfMap[i].entName
    if (collection[shareHolderId]) {
      var she = collection[shareHolderId]
      for (var key in tree.shareSelfMap[i]) {
        she[key] = tree.shareSelfMap[i][key]
      }
    }
  }

  // djg   personList   高管任职信息  name  position  sex
  for (var i = 0; i < tree.personList.length; i++) {
    var djgNode = $.extend({}, tree.personList[i])
    djgNode.id = djgNode.name
    if (!djgNode.id) continue
    personList.push(djgNode.id)
    if (collection[djgNode.id]) {
      var djgn = collection[djgNode.id]
      if (djgn.level > 1) djgn.level = 1
      djgn.flag.push('position')
      djgn.type.push('djg')
      djgn.colorType.push('1-2-djg')
      djgn.position.push(djgNode.position)
      djgn.belong.push(root.id)
      djgn.belong2.push(root.id + '-' + djgNode.position)
      djgn.sex = djgNode.sex
    } else {
      djgNode.belong = [root.id]
      djgNode.belong2 = [root.id + '-' + djgNode.position]
      djgNode.flag = ['position']
      djgNode.position = [djgNode.position]
      djgNode.level = 1
      djgNode.type = ['djg']
      djgNode.colorType = ['1-2-djg']
      collection[djgNode.id] = djgNode
    }
    if (!touziContainer.djgtz.indexOf(djgNode.id) > -1) touziContainer.djgtz.push(djgNode.id)
    // personInvMap  主要人员在外投资信息
    var djgInvList = tree.personInvMap[djgNode.id]
    if (djgInvList && djgNode.id !== fr.id && shareholderList.indexOf(djgNode.id) === -1) {
      for (var j = 0; j < djgInvList.length; j++) {
        var djgInvNode = $.extend({}, djgInvList[j])
        djgInvNode.id = djgInvNode.entName
        if (!djgInvNode.id) continue

        if (collection[djgInvNode.id]) {
          if (collection[djgInvNode.id].level > 2) {
            collection[djgInvNode.id].level = 2
          }
          collection[djgInvNode.id].type.push('djgtz')
          collection[djgInvNode.id].flag.push('inv')
          collection[djgInvNode.id].colorType.push('2-3-dwtz')
          collection[djgInvNode.id].belong.push(djgNode.id)
          collection[djgInvNode.id].belong2.push(djgNode.id + '-' + djgInvNode.fundedRatio)
          collection[djgInvNode.id].position.push('投资')
        } else {
          djgInvNode.belong = [djgNode.id]
          djgInvNode.belong2 = [djgNode.id + '-' + djgInvNode.fundedRatio]
          djgInvNode.flag = ['inv']
          djgInvNode.position = ['投资']
          djgInvNode.level = 2
          djgInvNode.type = ['djgtz']
          djgInvNode.colorType = ['2-3-dwtz']
          collection[djgInvNode.id] = djgInvNode
        }
        if (!touziContainer.djgtz.indexOf(djgInvNode.id) > -1) touziContainer.djgtz.push(djgInvNode.id)
      }
    }

    // personPostionMap 主要人员在外任职信息
    var djgPostionList = tree.personPostionMap[djgNode.id]
    var _name = []
    for (var z in djgPostionList) {
      if (_name.indexOf(djgPostionList[z].entName) > -1) {
        djgPostionList.splice(z, 1)
        z--
      }
      _name.push(djgPostionList[z].entName)
    }
    if (djgPostionList && djgNode.id !== fr.id && shareholderList.indexOf(djgNode.id) === -1) {
      for (var j = 0; j < djgPostionList.length; j++) {
        var djgPositionNode = $.extend({}, djgPostionList[j])
        djgPositionNode.id = djgPositionNode.entName
        if (!djgPositionNode.id) continue
        if (collection[djgPositionNode.id]) {
          var dpn = collection[djgPositionNode.id]
          if (dpn.level > 2) {
            dpn.level = 2
          }
          dpn.flag.push('position')
          dpn.type.push('djgrz')
          dpn.colorType.push('2-4-position')
          dpn.belong.push(djgNode.id)
          dpn.belong2.push(djgNode.id + '-' + djgPositionNode.position)
          dpn.position.push(djgPositionNode.position)
        } else {
          djgPositionNode.belong = [djgNode.id]
          djgPositionNode.belong2 = [djgNode.id + '-' + djgPositionNode.position]
          djgPositionNode.flag = ['position']
          djgPositionNode.position = [djgPositionNode.position]
          djgPositionNode.level = 2
          djgPositionNode.type = ['djgrz']
          djgPositionNode.colorType = ['2-4-position']
          collection[djgPositionNode.id] = djgPositionNode
        }
      }
    }
  }

  for (var o in collection) {
    collection[o].colorType.sort()
    nodes.push(collection[o])
  }
  var linkCar = {}
  for (var i = 0; i < nodes.length; i++) {
    var belong2Car = []
    for (var j = 0; j < nodes[i].flag.length; j++) {
      var link = {}
      var flag = nodes[i].flag[j]
      var belong2 = nodes[i].belong2[j]
      var position = nodes[i].position[j]
      var type = nodes[i].type[j]
      if (belong2Car.indexOf(belong2) > -1) {
        nodes[i].flag.splice(j, 1)
        nodes[i].belong2.splice(j, 1)
        nodes[i].belong.splice(j, 1)
        nodes[i].type.splice(j, 1)
        nodes[i].position.splice(j, 1)
        j--
        continue
      }
      belong2Car.push(belong2)

      if (flag !== 'target') {
        var a = nodes[i].id
        var b = nodes[i].belong[j]
        link.flag = flag
        link.type = type
        if (flag !== 'position') {
          link.share = belong2.split('-')[1]
        } else {
          link.position = true
        }
        if (type === 'gd') {
          link.from = a
          link.to = b
        } else {
          link.from = b
          link.to = a
        }
        switch (type) {
          case 'dwtz': {
            link.id = b + '-inv-' + a
            if (!linkCar[link.id]) {
              links.push(link)
              linkCar[link.id] = link.id
            }
            break
          }
          case 'gd': {
            link.id = a + '-inv-' + b
            if (!linkCar[link.id]) {
              links.push(link)
              linkCar[link.id] = link.id
            }
            break
          }
          case 'djg': {
            link.id = a + '-rz-' + b
            if (!linkCar[link.id]) {
              links.push(link)
              linkCar[link.id] = link.id
            }
            break
          }
          case 'djgtz': {
            link.id = b + '-inv-' + a
            if (!linkCar[link.id]) {
              links.push(link)
              linkCar[link.id] = link.id
            }
            break
          }
          case 'djgrz': {
            link.id = b + '-rz-' + a
            if (!linkCar[link.id]) {
              links.push(link)
              linkCar[link.id] = link.id
            }
            break
          }
        }
      }
    }
  }
  data.nodes = nodes
  data.links = links
  data.touzis = touziContainer
  return data
}

export default getEntNameMap
