import { getYearList } from "@utils";
export const getYear = function() {
  let tempDate = getYearList(true, 2018).reverse();
  let yearOption = [];
  tempDate.forEach(current => {
    yearOption.push({ label: current + "年度", value: current });
  });
  return yearOption;
};

export const getCurrentYear = function() {
  let yearList = getYear();
  return yearList[0].value;
};
// 获取实施时间-年份
export const getImplementYearYear = function() {
  let tempDate = getYearList(true, 2019).reverse();
  let yearOption = [];
  tempDate.forEach(current => {
    yearOption.push({ label: current + "年度", value: current });
  });
  return yearOption;
};

// 节点类型
export const nodeType = [
  {
    name: "区域",
    value: "AREA"
  },
  {
    name: "部门",
    value: "DEPARTMENT"
  }
];

// 图标
export const iconList = {
  color: [
    // 多色图标
    {
      name: "icondisanfangzhanghao"
    },
    {
      name: "iconshujuku"
    },
    {
      name: "iconguolvtiaojian"
    },
    {
      name: "iconshujugongchang"
    },
    {
      name: "icongongnengmokuai"
    },
    {
      name: "iconguizeyinqing"
    },
    {
      name: "iconanquanshezhi"
    },
    {
      name: "iconchuangjiangongneng"
    },
    {
      name: "icontiaozhengbumen"
    },
    {
      name: "icontianjiachengyuan"
    },
    {
      name: "person" // 个人中心
    },
    {
      name: "iconrizhiguanli"
    },
    {
      name: "role" // 角色管理
    },
    {
      name: "permission" // 权限设置
    },
    {
      name: "structure" // 组织架构
    },
    {
      name: "user" // 用户管理
    },
    {
      name: "iconxiaoxituisong"
    }
  ],
  line: [
    // 线性图标
    {
      name: "iconzidingyishuju"
    },
    {
      name: "iconshujuleixing"
    },
    {
      name: "iconzuzhijiagou1"
    },
    {
      name: "iconshezhi"
    },
    {
      name: "iconqiyegongyezengjiazhi"
    },
    {
      name: "iconshujuquanxian"
    },
    {
      name: "icongongnengquanxian"
    },
    {
      name: "icongongnengmokuai1"
    },
    {
      name: "iconqiyeguimo"
    }
  ]
};

// 数据类型
export const typeList = [
  { name: "日期", value: "date" },
  { name: "时间", value: "dateTime" },
  { name: "数值", value: "num" },
  { name: "文本", value: "text" }
];

// 园区状况
export const parkState = [
  { id: 0, name: "规划中" },
  { id: 1, name: "在建中" },
  { id: 2, name: "已竣工" },
  { id: 3, name: "已投运" }
];

// 园区类型
export const parkType = [
  { id: 0, name: "生产制造类" },
  { id: 1, name: "科技园" },
  { id: 2, name: "双创园" },
  { id: 3, name: "文创园" },
  { id: 4, name: "电商园" },
  { id: 5, name: "软件园" },
  { id: 6, name: "其他" }
];

// 开发建设模式
export const parkBuildMode = [
  { id: 0, name: "政府主导开发" },
  { id: 1, name: "龙头企业开发" },
  { id: 2, name: "企业联合开发" },
  { id: 3, name: "工业地产开发" },
  { id: 4, name: "村集体联合开发" },
  { id: 5, name: "专业机构开发" },
  { id: 6, name: "其他" }
];

// 土地性质
export const landType = [
  { id: 0, name: "工业用地" },
  { id: 1, name: "商服用地" },
  { id: 2, name: "创新用地" },
  { id: 3, name: "集体留用地" },
  { id: 4, name: "其他" }
];

// 土地来源
export const landSource = [
  { id: 0, name: "划拨" },
  { id: 1, name: "出让" },
  { id: 2, name: "租用" },
  { id: 3, name: "其他" }
];

// 是否
export const isShifou = [
  { id: 0, name: "否" },
  { id: 1, name: "是" }
];

// 运营机构性质
export const yunYingType = [
  { id: 0, name: "国有" },
  { id: 1, name: "集体" },
  { id: 2, name: "民营" },
  { id: 3, name: "其他" }
];

// 运营管理模式
export const yunYingMode = [
  { id: 0, name: "政府主导运营" },
  { id: 1, name: "开发商负责运营" },
  { id: 2, name: "第三方专业机构运营" },
  { id: 3, name: "其他" }
];

// 开发建设模式
export const parkFacility = [
  { id: 0, name: "宿舍公寓" },
  { id: 1, name: "食堂餐饮" },
  { id: 2, name: "便利超市" },
  { id: 3, name: "图书资料室" },
  { id: 4, name: "运动休闲场馆" },
  { id: 5, name: "会议场馆" },
  { id: 6, name: "展览展示场馆" },
  { id: 7, name: "光纤宽带" },
  { id: 8, name: "仓储" },
  { id: 9, name: "物流" },
  { id: 10, name: "共享仪器设备" },
  { id: 11, name: "研发中心" },
  { id: 12, name: "中试基地" },
  { id: 13, name: "公共实验室" },
  { id: 14, name: "公共检验室" },
  { id: 15, name: "集中环保处理" },
  { id: 16, name: "其他" }
];

// 开发建设模式
export const parkService = [
  { id: 0, name: "政策与信息服务" },
  { id: 1, name: "政务代办服务" },
  { id: 2, name: "投融资服务" },
  { id: 3, name: "创业辅导服务" },
  { id: 4, name: "人才招聘引进服务" },
  { id: 5, name: "教育培训服务" },
  { id: 6, name: "管理咨询服务" },
  { id: 7, name: "技术与质量服务" },
  { id: 8, name: "研发设计服务" },
  { id: 9, name: "检验检测服务" },
  { id: 10, name: "法律服务" },
  { id: 11, name: "知识产权服务" },
  { id: 12, name: "市场开拓服务" },
  { id: 13, name: "财务代办服务" },
  { id: 14, name: "物业管理服务" },
  { id: 15, name: "固定资产租赁服务" },
  { id: 16, name: "信息化服务" },
  { id: 17, name: "媒体宣传推广服务" },
  { id: 18, name: "其他" }
];

export const nationData = [
  { id: 1, name: "汉族" },
  { id: 2, name: "蒙古族" },
  { id: 3, name: "回族" },
  { id: 4, name: "藏族" },
  { id: 5, name: "维吾尔族" },
  { id: 6, name: "苗族" },
  { id: 7, name: "彝族" },
  { id: 8, name: "壮族" },
  { id: 9, name: "布依族" },
  { id: 10, name: "朝鲜族" },
  { id: 11, name: "满族" },
  { id: 12, name: "侗族" },
  { id: 13, name: "瑶族" },
  { id: 14, name: "白族" },
  { id: 15, name: "土家族" },
  { id: 16, name: "哈尼族" },
  { id: 17, name: "哈萨克族" },
  { id: 18, name: "傣族" },
  { id: 19, name: "黎族" },
  { id: 20, name: "傈僳族" },
  { id: 21, name: "佤族" },
  { id: 22, name: "畲族" },
  { id: 23, name: "高山族" },
  { id: 24, name: "拉祜族" },
  { id: 25, name: "水族" },
  { id: 26, name: "东乡族" },
  { id: 27, name: "纳西族" },
  { id: 28, name: "景颇族" },
  { id: 29, name: "柯尔克孜族" },
  { id: 30, name: "土族" },
  { id: 31, name: "达翰尔族" },
  { id: 32, name: "么佬族" },
  { id: 33, name: "羌族" },
  { id: 34, name: "布朗族" },
  { id: 35, name: "撒拉族" },
  { id: 36, name: "毛南族" },
  { id: 37, name: "仡佬族" },
  { id: 38, name: "锡伯族" },
  { id: 39, name: "阿昌族" },
  { id: 40, name: "普米族" },
  { id: 41, name: "塔吉克族" },
  { id: 42, name: "怒族" },
  { id: 43, name: "乌孜别克族" },
  { id: 44, name: "俄罗斯族" },
  { id: 45, name: "鄂温克族" },
  { id: 46, name: "德昂族" },
  { id: 47, name: "保安族" },
  { id: 48, name: "裕固族" },
  { id: 49, name: "京族" },
  { id: 50, name: "塔塔尔族" },
  { id: 51, name: "独龙族" },
  { id: 52, name: "鄂伦春族" },
  { id: 53, name: "赫哲族" },
  { id: 54, name: "门巴族" },
  { id: 55, name: "珞巴族" },
  { id: 56, name: "基诺族" }
];

// 企业规模
export const entRuleTypes = [
  {
    value: 0,
    label: "规上"
  },
  {
    value: 1,
    label: "规下"
  }
];
export const entRule = [
  {
    value: "",
    label: "全部"
  },
  {
    value: 0,
    label: "规上"
  },
  {
    value: 1,
    label: "规下"
  }
];
// 评价结果
export const entTypeOption = [
  {
    value: "A",
    label: "A"
  },
  {
    value: "B",
    label: "B"
  },
  {
    value: "C",
    label: "C"
  },
  {
    value: "D",
    label: "D"
  }
];

// 评价结果表格列筛选条件配置
export const evaluationResultTableItem = [
  "序号",
  "企业名称",
  "统一社会信用代码",
  "所属乡镇",
  "所属行业",
  "企业规模",
  "亩均税收数值（万元/亩）",
  "亩均税收分值（分）",
  "亩均工业增加值数值（万元/亩）",
  "亩均工业增加值分值（分）",
  "全员劳动生产率数值（万元/人/年）",
  "全员劳动生产率得分（分）",
  "R&D经费支出占比（%）",
  "R&D经费支出占比得分",
  "单位排污总量工业增加值数值（万元/吨）",
  "单位排污总量工业增加值分值（分）",
  // '单位排污总量税收数值（万元/吨）',
  // '单位排污总量税收分值（分）',
  "指标合计得分",
  "加减分比例/分值",
  "综合得分",
  "初评等级",
  "调档后等级",
  "手动调档"
];

// 评价结果表格的列配置
export const evaluationResultTableHeader = [
  { label: "序号", key: "index", type: "index" },
  { label: "企业名称", key: "entName", type: "text" },
  { label: "统一社会信用代码", key: "creditCode", type: "text" },
  { label: "所属乡镇", key: "town", type: "text" },
  { label: "所属行业", key: "industryName", type: "text" },
  { label: "企业规模", key: "entRule", type: "number" },
  {
    label: "亩均税收数值",
    label2: "（万元/亩）",
    key: "muPerTax",
    type: "number"
  },
  { label: "亩均税收分值（分）", key: "muPerTaxPoint", type: "number" },
  {
    label: "亩均工业增加值数值",
    label2: "（万元/亩）",
    key: "muIndustAdd",
    type: "number"
  },
  {
    label: "亩均工业增加值分值（分）",
    key: "muIndustAddPoint",
    type: "number"
  },
  {
    label: "全员劳动生产率数值",
    label2: "（万元/人/年）",
    key: "allWorkRate",
    type: "number"
  },
  {
    label: "全员劳动生产率得分（分）",
    key: "allWorkRatePoint",
    type: "number"
  },
  { label: "R&D经费支出占比（%）", key: "researchRate", type: "number" },
  { label: "R&D经费支出占比得分", key: "researchMoney", type: "number" },
  {
    label: "单位排污总量工业增加值数值",
    label2: "（万元/吨）",
    key: "blowdownAdd",
    type: "number"
  },
  {
    label: "单位排污总量工业增加值分值（分）",
    key: "blowdownAddPoint",
    type: "number"
  },
  // {label: '单位排污总量税收数值', label2: '（万元/吨）', key:'totalEmissionTax', type: 'number'},
  // {label: '单位排污总量税收分值（分）', key:'totalEmissionTaxPoint', type: 'number'},
  { label: "指标合计得分", key: "point", type: "number" },
  { label: "加减分比例/分值", key: "additionalPoint", type: "number" },
  { label: "综合得分", key: "totalPoint", type: "number" },
  { label: "初评等级", key: "entTypeBefore", type: "text" },
  { label: "调档后等级", key: "entType", type: "text" },
  { label: "手动调档", key: "action" }
];

// 评价结果表格筛选条件缓存中的key
export const evaluationResultCheckedList = "evaluationResultCheckedList";

// 评价结果高级筛选条件配置
export const advancedFilter = [
  { label: "等于", value: "=", type: ["number", "text"] },
  { label: "不等于", value: "!=", type: ["number", "text"] },
  { label: "大于", value: ">", type: ["number"] },
  { label: "大于等于", value: ">=", type: ["number"] },
  { label: "小于", value: "<", type: ["number"] },
  { label: "小于等于", value: "<=", type: ["number"] },
  { label: "为空", value: "is null", type: ["number", "text"] },
  { label: "不为空", value: "is not null", type: ["number", "text"] },
  { label: "包含", value: "like", type: ["text"] },
  { label: "不包含", value: "not like", type: ["text"] },
  { label: "范围", value: "range", type: ["range"] },
  { label: "日期", value: "date", type: ["date"] }
];

// 参评企业筛选项
export const isCanpingList = [
  {
    label: "全部",
    value: ""
  },
  {
    label: "参评",
    value: "0"
  },
  {
    label: "不参评",
    value: "1"
  }
];

// 审核状态
export const examineStatus = [
  { label: "待审核", value: 1 },
  { label: "审核通过", value: 2 },
  { label: "审核退回", value: 3 }
];

// echarts的1-12月份x轴数据
export const XAXIS = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月"
];
export const XAXIS1 = ["第一季度", "第二季度", "第三季度", "第四季度"];

export const rightDataUp = [
  { name: "亩均税收", unit: "万元/亩" },
  { name: "亩均增加值", unit: "万元/亩" },
  { name: "单位能耗增加值", unit: "万元/吨" },
  { name: "单位排放增加值", unit: "万元/吨" },
  { name: "研究与试验发展(R&D)经费支出占主营业务收入比例", unit: "%" },
  { name: "全员劳动生产率", unit: "万元/人·年" }
];

export const leftDataUp = [
  { name: "实缴税金", unit: "万元" },
  { name: "实际用地面积", unit: "亩" },
  { name: "工业增加值", unit: "万元" },
  { name: "总用能量", unit: "吨标准煤" },
  { name: "排放量", unit: "吨" },
  { name: "研究与试验发展(R&D)经费支出", unit: "万元" },
  { name: "年平均职工人数", unit: "人/年" },
  { name: "主营业务收入", unit: "万元" },
  { name: "用电量", unit: "万千瓦时" }
];
export const leftDataDown = [
  { name: "实缴税金", unit: "万元" },
  { name: "实际用地面积", unit: "亩" },
  { name: "用电量", unit: "万千瓦时" }
];

export const rightDataDown = [
  { name: "亩均税收", unit: "万元/亩" },
  { name: "单位电耗税收", unit: "万元/万千瓦时" }
];

export const industryType = [
  {
    value: 2,
    label: "31个制造业"
  },
  // {
  //   value: 3,
  //   label: "特色产业"
  // }
];

export const entTypeUp = [
  {
    value: "A",
    label: "A类"
  },
  {
    value: "B",
    label: "B类"
  },
  {
    value: "C",
    label: "C类"
  },
  {
    value: "D",
    label: "D类"
  }
];

import { regionJson } from "../../../static/region/amap.liandu";
export let areaGeoCodeJson = (function() {
  let tempArry = [];
  for (let i = 0; i < regionJson.districts.length; i++) {
    tempArry.push(...JSON.parse(regionJson.districts[i].polyline));
  }
  return tempArry;
})();

export const upOption = [
  {
    value: 1,
    label: "亩均税收(单位:万元/亩)"
  },
  {
    value: 2,
    label: "亩均增加值(单位:万元/亩)"
  },
  {
    value: 3,
    label: "单位能耗增加值(单位:万元/吨)"
  },
  {
    value: 4,
    label: "单位排放增加值(单位:万元/吨)"
  },
  {
    value: 5,
    label: "研究与试验发展(R&D)经费支出占主营业务收入比例(单位:%)"
  },
  {
    value: 6,
    label: "全员劳动生产率(单位:万元/人·年)"
  }
];
export const downOption = [
  {
    value: 1,
    label: "亩均税收(单位:万元/亩)"
  },
  {
    value: 10,
    label: "单位电耗税收(单位:万元/万千瓦时)"
  }
];
export const viewOption = [
  {
    value: 0,
    label: "数据视图"
  },
  {
    value: 1,
    label: "增速视图"
  }
];

// 政策类别
export const policyType = ["政策原文", "评选认定", "政策兑现"];

// 政策级别
export const policyLevel = ["国家级", "省级", "市级"];

// 政策状态
export const policyStatus = [
  {
    label: "未发布",
    value: 0
  },
  {
    label: "已发布",
    value: 1
  },
  {
    label: "已下架",
    value: 2
  }
];

// 类型标签
export const policyTag = [
  "财政支持",
  "金融扶持",
  "综合政策",
  "企业培育",
  "个税政策",
  "优惠政策",
  "小微企业园",
  "增值税政策",
  "其他"
];

// 问卷调查列表参数
export const aQuestionParam = {
  public: [
    { label: "序号", type: "index", width: 50 },
    { label: "问卷名称", key: "desformName", showOverflowTooltip: true },
    { label: "发布人", key: "createBy", showOverflowTooltip: true },
    { label: "发送对象", key: "receiver", showOverflowTooltip: true },
    { label: "截止时间", key: "deadlineTime" },
    { label: "发布时间", key: "publishTime" },
    { label: "状态", key: "status" },
    { label: "填写情况", key: "writeStatus" }
  ],
  writed: [
    { label: "序号", type: "index", width: 50 },
    { label: "问卷名称", key: "desformName", showOverflowTooltip: true },
    { label: "发布人", key: "createBy", showOverflowTooltip: true },
    { label: "状态", key: "isWrite" },
    { label: "截止时间", key: "deadlineTime" },
    { label: "填写时间", key: "fillTime" }
  ]
};

// 问卷调查查看列表参数
export const aQuestionPropList = [
  { label: "序号", type: "index" },
  { label: "问卷名称", key: "desformName", showOverflowTooltip: true },
  { label: "填写单位", key: "reportUnit", showOverflowTooltip: true },
  { label: "填写人", key: "informant", showOverflowTooltip: true },
  { label: "填写时间", key: "fillTime" }
];

export const areceiverList = ["部门", "镇街", "小微园", "小微园企业", "公开"];

export const aStatusList = [
  { label: "未发布", value: 0 },
  { label: "已发布", value: 1 }
];

export const aWriteStatusList = [
  { label: "未填写", value: 0 },
  { label: "已填写", value: 1 }
];

export const onShelfList = [
  { label: "隐藏", value: 0 },
  { label: "显示", value: 1 }
];

// 融资需求不同tab页的表格参数
export const financeParam = {
  // 融资需求
  finance: [
    { label: "序号", type: "index" },
    { label: "企业名称", key: "entName", showOverflowTooltip: true },
    { label: "融资金额", key: "amount" },
    { label: "融资方式", key: "mode" },
    { label: "联系人", key: "linker", showOverflowTooltip: true },
    { label: "联系方式", key: "linkTel", showOverflowTooltip: true },
    { label: "状态", key: "statusStr", showOverflowTooltip: true },
    { label: "申请时间", key: "releaseTime" }
  ],
  // 产品申请
  produce: [
    { label: "序号", type: "index" },
    { label: "企业名称", key: "entName", showOverflowTooltip: true },
    { label: "银行", key: "organ" },
    { label: "产品名称", key: "productName" },
    { label: "额度", key: "quotaStart", showOverflowTooltip: true },
    { label: "年息", key: "interest", showOverflowTooltip: true },
    { label: "期限范围", key: "periodStart" },
    { label: "状态", key: "statusStr", showOverflowTooltip: true },
    { label: "申请时间", key: "releaseTime" }
  ]
};

// 企业诉求不同tab页的表格参数
export const commandsParam = {
  // 企业招聘
  entRecruitment: [
    { label: "序号", type: "index" },
    // {label:'企业名称',key:'entName',showOverflowTooltip:true},
    { label: "岗位名称", key: "postName", showOverflowTooltip: true },
    { label: "学历", key: "education" },
    { label: "人数", key: "workerNum" },
    { label: "薪资", key: "salary" },
    { label: "年龄", key: "age" },
    { label: "有效时间", key: "validTime" },
    { label: "发布时间", key: "releaseTime" }
  ],
  // 房产出租
  realEstateRental: [
    { label: "序号", type: "index" },
    { label: "标题", key: "title", showOverflowTooltip: true },
    { label: "面积", key: "area" },
    { label: "租金", key: "money" },
    { label: "地理位置", key: "address", showOverflowTooltip: true },
    { label: "适用行业", key: "industryStr", showOverflowTooltip: true },
    // {label:'企业名称',key:'entName',showOverflowTooltip:true},
    { label: "联系人", key: "linkerName" },
    { label: "联系电话", key: "linkerTel" },
    { label: "发布时间", key: "releaseTime" }
  ],
  // 房产转让
  propertyTransfer: [
    { label: "序号", type: "index" },
    { label: "标题", key: "title", showOverflowTooltip: true },
    { label: "面积", key: "area" },
    { label: "转让金", key: "money" },
    { label: "地理位置", key: "address", showOverflowTooltip: true },
    { label: "适用行业", key: "industryStr", showOverflowTooltip: true },
    // {label:'企业名称',key:'entName',showOverflowTooltip:true},
    { label: "联系人", key: "linkerName" },
    { label: "联系电话", key: "linkerTel" },
    { label: "发布时间", key: "releaseTime" }
  ],
  // 设备转让
  equipmentTransfer: [
    { label: "序号", type: "index" },
    { label: "标题", key: "title", showOverflowTooltip: true },
    { label: "类别", key: "type" },
    { label: "设备名称", key: "name", showOverflowTooltip: true },
    { label: "设备价格", key: "price" },
    { label: "设备数量", key: "num" },
    { label: "供应地址", key: "address", showOverflowTooltip: true },
    // {label:'企业名称',key:'entName',showOverflowTooltip:true},
    { label: "联系人", key: "linkerName" },
    { label: "联系电话", key: "linkerTel" },
    { label: "发布时间", key: "releaseTime" }
  ],
  // 产品销售
  productSales: [
    { label: "序号", type: "index" },
    { label: "标题", key: "title", showOverflowTooltip: true },
    { label: "产品名称", key: "name", showOverflowTooltip: true },
    { label: "产品单价", key: "price" },
    { label: "供货总量", key: "num" },
    { label: "所在地", key: "address", showOverflowTooltip: true },
    // {label:'企业名称',key:'entName',showOverflowTooltip:true},
    { label: "联系人", key: "linkerName" },
    { label: "联系电话", key: "linkerTel" },
    { label: "发布时间", key: "releaseTime" }
  ],
  // 其他需求
  otherNeeds: [
    { label: "序号", type: "index" },
    // {label:'企业名称',key:'entName',showOverflowTooltip:true},
    { label: "需求标题", key: "title", showOverflowTooltip: true },
    { label: "需求详情", key: "detail" },
    { label: "联系人", key: "linkerName" },
    { label: "联系电话", key: "linkerTel" },
    { label: "发布时间", key: "releaseTime" }
  ]
};

// 企业诉求-企业招聘-学历
export const educationOptions = [
  {
    label: "小学及以上",
    value: 1
  },
  {
    label: "初中及以上",
    value: 2
  },
  {
    label: "高中及以上",
    value: 3
  },
  {
    label: "本科及以上",
    value: 4
  },
  {
    label: "硕士及以上",
    value: 5
  },
  {
    label: "博士及以上",
    value: 6
  }
];

// 企业诉求-企业招聘-有效时间
export const validTimeOptions = [
  {
    label: "一个月",
    value: 1
  },
  {
    label: "三个月",
    value: 2
  },
  {
    label: "半年",
    value: 3
  },
  {
    label: "不限",
    value: 4
  }
];

// 企业诉求-设备转让-类别
export const typeOptions = [
  "机床车床",
  "工程机械",
  "食品加工机械",
  "印刷设备",
  "配件",
  "塑料设备",
  "发电设备",
  "木工",
  "化工设备",
  "仪器仪表",
  "纺织",
  "农用机械",
  "生产线",
  "游戏设备",
  "集装箱",
  "其他"
];

// 部门数据导入表头
export const departmentTableHead = {
  // 国土数据
  landHead: [
    { label: "土地字号", prop: "landNumber" },
    { label: "土地使用权面积", prop: "landUseArea" },
    { label: "不动产权证号", prop: "realPropertyNumber" },
    { label: "供地日期", prop: "landSupply" }
  ],
  // 税务数据
  taxHead: [{ label: "实缴税金", prop: "taxRevenue" }],
  // 用电数据
  eleHead: [
    { label: "电表户号", prop: "ammeterNum" },
    { label: "用电量", prop: "electricityTotal" },
    { label: "备注", prop: "remark" }
  ],
  // 环保数据
  environHead: [
    { label: "排污数据", prop: "polutionCount" },
    { label: "综合能耗", prop: "needOxygenDischarge" },
    { label: "二氧化硫排放量", prop: "sulfurDioxideDischarge" },
    { label: "氨氮排放量", prop: "ammoniaNitrogenDischarge" },
    { label: "氮氧化物排放量", prop: "nitrogenOxidesDischarge" }
  ],
  // 统计数据
  statisticsHead: [
    { label: "工业增加值", prop: "industryAddValue" },
    { label: "土地使用权面积", prop: "allEnergyConsume" },
    { label: "全部从业人员平均人数", prop: "yearAverageWorker" },
    { label: "R&D经费支出", prop: "researchMoney" },
    { label: "主营业务收入(万元)", prop: "mainServiceIncome" }
  ]
};

// 差别化施策
//  季度
export const quarterOption = [
  { label: "一季度", value: 1 },
  { label: "二季度", value: 2 },
  { label: "三季度", value: 3 },
  { label: "四季度", value: 4 }
];

// 月份
export const monthOption = [
  { label: "一月", value: 1 },
  { label: "二月", value: 2 },
  { label: "三月", value: 3 },
  { label: "四月", value: 4 },
  { label: "五月", value: 5 },
  { label: "六月", value: 6 },
  { label: "七月", value: 7 },
  { label: "八月", value: 8 },
  { label: "九月", value: 9 },
  { label: "十月", value: 10 },
  { label: "十一月", value: 11 },
  { label: "十二月", value: 12 }
];

// 类型
export const differentPolicyEntType = [
  { name: "A+B档", value: "AB" },
  { name: "A档", value: "A" },
  { name: "B档", value: "B" },
  // { name: 'C档', value: 'C' },
  { name: "D档", value: "D" }
  // { name: 'C+D档', value: 'CD' }
];
// 类型
export const selectedEntType = [
  { name: "全部", value: "" },
  { name: "A档", value: "A" },
  { name: "B档", value: "B" },
  { name: "C档", value: "C" },
  { name: "D档", value: "D" }
];
// 差别化施策挡对应指标
export const gearsData = {
  AB: [
    {
      name: "减免城镇土地使用税",
      key: "reduction_tax",
      unit: "万元",
      ele: "town"
    },
    {
      name: "财政资金奖励和补助",
      key: "financial_incentives",
      unit: "万元",
      ele: "gov"
    },
    {
      name: "通过电力直接交易降低用电成本",
      key: "reducing_electricity",
      unit: "万元",
      ele: "electric"
    },
    {
      name: "新增供应土地",
      key: "new_supply_land",
      unit: "亩",
      ele: "land"
    },
    {
      name: "支持用能指标",
      key: "supporting_energy",
      unit: "吨标煤",
      ele: "enery"
    },
    {
      name: "新增排污指标",
      key: "new_sewage_index",
      unit: "吨",
      ele: "pollution"
    }
  ],
  CD: [
    {
      name: "征收差别化电价",
      key: "differential_electricity_pricing",
      unit: "万元",
      ele: "zElectric"
    },
    {
      name: "征收差别化水价",
      key: "differential_waterPrice",
      unit: "万元",
      ele: "zWater"
    },
    {
      name: "征收差别化排污费",
      key: "differential_sewage",
      unit: "万元",
      ele: "zPollution"
    },
    {
      name: "削减用能指标",
      key: "consumption_index",
      unit: "吨标煤",
      ele: "zEnery"
    },
    {
      name: "削减排污指标",
      key: "reduce_emission_targets",
      unit: "吨",
      ele: "zPol"
    }
  ]
};

//总量指标
export const totalTarget = [
  {
    name: "企业数",
    unit: "(家)",
    unitTown: "(家)",
    key: "total",
    inKey: "entCount",
    tofixed: 0
  },
  {
    name: "实际占用土地面积",
    unit: "(亩)",
    unitTown: "(亩)",
    key: "landArea",
    inKey: "landArea",
    tofixed: 2
  },
  {
    name: "工业总产值",
    unit: "(万元)",
    unitTown: "(亿元)",
    key: "industValue",
    inKey: "industValue",
    tofixed: 2
  },
  {
    name: "主营业务收入",
    unit: "(万元)",
    unitTown: "(亿元)",
    key: "mainBusinessIncome",
    inKey: "mainBusinessIncome",
    tofixed: 2
  },
  {
    name: "实缴税收",
    unit: "(万元)",
    unitTown: "(亿元)",
    key: "taxRevenue",
    inKey: "taxRevenue",
    tofixed: 2
  },
  {
    name: "R&D经费",
    unit: "(万元)",
    unitTown: "(亿元)",
    key: "researchMoney",
    inKey: "researchMoney",
    tofixed: 2
  },
  {
    name: "综合能耗",
    unit: "(吨标准煤)",
    unitTown: "(吨标准煤)",
    key: "allEnergyConsume",
    inKey: "allEnergyConsume",
    tofixed: 2
  },
  {
    name: "污染物排放量",
    unit: "(当量吨)",
    unitTown: "(当量吨)",
    key: "emissionsPollutant",
    inKey: "emissionsPollutant",
    tofixed: 2
  },
  {
    name: "年平均职工人数",
    unit: "(人)",
    unitTown: "(人)",
    key: "yearAverageWorkers",
    inKey: "yearAverageWorkers",
    tofixed: 0
  }
];

//综合指标
export const multipleTartget = [
  {
    name: "单位用地税收",
    unit: "（万元/亩）",
    key: "muPerTax",
    average: "averageMuPerTax",
    tofixed: 2
  },
  {
    name: "单位用地主营业务收入",
    unit: "（万元/亩）",
    key: "muMainIncome",
    average: "averageMuMainIncome",
    tofixed: 2
  },
  {
    name: "单位能耗主营业务收入",
    unit: "（万元/吨标准煤）",
    key: "muConsumeIncome",
    average: "averageMuConsumeIncome",
    tofixed: 2
  },
  {
    name: "单位污染物排放主营业务收入",
    unit: "（万元/当量吨）",
    key: "muEmissionsIncome",
    average: "averageMuEmissionsIncome",
    tofixed: 2
  },
  {
    name: "研发经费投入占主营业务收入比重",
    unit: "（%）",
    key: "researchRate",
    average: "averageResearchRate",
    tofixed: 2
  },
  {
    name: "全员劳动生产率",
    unit: "（万元/人/年）",
    key: "allWorkRate",
    average: "averageAllWorkRate",
    tofixed: 2
  }
];

export const rankEntRule = [
  {
    name: "规上工业企业",
    key: "ruleUpNum",
    value: "0,2"
  },
  {
    name: "领跑者企业",
    value: 1,
    key: "leaderEntNum"
  },
  {
    name: "新上规企业",
    value: 2,
    key: "newRuleUpNum"
  },
  {
    name: "重点企业",
    value: 2,
    key: "focusEntNum"
  }
];




export const colorList = [
  [
    {
      offset: 0,
      color: "#3CFFD3" // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#32C5FF" // 100% 处的颜色
    }
  ],
  [
    {
      offset: 0,
      color: "#FF5415" // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#FF7A46" // 100% 处的颜色
    }
  ],
  [
    {
      offset: 0,
      color: "#FCDB00" // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#F7B500" // 100% 处的颜色
    }
  ],
  [
    {
      offset: 0,
      color: "#2147E6" // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#4060E4" // 100% 处的颜色
    }
  ]
];

export const rankEntRule1 = [
  {
    name: "规上工业企业",
    key: "ruleUpNum",
    value: 1
  },
  {
    name: "领跑者企业",
    value: 3,
    key: "leaderEntNum"
  },
  {
    name: "新上规企业",
    value: 2,
    key: "newRuleUpNum"
  }
];