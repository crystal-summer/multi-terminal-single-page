import { bd09togcj02 } from './coordChange'
export let region = []
let json
export const getMapJson = (chartMap) => { // 初始化地区
  // json = require('./../../../static/plugins/region/haiyan.json');

  new echarts.registerMap('haiyan', json)

  region = json['features'].map(v => { return { name: v.properties.name, code: v.id } }).reverse()

  mapSelectWithDataIndex(chartMap)
}

export const mapSelectWithDataIndex = (chartMap, selectIndex) => {
  let temp = region.map(v => {
    return {
      name: v.name,
      value: 100
    }
  })
  chartMap.setOption({
    series: [
      {
        itemStyle: {
          normal: {
            areaColor: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(45, 185, 255, 0.81)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(0, 111, 223, 1)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            },
            borderColor: 'rgba(255,255,255,1)',
            borderWidth: 1.5,
            borderType: 'solid'
          },
          emphasis: {
            areaColor: 'rgba(110, 151, 50, .85)',
            borderColor: '#47F7FF',
            borderWidth: 1.5,
            borderType: 'solid'
          }
        },
        type: 'map',
        map: 'haiyan',
        data: temp,
        label: {
          normal: {
            show: true,
            color: '#fff'
          },
          emphasis: {
            show: true,
            color: '#fff'
          }
        }
      }],
    geo: {
      map: 'haiyan'
    }
  })

  if (selectIndex === 0 || selectIndex > 0) {
    chartMap.dispatchAction({
      type: 'mapSelect',
      seriesIndex: 0,
      dataIndex: selectIndex
    })
  }
}

export const initMap = function(chartMap, id, isHot = false) {
  chartMap = echarts.init(document.getElementById(id))
  if (isHot) {
    chartMap.setOption(mapOption)
  }
  getMapJson(chartMap)
  chartMap.setOption({
    series: [{
      itemStyle: {
        emphasis: {
          areaColor: '#1c91ff'
        }
      }
    }]
  })
  window.addEventListener('resize', function(e) {
    chartMap.resize()
  })
  return chartMap
}

export const mapOption = {
  tooltip: {
    show: true,
    trigger: 'item'
  },
  visualMap: {
    min: 100,
    max: 250,
    right: '5%',
    bottom: '5%',
    text: ['指标高', '指标低'],
    seriesIndex: [0],
    inRange: {
      color: ['#0071FF', '#49A4FF', '#9DE0FF', '#FFE091', '#FFBE15', '#FF6600']
    },
    calculable: true,
    realtime: false,
    textStyle: {
      color: '#fff',
      fontSize: 12,
      fontFamily: 'PingFangSC-Semibold'
    },
    padding: 5
  },
  geo: {
    map: 'haiyan',
    label: {
      normal: {
        show: true,
        textStyle: {
          color: '#fff'
        }
      }
    },
    itemStyle: {
      normal: {
        borderColor: '#fff'
      },
      emphasis: {
        areaColor: null,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 20,
        borderWidth: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  },
  series: [
    {
      itemStyle: {
        normal: {
          areaColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(45, 185, 255, 0.81)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(0, 111, 223, 1)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
          borderColor: 'rgba(255,255,255,1)',
          borderWidth: 1.5,
          borderType: 'solid'
        },
        emphasis: {
          areaColor: '#1c91ff',
          borderColor: '#00FFFF',
          borderWidth: 2,
          borderType: 'solid'
        }
      },
      type: 'map',
      map: 'haiyan',
      name: '',
      data: [],
      label: {
        normal: {
          show: true,
          color: '#fff'
        },
        emphasis: {
          show: true,
          color: '#fff'
        }
      }
    }
  ]
}

// 地图对象
let amap = {}
// 海盐乡镇polygons覆盖物 polylines覆盖物四周折线
let polygons = []; let  polylines = []
// 海盐街道经纬度
// let regionJson = require('./../../../static/plugins/region/haiyan1.json');
import { regionJson } from '../../../static/region/amap.liandu'

/**
 *将百度地图转为高德地图
*/
var x_pi = 3.14159265358979324 * 3000.0 / 180.0
function baiduTomars(baidu_point) {
  // var mars_point={lng:0,lat:0};
  // var x=baidu_point.lng-0.0065;
  // var y=baidu_point.lat-0.006;
  // var z=Math.sqrt(x*x+y*y)- 0.00002 * Math.sin(y * x_pi);
  // var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  // baidu_point.lng=z * Math.cos(theta);
  // baidu_point.lat=z * Math.sin(theta);

  var x = baidu_point[0] - 0.0065
  var y = baidu_point[1] - 0.006
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
  baidu_point[0] = z * Math.cos(theta)
  baidu_point[1] = z * Math.sin(theta)
  // return mars_point;
}

// let c= [[120.854762,30.532706],[120.869869,30.395396],[120.9248,30.454605],[120.94128,30.590649],[121.015145,30.604997],[120.841716,30.588876],[120.777172,30.567003],[120.838283,30.473545],[120.934413,30.530932]]
// c.map(cu=>{
//     baiduTomars(cu);
// })
// console.log(JSON.stringify(c))

/**
 * 初始化地图
*/
export  let  initAmap = function(id) {
  amap = new AMap.Map(id, {
    resizeEnable: true,
    center: [120.138852, 28.141072], // 中心点坐标
    mapStyle: "amap://styles/d5364a675861fbc8e08d91b93773a5d5",
    viewMode: "3D",
    zoom: 11,
    pitch: 50
  });
  return amap
}
/*
    初始化钉钉端地图
 */
export let initAmapH5 = function(id) {
  amap = new AMap.Map(id, {
    resizeEnable: true,
    center: [119.891, 28.4299], // 中心点坐标
    mapStyle: 'amap://styles/d5364a675861fbc8e08d91b93773a5d5',
    zoom: 10
  })
  return amap
}

/**
 * 渲染海盐城镇区域
 */
export let rendPolygon = () => {
  polygons = []
  regionJson['districts'].map((cu, index) => {
    if (cu.name !== '南明山街道') {
      // console.log(cu)
      // console.log(JSON.parse(cu.polyline))
      let arr = JSON.parse(cu.polyline).map(v => {
        // return bd09togcj02(v[1],v[0])
        return v.reverse()
      })

      // console.log(arr)
      // 生成行政区划polygon
      var polygon = new AMap.Polygon({
        path: arr,
        fillColor: 'rgba(130, 206, 255, 0.75)',
        cursor: 'pointer',
        strokeColor: '#023049',
        strokeOpacity: 1,
        strokeWeight: 4,
        extData: {
          town: cu.name,
          center: cu.center
        },
        zIndex: 10
      })
      polygons.push(polygon)
    }
  })
  amap.add(polygons)
  return polygons
}

/**
 * 渲染城市名
 */
export let rendCityName = function() {
  let textLayer = new AMap.LabelsLayer({
    rejectMapMask: true,
    // 标注避让
    collision: true,
    // 开启标注淡入动画
    animation: true,
    zIndex: 120
  })
  amap.add(textLayer)
  regionJson.districts.forEach(item => {
    let labelsMarker = new AMap.LabelMarker({
      zooms: [3, 20],
      position: item.center,
      text: {
        content: item.name,
        style: {
          fillColor: 'white',
          fontWeight: 'normal',
          fontSize: 14,
          zooms: [3, 20]
        }
      }
    })
    textLayer.add(labelsMarker)
  })
}

/**
 * 渲染散点
 *circleData:散点数据
 *multiIcon:是否显示多种不同样式散点
 */
import scatterPoint1 from '../../assets/scatterPoint1.png'
import scatterPoint2 from '../../assets/scatterPoint2.png'
import scatterPoint3 from '../../assets/scatterPoint3.png'
import scatterPoint4 from '../../assets/scatterPoint4.png'
export let renderCircle = function(circleData, multiIcon = false, index = 0, size = 30) {
  let style =  [
    {
      url: scatterPoint1,
      anchor: new AMap.Pixel(1, 1),
      size: new AMap.Size(size, size)
    }, {
      url: scatterPoint2,
      anchor: new AMap.Pixel(1, 1),
      size: new AMap.Size(size, size)
    }, {
      url: scatterPoint3,
      anchor: new AMap.Pixel(1, 1),
      size: new AMap.Size(size, size)
    }, {
      url: scatterPoint4,
      anchor: new AMap.Pixel(1, 1),
      size: new AMap.Size(size, size)
    }
  ]; let  setStyle = {}
  if (multiIcon) {
    setStyle = style
  } else {
    setStyle = style[index]
  }
  if (circleData && circleData.length > 0) {
    var mass = new AMap.MassMarks(circleData, {
      opacity: 0.8,
      zIndex: 111,
      cursor: 'pointer',
      style: setStyle
    })
    mass.setMap(amap)
  }
}

/**
 * 清空散点
 */
export let clearMassMarkers = function() {
  let layers = amap.getLayers()
  if (layers && layers.length > 0) {
    let massMarkerLayers = layers.filter(cu => {
      return cu.CLASS_NAME == 'AMap.MassMarks'
    }) || []
    amap.remove(massMarkerLayers)
  }
}
