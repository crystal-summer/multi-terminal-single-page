
(function ($) {
    /*----- define config-----------*/
    var tupuConfig = {
        chartColor: {//必须传入
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
  
    console.log($('#main'));
    $(document).ready(function () {
        console.log(echarts)
        // let  echarts = require('./echarts/lib/echarts')
        /* 最终持股人弹窗 */
        $(".ush-close").on("click", function () {
            $(".ush-div").css("display", "none");
        });
        /* 右侧头部菜单栏 */
        $(".tool-menu li").on("click", function () {
            if ($(this).find('span').text() == '持股人' && $(this).hasClass('active')) {
                $(".tool-menu li").removeClass('active');
                $('.tool-body').hide();
            } else if ($(this).find('span').text() == '持股人' && !$(this).hasClass('active')) {
                $(".tool-menu li").removeClass('active');
                $(this).addClass('active');
                $('.tool-body').show();
            } else if ($(this).find('span').text() == '风险' && $(this).hasClass('active')) {
                $(".tool-menu li").removeClass('active');
                $('.tool-body').hide();
            } else if ($(this).find('span').text() == '风险' && !$(this).hasClass('active')) {
                $(".tool-menu li").removeClass('active');
                $(this).addClass('active');
                $('.tool-body').show();
            }
            var contentTabId = $(this).attr('data-contenttab');
            contentTabId && (
                $(".tool-body-item").removeClass('active'),
                    $("#" + contentTabId).addClass('active')
            );
            if ($(this).hasClass("ush")) {
                if ($(this).data("loaded")) {
                    $(window).resize();
                    $(".ush-div").css("display", "block");
                } else {
                    $(window).resize();
                    $(this).data("loaded", !0);
                    $(".ush-div").css("display", "block");
                    drawDialog();
                }
            }
        });
        $(window).resize(function () {
            $('.ush-container').css({
                'width': document.body.scrollWidth,
                'height': document.body.scrollHeight
            });

        })
        /* 右侧头部菜单栏点击关闭事件 */
        $('#closebtn').click(function () {
            $(".tool-menu li").removeClass('active');
            $('.tool-body').hide();
        });
        /* 区间域滑动棒 */
        $("#range").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
            min: 0,
            max: 100,
            from: 0,
            step: 1,
            grid: false,
            onFinish: function (data) {
                shareholderChartInit.datafilter = data.from / 100;
                postprocess();
                $(".range-defuse").show();
                if (data.from != 0) {
                    $("#defuse").html("去掉持股≤" + "<span id='dataFrom' class='data-from'>" + data.from + "</span>" + "%的股东");
                } else if (data.from == 0) {
                    $("#defuse").html("去掉持股" + "<span id='dataFrom' class='data-from'>" + data.from + "</span>" + "%的股东");
                }
                $('#defuse_point').text(data.from + "%");
            },
            onChange: function (data) {
                $(".range-defuse").show();
                if (data.from != 0) {
                    $("#defuse").html("去掉持股≤" + "<span id='dataFrom' style='color:#ff8b00;'>" + data.from + "</span>" + "%的股东");
                } else if (data.from == 0) {
                    $("#defuse").html("去掉持股" + "<span id='dataFrom' style='color:#ff8b00;'>" + data.from + "</span>" + "%的股东");
                }
                $('#defuse_point').text(data.from + "%");
            }
        });
        /* 查看最终持股人 按钮点击 */
        $("#btn_showAll").on("click", function () {
            shareholderChartInit.datafilter = 0;
            slider.update({
                from: 0,
            });
            shareholderChartInit.addDataAll("");
            postprocess();
        });
        /* 导出数据 */
        $("#export_csv, .tool-report").on("click", function () {
            var data = shareholderChartInit.stocksCollectionSortList;
            var csvContent = "";
            data.forEach(function (infoArray, index) {
                data = $.map(infoArray, function (value, key) {
                    var values = (value * 100).toFixed(2) <= 100 ? ((value * 100).toFixed(2) + "%") : "0.00%";
                    var keys = "\"" + key + "\"";
                    return [[keys, values]];
                });
                dataString = data.join(",");
                csvContent += dataString + "\r\n";
            });
            csvContent = "股东名称,持股比例\r\n" + csvContent;
            // csvContent = "\"OSI HONG KONG TRADING CO., LIMITED\",\"100.00%\"";
            var BOM = String.fromCharCode(0xFEFF);
            data = csvContent && BOM + csvContent;
            var blob = new Blob([data], {type: "text/csv;charset=UTF-8"});
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                var success = window.navigator.msSaveOrOpenBlob(blob, "stockholders_report.csv");
                if (!success) {
                    alert("导出失败");
                }
            } else {
                var a = document.createElement("a");
                a.href = window.URL.createObjectURL(blob);
                a.download = "shareholders.csv";
                document.body.appendChild(a);
                a.click();
                a.parentNode.removeChild(a);
            }
        });
        /* 导出截图 */

        $(".tool-downImg").on("click", downImg);
        var slider = $("#range").data("ionRangeSlider");

        window.slider = slider;
        var entName = GetQueryString("company");
        // var entName = "杭州有数金融信息服务有限公司";
        window.entName = entName;

        console.log(entName);
        var initSH;
        var orderNo;
        var shareholderItemListDatas = [];
        var shareholderChartInit = getShareholderChartInit(); //chart data init
        var myChart;
        resetData();
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
                "stocksCollectionSortList": [],

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
                    "series": [
                        {
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
                                        "color": tupuConfig.chartColor.itemLineColor,//"#ccc",
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
                            "data": [
                                {
                                    "index": "",
                                    "name": "",
                                    "value": "",
                                    "symbol": "circle",//"image://marker.png",
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
                                }
                            ],
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
                                y: -1000//ops.series[0].rootLocation.y , // 'center' | 'top' | 'bottom' | 'y%' | 0
                            },
                            data: [{
                                name: "watermark",
                                symbol: "image://../../../plugins/stoHolder/images/yslogo.png",
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
                        url: "/gov/entData/oneLevelStockholder",
                        // data: JSON.stringify({OrderNo: orderNo, entName : entName}),
                        // data: 'orderNo=' + orderNo + '&entName=' + entName,
                        data:{
                            orderNo,
                            entName,
                            token:window.localStorage.getItem('token')
                        },
                        async: false,
                        success: function (response) {
                            if (response && response.code === '0000') {
                                that.data = response.data.shareholderItemList;
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
                            shareholdingRatio: shareholderItem.shareholdingRatio,  //shareholdingRatio
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
                    }
                    ;

                    if (!this.shareholderItemObject[thatIndex] || this.shareholderItemObject[thatIndex].length === 0)
                        this.shareholderItemObject[thatIndex] = shareholderItemListNew;
                },


                //generate ---> stocksCollection
                //param ---> option.series[0].data[0]
                "countStocks": function (children) {
                    if (!children) return;
                    var parentNode = children;
                    var childNodes = parentNode.children;
                    for (var i = 0; i < childNodes.length; i++) {
                        var childNode = childNodes[i].children[0];    //real data
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
                "stocksCollectionSort": function () {
                    var a = $.map(this.stocksCollection, function (value, key) {
                        var jsonVariable = {};
//           		key === '其他' && (value = 0);
                        jsonVariable[key] = value;
                        return jsonVariable;
                    });
                    this.stocksCollectionSortList = a.sort(function (obj1, obj2) {
                        return (function (obj) {
                            for (var o in obj) {
                                return obj[o];
                            }
                        })(obj2) - (function (obj) {
                            for (var o in obj) {
                                return obj[o];
                            }
                        })(obj1);
                    });
                },


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
                            childNode.itemStyle.normal.color = childNode.itemStyle.emphasis.color = this.repeatShareholderColor[childNode.value];   //;
                            //childNode.symbol = "image://marker.png";
                        } else if (this.shareholderIsLeafObject[childNode.value]) { // leaf
                            childNode.itemStyle.normal.color = childNode.itemStyle.emphasis.color = tupuConfig.chartColor.itemColor; //'#0099cc';
                        } else {
                            childNode.itemStyle.normal.color = childNode.itemStyle.emphasis.color = "#dfdfdf"//"#FFCC00";
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
                url: "/gov/entData/queryStockholder",
                // data: 'entName=' + entName,
                data: {
                    entName:entName,
                    token:window.localStorage.getItem('token')
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
            // new window.zoomutil({dom: $('#main')[0], chart: myChart}); // add zoomutil feature

            if (entName) {
                ajaxInitSH();
                shareholderChartInit.init(entName, orderNo);
            } else {
                //余额不足
                // $("#noMoneyDialog_new").modal("show"); //TODO
            }
            // click event 	add delete node
            // var ecConfig = require('echarts/config');
            myChart.on('click', eClick);
            // myChart.on(echarts.config.EVENT.CLICK, eClick);
        }

        function resetData() {
            $('#gsname').empty();
            $("#main").empty();
            $(".accounting").empty();
            shareholderChartInit = getShareholderChartInit(); // reset, 控制第二次加载时data.children的if判断
            myChart && myChart.clear();
        }

        function GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return decodeURIComponent(r[2]);
            return null;
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

        function downImg(type) {
            var n, r, i, img, ops = myChart.getOption();
            n = $("<div/>").appendTo("body");
            wh = calcWH(calcXY(shareholderItemListDatas)),
                n.css({
                    top: 0,
                    left: 5e3,
                    position: "fixed",
                    height: wh.height,
                    width: wh.width
                });
            r = echarts.init(n.get(0), "");
            r.setOption(ops); // reDraw
            // re calc
            var preW = wh.width, preH = wh.height, afterW, maxX = 0, maxY = 0, minX = preW, minY = preH, rootX, rootY,
                currentX, currentY, y = r.getZrender().painter.storage.getShapeList();
            for (m = 0, b = y.length; m < b; m++) {
                g = y[m];
                if (g.type == "icon") {
                    currentX = g.style && g.style.x, currentY = g.style && g.style.y,
                    currentX > maxX && (maxX = currentX),
                    currentX < minX && (minX = currentX),
                    currentY < minY && (minY = currentY),
                    currentY > maxY && (maxY = currentY);
                }
            }
            for (m = 0, b = y.length; m < b; m++) {
                g = y[m], (currentY = g.style && g.style.y), (currentX = g.style && g.style.x);
                if (g.type == "icon" && currentY == maxY) {
                    rootX = currentX, rootY = currentY;
                }
            }
            //console.log("minX:" + minX + ", minY:" + minY + ", maxX:" + maxX + ", maxY:" + maxX + ", rootX:" + rootY+ ", rootY:" + rootY);
            afterW = Math.max(rootX - minX, maxX - rootX) * 2 + 200,
                afterH = maxY - minY + 400,
            afterW < 600 && (afterW = 600);
            afterH < 600 && (afterH = 600);
            n.css({
                height: afterH,
                width: afterW
            });
            var entName = window.entName;
            ops.series[0].rootLocation.x = (afterW - (maxX - minX)) / 2 + (rootX - minX);
            ops.series[1] = {
                type: "tree",
                roam: "",
                rootLocation: {
                    x: 140, //minX,
                    y: 120 //ops.series[0].rootLocation.y , // 'center' | 'top' | 'bottom' | 'y%' | 0
                },
                data: [{
                    name: "watermark",
                    symbol: "image:///yscredit/stoHolder/dist/images/yslogo.png",
                    clickable: !1,
                    hoverable: !1,
                    symbolSize: [120, 35], // 829 × 243
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
            };
            ops.series[1].rootLocation = {x: afterW - 100, y: afterH - 50};
            ops.title = {
                text: entName,
                x: 40,
                y: 20,
                subtext: "* 以下内容仅供参考, 最终解释权归有数金服所有",
                subtextY: afterH - 20
            };
            r.clear(),
                r.setOption(ops)
            r.resize();
            img = document.createElement("img");
            img.src = r.getDataURL({ // http://echarts.baidu.com/api.html#echartsInstance.getDataURL
                type: type || 'png', //pixelRatio: 2, backgroundColor: '#000'
            });
            img.title = entName;

            var userAgent = navigator.userAgent.toLowerCase();//取得浏览器的userAgent字符串
            var isOpera = userAgent.indexOf("opera") > -1; //判断是否Opera浏览器
            var isIE = (!!userAgent.match(/rv:([\d.]+)\) like gecko/) && !isOpera) || (!!userAgent.match(/msie ([\d.]+)/) && !isOpera); //判断是否IE浏览器
            if (isIE) {
                var html = '' + '<body style="margin:0;">' + '<img src="' + img.src + '" style="max-width:100%;" />' + '</body>';
                var tab = window.open();
                tab.document.write(html);
            } else {
                var tempA = $("<a>").attr("href", img.src).attr("download", entName + "_持股人.png").appendTo("body");
                tempA[0].click();
                tempA.remove();
                img.remove();
            }//判断是否IE浏览器

            r.clear(),
                r.dispose();
            n.remove();
        }

        /**
         * max calc nodes width and height num
         */
        function calcXY(shareholderItemListDatas) {
            var x = 0, y = 0, temp, tempArray, tempLength, resultObj = {};
            if (!shareholderItemListDatas) return {x: x, y: y}
            shareholderItemListDatas.forEach(function (current, index) {
                tempArray = shareholderItemListDatas[index].split(",");
                temp = tempArray[1];
                if (temp == "1") {
                    resultObj[0] = 1;
                } else {
                    tempLength = temp.length;
                    !resultObj[tempLength / 3] && (resultObj[tempLength / 3] = 0);
                    resultObj[tempLength / 3] = resultObj[tempLength / 3] + 1;
                }
            });
            console.log(resultObj);
            for (var i in resultObj) {
                y++;
                x = Math.max(x, resultObj[i]);
            }
            return {
                x: x,
                y: y
            };
        }

        /**
         * calc width and height from objec {x, y}
         */
        function calcWH(obj) {
            var width = 0, height = 0;
            if (!obj) return {width: width, height: height}
            // myChart.getOption().series[0].layerPadding, myChart.getOption().series[0].nodePadding;
            return {
                width: (obj.x * 100 + 400) > 600 ? (obj.x * 100 + 400) : 600,
                height: (obj.y * 50 + 400) > 600 ? (obj.y * 50 + 400) : 600
            }
        }

        function postprocess(name) {
            var filterOption = $.extend(true, {}, shareholderChartInit.option);
            shareholderChartInit.filterOption = filterOption;
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

            shareholderChartInit.countStocks(newDate); // 计算股份
            //stocks pool sort
            shareholderChartInit.stocksCollectionSort();

            // leaf count
            shareholderChartInit.shareholderIsLeafCount(data);

            //repeat shareholder
            shareholderChartInit.shareholderCount(data);
            shareholderChartInit.countRepeatShareholder();

            //change colors for nodes whih same name
            shareholderChartInit.changeColor(data);

            var stocksData = shareholderChartInit.stocksCollectionSortList;
            var stocksString = "";
            var repeat = [];
            var i = 0;
            stocksData.forEach(function (infoArray, index) {
                data = $.map(infoArray, function (value, key) {
                    return [key, value];
                });
                var dataIndex, nameIndex, dataName;
                for (var x = 0; x < shareholderItemListDatas.length; x++) {
                    if (shareholderItemListDatas[x].indexOf(name) != -1) {
                        for (var y = 0; y < shareholderItemListDatas.length; y++) {
                            if (shareholderItemListDatas[y].indexOf(data[0]) != -1) {
                                dataIndex = shareholderItemListDatas[y].split(",")[1];
                            }
                        }
                        nameIndex = shareholderItemListDatas[x].split(",")[1];
                    }
                }
                if (nameIndex) {
                    if (dataIndex) {
                        if (dataIndex.indexOf(nameIndex) > -1) {
                            dataName = name;
                        } else {
                            dataName = shareholderChartInit.root;
                        }
                    }
                } else {
                    dataName = shareholderChartInit.root;
                }
                if (i < 105) { // show first 105 share holder
                    //if(data[1] === 0) return;
                    if (repeat.indexOf(data[1]) === -1) {
                        repeat.push(data[1]);
                        i++;
                    }
                    stocksString += ("<tr><td style='padding:10px;padding-left: 0;'><span style='height:20px;width:20px;" +
                        (shareholderChartInit.allShareholderObject[data[0]].shareholderType === 'C' ? "border-radius: 50%;" : "") +
                        "background:" + (shareholderChartInit.allShareholderColor[data[0]] ? shareholderChartInit.allShareholderColor[data[0]] : "#dfdfdf") +
                        ";border:1px solid #ddd;display:block'></span></td><td style='width:200px;padding:10px;'><a style='cursor: pointer' data='" +
                        dataName + "'data-type=" + (shareholderChartInit.allShareholderObject[data[0]].shareholderType === 'C' ? 'C' : 'P') + ">" + data[0] +
                        "</a></td><td style='width:100px;text-align:right;padding-right:10px;'>" + ((data[1] === 0 || data[1] > 1) ? "-" : (data[1] * 100).toFixed(2) + "%") + "</td></tr>");
                } else {
                    if (repeat.indexOf(data[1]) > -1) {
                        stocksString += ("<tr><td style='padding:10px;padding-left: 0;'><span style='height:20px;width:20px;" +
                            (shareholderChartInit.allShareholderObject[data[0]].shareholderType === 'C' ? "border-radius: 50%;" : "") +
                            "background:" + (shareholderChartInit.allShareholderColor[data[0]] ? shareholderChartInit.allShareholderColor[data[0]] : "#dfdfdf") +
                            ";border:1px solid #ddd;display:block'></span></td><td style='width:200px;padding:10px;'><a style='cursor: pointer' data='" +
                            dataName + "'data-type=" + (shareholderChartInit.allShareholderObject[data[0]].shareholderType === 'C' ? 'C' : 'P') + ">" + data[0] +
                            "</a></td><td style='width:100px;text-align:right;padding-right:10px;'>" + ((data[1] === 0 || data[1] > 1) ? "-" : (data[1] * 100).toFixed(2) + "%") + "</td></tr>");
                        i++;
                    }
                }
            });

            if (!stocksString) {
                stocksString = "";
            }
            $(".accounting").html(stocksString);
            $(".accounting").find('a').each(function () {
                var $this = $(this);
                if ($this.attr('data-type') == 'C') {
                    var companyName = $this.text();
                    $this.attr({
                        'href': "/custJump?entName=" + companyName,
                        'target': "_blank"
                    });
                } else if ($this.attr('data-type') == 'P') {
                    var gdName = $this.text();
                    var gsName = $this.attr('data');
                    $this.attr({
                        'href': "/custJump?perName=" + gdName + "&companyName=" + gsName,
                        'target': "_blank"
                    });
                }
            });

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

        /* click ush menu show dialog */
        function drawDialog() {
            var resultWidth = $(".results-body").width();
            var resultIndex = 0;
            var ultimateShareholder = null;//{"shareholderItemList":[{"sharedholderType":"C","shareholdingRatio":"1.0","name":"淘宝中国控股有限公司","shareholderItemList":null,"invType":"10","cerNo":"842504","pripid":null,"regCap":0.0,"invRegCap":37500.0,"subConam":"37500.0","finalRatio":1.0,"served":false,"quoted":false}],"relatedPathItemList":[{"success":true,"message":null,"startNode":"淘宝中国控股有限公司","endNode":"淘宝（中国）软件有限公司","nodeList":[{"name":"淘宝（中国）软件有限公司","id":"1020914928"},{"name":"淘宝中国控股有限公司","id":"1957766594"}],"linkList":[{"startId":"1957766594","endId":"1020914928","relateName":"1","shareholdingRatio":1.0,"position":null,"inShortest":null}]}],"existUnknowShareholdingRatio":false};
            ultimateShareholder = !isEmpty(initSH) && initSH;
            var showMap = !isEmpty(ultimateShareholder) && !ultimateShareholder.existUnknowShareholdingRatio && !isEmpty(ultimateShareholder.relatedPathItemList);
            if (showMap) {
                // var finalRatio = new Number(100*initSH.relatedPathItemList[0].finalRatio).toFixed(2) + "%";
                var finalRatio = (Math.round(10000 * initSH.relatedPathItemList[0].finalRatio) / 100).toFixed(2) + "%";
                if (!(ultimateShareholder.relatedPathItemList.length > 1)) {
                    ultimateShareholder.relatedPathItemList.forEach(function (current, index) {
                        index += resultIndex;
                        if (!isEmpty(current)) {
                            if (!current.success || (current.success && current.nodeList.length === 0)) {
                                var resultItemGroupStr = '<div class="result-item-group">'
                                    + '<div class="result-header text-center" style="margin-top: 20px;"> <span  class="text-start">' + current.startNode + '</span><span class="text-important">实际共持有</span><span class="text-end">' + current.endNode + '</span><span class="text-important">' + finalRatio + '</span><span class="text-important">的股份，是其最大持股股东</span>。</div>'
                                    + '<div class="text-center" ><span class="">' + current.message + '</span></div>'
                                    + '</div>';
                                $(".ush-content").css('height', '560px');
                                $(".results-body").css('height', '560px').append(resultItemGroupStr);
                            } else {
                                if (current.startNode == current.endNode && finalRatio == "0.00%") {
                                    var resultItemGroupStr = '<div class="result-item-group">'
                                        + '<div class="result-header text-center" style="margin-top: 20px;"><span class="text-important">没有该企业股东信息，不能计算最终持股人</span>。</div>'
                                        + '<div id="demo' + index + '" style="width:100%;"></div>'
                                        + '</div>';
                                } else {
                                    var resultItemGroupStr = '<div class="result-item-group">'
                                        + '<div class="result-header text-center" style="margin-top: 20px;"> <span  class="text-start">' + current.startNode + '</span><span class="text-important">实际共持有</span><span class="text-end">' + current.endNode + '</span><span class="text-important">' + finalRatio + '</span><span class="text-important">的股份，是其最大持股股东</span>。</div>'
                                        + '<div id="demo' + index + '" style="width:100%;"></div>'
                                        + '</div>';
                                }
                                $(".ush-content").css('height', '560px');
                                $(".results-body").css('height', '560px').append(resultItemGroupStr);
                            }
                        }
                    });
                } else if (ultimateShareholder.relatedPathItemList.length > 1) {
                    var startNode = '';
                    for (var i = 0; i < ultimateShareholder.relatedPathItemList.length; i++) {
                        startNode += ultimateShareholder.relatedPathItemList[i].startNode + '、';
                    }
                    startNode = startNode.substr(0, startNode.length - 1);
                    var resultItemGroupStr;
                    ultimateShareholder.relatedPathItemList.forEach(function (current, index) {
                        index += resultIndex;
                        if (!isEmpty(current)) {
                            if (!current.success || (current.success && current.nodeList.length === 0)) {
                                resultItemGroupStr = '<div class="result-item-group">'
                                    + '<div class="result-header text-center" style="margin-top: 20px;"> <span  class="text-start">' + startNode + '</span><span class="text-important">分别持有</span><span class="text-end">' + current.endNode + '</span><span class="text-important">' + finalRatio + '</span><span class="text-important">的股份，均为其最大持股股东</span>。</div>'
                                    + '<div class="text-center" ><span class="">' + current.message + '</span></div>'
                                    + '</div>';
                                $(".ush-content").css('height', '560px');
                                $(".results-body").css('height', '560px').append(resultItemGroupStr);
                            } else {
                                resultItemGroupStr = '<div class="result-item-group">'
                                    + '<div class="result-header text-center" style="margin-top: 20px;"> <span  class="text-start">' + startNode + '</span><span class="text-important">分别持有</span><span class="text-end">' + current.endNode + '</span><span class="text-important">' + finalRatio + '</span><span class="text-important">的股份，均为其最大持股股东</span>。</div>'
                                    + '<div id="demo' + index + '" style="width:100%;"></div>'
                                    + '</div>';
                                $(".ush-content").css('height', '560px');

                            }
                        }
                    });
                    $(".results-body").css('height', '560px').append(resultItemGroupStr);
                }
                var linkListData = [], nodeListData = [];

                function deWeight(arr) {
                    var lastArr = [];
                    for (var i = 0; i < arr.length; i++) {
                        if (JSON.stringify(lastArr).indexOf(JSON.stringify(arr[i])) == -1) {
                            lastArr.push(arr[i]);
                        }
                    }
                    return lastArr;
                }

                ultimateShareholder.relatedPathItemList.forEach(function (current, index) {
                    if (current.success) {
                        linkListData.push.apply(linkListData, current.linkList);
                        nodeListData.push.apply(nodeListData, current.nodeList);
                        if (ultimateShareholder.relatedPathItemList.length == index + 1) {
                            current.linkList = linkListData;
                            for (var i = 0; i < nodeListData.length; i++) {

                            }
                            current.nodeList = deWeight(nodeListData);

                            drawRelatedPaths(current, "demo" + index);
                        }
                    }
                });
            } else {
                $(".results-panel").addClass("hidden");
                $(".no-results-panel").removeClass("hidden");
            }
        }

        function drawRelatedPaths(data, chartDivId) {
            console.log(data,chartDivId)
            var relatedPathNodeList, relatedPathLinkList;
            if (!data) {
                /* mock the data */
                data = {}, data.startNode = "杭州有数金融信息服务有限公司", data.endNode = "杭州有数投资管理有限公司";
                relatedPathNodeList = [{
                    "name": "杭州有数金融信息服务有限公司",
                    "id": "Node1",
                    "endNode": false,
                    "startNode": true
                }, {
                    "name": "Node2",
                    "id": "Node2",
                    "endNode": false,
                    "startNode": false
                }, {
                    "name": "Node3",
                    "id": "Node3",
                    "endNode": false,
                    "startNode": false
                }, {
                    "name": "杭州有数投资管理有限公司",
                    "id": "Node4",
                    "endNode": true,
                    "startNode": false
                }];
                relatedPathLinkList = [{
                    "startId": "Node1",
                    "endId": "Node2",
                    "relateName": "投资",
                    "shareholdingRatio": 0.5,
                    "position": null,
                    "inShortest": false
                }, {
                    "startId": "Node2",
                    "endId": "Node4",
                    "relateName": "投资",
                    "shareholdingRatio": 0.5,
                    "position": null,
                    "inShortest": true
                }, {
                    "startId": "Node1",
                    "endId": "Node3",
                    "relateName": "投资",
                    "shareholdingRatio": 0.5,
                    "position": null,
                    "inShortest": true
                }, {
                    "startId": "Node3",
                    "endId": "Node4",
                    "relateName": "投资",
                    "shareholdingRatio": 0.5,
                    "position": null
                }, {
                    "startId": "Node2",
                    "endId": "Node3",
                    "relateName": "任职",
                    "shareholdingRatio": null,
                    "position": "总经理"
                }];
            } else {
                relatedPathNodeList = data.nodeList;
                relatedPathLinkList = data.linkList;
            }
            var startItemList = [];
            var endItemList = [];
            var nodesIds = [];
            /* customize the data 4 zoomcharts */
            relatedPathNodeList.forEach(function (current, index) {
                nodesIds.push(current.id);
                current.name === data.startNode && (current.startNode = !0, startItemList.push(current.id));
                current.name === data.endNode && (current.endNode = !0, endItemList.push(current.id));
                current.loaded = true;
                current.style = {"label": current.name};
            });
            startItemList = uniqItem(startItemList), endItemList = uniqItem(endItemList);
            var existShortest = false;
            relatedPathLinkList.forEach(function (current, index) {
                current.id = "link" + index;
                current.from = current.startId;
                current.to = current.endId;
                current.style = {"toDecoration": "arrow",};
                current.style.label = "投资(" + new Number(100 * current.shareholdingRatio).toFixed(2) + "%)";
                current.inShortest && (current.className = "shortest"), existShortest = true;
            });
            var height = mainHeight();
            var t = new NetChart({
                container: document.getElementById(chartDivId),
                area: {height: height},
                navigation: {mode: "showall", numberOfFocusNodes: 0,},
                data: {
                    dataFunction: function (nodeList, success, error) {
                        var data = {
                            "nodes": relatedPathNodeList,
                            "links": relatedPathLinkList
                        };
                        success(data);
                    }
                },
                //				navigation: {
                //					initialNodes: nodesIds,
                //					mode: "manual"
                //				},
                navigation: {mode: "showall", numberOfFocusNodes: 0, initialNodes: nodesIds,},
                toolbar: {
                    enabled: true, // unshow toolbar
                    items: [
                        {item: "fullscreen", side: "bottom", align: "left"},
                    ]
                },
                legend: {
                    enabled: false, //existShortest,
                    panel: {
                        margin: 10,
                        align: "right",
                        floating: false,
                        location: "inside"
                    },
                },
                style: {
                    nodeStyleFunction: nodeStyle,
                    linkStyleFunction: linkStyle,
                    nodeHovered: {
                        fillColor: "white",
                        shadowColor: "rgba(0,0,0,.6)",
                        shadowOffsetY: 2
                    },
                    linkHovered: {
                        fillColor: "#419a00",
                        shadowColor: "rgba(0,0,0,.6)"
                    },
                    linkLabel: {
                        textStyle: {font: "10px Arial", fillColor: "#000"},
                        backgroundStyle: {fillColor: "rgba(0,153,204,0)", lineColor: "rgba(0,153,204,0)"}
                    },
                    nodeLabel: {
                        textStyle: {font: "11px Arial"},
                    },
                    //node:{display:"text"},
                    //layout:{mode:"static"}
                    linkClasses: [
                        {className: "shortest", style: {fillColor: "#C00000"}} //toDecoration: "arrow"
                    ]
                },
                nodeMenu: {
                    enabled: false,
                    showData: false
                },
                linkMenu: {
                    enabled: false,
                    showData: false
                },
            });

            function nodeStyle(node) {
                /* item */
                node.items = [{
                    text: node.label,
                    aspectRatio: 0, //force single line
                    px: 0, py: -1, x: 0, y: -12,
                    textStyle: {fillColor: "black"},
                    backgroundStyle: {fillColor: "",}
                }];
                node.label = "";
                if (node.data.startNode || node.data.endNode) {
                    node.radius = node.radius + 10;
                    node._labelStyle.textStyle.font = "12px Arial";
                    node.items[0] && (node.items[0].textStyle.font = "14px Arial");
                    node.data.startNode ? (node.fillColor = tupuConfig.chartColor.stockholderColor) : (node.fillColor = tupuConfig.chartColor.currentColor); // "#ff6600", "#0099cc"
                } else {
                    node.fillColor = tupuConfig.chartColor.normalNodeColor;// "#dfdfdf"
                }
                if (!t.firstInit) {// customize flag
                    t.firstInit = true, t.lockNode(startItemList[0], 0, 0), t.lockNode(endItemList[0], 700, 0); // (resultWidth-100)
                    if (relatedPathNodeList.length === 3 && relatedPathLinkList.length === 3) {
                        relatedPathNodeList.forEach(function (node, index) {
                            if (startItemList[0] !== node.id && endItemList[0] !== node.id) {
                                t.lockNode(node.id, 350, -100)
                            }
                            ;
                        });
                    }
                }

            }

            /* 投资用箭头表示，任职用虚线。 */
            function linkStyle(link) {
                link.items = [{   // Default item places just as the regular label.
                    text: link.data.style.label,
                    backgroundStyle: {
                        fillColor: "",
                    },
                    px: 0, ly: 10, py: 10
                }];
                link.label = void 0;
                link.radius = 2;
                /* set color */
                if (link.data.className === "shortest") {
                    link.fillColor = "#C00000";
                } else if (startItemList.indexOf(link.data.from) != -1 || startItemList.indexOf(link.data.to) != -1) {
                    link.fillColor = tupuConfig.chartColor.stockholderColor; // "#ff6600";
                } else if (endItemList.indexOf(link.data.from) != -1 || endItemList.indexOf(link.data.to) != -1) {
                    link.fillColor = tupuConfig.chartColor.currentColor; // "#0099cc";
                } else {
                    link.fillColor = tupuConfig.chartColor.normalNodeColor; //"green";
                }
                /* set line */
                var relateName = link.data.relateName;
                if (relateName === "1") {
                    link.toDecoration = "arrow";
                } else { // 法人, 任职
                    link.lineDash = [5, 5];
                }
            }
        }

        function isEmpty(obj) {
            for (var name in obj) {
                return false;
            }
            return true;
        }

        function uniqItem(array) {
            Array.prototype.unique = function () {
                var res = [];
                var json = {};
                for (var i = 0; i < this.length; i++) {
                    if (!json[this[i]]) {
                        res.push(this[i]);
                        json[this[i]] = 1;
                    }
                }
                return res;
            }
            return array.unique();
        }

        function mainHeight() {
            //		return $(".results-body").height();
            return $(window).height() - $("#header").height() - $("#footer").height() - 140 - 170;
        }
    });
})($);
