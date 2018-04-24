/* 数字变化插件  start */
var numberTrans = {
    createNumHtml: function(args){
        args['num'] = args['num'].toString();
        var oldNum = this.attr("data-cache");
        var strArr = args['num'].split("");
        if(!!oldNum){
            var oldArr = oldNum.split("");
            if(strArr.length == oldArr.length){
                this.changeNum(args['num']);
                return;
            }
        }
        var tmp = '<div class="list-group list-group-nw">\
            <a href="javascript:void(0)" class="list-group-item list-item-se">0</a>\
            <a href="javascript:void(0)" class="list-group-item list-item-se">1</a>\
            <a href="javascript:void(0)" class="list-group-item list-item-se">2</a>\
            <a href="javascript:void(0)" class="list-group-item list-item-se">3</a>\
            <a href="javascript:void(0)" class="list-group-item list-item-se">4</a>\
            <a href="javascript:void(0)" class="list-group-item list-item-se">5</a>\
            <a href="javascript:void(0)" class="list-group-item list-item-se">6</a>\
            <a href="javascript:void(0)" class="list-group-item list-item-se">7</a>\
            <a href="javascript:void(0)" class="list-group-item list-item-se">8</a>\
            <a href="javascript:void(0)" class="list-group-item list-item-se">9</a>\
        </div>';
        this.empty();
        this.append('<div class="num-box"></div>');
        this.children().css("height", "100%");
        this.children().css("float", "left");
        this.children().css("height", "60px");
        this.children().css("overflow", "hidden");
        var strArr = args['num'].split("");
        for(var i=0;i<strArr.length;i++){
            this.children().append(tmp);
        }
        $(".list-item-se").css("font-size", "33px");
        $(".list-item-se").css("height", "60px");
        this.children().append('<div style="clear:both"></div>');
        var ch = this.children().width();
        var th = this.width();
        this.children().css("margin-left", (th-ch)/2 + 'px');
        var orderNum = [];
        for(var i=0;i<strArr.length;i++){
            var index = 0;
            if(strArr[i] == ','){
                index = 10;
            }else{
                index = +strArr[i];
            }
            orderNum.push(index);
            var h = this.children().height();
            this.children().children().eq(i).animate({top: -index*h+'px'}, index*250);
        }
        this.attr("data-cache", args['num']);

        // function changeNum(obj, num){
        //  var oldNum = obj.attr("data-cache");
        //  var flag = !!num;
        //  if(!flag) return;
        //  flag = num.length;
        //  if(flag < 1) return;
        //  var newArr = num.split('');
        //  var oldArr = oldNum.split('');
        //  for(var i=0;i<newArr.length;i++){
        //      var index = 0;
        //      if(newArr[i] == ","){
        //          var tIndex = 10;
        //          if(oldArr[i] != ","){
        //              index = tIndex - (+oldArr[i]);
        //          }
        //      }else{
        //          if(oldArr[i] != ","){
        //              index = (+newArr[i] - +oldNum[i]);
        //          }else{
        //              index = (+newArr[i] - 10);
        //          }
        //      }
        //      var h = obj.children().height();
        //      var top = +obj.children().children().eq(i).css("top").slice(0, -2);
        //      obj.children().children().eq(i).animate({top: -index*h+top + 'px'}, Math.abs(index)* 250);
        //  }
        // }
    },
    changeNum: function(num){
        num = num.toString();
        var oldNum = this.attr("data-cache");
        var flag = !!num;
        if(!flag) return;
        flag = num.length;
        if(flag < 1) return;
        var newArr = num.split('');
        var oldArr = oldNum.split('');
        for(var i=0;i<newArr.length;i++){
            var index = 0;
            if(newArr[i] == ","){
                var tIndex = 10;
                if(oldArr[i] != ","){
                    index = tIndex - (+oldArr[i]);
                }
            }else{
                if(oldArr[i] != ","){
                    index = (+newArr[i] - +oldNum[i]);
                }else{
                    index = (+newArr[i] - 10);
                }
            }
            var h = this.children().height();
            var top = +this.children().children().eq(i).css("top").slice(0, -2);
            this.children().children().eq(i).animate({top: -index*h+top + 'px'}, Math.abs(index)* 250);
        }
        this.attr("data-cache", num);
    }
}
$.fn.extend(numberTrans);
/* 数字变化插件 end */

(function() {
    var rentSiteRank=[], allRunCity=[], currCity={};
    var bicycleData = {
        currCity: {
            td_cityN: 162,
            td_siteN: 162398,
            td_carN: 132984,
            td_cardUserN: 278349,
            td_cardRentN: 2349384,
            td_phoneRentN: 187304,
            allCityN: 108,
            cityAllSite: 107,
            dunw: 17,
            useDunw: 3,
            rentCar: 5491,
            repayCar: 5463,
            cityAllCar: 2802,
            allHotLine: 648,
            suLine: 592,
            enLine: 56,
            nullSite: 14
        }
    }
    /* 总体数据 e */
    /* 当前城市数据 s */
    rentSiteRank = [
        {name: '新青年广场', value: 229},
        {name: '农村合作银行', value: 142},
        {name: '景文百货', value: 130},
        {name: '利时广场', value: 127},
        {name: '家景新城（瑶琳路）', value: 126}
    ]
    allRunCity = [
        {name: '桐庐',value: 107, geo: [119.560462,29.836582], ratio: 1, symbolSize:20},
        {name: '余姚',value: 20, geo: [121.152779,29.996457], ratio: 1.2, symbolSize:20},
        {name: '慈溪',value: 20, geo: [121.338408,30.189257], ratio: 0.8, symbolSize:20},
        {name: '滁州',value: 20, geo: [118.324570,32.317351], ratio: 1.7, symbolSize:20},
        {name: '天长',value: 20, geo: [118.972913,32.721214], ratio: 0.9, symbolSize:20},
        {name: '沂水',value: 20, geo: [118.609358,35.914369], ratio: 0.7, symbolSize:20},
        {name: '临沂',value: 20, geo: [118.340768,35.072409], ratio: 8.0, symbolSize:20},
        {name: '高明',value: 20, geo: [112.683258,22.824523], ratio: 0.6, symbolSize:20}
    ]
    currCity = allRunCity[0];
    /* 当前城市数据 s */
    function bikeData(){
        this._init_ = function(){
            // 今日城市数
            $('.td-cityN').text(bicycleData.currCity.td_cityN);
            // 今日站点数
            $('.td-siteN').text(bicycleData.currCity.td_siteN);
            // 今日车辆数
            $('.td-carN').text(bicycleData.currCity.td_carN);
            // 今日卡用户数
            $('.td-card-userN').text(bicycleData.currCity.td_cardUserN);
            // 今日卡租用量
            $('.td-card-rentN').text(bicycleData.currCity.td_cardRentN);
            // 今日手机租用量
            $('.td-phone-rentN').text(bicycleData.currCity.td_phoneRentN);
            // 总城市数
            $('.allCityN').text(bicycleData.currCity.allCityN);

            // 当前城市总站点数
            $('.current-city-allSite p:last-child').text(bicycleData.currCity.cityAllSite);
            // 总蹲位数
            $('.current-city-dunw p:last-child').text(bicycleData.currCity.dunw);
            // 当日总租车量
            $('.current-city-rentCar p:last-child').text(bicycleData.currCity.rentCar);
            // 总车辆数
            $('.current-city-carNum p:last-child').text(bicycleData.currCity.repayCar);
            // 总热线数
            $('.service-hotline-top td:last-child').text(bicycleData.currCity.allHotLine);
            // 已接通热线数
            $('.service-success-line p:last-child').text(bicycleData.currCity.suLine);
            // 未接通热线数
            $('.service-failed-line p:last-child').text(bicycleData.currCity.enLine);
            // 总站点数
            $('.city-all-site').text(bicycleData.currCity.cityAllSite);
            // 全满站点数
            $('.city-allFullSite-num').text(bicycleData.currCity.dunw);
            // 全控站点数
            $('.city-allNilSite-num').text(bicycleData.currCity.nullSite);

            bikePieChart();

        }
        /*
            @params = {
                name: ’当前城市名称‘，
                repayCar: '还车量',
                rentCar: '租车量'.
                rentSiteRank: '站点排名top5',
                allRunCity: '正在运行的城市',
                currCity: '当前城市'
            }
        */
        this.setCustomOption = function(currCity){
            // 今日城市数
            $('.td-cityN').text(currCity.td_cityN);
            // 今日站点数
            $('.td-siteN').text(currCity.td_siteN);
            // 今日车辆数
            $('.td-carN').text(currCity.td_carN);
            // 今日卡用户数
            $('.td-card-userN').text(currCity.td_cardUserN);
            // 今日卡租用量
            $('.td-card-rentN').text(currCity.td_cardRentN);
            // 今日手机租用量
            $('.td-phone-rentN').text(currCity.td_phoneRentN);
            // 总城市数
            $('.allCityN').text(currCity.allCityN);

            // 当前城市
            $('.current-city-name').text(currCity.name);
            // 
            $('.rent-car-title').text(currCity.name + '站点租车排名');
            // top1
            $('.top1 p:first-child').text(currCity.obj[0]['name']);
            $('.top1 p:last-child').text(currCity.obj[0]['value']);
            // top2 
            $('.top2 p:first-child').text(currCity.obj[1]['name']);
            $('.top2 p:last-child').text(currCity.obj[1]['value']);
            // top3 
            $('.top3 p:first-child').text(currCity.obj[2]['name']);
            $('.top3 p:last-child').text(currCity.obj[2]['value']);
            // top4 
            $('.top4 p:first-child').text(currCity.obj[3]['name']);
            $('.top4 p:last-child').text(currCity.obj[3]['value']);
            // top5 
            $('.top5 p:first-child').text(currCity.obj[4]['name']);
            $('.top5 p:last-child').text(currCity.obj[4]['value']);
            // 当前城市总站点数
            $('.current-city-allSite p:last-child').text(currCity.cityAllSite);
            // 总蹲位数
            $('.current-city-dunw p:last-child').text(currCity.dunw);
            // 当日总租车量
            $('.current-city-rentCar p:last-child').text(currCity.rentCar);
            // 总车辆数
            $('.current-city-carNum p:last-child').text(currCity.repayCar);
            // 城市服务热线情况
            //$('.hot-line-title').text(currCity.name + '站点服务热线情况');
            // 总热线数
            $('.service-hotline-top td:last-child').text(currCity.allHotLine);
            // 已接通热线数
            $('.service-success-line p:last-child').text(currCity.suLine);
            // 未接通热线数
            $('.service-failed-line p:last-child').text(currCity.enLine);
            // 接通热线进度
            $('.progress-service-success').css('width', (~~((currCity.suLine / currCity.allHotLine) * 100)) + '%');
            // 未接通热线进度
            $('.progress-service-failed').css('width', 100 - (~~(((currCity.suLine / currCity.allHotLine) * 100))) + '%');
            // 城市站点情况
            $('.citySite-title').text(currCity.name + '站点情况');
            // 总站点数
            $('.city-all-site').text(currCity.cityAllSite);
            // 全满站点数
            $('.city-allFullSite-num').text(currCity.dunw);
            // 全空站点数
            $('.city-allNilSite-num').text(currCity.nullSite);

            var data = [
                {value: currCity.cityAllSite, name:'总站点数'},
                {value: currCity.repayCar, name:'总车辆数'},
                {value: currCity.dunw, name:'当日租用人数'},
                {value: currCity.rentCar, name:'当日租车辆'}
            ]
            bikePieChart(data);
        }
        this._init_();
    }

    function bikePieChart(data){
        var dom = document.getElementById("J_bike_pie");
        var chart = echarts.init(dom);
        var option = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            grid:{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            },
            calculable : true,
            series : [
                {
                    name:'半径模式',
                    type:'pie',
                    radius : ['20%', '40%'],
                    center : ['50%', '50%'],
                    roseType : 'radius',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    lableLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: data || [
                        {value: 507, name:'总站点数'},
                        {value: 1171, name:'总车辆数'},
                        {value: 2491, name:'当日租用人数'},
                        {value: 2463, name:'当日租车辆'}
                    ],
                    color: ['#5BB430', '#99D2DD', '#FFF100', '#3798CC']
                },{
                    name:'半径模式',
                    type:'pie',
                    radius : ['50%','52%'],
                    center : ['50%', '50%'],
                    roseType : 'radius',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    lableLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle:{
                        normal:{
                            color: '#fff'
                        }
                    },
                    data:[
                        {value:10, name:'总站点数'},
                    ]
                },{
                    name:'半径模式',
                    type:'pie',
                    radius : ['58%','60%'],
                    center : ['50%', '50%'],
                    roseType : 'radius',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        },
                        formatter: function(obj){
                            return obj.name + '\r\n' + '241414';
                        }
                    },
                    lableLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle:{
                        normal:{
                            color: '#fff'
                        }
                    },
                    data:[
                        {value:10, name:'总站点数'},
                        {value:10, name:'总车辆数'},
                        {value:10, name:'当日租用人数'},
                        {value:10, name:'当日租车辆'}
                    ]
                }
            ]
        }
        chart.setOption(option);
        window.addEventListener("resize", chart.resize);
    }
    /*
        name: 'drawRentCarStatus',
        interface: '',
    */
    // function setCustomIOption = function(opt){
    //     var option = this.getOption();
    //     option.legend[1].name =opt['a'];
    //     this.setOption(option);
    // }
    /*
    function drawRentCarStatus() {
        var dom, option = null, chart;
        dom = document.getElementById("J_rent_car");
        option = {
            title: {
                text: '杭州租换车情况',
                textStyle: {
                    color: 'white',
                    fontSize: 16,
                    fontFamily: '微软雅黑'
                }
            },
            grid:{
                top:0,
                bottom:0
            },
            legend: {
                orient: 'horizontal',
                bottom: '0',
                itemWidth: 13,
                itemHeight: 13,
                x: 'left',
                data:[
                    {
                        name: '租车量',
                        textStyle: {
                            color: '#299AC9'
                        }
                    },
                    {
                        name: '还车量',
                        textStyle: {
                            color: '#58B242'
                        }
                    }
                ]
            },
            series: [
                {
                    name:'还车量',
                    type:'pie',
                    radius: ['25%', '35%'],
                    selectedMode: 'single',
                    itemStyle: {
                        normal: {
                            color: '#58B242'
                        }
                    },
                    data:[
                        {value: 600, name:'还车量 600', labelLine: {
                            normal: {
                                length: 30
                            }
                        }},
                        {value: 5463, itemStyle:{
                            normal:{
                                color: '#0A0B20'
                            }
                        }}
                    ],
                    slient: true
                },
                {
                    name:'租车量',
                    type:'pie',
                    radius: ['45%', '55%'],
                    itemStyle: {
                        normal: {
                            color: '#299AC9'
                        }
                    },
                    data:[
                        {value: 800, itemStyle:{
                            normal:{
                                color: '#0A0B20'
                            }
                        }},
                        {value: 5491, name:'租车量 5491'}
                    ],
                    silent: true
                },
            ],
            animationDuration: 1500,
            animationEasingUpdate: 1500,
            animationDurationUpdate: 1500

        };
        chart = commUtil.drawPieChart(dom, option);
        // chart.setOption(option);
        window.addEventListener("resize", chart.resize);
        //setCustomIOption.call(chart);
        chart.setCustomOption = function(opt){
            var option = this.getOption();
            option.series[0].data[1].value = opt['repayCar'] / 4;
            option.series[0].data[0].name = '还车量 ' + opt['repayCar'];
            option.series[0].data[0].value = opt['repayCar'];
            option.series[1].data[0].value = opt['rentCar'] / 4;
            option.series[1].data[1].value = opt['rentCar'];
            option.series[1].data[1].name = '租车量 ' + opt['rentCar'];
            option.title[0]['text'] = opt.name + '租换车情况';
            this.setOption(option);            
        }
        return chart;
    };
    */

    function drawLineChart() {
        var chart, option = null;
        chart = echarts.init(document.getElementById('J_rent_car_line'));
        option = {
            title: {
                text: '24小时租用量的曲线图',
                textStyle: {
                    color: '#FFF',
                    fontSize: 16,
                    fontFamily: '微软雅黑'
                }
            },
            legend:{
                right: '10%',
                top: '10%',
                textStyle:{
                    color: '#fff'
                },
                data:['今天', '昨天']
            },
            grid: {
                top: '24%',
                bottom: '12%',
                left: '16%'
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    textStyle: {
                        color: '#FFF'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#008BC5'
                    }
                },
                data: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: '#FFF'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#008BC5'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#	',
                    }
                },
            },
            series: [
                {
                    name:'今天',
                    type:'line',
                    lineStyle: {
                        normal: {
                            color: '#3798CC'
                        }
                    },
                    data:[4200, 13005, 24100, 18200, 5260, 9650, 4530, 4200, 13005, 24100, 18200, 5260, 9650]
                },
                {
                    name:'昨天',
                    type:'line',
                    lineStyle: {
                        normal: {
                            color: '#5BB430'
                        }
                    },
                    data:[3200, 9005, 6100, 24100, 13800, 8650, 4530, 3200, 9005, 6100, 24100, 13800, 8650]
                }
            ]
        };
        chart.setOption(option);
        window.addEventListener('resize', chart.resize);
        chart.setCustomOption = function(opt) {
            option.series[0].data = opt.line1;
            option.series[1].data = opt.line2;
            this.setOption(option);
        }
        return chart;
    };

    /*
        name: 'drawCarRentRank',
        interface: '',
        desc: '租车点排名'
    */
    /*
    function drawCarRentRank(){
        var chart, option = null;
        chart = echarts.init(document.getElementById("J_car_rental_ranking"));
        option = {
            title: {
                text: '',
                textStyle: {
                    color: 'white',
                    fontSize: 16,
                    fontFamily: '微软雅黑'
                }
            },
            grid:{
                top: 0,
                bottom: 0
            },
            series : [
                {
                    name:'半径模式',
                    type:'pie',
                    radius : [50, 70],
                    center : ['50%', '50%'],
                    roseType : 'radius',
                    data:[
                        {
                            value: 25,
                            name: '西湖区站点',
                            itemStyle: {
                                normal: {
                                    color: '#95D2DB'
                                }
                            }
                        },
                        {
                            value: 55,
                            name: '西湖站点',
                            itemStyle: {
                                normal: {
                                    color: '#FFCB3C'
                                }
                            }
                        },
                        {
                            value: 65,
                            name: '黄龙站点',
                            itemStyle: {
                                normal: {
                                    color: '#299AC9'
                                }
                            }
                        },
                        {
                            value: 18,
                            name: '江干区站点',
                            itemStyle: {
                                normal: {
                                    color: '#FFF'
                                }
                            }
                        },
                        {
                            value: 45,
                            name: '滨江站点',
                            itemStyle: {
                                normal: {
                                    color: '#58B242'
                                }
                            }
                        }
                    ]
                }
            ],
            animationDuration: 1500,
            animationEasingUpdate: 1500,
            animationDurationUpdate: 1500
        };
        chart.setOption(option);
        window.addEventListener("resize", chart.resize);
        chart.setCustomOption = function(opt) {
            var option = this.getOption();
            for (var i = 0; i < opt.obj.length; i++) {
                option.series[0].data[i].name = opt.obj[i]['name'];
                option.series[0].data[i].value = opt.obj[i]['value'];
            }
            this.setOption(option);
        }
        return chart;
    };
    */

    /*
        name: 'getRentCount'
        interface:  
        desc: 租车量接口
    */
    (function getRentCarNum(){
        $('.rent-car-num').createNumHtml({num: 549112});
        $('.all-rent-car-num').createNumHtml({num: 294561365});
        $('.user-num').createNumHtml({num: 6446});
    }());
    /*
        name: 'drawMap',
        interface: '',
        desc: '地图'
    */
    function drawMap() {
        var data = [
            {name: currCity.name,value: currCity.value},
            {name: '德阳', value: 93, itemStyle:{
                normal:{
                    color: '#fc021a'
                }
            }},
            {name: '九江', value: 96, itemStyle:{
                normal:{
                    color: '#fc021a'
                }
            }},
            {name: '兰州', value: 99, itemStyle:{
                normal:{
                    color: '#fc021a'
                }
            }},
            {name: '沧州', value: 100, itemStyle:{
                normal:{
                    color: '#fc021a'
                }
            }},
            {name: '临沂', value: 103, itemStyle:{
                normal:{
                    color: '#fc021a'
                }
            }},
            {name: '泰安', value: 112, itemStyle:{
                normal:{
                    color: '#fc021a'
                }
            }},
            {name: '哈尔滨', value: 114, itemStyle:{
                normal:{
                    color: '#fc021a'
                }
            }},
            {name: '芜湖', value: 117, itemStyle:{
                normal:{
                    color: '#fc021a'
                }
            }},
            {name: '平顶山', value: 119,itemStyle:{
                normal:{
                    color: '#fc021a'
                }
            }},
            {name: '邢台', value: 119, itemStyle:{
                normal:{
                    color: '#fc021a'
                }
            }},
            {name: '宜昌', value: 130, itemStyle:{
                normal:{
                    color: '#f2e700'
                }
            }},
            {name: '洛阳', value: 134, itemStyle:{
                normal:{
                    color: '#f2e700'
                }
            }},
            {name: '秦皇岛', value: 136, itemStyle:{
                normal:{
                    color: '#f2e700'
                }
            }},
            {name: '石家庄', value: 147, itemStyle:{
                normal:{
                    color: '#f2e700'
                }
            }},
            {name: '常德', value: 152, itemStyle:{
                normal:{
                    color: '#f2e700'
                }
            }},
            {name: '长沙', value: 175, itemStyle:{
                normal:{
                    color: '#f2e700'
                }
            }},
            {name: '廊坊', value: 193, itemStyle:{
                normal:{
                    color: '#f2e700'
                }
            }},
            {name: '菏泽', value: 194, itemStyle:{
                normal:{
                    color: '#f2e700'
                }
            }},
            {name: '武汉', value: 273, itemStyle:{
                normal:{
                    color: '#f2e700'
                }
            }},
            {name: '大庆', value: 279, itemStyle:{
                normal:{
                    color: '#f2e700'
                }
            }}
        ];
        var geoCoordMap = {
            '海门':[121.15,31.89],
            '鄂尔多斯':[109.781327,39.608266],
            '招远':[120.38,37.35],
            '舟山':[122.207216,29.985295],
            '齐齐哈尔':[123.97,47.33],
            '盐城':[120.13,33.38],
            '赤峰':[118.87,42.28],
            '青岛':[120.33,36.07],
            '乳山':[121.52,36.89],
            '金昌':[102.188043,38.520089],
            '泉州':[118.58,24.93],
            '莱西':[120.53,36.86],
            '日照':[119.46,35.42],
            '胶南':[119.97,35.88],
            '南通':[121.05,32.08],
            '拉萨':[91.11,29.97],
            '云浮':[112.02,22.93],
            '梅州':[116.1,24.55],
            '文登':[122.05,37.2],
            '上海':[121.48,31.22],
            '攀枝花':[101.718637,26.582347],
            '威海':[122.1,37.5],
            '承德':[117.93,40.97],
            '厦门':[118.1,24.46],
            '汕尾':[115.375279,22.786211],
            '潮州':[116.63,23.68],
            '丹东':[124.37,40.13],
            '太仓':[121.1,31.45],
            '曲靖':[103.79,25.51],
            '烟台':[121.39,37.52],
            '福州':[119.3,26.08],
            '瓦房店':[121.979603,39.627114],
            '即墨':[120.45,36.38],
            '抚顺':[123.97,41.97],
            '玉溪':[102.52,24.35],
            '张家口':[114.87,40.82],
            '阳泉':[113.57,37.85],
            '莱州':[119.942327,37.177017],
            '湖州':[120.1,30.86],
            '汕头':[116.69,23.39],
            '昆山':[120.95,31.39],
            '宁波':[121.56,29.86],
            '湛江':[110.359377,21.270708],
            '揭阳':[116.35,23.55],
            '荣成':[122.41,37.16],
            '连云港':[119.16,34.59],
            '葫芦岛':[120.836932,40.711052],
            '常熟':[120.74,31.64],
            '东莞':[113.75,23.04],
            '河源':[114.68,23.73],
            '淮安':[119.15,33.5],
            '泰州':[119.9,32.49],
            '南宁':[108.33,22.84],
            '营口':[122.18,40.65],
            '惠州':[114.4,23.09],
            '江阴':[120.26,31.91],
            '蓬莱':[120.75,37.8],
            '韶关':[113.62,24.84],
            '嘉峪关':[98.289152,39.77313],
            '广州':[113.23,23.16],
            '延安':[109.47,36.6],
            '太原':[112.53,37.87],
            '清远':[113.01,23.7],
            '中山':[113.38,22.52],
            '昆明':[102.73,25.04],
            '寿光':[118.73,36.86],
            '盘锦':[122.070714,41.119997],
            '长治':[113.08,36.18],
            '深圳':[114.07,22.62],
            '珠海':[113.52,22.3],
            '宿迁':[118.3,33.96],
            '咸阳':[108.72,34.36],
            '铜川':[109.11,35.09],
            '平度':[119.97,36.77],
            '佛山':[113.11,23.05],
            '海口':[110.35,20.02],
            '江门':[113.06,22.61],
            '章丘':[117.53,36.72],
            '肇庆':[112.44,23.05],
            '大连':[121.62,38.92],
            '临汾':[111.5,36.08],
            '吴江':[120.63,31.16],
            '石嘴山':[106.39,39.04],
            '沈阳':[123.38,41.8],
            '苏州':[120.62,31.32],
            '茂名':[110.88,21.68],
            '嘉兴':[120.76,30.77],
            '长春':[125.35,43.88],
            '胶州':[120.03336,36.264622],
            '银川':[106.27,38.47],
            '张家港':[120.555821,31.875428],
            '三门峡':[111.19,34.76],
            '锦州':[121.15,41.13],
            '南昌':[115.89,28.68],
            '柳州':[109.4,24.33],
            '三亚':[109.511909,18.252847],
            '自贡':[104.778442,29.33903],
            '吉林':[126.57,43.87],
            '阳江':[111.95,21.85],
            '泸州':[105.39,28.91],
            '西宁':[101.74,36.56],
            '宜宾':[104.56,29.77],
            '呼和浩特':[111.65,40.82],
            '成都':[104.06,30.67],
            '大同':[113.3,40.12],
            '镇江':[119.44,32.2],
            '桂林':[110.28,25.29],
            '张家界':[110.479191,29.117096],
            '宜兴':[119.82,31.36],
            '北海':[109.12,21.49],
            '西安':[108.95,34.27],
            '金坛':[119.56,31.74],
            '东营':[118.49,37.46],
            '牡丹江':[129.58,44.6],
            '遵义':[106.9,27.7],
            '绍兴':[120.58,30.01],
            '扬州':[119.42,32.39],
            '常州':[119.95,31.79],
            '潍坊':[119.1,36.62],
            '重庆':[106.54,29.59],
            '台州':[121.420757,28.656386],
            '南京':[118.78,32.04],
            '滨州':[118.03,37.36],
            '贵阳':[106.71,26.57],
            '无锡':[120.29,31.59],
            '本溪':[123.73,41.3],
            '克拉玛依':[84.77,45.59],
            '渭南':[109.5,34.52],
            '马鞍山':[118.48,31.56],
            '宝鸡':[107.15,34.38],
            '焦作':[113.21,35.24],
            '句容':[119.16,31.95],
            '北京':[116.46,39.92],
            '徐州':[117.2,34.26],
            '衡水':[115.72,37.72],
            '包头':[110,40.58],
            '绵阳':[104.73,31.48],
            '乌鲁木齐':[87.68,43.77],
            '枣庄':[117.57,34.86],
            '杭州':[120.19,30.26],
            '淄博':[118.05,36.78],
            '鞍山':[122.85,41.12],
            '溧阳':[119.48,31.43],
            '库尔勒':[86.06,41.68],
            '安阳':[114.35,36.1],
            '开封':[114.35,34.79],
            '济南':[117,36.65],
            '德阳':[104.37,31.13],
            '温州':[120.65,28.01],
            '九江':[115.97,29.71],
            '邯郸':[114.47,36.6],
            '临安':[119.72,30.23],
            '兰州':[103.73,36.03],
            '沧州':[116.83,38.33],
            '临沂':[118.35,35.05],
            '南充':[106.110698,30.837793],
            '天津':[117.2,39.13],
            '富阳':[119.95,30.07],
            '泰安':[117.13,36.18],
            '诸暨':[120.23,29.71],
            '郑州':[113.65,34.76],
            '哈尔滨':[126.63,45.75],
            '聊城':[115.97,36.45],
            '芜湖':[118.38,31.33],
            '唐山':[118.02,39.63],
            '平顶山':[113.29,33.75],
            '邢台':[114.48,37.05],
            '德州':[116.29,37.45],
            '济宁':[116.59,35.38],
            '荆州':[112.239741,30.335165],
            '宜昌':[111.3,30.7],
            '义乌':[120.06,29.32],
            '丽水':[119.92,28.45],
            '洛阳':[112.44,34.7],
            '秦皇岛':[119.57,39.95],
            '株洲':[113.16,27.83],
            '石家庄':[114.48,38.03],
            '莱芜':[117.67,36.19],
            '常德':[111.69,29.05],
            '保定':[115.48,38.85],
            '湘潭':[112.91,27.87],
            '金华':[119.64,29.12],
            '岳阳':[113.09,29.37],
            '长沙':[113,28.21],
            '衢州':[118.88,28.97],
            '廊坊':[116.7,39.53],
            '菏泽':[115.480656,35.23375],
            '合肥':[117.27,31.86],
            '武汉':[114.31,30.52],
            '大庆':[125.03,46.58]
        };
        geoCoordMap[currCity.name] = currCity.geo;
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value),
                        itemStyle: data[i].itemStyle || {normal:{color:'#EA4217', shadowBlur:50, shadowColor:'#EA4217'}},
                        symbolSize: !!data[i].itemStyle ? 12 : 20
                    });
                }
            }
            return res;
        };
        var chart = echarts.init(document.getElementById("J_mo_map"));
        option = {
            geo: {
                roam: 'scale',
                zoom: 2
            },
            grid:{
                left: '0',
                right: '0',
                top: '0',
                bottom: '0'
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                zoom: 1.2,
                roam: false,
                itemStyle: {
                        normal: {
                            areaColor: '#4385f5',
                            borderColor: '#00356D'
                        },
                        emphasis: {
                            areaColor: '#60BD47'
                        }
                    },
            },
            series: [
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: (function(){return convertData(data)}()),
                    symbolSize: function (val) {
                        // return (val[2] % 30) ;
                        return 12;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true,
                            textStyle: {
                                fontSize: '12'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#EA4217',
                            shadowBlur: 0,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 3
                }
            ],
            // animationDuration: 1500,
            // animationEasingUpdate: 1500,
            // animationDurationUpdate: 1500
        };
        chart.setOption(option);
        window.addEventListener("resize", chart.resize);
        chart.setCustomOption = function(opt) {
            var option = this.getOption();
            option.series[0].data.shift();
            option.series[0].data.unshift(opt.data[0]);
            console.log(opt);
            console.log(option.series[0].data);
            this.setOption(option);
        }
        return chart;

    };

    /*
        name: 'drawSiteStatus',
        interface: '',
        desc: '站点情况'
    */
    function drawSiteStatus() {
        var dom, option = null, chart;
        dom = document.getElementById("J_site_status");
        option = {
            title: {
                text: '杭州站点情况',
                textStyle: {
                    color: 'white',
                    fontSize: 16,
                    fontFamily: '微软雅黑'
                }
            },
            legend: {
                orient: 'vertical',
                bottom: '0',
                itemWidth: 13,
                itemHeight: 13,
                x: 'left',
                data:[
                    {
                        name: '',
                        textStyle: {
                            color: '#58B242'
                        }
                    },
                    {
                        name: '',
                        textStyle: {
                            color: '#299AC9'
                        }
                    }
                ]
            },
            series: [
                {
                    name:'在架车辆数  3',
                    type:'pie',
                    radius: ['18%', '30%'],
                    selectedMode: 'single',
                    itemStyle: {
                        normal: {
                            color: '#299AC9'
                        }
                    },
                    data:[
                        {value:0, itemStyle:{
                            normal:{
                                color: '#0A0B20'
                            }
                        }},
                        {value:3, name:'在架车辆数', labelLine: {
                            normal: {
                                length: 30
                            }
                        }}
                    ]
                },
                {
                    name:'总蹲位数  17',
                    type:'pie',
                    radius: ['40%', '55%'],
                    itemStyle: {
                        normal: {
                            color: '#58B242'
                        }
                    },

                    data:[
                        {value: 18, name:'总蹲位数'},
                        {value: 0, itemStyle:{
                            normal:{
                                color: '#0A0B20'
                            }
                        }}
                    ]
                }
            ],
            animationDuration: 1500,
            animationEasingUpdate: 1500,
            animationDurationUpdate: 1500
        };
        chart = commUtil.drawPieChart(dom, option);
        window.addEventListener("resize", chart.resize);
        chart.setCustomOption = function(opt) {
            option.legend.data[0].name = '总蹲位数  ' + opt.allDunN;
            option.series[1].data[0].name = '总蹲位数  ' + opt.allDunN;
            option.legend.data[1].name = '在架车辆数  ' + opt.useDunw;
            option.series[0].data[1].name = '在架车辆数  ' + opt.useDunw;
            option.series[0].data[0].value = opt.allDunN - opt.useDunw;
            option.title.text = opt.name + '站点情况';
            this.setOption(option);
        }
        return chart;
    };

    var charts = [//drawCarRentRank(), drawRentCarStatus(),drawSiteStatus()
        new bikeData(), drawLineChart(), drawMap()
    ];
    var data = [
        [
            {   
                name: '桐庐', cityAllSite: 107, dunw: 2014, rentCar: 6432, repayCar: 2463, allHotLine: 648, suLine: 592, enLine: 56, nullSite: 14,
                td_cityN: '162',
                td_siteN: '107',
                td_carN: '2380',
                td_cardUserN: '4783',
                td_cardRentN: '6432',
                td_phoneRentN: '1023',
                allCityN: '108',
                obj:[
                        {name: '新青年广场', value: 200},
                        {name: '农村合作银行', value: 200},
                        {name: '景文百货', value: 200},
                        {name: '利时广场', value: 200},
                        {name: '家景新城(瑶琳路)', value: 200}
                    ]
            },
            {
                line1: [4200, 13005, 24100, 18200, 5260, 9650, 4530, 4200, 13005, 24100, 18200, 5260, 9650],
                line2: [3200, 9005, 6100, 24100, 13800, 8650, 4530, 3200, 9005, 6100, 24100, 13800, 8650]
            },
            {data: [{name: '桐庐', value: [119.560462, 29.836582, 107], symbolSize:20}]},
        ]
    ];
    for(var m=1; m<allRunCity.length; m++){
        var obj1 = {};
        obj1.name = allRunCity[m].name;
        obj1.cityAllSite = ~~(data[0][0].cityAllSite * allRunCity[m].ratio);
        obj1.dunw = ~~(data[0][0].dunw * allRunCity[m].ratio);
        obj1.rentCar = ~~(data[0][0].rentCar * allRunCity[m].ratio);
        obj1.repayCar = ~~(data[0][0].repayCar * allRunCity[m].ratio);
        obj1.allHotLine = ~~(data[0][0].allHotLine * allRunCity[m].ratio);
        obj1.suLine = ~~(data[0][0].suLine * allRunCity[m].ratio);
        obj1.enLine = ~~(data[0][0].enLine * allRunCity[m].ratio);
        obj1.nullSite = ~~(data[0][0].nullSite *allRunCity[m].ratio);
        obj1.td_cityN = ~~(data[0][0].td_cityN * allRunCity[m].ratio);        
        obj1.td_siteN = ~~(data[0][0].td_siteN * allRunCity[m].ratio);
        obj1.td_carN = ~~(data[0][0].td_carN * allRunCity[m].ratio);
        obj1.td_cardUserN = ~~(data[0][0].td_cardUserN * allRunCity[m].ratio);
        obj1.td_cardRentN = ~~(data[0][0].td_cardRentN * allRunCity[m].ratio);
        obj1.td_phoneRentN = ~~(data[0][0].td_phoneRentN * allRunCity[m].ratio);
        obj1.allCityN = ~~(data[0][0].allCityN * allRunCity[m].ratio);

        obj1.obj = [
            {name: '站点一 ', value: ~~(229 * allRunCity[m].ratio)},
            {name: '站点二 ', value: ~~(142 * allRunCity[m].ratio)},
            {name: '站点三 ', value: ~~(130 * allRunCity[m].ratio)},
            {name: '站点四 ', value: ~~(127 * allRunCity[m].ratio)},
            {name: '站点五 ', value: ~~(126 * allRunCity[m].ratio)}
        ];

        var obj2 = {
            line1: data[0][1]['line1'].map(function(v){return v*allRunCity[m].ratio}),
            line2: data[0][1]['line2'].map(function(v){return v*allRunCity[m].ratio})
        };

        var obj3 = {
            'data': [{'name': allRunCity[m].name, 'value': (function(){var ret = allRunCity[m].geo;
                    ret.push(allRunCity[0].value * allRunCity[m].ratio);
                    return ret;}()), symbolSize:20}]
        };

        var tempArr = [obj1, obj2, obj3];
        data.push(tempArr);
        console.log(obj2);
    }
    // for(var i=0;i<charts.length;i++){
    //     charts[i].setCustomOption(data[0][i]);
    // }
    var flag = 0;
    setInterval(function(){
        for(var i=0;i<charts.length;i++){
            charts[i].setCustomOption(data[flag][i]);
        }
        $(".rent-car-num").createNumHtml({num: ~~(549112 * allRunCity[flag].ratio)});
        $(".user-num").createNumHtml({num: ~~(6446 * allRunCity[flag].ratio)});
        flag ++;
        flag = flag % allRunCity.length;
    }, 8000);

}());

// var parent = $(".vvvvv");
// // 父容器的适应

// var box = $(".block").width();
// if(box*length <parent.width()) // box-sizing:border-sizing; margin 
// parent.trigger('bigger', box*len+margin);
// parent.on('bigger', function(wid){
    
// })

