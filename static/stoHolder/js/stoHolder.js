(function ($) {
    /*----- define config-----------*/
    var tupuConfig = {
        chartColor: { //必须传入
            itemBorderColor: '#E8E8E8', // 节点边框的颜色
            itemColor: '#0091FF', // 节点的颜色
            itemFontColor: '#999', // 节点字体的颜色
            itemLineColor: '#ccc', // 节点连线颜色
            itemCrossColor: '#666666', // 节点连线箭头颜色
            itemLineLabelFontColor: '#999', // 节点连线旁边字体颜色
            rootItemColor: '#0050FF', // 根节点的颜色
            rootFontColor: '#999', // 根节点字体的颜色
            stockholderColor: '#ff6600', // 最终持股人图中最终控股人的颜色, 上边文本字体颜色请至.text-start设置
            currentColor: '#0091FF', // 最终持股人图中当前企业的颜色, 上边文本字体颜色请至.text-end设置
            normalNodeColor: '#0091FF', // 其他一般节点的颜色
        }
    };
    /* 其他说明: 图中右侧链接地址请至本js中"/cust/"处做相应的跳转修改 */
    /*----- define config end-----------*/
    $(document).ready(function () {
        var entName = "浙江龙游通衢建材有限公司";
        window.entName = entName;
        var initSH;
        var orderNo;
        var shareholderItemListDatas = [];
        var shareholderChartInit = getShareholderChartInit(); //chart data init
        var myChart;
        // resetData();
        fetchData();
        function getShareholderChartInit() {
            return {
                //root
                root: "",
                //datafilter
                datafilter: 0,
                //ajax ---> response
                data: [],
                //shareholder pool
                "shareholderItemObject": {},

                //shares pool
                "stocksCollection": {},

                //shares pool sort
                // "stocksCollectionSortList": [],

                // all nodes
                allShareholderObject: {},

                //count
                shareholderCountObject: {},

                //count list
                repeatShareholderList: [],

                // is leaf object
                shareholderIsLeafObject: {},

                //corresponds to color
                repeatShareholderColor: {},
                allShareholderColor: {},

                //checkRepeat：
                checkRepeat: {},

                //default colors
                color: ['#ff7f50', '#87cefa', '#da70d6', '#6495ed', '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0', '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700', '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0'],

                //echarts option
                "option": {
                    "title": {
                        "text": "",
                        "x": 40,
                        "y": 20,
                    },
                    "tooltip": {
                        show: !1,
                        enterable: true,
                        formatter: function (params, ticket, callback) {
                            return "-------------------------------------------------";
                        }
                    },
                    "series": [{
                            "type": "tree",
                            "orient": "vertical",
                            "nodePadding": 100,
                            "layerPadding": 50,
                            "symbol": "circle",
                            "roam": "move",
                            "symbolSize": 8,
                            "itemStyle": {
                                "normal": {
                                    "color": "#4883b4",
                                    "label": {
                                        "show": true,
                                        "position": "right",
                                        "formatter": "{b}",
                                        "textStyle": {
                                            "color": tupuConfig.chartColor.itemFontColor, //"#000",
                                            "fontSize": 16
                                        }
                                    },
                                    "lineStyle": {
                                        "color": tupuConfig.chartColor.itemLineColor, //"#ccc",
                                        "type": "curve"
                                    }
                                },
                                "emphasis": {
                                    "color": "#4883b4",
                                    "label": {
                                        "show": false
                                    },
                                    "borderWidth": 0
                                }
                            },
                            "data": [{
                                "index": "",
                                "name": "",
                                "value": "",
                                "symbol": "circle", //"image://marker.png",
                                "symbolSize": [60, 60],
                                "shareholdingRatio": 1,
                                "itemStyle": {
                                    "normal": {
                                        "color": tupuConfig.chartColor.rootItemColor, //"#0099cc",
                                        "borderWidth": "3",
                                        "borderColor": tupuConfig.chartColor.itemBorderColor, //"#E8E8E8",
                                        "label": {
                                            "show": true,
                                            "textStyle": {
                                                "color": tupuConfig.chartColor.rootFontColor, // '#f00', //"#0099cc",
                                                "fontFamily": "MicroSoft YaHei",
                                                "fontSize": 16,
                                                "fontStyle": "normal"
                                            },
                                        }
                                    },
                                    "emphasis": {
                                        "color": tupuConfig.chartColor.rootItemColor, //"#0099cc",
                                        "borderWidth": "3",
                                        "borderColor": tupuConfig.chartColor.itemBorderColor, //"#E8E8E8"
                                    }
                                },
                                "children": [],
                            }],
                            "rootLocation": {
                                "x": "50%",
                                "y": "80%"
                            },
                            "direction": "inverse"
                        },
                        {
                            type: "tree",
                            roam: "move",
                            rootLocation: {
                                x: -1000, //minX,
                                y: -1000 //ops.series[0].rootLocation.y , // 'center' | 'top' | 'bottom' | 'y%' | 0
                            },
                            data: [{
                                name: "watermark",
                                symbol: "image:///static/plugins/stoHolder/images/yslogo.png",
                                clickable: !1,
                                hoverable: !1,
                                symbolSize: [1, 1],
                                symbolRotate: 45,
                                tooltip: {
                                    show: !1
                                },
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: !1
                                        }
                                    }
                                },
                                children: []
                            }]
                        },
                    ],
                },

                //init ajax
                "ajaxData": function (entName, orderNo, index) { // index 4 test using
                    var that = this;
                    that.data = [];
                    $.ajax({
                        // type: "POST",
                        headers: {
                            'Accept': 'application/json;charset=UTF-8',
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        url: "http://localhost:9528/gov/entData/oneLevelStockholder",
                        // data: JSON.stringify({OrderNo: orderNo, entName : entName}),
                        // data: 'orderNo=' + orderNo + '&entName=' + entName,
                        data: {
                            orderNo,
                            entName,
                            token: window.localStorage.getItem('token')
                        },
                        async: false,
                        success: function (response) {
                            if (response && response.code === '0000') {
                                that.data = response.data.shareholderItemList;
                                console.log(that.data,'1')
                            } else {
                                throw new Error(response.message);
                            }
                        }
                    })
                    if (that.isEmpty(that.root)) {
                        that.option.series[0].data[0].name = that.option.series[0].data[0].value = entName;
                        that.root = entName;
                    }
                },

                //generate ---> shareholderItemObject
                "generateNode": function (shareholderItemList, index) { //ajax ---> shareholderItemList ; parentNodeId ---> target
                    if (!shareholderItemList) return;
                    var shareholderItemListNew = [];
                    var thatIndex = index;
                    this.countRepeatShareholder();
                    //var root = decodeURIComponent(window.location.search.split("&")[1].substring(12)); //TODO
                    var root = "你妈嗨公司"
                    allShareholder.push(root);
                    if (shareholderItemListDatas.indexOf(root + ",1") == -1) {
                        shareholderItemListDatas.push(root + ",1");
                    }
                    for (var i = 0; i < shareholderItemList.length; i++) {
                        var shareholderItem = shareholderItemList[i];
                        var index = thatIndex + pad(i);
                        var shareholderItemListData = shareholderItem.name + "," + index;
                        var commonName;
                        if (allShareholder.indexOf(shareholderItem.name) != -1) {
                            var flag = 0;
                            for (var x = 0; x < shareholderItemListDatas.length; x++) {
                                if (shareholderItemListDatas[x].indexOf(shareholderItem.name) != -1) {
                                    if (shareholderItemListDatas[x].split(",")[1].length > index.length && shareholderItemListDatas[x].split(",")[1].substr(0, index.length) == index) {
                                        flag++;
                                        return commonName = true;
                                    } else if (shareholderItemListDatas[x].split(",")[1].length <= index.length && shareholderItemListDatas[x].split(",")[1] == index.substr(0, shareholderItemListDatas[x].split(",")[1].length)) {
                                        flag++;
                                        commonName = true;
                                    }
                                } else {
                                    commonName = false;
                                }
                            }
                            if (flag > 0 || shareholderItem.name == root) {
                                commonName = true;
                            } else {
                                commonName = false;
                            }
                        } else {
                            commonName = false;
                        }
                        if (shareholderItemListDatas.indexOf(shareholderItemListData) == -1) {
                            shareholderItemListDatas.push(shareholderItemListData);
                        }
                        //递归
                        this.generateNode(shareholderItem.shareholderItemList, index);

                        shareholderItem = {
                            index: index,
                            commonName: commonName,
                            value: shareholderItem.name,
                            name: (function (entName) {
                                if (entName && entName.length > 4) {
                                    var entNameList = [];
                                    while (entName.length) entNameList.push(entName.slice(0, 4)), entName = entName.slice(4);
                                    return entNameList.join("\n")
                                }
                                if (shareholderItem.served) {
                                    return entName + "*";
                                } else {
                                    return entName;
                                }
                            })(shareholderItem.name),
                            shareholdingRatio: shareholderItem.shareholdingRatio, //shareholdingRatio
                            shareholderType: shareholderItem.sharedholderType,
                            quoted: shareholderItem.quoted,
                            served: shareholderItem.served,
                            symbol: "circleMinus",
                            symbolSize: [30, 30],
                            clickable: !0,
                            itemStyle: {
                                normal: {
                                    borderWidth: "3",
                                    borderColor: tupuConfig.chartColor.itemBorderColor, //"#E8E8E8",
                                    label: {
                                        show: !0,
                                        position: "right",
                                        textStyle: {
                                            fontFamily: "MicroSoft YaHei",
                                            fontSize: 14,
                                            fontStyle: "normal",
                                        },
                                    }
                                },
                                emphasis: {
                                    borderWidth: "3",
                                    borderColor: tupuConfig.chartColor.itemBorderColor, //"#E8E8E8",
                                }
                            }
                        };

                        shareholderItem = {
                            /* cache for filter data compare. not useful 4 display. */
                            cacheName: shareholderItem.name,
                            cacheShareholdingRatio: shareholderItem.shareholdingRatio,
                            /* nomarl properties */
                            name: !shareholderItem.shareholdingRatio ? (shareholderItem.shareholdingRatio === 0 ? "0" : "-") : (shareholderItem.shareholdingRatio > 1 ? "-" : ((shareholderItem.shareholdingRatio * 100).toFixed(2) + "%")),
                            symbol: "arrowdown",
                            symbolSize: [12, 12],
                            tooltip: {
                                show: !1
                            },
                            clickable: !1,
                            itemStyle: {
                                normal: {
                                    color: tupuConfig.chartColor.itemCrossColor, //"#666666",
                                    label: {
                                        show: !0,
                                        position: "left",
                                        textStyle: {
                                            fontFamily: "MicroSoft YaHei",
                                            fontSize: 14,
                                            fontStyle: "normal",
                                            color: tupuConfig.chartColor.itemLineLabelFontColor,
                                        },
                                    }
                                },
                                emphasis: {
                                    color: tupuConfig.chartColor.itemCrossColor, //"#666666"
                                }
                            },
                            lineStyle: {
                                width: 2,
                                color: "#E8E8E8"
                            },
                            children: [shareholderItem]
                        };

                        shareholderItemListNew.push(shareholderItem);
                    };
                    console.log(shareholderItemListNew,'2')
                    if (!this.shareholderItemObject[thatIndex] || this.shareholderItemObject[thatIndex].length === 0)
                        this.shareholderItemObject[thatIndex] = shareholderItemListNew;
                },


                //generate ---> stocksCollection
                //param ---> option.series[0].data[0]
                "countStocks": function (children) {
                    if (!children) return;
                    var parentNode = children;
                    var childNodes = parentNode.children;
                    //console.log(childNodes,'kk')
                    for (var i = 0; i < childNodes.length; i++) {
                        var childNode = childNodes[i].children[0]; //real data
                        if (childNode.shareholdingRatio == '2') {
                            childNode.shareholdingRatio = 2;
                        } else if (children.shareholdingRatio == 2) {
                            childNode.shareholdingRatio = 2;
                        } else {
                            childNode.shareholdingRatio = (!childNode.shareholdingRatio ? 0 : childNode.shareholdingRatio) * (!parentNode.shareholdingRatio ? 0 : parentNode.shareholdingRatio);
                        }
                        if (!(childNode.children && childNode.children.length > 0)) {
                            if (this.stocksCollection[childNode.value]) {
                                this.stocksCollection[childNode.value] = this.stocksCollection[childNode.value] + childNode.shareholdingRatio;
                            } else {
                                this.stocksCollection[childNode.value] = (!childNode.shareholdingRatio ? 0 : childNode.shareholdingRatio);
                            }
                        } else {
                            this.countStocks(childNode);
                        }
                    }
                },

                //sort
                // "stocksCollectionSort": function () {
                //     var a = $.map(this.stocksCollection, function (value, key) {
                //         var jsonVariable = {};
                //         //           		key === '其他' && (value = 0);
                //         jsonVariable[key] = value;
                //         return jsonVariable;
                //     });
                //     this.stocksCollectionSortList = a.sort(function (obj1, obj2) {
                //         return (function (obj) {
                //             for (var o in obj) {
                //                 return obj[o];
                //             }
                //         })(obj2) - (function (obj) {
                //             for (var o in obj) {
                //                 return obj[o];
                //             }
                //         })(obj1);
                //     });
                // },


                "shareholderCount": function (children) {
                    if (!children) return;
                    var parentNode = children;
                    var childNodes = parentNode.children;
                    for (var i = 0; childNodes && i < childNodes.length; i++) {
                        var childNode = childNodes[i].children[0];
                        this.allShareholderObject[childNode.value] = childNode; // cache current node.
                        // repeat count
                        if (this.shareholderCountObject[childNode.value]) {
                            this.shareholderCountObject[childNode.value] = this.shareholderCountObject[childNode.value] + 1;
                        } else {
                            this.shareholderCountObject[childNode.value] = 1;
                        }
                        if (childNode.children && childNode.children.length > 0) {
                            this.shareholderCount(childNode);
                        } else { // is leaf node, then color cache
                            !this.allShareholderColor[childNode.value] && (this.allShareholderColor[childNode.value] = tupuConfig.chartColor.itemColor); // = '#0099cc');
                        }
                    }
                },

                "shareholderIsLeafCount": function (children) {
                    if (!children) return;
                    var parentNode = children;
                    var childNodes = parentNode.children;
                    for (var i = 0; childNodes && i < childNodes.length; i++) {
                        var childNode = childNodes[i].children[0];
                        if (!childNode.children || childNode.children.length == 0) {
                            this.shareholderIsLeafObject[childNode.value] = !0; // is leaf node
                        } else {
                            this.shareholderIsLeafCount(childNode);
                        }
                    }
                },

                "countRepeatShareholder": function () {
                    allShareholder = [];
                    for (var shareholder in this.shareholderCountObject) {
                        allShareholder.push(shareholder);
                        if (this.shareholderCountObject[shareholder] > 1) {
                            this.repeatShareholderList.push(shareholder);
                            //color corresponds to
                            this.repeatShareholderColor[shareholder] ? "" : (this.allShareholderColor[shareholder] = this.repeatShareholderColor[shareholder] = this.generateColor());
                            this.color.push(this.repeatShareholderColor[shareholder]);
                        }
                    }
                },

                //		"countAllShareholderColor": function() {
                //
                //		},

                "generateColor": function () {
                    var color = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
                    if (this.color.indexOf(color) === -1) {
                        return color;
                    }
                    generateColor();
                },

                "addDataSyn": function (entIndex) {
                    var data = this.option.series[0].data[0];
                    var count = entIndex.length / 3;
                    var index = [];
                    for (var i = 0; i < count; i++) {
                        index.push(entIndex.substr(i * 3, 3));
                    }

                    for (i = 0; i < index.length; i++) {
                        data = data.children[+index[i]].children[0];
                    }
                    if (!data.children || data.children.length === 0) {
                        data.children = [];
                        var childNodes = this.shareholderItemObject[entIndex];
                        for (i = 0; childNodes && i < childNodes.length; i++) {
                            data.children.push($.extend(true, {}, childNodes[i]));
                        }
                    } else {
                        data.children = [];
                    }
                    console.log(data.children,3)
                },

                /**
                 * If replaceText is empty, we will not show that node, otherwise we will display with the offered replaceText.
                 */
                "filterData": function (data, replaceText) {
                    replaceText = '其他';
                    if (data.children && data.children.length !== 0) {
                        var childNodes = data.children;
                        var isExitNodeWillReplaced = 0;
                        for (var i = 0; childNodes && i < childNodes.length; i++) {
                            var currentLine = childNodes[i];
                            var childNode = childNodes[i].children[0];
                            if (childNode.shareholdingRatio <= this.datafilter) {
                                if (this.isEmpty(replaceText)) {
                                    childNodes.splice(i, 1);
                                    i--;
                                } else {
                                    //this.changeArrowDownText(childNode.name, childNode.shareholdingRatio);
                                    if (isExitNodeWillReplaced != 0) { // exits one '其他'
                                        childNodes.splice(i, 1);
                                        i--;
                                    } else {
                                        if (currentLine.cacheName === childNode.name && currentLine.cacheShareholdingRatio === childNode.shareholdingRatio) {
                                            currentLine.name = '-';
                                        }
                                        childNode.children = [];
                                        childNode.isReplacedFlag = !0; // new flag
                                        childNode.value = childNode.name = replaceText;
                                        childNode.shareholdingRatio = "0";
                                        childNode.symbol = "circle";
                                        isExitNodeWillReplaced = 1; // flag one '其他'
                                    }
                                }
                            } else {
                                this.filterData(childNode);
                            }
                        }
                    }
                },

                "changeArrowDownText": function (name, sharehodingRatio) {
                    var current = null;
                    for (var i in this.shareholderItemObject) {
                        if (this.shareholderItemObject[i] && this.shareholderItemObject[i].length > 0) { // "", 000, 000000
                            for (var j in this.shareholderItemObject[i]) {
                                current = this.shareholderItemObject[i][j];
                                if (current.cacheName === name && current.cacheShareholdingRatio === sharehodingRatio) {
                                    return '-';
                                }
                            }
                        }
                    }
                },

                "isEmpty": function (obj) {
                    for (var name in obj) {
                        return false;
                    }
                    return true;
                },

                "addDataAll": function (entIndex) {
                    var data = this.option.series[0].data[0];
                    var count = entIndex.length / 3;
                    var index = [];
                    for (var i = 0; i < count; i++) {
                        index.push(entIndex.substr(i * 3, 3));
                    }
                    for (i = 0; i < index.length; i++) {
                        data = data.children[+index[i]].children[0];
                    }
                    if (this.shareholderItemObject[entIndex]) {
                        data.children = [];
                        var childNodes = this.shareholderItemObject[entIndex];
                        for (i = 0; childNodes && i < childNodes.length; i++) {
                            var childNode = childNodes[i].children[0];
                            if (childNode.shareholdingRatio >= this.datafilter) {
                                data.children.push(childNodes[i]);
                            }
                        }
                    }
                    for (var i = 0; data.children && i < data.children.length; i++) {
                        this.addDataAll(data.children[i].children[0].index);
                    }
                },


                // rectangle
                "changeColor": function (children) {
                    if (!children) return;
                    var parentNode = children;
                    var childNodes = parentNode.children;
                    for (var i = 0; childNodes && i < childNodes.length; i++) {
                        var childNode = childNodes[i].children[0];
                        if (this.repeatShareholderList.indexOf(childNode.value) > -1) { // repeat
                            childNode.itemStyle.normal.color = childNode.itemStyle.emphasis.color = this.repeatShareholderColor[childNode.value]; //;
                            //childNode.symbol = "image://marker.png";
                        } else if (this.shareholderIsLeafObject[childNode.value]) { // leaf
                            childNode.itemStyle.normal.color = childNode.itemStyle.emphasis.color = tupuConfig.chartColor.itemColor; //'#0099cc';
                        } else {
                            childNode.itemStyle.normal.color = childNode.itemStyle.emphasis.color = "#dfdfdf" //"#FFCC00";
                        }
                        if (childNode.shareholderType === 'C') {
                            if (childNode.children && childNode.children.length > 0) {
                                if (!childNode.isReplacedFlag) {
                                    childNode.symbol = "circleMinus";
                                    this.changeColor(childNode);
                                }
                            } else {
                                if (this.shareholderItemObject[childNode.index]) {
                                    if (!childNode.isReplacedFlag) {
                                        childNode.symbol = "circleCross";
                                    }
                                    if (childNode.commonName) {
                                        childNode.symbol = "circle";
                                    }
                                    //childNode.itemStyle.normal.color = childNode.itemStyle.emphasis.color =  "#FFCC00";
                                } else {
                                    childNode.symbol = "circle";
                                }
                            }
                        } else {
                            childNode.symbol = "rectangle";
                        }
                    }
                },

                "init": function (entName, orderNo) {
                    $("#gsname").text(entName);
                    if (!this.isEmpty(initSH)) {
                        this.data = initSH.shareholderItemList;
                        this.option.series[0].data[0].name = this.option.series[0].data[0].value = entName;
                        this.root = entName;
                    } else {
                        this.ajaxData(entName, orderNo);
                    }
                    this.generateNode(this.data, "");
                    this.addDataSyn("");
                    postprocess();
                }
            };
        }

        function ajaxInitSH() {
            $.ajax({
                // type: "POST",
                headers: {
                    'Accept': 'application/json;charset=UTF-8',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                url: "http://localhost:9528/gov/entData/queryStockholder",
                // data: 'entName=' + entName,
                data: {
                    entName: entName,
                    token: window.localStorage.getItem('token')
                },
                async: false,
                success: function (response) {
                    if (response && response.code === '0000') {
                        orderNo = response.orderNo;
                        initSH = response.data;
                    } else {
                        throw new Error(response.msg);
                    }
                }
            })
        }

        function fetchData() {
            myChart = echarts.init(document.getElementById('main'));
            new window.zoomutil({
                dom: $('#main')[0],
                chart: myChart
            }); // add zoomutil feature

            if (entName) {
                ajaxInitSH();
                shareholderChartInit.init(entName, orderNo);
            } else {
                //余额不足
                $("#noMoneyDialog_new").modal("show"); //TODO
            }
            // click event 	add delete node
            myChart.on('click', eClick);
        }

        function resetData() {
            $('#gsname').empty();
            $("#main").empty();
            $(".accounting").empty();
            shareholderChartInit = getShareholderChartInit(); // reset, 控制第二次加载时data.children的if判断
            myChart && myChart.clear();
        }

    

        /* echarts点击事件 */
        function eClick(param) {
            if (param.data.symbol === "rectangle") return;
            if (param.data.symbol === "circleCross") { // can expend
                shareholderChartInit.ajaxData(param.value, orderNo, param.data.index);
                shareholderChartInit.generateNode(shareholderChartInit.data, param.data.index);
            }
            shareholderChartInit.addDataSyn(param.data.index);
            postprocess(param.value);
        }
   
        function postprocess(name) {
            var filterOption = $.extend(true, {}, shareholderChartInit.option);
            shareholderChartInit.filterOption = filterOption;
            // console.log(shareholderChartInit.option)
            //console.log(shareholderChartInit.filterOption)
            shareholderChartInit.filterData(filterOption.series[0].data[0]);
            var data = shareholderChartInit.filterOption.series[0].data[0];
            //init
            shareholderChartInit.allShareholderObject = {};
            shareholderChartInit.stocksCollection = {};
            shareholderChartInit.shareholderCountObject = {};
            shareholderChartInit.shareholderIsLeafObject = {};
            shareholderChartInit.repeatShareholderList = [];
            //stocks pool
            var newDate = $.extend(true, {}, data);
        //    console.log(newDate,'9')
            shareholderChartInit.countStocks(newDate); // 计算股份
            
            //stocks pool sort
            // shareholderChartInit.stocksCollectionSort();
           
            // leaf count
            shareholderChartInit.shareholderIsLeafCount(data);

            //repeat shareholder
            shareholderChartInit.shareholderCount(data);
            shareholderChartInit.countRepeatShareholder();

            //change colors for nodes whih same name
            shareholderChartInit.changeColor(data);

            // var stocksData = shareholderChartInit.stocksCollectionSortList;
            // var stocksString = "";
            // var repeat = [];
            // var i = 0;
            // stocksData.forEach(function (infoArray, index) {
            //     data = $.map(infoArray, function (value, key) {
            //         return [key, value];
            //     });
            //     var dataIndex, nameIndex, dataName;
            //     for (var x = 0; x < shareholderItemListDatas.length; x++) {
            //         if (shareholderItemListDatas[x].indexOf(name) != -1) {
            //             for (var y = 0; y < shareholderItemListDatas.length; y++) {
            //                 if (shareholderItemListDatas[y].indexOf(data[0]) != -1) {
            //                     dataIndex = shareholderItemListDatas[y].split(",")[1];
            //                 }
            //             }
            //             nameIndex = shareholderItemListDatas[x].split(",")[1];
            //         }
            //     }
            //     if (nameIndex) {
            //         if (dataIndex) {
            //             if (dataIndex.indexOf(nameIndex) > -1) {
            //                 dataName = name;
            //             } else {
            //                 dataName = shareholderChartInit.root;
            //             }
            //         }
            //     } else {
            //         dataName = shareholderChartInit.root;
            //     }
            //     if (i < 105) { // show first 105 share holder
            //         //if(data[1] === 0) return;
            //         if (repeat.indexOf(data[1]) === -1) {
            //             repeat.push(data[1]);
            //             i++;
            //         }
            //         stocksString += ("<tr><td style='padding:10px;padding-left: 0;'><span style='height:20px;width:20px;" +
            //             (shareholderChartInit.allShareholderObject[data[0]].shareholderType === 'C' ? "border-radius: 50%;" : "") +
            //             "background:" + (shareholderChartInit.allShareholderColor[data[0]] ? shareholderChartInit.allShareholderColor[data[0]] : "#dfdfdf") +
            //             ";border:1px solid #ddd;display:block'></span></td><td style='width:200px;padding:10px;'><a style='cursor: pointer' data='" +
            //             dataName + "'data-type=" + (shareholderChartInit.allShareholderObject[data[0]].shareholderType === 'C' ? 'C' : 'P') + ">" + data[0] +
            //             "</a></td><td style='width:100px;text-align:right;padding-right:10px;'>" + ((data[1] === 0 || data[1] > 1) ? "-" : (data[1] * 100).toFixed(2) + "%") + "</td></tr>");
            //     } else {
            //         if (repeat.indexOf(data[1]) > -1) {
            //             stocksString += ("<tr><td style='padding:10px;padding-left: 0;'><span style='height:20px;width:20px;" +
            //                 (shareholderChartInit.allShareholderObject[data[0]].shareholderType === 'C' ? "border-radius: 50%;" : "") +
            //                 "background:" + (shareholderChartInit.allShareholderColor[data[0]] ? shareholderChartInit.allShareholderColor[data[0]] : "#dfdfdf") +
            //                 ";border:1px solid #ddd;display:block'></span></td><td style='width:200px;padding:10px;'><a style='cursor: pointer' data='" +
            //                 dataName + "'data-type=" + (shareholderChartInit.allShareholderObject[data[0]].shareholderType === 'C' ? 'C' : 'P') + ">" + data[0] +
            //                 "</a></td><td style='width:100px;text-align:right;padding-right:10px;'>" + ((data[1] === 0 || data[1] > 1) ? "-" : (data[1] * 100).toFixed(2) + "%") + "</td></tr>");
            //             i++;
            //         }
            //     }
            // });

            // if (!stocksString) {
            //     stocksString = "";
            // }
            // $(".accounting").html(stocksString);
            // $(".accounting").find('a').each(function () {
            //     var $this = $(this);
            //     if ($this.attr('data-type') == 'C') {
            //         var companyName = $this.text();
            //         $this.attr({
            //             'href': "/custJump?entName=" + companyName,
            //             'target': "_blank"
            //         });
            //     } else if ($this.attr('data-type') == 'P') {
            //         var gdName = $this.text();
            //         var gsName = $this.attr('data');
            //         $this.attr({
            //             'href': "/custJump?perName=" + gdName + "&companyName=" + gsName,
            //             'target': "_blank"
            //         });
            //     }
            // });

            myChart.clear();
            myChart.setOption(shareholderChartInit.filterOption);
            myChart.resize();
            window.myChart = myChart;
        }

        function pad(num) {
            var len = num.toString().length;
            while (len < 3) {
                num = "0" + num;
                len++;
            }
            return num;
        }

        function isEmpty(obj) {
            for (var name in obj) {
                return false;
            }
            return true;
        }
    });
})($);
