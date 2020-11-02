import { toHtmlStr } from '@utils'
// 多维分析
export const lineBarOption = {
  grid: {
    left: '0%',
    right: '0%',
    bottom: 10,
    top: 30,
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    // formatter:'{a1}:{c1}%',
    formatter: function(params) {
      if (params[1]) {
        return params[1].seriesName + ':' + toHtmlStr(params[1].value) + '%'
      }
    },
    axisPointer: {
      lineStyle: {
        width: 0
      }
    }
  },
  xAxis: [
    {
      type: 'category',
      data: ['2013', '2014', '2015', '2016', '2017'],
      axisLine: { show: false },
      axisTick: { show: false }
    }
  ],
  yAxis: [
    {
      show: false
    },
    {
      show: false
    }
  ],
  series: [
    {
      name: '指标值',
      type: 'bar',
      barWidth: 8,
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{ offset: 0, color: '#07E2EF' }, { offset: 1, color: '#403DFB' }]
          },
          barBorderRadius: 8
        }
      },
      label: {
        normal: {
          show: true,
          color: '#002535',
          position: 'top',
          distance: 0,
          fontWeight: 600
        }
      },
      data: [2.0, 4.9, 7.0, 23.2, 25.6]
    },
    {
      name: '增速',
      type: 'line',
      yAxisIndex: 1,
      lineStyle: {
        // box-shadow: -2px -8px 8px 0px rgba(0, 81, 115, 1);
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{ offset: 0, color: '#FFB200' }, { offset: 1, color: '#FFFF00' }]
          },
          shadowColor: 'rgba(0, 81, 115, 1)',
          shadowBlur: 8,
          shadowOffsetY: 8,
          shadowOffsetX: -2
        }
      },
      symbolSize: 12,
      itemStyle: {
        normal: {
          opacity: 0
        },
        emphasis: {
          opacity: 1,
          color: '#ffff00',
          borderWidth: 2,
          borderColor: '#fff'
        }
      },
      smooth: true,
      data: [2.0, 2.2, 3.3, 4.5, 6.3]
    }
  ]
}

export let hotOptions = {
  tooltip: {
    trigger: 'item',
    formatter: function(a) {
      return a.data.name + '：' + a.data.value[2]
    }
  },
  geo: {
    map: 'jiangshan',
    label: {
      // 图形上的文本标签--地名
      normal: {
        show: true,
        textStyle: {
          color: '#fff'
        }
      },
      emphasis: {
        show: true,
        textStyle: {
          color: '#fff'
        }
      }
    },
    itemStyle: {
      normal: {
        areaColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(45, 185, 255, 0.81)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(0, 111, 223, 1)' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        borderColor: '#fff',
        borderWidth: 1.5
      },
      emphasis: {
        areaColor: '#1c91ff',
        borderColor: '#00FFFF',
        borderWidth: 2
      }
    }
  },
  series: [
    {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: [],
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      itemStyle: {
        normal: {
          color: '#f4e925',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      silent: false,
      zlevel: 1
    }
  ]
}
export let entAnalysisRadarOption = {
  color: ['rgba(0, 227, 255,1)', 'rgba(255,241,64,1)'],
  legend: {
    data: ['', ''],
    bottom: '5%',
    itemGap: 100,
    itemWidth: 15,
    itemHeifgt: 15,
    textStyle: {
      color: ['rgb(0, 227, 255)', '#ffff00'],
      fontWeight: 'bold',
      borderColor: ['rgb(0, 227, 255)', '#ffff00'],
      backgroundColor: ['rgba(0, 227, 255,.3)', 'rgba(255,241,64,.3)']
    }
  },
  tooltip: {
    confine: true
  },
  radar: {
    radius: '50%',
    name: {
      textStyle: {
        color: '#fff'
      }
    },
    indicator: [
      { name: '[A]亩均税收' },
      { name: '[B]亩均增加值' },
      { name: '[C]全员劳动生产率' },
      { name: '[D]单位能耗增加值' },
      { name: '[E]单位排放增加值' },
      { name: '[F]研究与试验发展 (R&D)经费支出占主营业务收入比例' }
    ],
    axisLine: {
      lineStyle: {
        color: ['rgba(0, 227, 255, 0.5)']
      }
    },
    splitLine: {
      lineStyle: {
        color: ['rgba(0, 227, 255, 0.5)']
      }
    },
    splitArea: {
      areaStyle: {
        color: [
          'rgba(0, 227, 255, 0.2)',
          'rgba(0, 227, 255, 0.2)',
          'rgba(0, 227, 255, 0.2)',
          'rgba(0, 227, 255, 0.2)',
          'rgba(0, 227, 255, 0.2)'
        ]
      }
    }
  },
  series: [
    {
      name: '海盐县 vs 乡镇',
      type: 'radar',
      data: []
    }
  ]
}
export let entAnalysisBarOption = {
  color: ['rgba(0, 227, 255,1)', 'rgba(255,241,64,1)', '#4cabce', '#e5323e'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: [],
    textStyle: {
      color: ['rgb(0, 227, 255)', '#ffff00'],
      fontWeight: 'bold',
      borderColor: ['rgb(0, 227, 255)', '#ffff00'],
      backgroundColor: ['rgba(0, 227, 255,.3)', 'rgba(255,241,64,.3)']
    }
  },
  xAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(0, 227, 255, 0.5)'
        }
      },
      boundaryGap: true,
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: 'rgba(0, 227, 255, 0.5)'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(0, 227, 255, 0.5)',
          width: 2,
          type: 'dotted'
        }
      }
    }
  ],
  series: [
    {
      name: 'Forest',
      type: 'bar',
      barGap: 0,
      barWidth: '10%',
      label: {
        normal: {
          show: true,
          position: 'top',
          color: 'white'
        }
      },
      data: []
    },
    {
      name: 'Steppe',
      type: 'bar',
      barWidth: '10%',
      label: {
        normal: {
          show: true,
          position: 'top',
          color: 'white'
        }
      },
      data: []
    }
  ]
}

//差別化施策
//差别化施策柱状图
export const gradientColors = [
  [
      {offset: 0, color: '#7BB9FF'},
      {offset: 1, color: '#4583FF'}
  ],
  [
      {offset: 0, color: '#6AEFED'},
      {offset: 1, color: '#36CBCB'}
  ]
]
export let defaultBarOption = {
  title:{
      show:true,
      text:'',
      textStyle:{
          color:'#333',
          fontSize:14,
          fontWeight:400
      }
  },
  tooltip : {
      trigger: 'axis',
      confine:true,
      axisPointer : {   
          type : 'shadow'// 默认为直线，可选为：'line' | 'shadow'
      }
  },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  xAxis : [
      {
          type : 'category',
          data : ["一季度","二季度","三季度","四季度"],
          axisTick: {
              show:false
          },
          axisLine:{
              lineStyle:{
                  color:'#E2E4EB'
              }
          },
          axisLabel:{
              color:'#606783'
          }
      }
  ],
  yAxis : [
      {
          type : 'value',
          splitNumber:3,
          axisLabel:{
              show:false
          },
          axisTick:{
              show:false
          },
          axisLine:{
              show:false
          },
          splitLine:{
              lineStyle:{
                  type:'dotted'
              }
          }
      }
  ],
  series : [
      {
          name:'',
          type:'bar',
          barWidth: '30%',
          data:[10, 52, 200, 334]
      }
  ]
}

//排名企业评档
export const entTypeOption1 = {
    tooltip: {
        trigger: 'item',
        formatter: "{b}:{c} ({d}%)"
    },
    legend: {
        bottom: '15%',
        data: [{
            name: 'A档',
            icon: 'circle'
        }, {
            name: 'B档',
            icon: 'circle'
        }, {
            name: 'C档',
            icon: 'circle'
        }, {
            name: 'D档',
            icon: 'circle'
        }],
        textStyle: {
            color: '#fff'
        }
    },
    grid: {

    },
    series: [{
        name: '评档',
        type: 'pie',
        radius: ['35%', '50%'],
        center: ['50%', '40%'],
        avoidLabelOverlap: false,
        label: {
            normal: {
                show: false
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: []
    }]
}

export const rankBar = {
  color: ["#3398DB"],
  tooltip: {
    trigger: "axis",
    // formatter: "{b}:{c}"
    formatter: function(params) {
      // do some thing
      let text = "";
      // console.log(params);
      let data = params[0].data;
      if (data) {
        text = `${data.name}:${data.value} ${data.unit} (${data.rate}%)`;
      }
      return text;
    }
  },
  grid: {
    left: "20%",
    right: "10%",
    bottom: "15%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      data: ["领跑者企业", "规上企业", "新上规企业"],
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#fff"
      },
      axisLine: {
        lineStyle: {
          color: "#32C5FF"
        }
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: "#32C5FF"
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      }
    }
  ],
  series: [
    {
      type: "bar",
      barWidth: "30%",
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //柱图渐变色
            {
              offset: 0,
              color: "#3CFFD3"
            },
            {
              offset: 1,
              color: "#32C5FF"
            } //柱图渐变色
          ])
        }
      },
      data: []
    }
  ]
};

//排名分析的图公共样式
export const rankCharts = {
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  title: [
    {
      text: "单位用地税收",
      top: "33%",
      left: "14%",
      textStyle: {
        color: "#fff",
        fontSize: 14,
        align: "center"
      }
    },
    {
      text: "单位用地主营业务收入",
      top: "33%",
      left: "42%",
      textStyle: {
        color: "#fff",
        fontSize: 14,
        align: "center"
      }
    },
    {
      text: "单位能耗主营业务收入",
      top: "33%",
      left: "71%",
      textStyle: {
        color: "#fff",
        fontSize: 14,
        align: "center"
      }
    },
    {
      text: "单位污染物排放主营业务收入",
      top: "68%",
      left: "10%",
      textStyle: {
        color: "#fff",
        fontSize: 14,
        align: "center"
      }
    },
    {
      text: "研发经费投入占主营业务收入比重",
      top: "68%",
      left: "38%",
      textStyle: {
        color: "#fff",
        fontSize: 14,
        align: "center"
      }
    },
    {
      text: "全员劳动生产率",
      top: "68%",
      left: "74%",
      textStyle: {
        color: "#fff",
        fontSize: 14,
        align: "center"
      }
    }
  ],
  legend: {
    bottom: "10%",
    textStyle: {
      color: "#fff",
      fontSize: 14
    },
    itemWidth: 15,
    itemHeight: 15,
    itemGap: 40,
    data: [
      {
        name: "领跑者企业",
        icon: "rect"
      },
      {
        name: "规上企业",
        icon: "rect"
      },
      {
        name: "新上规企业",
        icon: "rect"
      }
    ]
  },
  series: [
    {
      type: "pie",
      name: "单位用地税收",
      radius: ["15%", "20%"],
      center: ["20%", "20%"],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: []
    },
    {
      type: "pie",
      name: "单位用地主营业务收入",
      radius: ["15%", "20%"],
      avoidLabelOverlap: false,
      center: ["50%", "20%"],
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: []
    },
    {
      type: "pie",
      name: "单位能耗主营业务收入",
      radius: ["15%", "20%"],
      avoidLabelOverlap: false,
      center: ["80%", "20%"],
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: []
    },
    {
      type: "pie",
      name: "单位能耗主营业务收入",
      radius: ["15%", "20%"],
      avoidLabelOverlap: false,
      center: ["20%", "55%"],
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: []
    },
    {
      type: "pie",
      name: "研发经费投入占主营业务收入比重",
      radius: ["15%", "20%"],
      avoidLabelOverlap: false,
      center: ["50%", "55%"],
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: []
    },
    {
      type: "pie",
      name: "全员劳动生产率",
      radius: ["15%", "20%"],
      avoidLabelOverlap: false,
      center: ["80%", "55%"],
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: []
    }
  ]
};


export const rankLine = {
  tooltip: {
    trigger: "item",
    formatter: "{b}: ({d}%)"
  },
  legend: {
    orient: "vertical",
    y: "center",
    right: 15,
    itemGap: 30,
    textStyle: {
      color: "#fff"
    },
    formatter: function(name) {
      return name;
    },
    data: [
      {
        name: "领跑者企业",
        icon: "circle"
      },
      {
        name: "规上企业",
        icon: "circle"
      },
      {
        name: "新上规企业",
        icon: "circle"
      }
    ]
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: ["35%", "45%"],
      center: ["40%", "50%"],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: []
    }
  ]
};

export const rankChartCircle = {};