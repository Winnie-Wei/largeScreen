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
        this.children().css("height", "50px");
        this.children().css("overflow", "hidden");
        var strArr = args['num'].split("");
        for(var i=0;i<strArr.length;i++){
            this.children().append(tmp);
        }
        $(".list-item-se").css("font-size", "33px");
        $(".list-item-se").css("height", "50px");
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
            td_cityN: 198,
            td_siteN: 162398,
            td_carN: 132984,
            td_cardUserN: 278349,
            td_cardRentN: 2349384,
            td_phoneRentN: 187304,
            allCityN: 198,
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

    function drawLineChart() {
        var chart, option = null;
        chart = echarts.init(document.getElementById('J_rent_car_line'));
        option = {
            title: {
                text: '24小时租用量的曲线图',
                textStyle: {
                    color: '#FFF',
                    fontSize: 14,
                    fontFamily: '微软雅黑'
                }
            },
            legend:{
                right: '5%',
                top: '10%',
                textStyle:{
                    color: '#fff'
                },
                data:['今天', '昨天']
            },
            grid: {
                top: '24%',
                bottom: '12%',
                left: '20%'
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
                data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12,13,14,15,16,17,18,19,20,21,22,23, 24]
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
                            color: '#00EA00'
                        }
                    },
                    data:[4200,5382, 3752, 3387, 4657, 47853, 108397, 298347, 268394, 203948, 182938, 169304, 178203, 143827,138759,133485,196734,273849,249734,162839,128739,53827,7834]
                },
                {
                    name:'昨天',
                    type:'line',
                    lineStyle: {
                        normal: {
                            color: '#3798CC'
                        }
                    },
                    data:[3200, 4005, 3100, 4100, 5800, 58650, 114530, 283200, 249005, 216100, 194100, 173800, 158650, 124389, 129874,103489,179304,258937,228904,140283,139239,49732,6384]
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


    (function getRentCarNum(){
        $('.rent-car-num').createNumHtml({num: 14611200});
        $('.all-rent-car-num').createNumHtml({num: 694561365});
        $('.user-num').createNumHtml({num: 1389475});
    }());
    /*
        name: 'drawMap',
        interface: '',
        desc: '地图'
    */
    function drawMap() {
        var data = [
            {name: currCity.name,value: currCity.value},
			{name: '太原' , value: 93, itemStyle:{normal:{color: '#EA1501'}}}, 
			{name: '晋城' , value: 93, itemStyle:{normal:{color: '#17E506'}}}, 
			{name: '襄垣' , value: 93, itemStyle:{normal:{color: '#17E506'}}}, 
			{name: '运城' , value: 93, itemStyle:{normal:{color: '#17E506'}}}, 
			{name: '兰州' , value: 93, itemStyle:{normal:{color: '#EA1501'}}}, 
			{name: '两当' , value: 93, itemStyle:{normal:{color: '#17E506'}}}, 
			{name: '临泽' , value: 93, itemStyle:{normal:{color: '#17E506'}}}, 
			{name: '高台' , value: 93, itemStyle:{normal:{color: '#17E506'}}}, 
			{name: '敦煌' , value: 93, itemStyle:{normal:{color: '#17E506'}}}, 
			{name: '贵阳观山湖' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '贵州九龙潭' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '呼和浩特' , value: 93, itemStyle:{normal:{color: '#EA1501'}}},
			{name: '鄂尔多斯东胜区' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '鄂尔多斯装备基地' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '通辽' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '霍林郭勒市' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '巴彦淖尔' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '滨海新区' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '武清' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '北辰' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '天津泰和园' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '张家窝' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '北京朝阳区' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '九江' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '九江市区' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '广丰' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '芦溪' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '哈尔滨' , value: 93, itemStyle:{normal:{color: '#EA1501'}}},
			{name: '黑龙江省直物业' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '铁岭' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '丹东' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '大连' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '盘锦' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '漯河' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '鹿邑' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '邢台' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '丽江' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '景洪' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '海北' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '厦门' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '厦门禾山街道' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '漳州' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '晋江' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '三明新区' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '滁州' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '滁州经济开发区' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '南谯新城' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '琅琊新区' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '明光' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '天长' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '屯溪' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '固镇' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '株洲主城区' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '榆林城区' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '韩城' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '农安' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '中卫' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '柳州' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '千岛湖' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '富阳' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '余杭' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '萧山' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '桐庐' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '建德' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '临安' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '上虞' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '诸暨' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '新昌' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '嵊州' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '嘉兴' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '嘉兴油车港镇' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '秀洲区' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '嘉兴科技城' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '嘉兴经济开发区' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '嘉善' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '海宁' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '桐乡' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '平湖' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '海盐' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '丽水' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '缙云' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '龙泉' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '遂昌' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '景宁' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '庆元' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '云和' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '松阳' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '丽水碧湖九龙区块' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '兰溪' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '东阳' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '横店' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '武义' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '天台' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '镇海' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '余姚' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '慈溪' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '北仑' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '宁波' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '衢州' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '龙游' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '开化' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '常山' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '德清' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '安吉' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '舟山新城' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '舟山新城浙大分校' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '岱山' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '定海' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '江阴' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '浦口' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '南京高新' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '南京化工区' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '扬州瘦西湖' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '太仓' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '太仓主城区' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '金湖县' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '禅城' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '禅城招商中心' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '佛山新城' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '佛山东平新城' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '佛山新城泳场' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '佛山行政服务中心' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '高明西江新城' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '高明' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '松山湖碧桂园' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '越秀区' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '罗湖' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '梅州梅县区' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '武汉省纪委' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '襄阳' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '枣阳' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '宜昌' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '信阳' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '青岛' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '莒南' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '沂水' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '临沂城区' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '临淄' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '葫芦岛' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '广饶' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '广饶开发区' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '济南历下' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '日照' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '邹平' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '靖安' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '塔城' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '青田' , value: 93, itemStyle:{normal:{color: '#17E506'}}},
			{name: '杭州' , value: 93, itemStyle:{normal:{color: '#EA1501'}}},
			{name: '南昌' , value: 93, itemStyle:{normal:{color: '#EA1501'}}},
			{name: '武汉' , value: 93, itemStyle:{normal:{color: '#EA1501'}}},
			{name: '北京通州区' , value: 93, itemStyle:{normal:{color: '#EA1501'}}},
			{name: '六合' , value: 93, itemStyle:{normal:{color: '#EA1501'}}},			
			{name: '南翔镇' , value: 93, itemStyle:{normal:{color: '#EA1501'}}},
			{name: '昆明' , value: 93, itemStyle:{normal:{color: '#EA1501'}}},
			{name: '济南市中区' , value: 93, itemStyle:{normal:{color: '#EA1501'}}}
        ];
        var geoCoordMap = {
			'南翔镇' : [121.326807,31.300289],
			'太原' : [112.550864,37.890277],
			'晋城' : [112.867333,35.499834],
			'襄垣' : [112.988973,36.580201],
			'运城' : [111.006854,35.038859],
			'兰州' : [103.823305,36.064226],
			'两当' : [106.403885,33.911379],
			'临泽' : [100.191224,39.347032],
			'塔城' : [82.998018,46.754624],
			'高台' : [99.607521,39.541675],
			'敦煌' : [94.158042,40.388771],
			'贵阳观山湖' : [106.709177,26.629907],
			'贵州九龙潭' : [106.734996,26.902826],
			'呼和浩特' : [111.660351,40.828319],
			'鄂尔多斯东胜区' : [109.764419,39.805586],
			'鄂尔多斯装备基地' : [109.993706,39.81649],
			'通辽' : [122.260363,43.633756],
			'霍林郭勒市' : [119.579748,45.528106],
			'巴彦淖尔' : [107.423807,40.76918],
			'滨海新区' : [117.646286,39.059177],
			'武清' : [117.034578,39.457043],
			'北辰' : [117.180606,39.259131],
			'天津泰和园' : [116.926215,39.032177],
			'张家窝' : [117.04674,39.063946],
			'北京朝阳区' : [116.521695,39.958953],
			'北京通州区' : [116.740079,39.809815],
			'九江' : [115.999848,29.71964],
			'九江市区' : [115.999848,29.71964],
			'广丰' : [118.277125,28.364109],
			'芦溪' : [114.070007,27.578023],
			'南昌' : [115.893528,28.689578],
			'哈尔滨' : [126.657717,45.773225],
			'黑龙江省直物业' : [128.047414,47.356592],
			'铁岭' : [123.85485,42.299757],
			'丹东' : [124.338543,40.129023],
			'大连' : [121.593478,38.94871],
			'盘锦' : [122.073228,41.141248],
			'漯河' : [114.046061,33.576279],
			'鹿邑' : [115.383983,33.894051],
			'邢台' : [114.520487,37.069531],
			'丽江' : [100.229628,26.875351],
			'景洪' : [100.927318,22.111413],
			'昆明' : [102.714601,25.049153],
			'海北' : [100.879802,36.960654],
			'厦门' : [118.103886,24.489231],
			'厦门禾山街道' : [118.160165,24.517836],
			'漳州' : [117.676205,24.517065],
			'晋江' : [118.558651,24.729638],
			'三明新区' : [117.642194,26.270835],
			'滁州' : [118.32457,32.317351],
			'滁州经济开发区' : [118.32457,32.317351],
			'南谯新城' : [118.270828,32.310209],
			'琅琊新区' : [118.337569,32.338458],
			'明光' : [118.140727,32.811836],
			'天长' : [118.972913,32.721214],
			'屯溪' : [118.309637,29.716535],
			'固镇' : [117.354034,33.272841],
			'株洲主城区' : [113.131695,27.827433],
			'榆林城区' : [109.745926,38.279439],
			'韩城' : [110.393774,35.582782],
			'农安' : [125.094327,44.461506],
			'中卫' : [105.196754,37.521124],
			'柳州' : [109.422402,24.329053],
			'杭州' : [120.219375,30.259244],
			'千岛湖' : [119.051449,29.610014],
			'富阳' : [119.846692,30.001094],
			'余杭' : [119.998089,30.38812],
			'萧山' : [120.389081,30.172894],
			'桐庐' : [119.560462,29.836582],
			'建德' : [119.379533,29.487115],
			'临安' : [119.350295,30.207684],
			'上虞' : [120.889432,29.97804],
			'诸暨' : [120.281434,29.6994],
			'新昌' : [120.975702,29.414314],
			'嵊州' : [120.761431,29.591008],
			'嘉兴' : [120.760428,30.773992],
			'嘉兴油车港镇' : [120.759311,30.832624],
			'秀洲区' : [120.691907,30.777679],
			'嘉兴科技城' : [120.831492,30.747901],
			'嘉兴经济开发区' : [120.760428,30.773992],
			'嘉善' : [120.908873,30.905748],
			'海宁' : [120.618727,30.442177],
			'桐乡' : [120.490411,30.612341],
			'平湖' : [121.105839,30.716529],
			'海盐' : [120.885576,30.526043],
			'丽水' : [119.929576,28.4563],
			'缙云' : [120.191882,28.666326],
			'龙泉' : [119.082297,28.050639],
			'遂昌' : [119.089342,28.52541],
			'景宁' : [119.61929,27.896053],
			'庆元' : [119.157619,27.628046],
			'云和' : [119.54173,28.13132],
			'松阳' : [119.441013,28.41158],
			'丽水碧湖九龙区块' : [119.792451,28.343096],
			'兰溪' : [119.533338,29.284103],
			'东阳' : [120.380818,29.237427],
			'横店' : [117.063706,31.889698],
			'武义' : [119.720833,28.774056],
			'天台' : [120.985563,29.151779],
			'镇海' : [121.61663,29.995449],
			'余姚' : [121.152779,29.996457],
			'慈溪' : [121.338408,30.189257],
			'北仑' : [121.889419,29.868332],
			'宁波' : [121.579006,29.885259],
			'衢州' : [118.875842,28.95691],
			'龙游' : [119.198664,28.997079],
			'开化' : [118.33165,29.189938],
			'常山' : [118.54767,28.973666],
			'德清' : [120.049831,30.567583],
			'安吉' : [119.583158,30.62637],
			'舟山新城' : [122.169872,30.03601],
			'舟山新城浙大分校' : [122.169872,30.03601],
			'岱山' : [122.260359,30.319416],
			'定海' : [122.073024,30.064847],
			'江阴' : [120.310679,31.837425],
			'浦口' : [118.569125,32.059062],
			'南京高新' : [118.778074,32.057236],
			'六合' : [118.848166,32.40064],
			'南京化工区' : [118.778074,32.057236],
			'扬州瘦西湖' : [119.42652,32.415231],
			'太仓' : [121.158978,31.571904],
			'太仓主城区' : [121.158978,31.571904],
			'金湖县' : [119.145631,33.025834],
			'禅城' : [113.070423,23.00421],
			'禅城招商中心' : [113.070423,23.00421],
			'佛山新城' : [113.134026,23.035095],
			'佛山东平新城' : [113.121932,22.970717],
			'佛山新城泳场' : [113.134026,23.035095],
			'佛山行政服务中心' : [113.015361,23.128732],
			'高明西江新城' : [112.881164,22.930007],
			'高明' : [112.683258,22.824523],
			'松山湖碧桂园' : [117.450698,31.882858],
			'越秀区' : [113.287833,23.139278],
			'罗湖' : [114.156395,22.581934],
			'梅州梅县区' : [116.199543,24.371491],
			'武汉' : [114.3162,30.581084],
			'武汉省纪委' : [114.3162,30.581084],
			'襄阳' : [112.250093,32.229169],
			'枣阳' : [112.772607,32.092511],
			'宜昌' : [111.310981,30.732758],
			'信阳' : [114.085491,32.128582],
			'青岛' : [120.384428,36.105215],
			'莒南' : [118.890079,35.213123],
			'沂水' : [118.609358,35.914369],
			'临沂城区' : [118.340768,35.072409],
			'临淄' : [118.300697,36.854244],
			'葫芦岛' : [120.860758,40.74303],
			'广饶' : [118.538569,37.162071],
			'广饶开发区' : [118.538569,37.162071],
			'济南市中区' : [117.024967,36.682785],
			'济南历下' : [117.101586,36.659339],
			'日照' : [119.50718,35.420225],
			'邹平' : [117.670806,36.956593],
			'靖安' : [115.237709,28.946084],
			'青田' : [120.146738,28.208429]
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
                        itemStyle: data[i].itemStyle || {normal:{color:'#FFF100', shadowBlur:50, shadowColor:'#FFF100'}},
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
				hoverable: false,
                itemStyle: {
                        normal: {
                            areaColor: 'rgba(11,28,72,0.7)',
                            borderColor: '#0083FD'
                        },
                        emphasis: {
                            areaColor: 'rgba(11,28,72,0.7)'
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
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false,
                            textStyle: {
                                fontSize: '12'
                            }
                        },
                        emphasis: {
                            formatter: '{b}',
                            position: 'right',
                            show: true,
                            textStyle: {
                                fontSize: '14',
								color: '#FFF'
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
        chart.on('click', function(params) {
            if (params.componentType != 'series') return;
            // 1.存储当前轮循的值
            clearInterval(timer);
            showSelectCityInfo(params.name);
            setTimeout(startTimer, 0);
        });
        window.addEventListener("resize", chart.resize);
        chart.setCustomOption = function(opt) {
            var option = this.getOption();
            option.series[0].data.shift();
            option.series[0].data.unshift(opt.data[0]);
            // console.log(opt);
            // console.log(option.series[0].data);
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
                /*
				td_cityN: '162',
                td_siteN: '107',
                td_carN: '2380',
                td_cardUserN: '4783',
                td_cardRentN: '6432',
                td_phoneRentN: '1023',
                allCityN: '198',
				*/
				td_cityN: 198,
				td_siteN: 162398,
				td_carN: 132984,
				td_cardUserN: 278349,
				td_cardRentN: 2349384,
				td_phoneRentN: 187304,
				allCityN: 198,				
                obj:[
                        {name: '新青年广场', value: 200},
                        {name: '农村合作银行', value: 200},
                        {name: '景文百货', value: 200},
                        {name: '利时广场', value: 200},
                        {name: '家景新城(瑶琳路)', value: 200}
                    ]
            },
            {
                line1: [4200,5382, 3752, 3387, 4657, 47853, 108397, 298347, 268394, 203948, 182938, 169304, 178203, 143827,138759,133485,196734,273849,249734,162839,128739,53827,7834],
                line2: [3200, 4005, 3100, 4100, 5800, 58650, 114530, 283200, 249005, 216100, 194100, 173800, 158650, 124389, 129874,103489,179304,258937,228904,140283,139239,49732,6384]
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
        obj1.td_cityN = ~~(data[0][0].td_cityN );        
        obj1.td_siteN = ~~(data[0][0].td_siteN );
        obj1.td_carN = ~~(data[0][0].td_carN * allRunCity[m].ratio);
        obj1.td_cardUserN = ~~(data[0][0].td_cardUserN * allRunCity[m].ratio);
        obj1.td_cardRentN = ~~(data[0][0].td_cardRentN * allRunCity[m].ratio);
        obj1.td_phoneRentN = ~~(data[0][0].td_phoneRentN * allRunCity[m].ratio);
        obj1.allCityN = ~~(data[0][0].allCityN );

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
    var timer;
    startTimer();

    function startTimer() {
            timer = setInterval(function(){
            showCurCityInfo(flag);
            flag ++;
            flag = flag % allRunCity.length;
        }, 10000);
    };

    /**
     * 展示当前轮循到的城市信息
     * @param  {number} idx 记录的当前城市下标
     */
    function showCurCityInfo(idx) {
        for(var i=0;i<charts.length;i++){
            charts[i].setCustomOption(data[idx][i]);
        }
        $(".rent-car-num").createNumHtml({num: ~~(14611200 + (idx + 1)*100)});
        $(".all-rent-car-num").createNumHtml({num: ~~(694561365 + (idx + 1)*1000)});
        $(".user-num").createNumHtml({num: ~~(1389475 + (idx + 1)*10)});
    };

    /**
     * 展示选中城市的信息
     * @param  {string} selCityName 选中的城市名称
     */
    function showSelectCityInfo(selCityName) {
        $.each(allRunCity, function(k, v) {
            if (v.name == selCityName) {
                // console.log('展示选中的城市信息',k);
                showCurCityInfo(k);
                flag = (k + 1) == allRunCity.length ? 0 : ++ k;
            } else {
                // console.log('没有该城市的信息');
            }
        });
    };
}());


