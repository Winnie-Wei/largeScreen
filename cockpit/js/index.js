window.onload = function () {
    // for(var i in COCKPIT) {
    //  COCKPIT[i]();
    // }
    /**
     * desc: 传递data示例
     */
    COCKPIT.drawLeaveHosTimes({
        max: 10,
        current: 7.24,
        lastValue: 8,
        flag: false,
        color: '#26C6DA',
        fixCount: 2
    });
    COCKPIT.drawOutPatientVisits();
    COCKPIT.drawVisitDoc();
    COCKPIT.drawBedNum();
    COCKPIT.drawBedUse();
    COCKPIT.drawOutpatientAvgCost();
    COCKPIT.drawPatientAvgCost();
    COCKPIT.drawOutpatientIncome();
    COCKPIT.drawEmergencyIncome();
    COCKPIT.drawInHosIncome();
    COCKPIT.drawMedicineProportion();
    COCKPIT.drawHosIncome();
    COCKPIT.drawOutpatient();
    COCKPIT.drawHospital();
    COCKPIT.drawCriticallyIllNum();
    COCKPIT.drawDeadNum();
}

var COCKPIT = {
    /**
     * desc: 出院人次
     */
    drawLeaveHosTimes: function (data) {
        // var option = {
        //          dom: document.getElementById('J_LeaveHosTimes'),
        //          title: {text:'出院人次(千)', textStyle: {color:'#7C949F', fontSize:'12', fontWeight: '300'}},
        //      data: !!data ? data : {
        //      max: '500',
        //      current: '220',
        //      lastValue: '210',
        //      flag: true, // false
        //      color: '#5C6BC0' //'#26C6DA' // '#5C6BC0'
        //      },
        //      };
        this.drawBarChart('J_LeaveHosTimes', '出院人次(千)', data);
    },
    /**
     * desc: 门诊人次
     */
    drawOutPatientVisits: function (data) {
        this.drawBarChart('J_OutPatientVisits', '门诊人次(万)', data);
    },
    /**
     * desc: 出诊医生
     */
    drawVisitDoc: function (data) {
        this.drawBarChart('J_VisitDoc', '出诊医生', data);
    },
    /**
     * desc: 床位数
     */
    drawBedNum: function (data) {
        this.drawBarChart('J_BedNum', '床位数', data);
    },
    drawBedUse: function (data) {
        var option = {
            dom: document.getElementById("J_BedUse"),
            data: !!data ? data : [
                [{
                    name: '上月：70%',
                    value: 70
                }, {
                    name: '',
                    value: 30
                }],
                [{
                    name: '去年同期：60%',
                    value: 60
                }, {
                    name: '',
                    value: 40
                }]
            ]
        }
        // 圆环图
        var circleChart = new CircleChart();
        circleChart.init(option);
    },
    /**
     * desc: 门诊均次费用
     */
    drawOutpatientAvgCost: function (data) {
        this.drawBarChart('J_OutpatientAvgCost', '门诊均次费用', data);
    },
    /**
     * desc: 住院患者均次费用
     */
    drawPatientAvgCost: function (data) {
        this.drawBarChart('J_PatientAvgCost', '住院患者均次费用', data);
    },
    /**
     * desc: 门诊收入
     */
    drawOutpatientIncome: function (data) {
        this.drawBarChart('J_OutpatientIncome', '门诊收入', data);
    },
    /**
     * desc: 急诊收入
     */
    drawEmergencyIncome: function (data) {
        this.drawBarChart('J_EmergencyIncome', '急诊收入', data);
    },
    /**
     * desc: 住院收入
     */
    drawInHosIncome: function (data) {
        this.drawBarChart('J_InHosIncome', '住院收入', data);
    },
    /**
     * desc: 药占比同比
     */
    drawMedicineProportion: function (data) {
        var medicineData = !!data ? data : [{
                name: '材料费,56',
                value: '56'
            },
            {
                name: '药费,100',
                value: '100'
            },
            {
                name: '其他费用,12',
                value: '12'
            }
        ];
        var colorArr = ['#5C6BC0', '#FBD555', '#26C6DA'];
        var iconArr = [
            'image://../src/images/purple-circle.png',
            'image://../src/images/yellow-circle.png',
            'image://../src/images/blue-circle.png',
        ];

        var legendData = [];
        var totalValue = 0;

        for (var i in medicineData) {
            var legendObj = {
                name: medicineData[i].name,
                icon: !!iconArr[i] ? iconArr[i] : 'circle',
                textStyle: {
                    color: !!colorArr[i] ? colorArr[i] : 'black'
                }
            };
            legendData.push(legendObj);
            totalValue = totalValue + (+medicineData[i].value);
        }

        // 饼图
        var pieChart = new PieChart();
        pieChart.init({
            dom: document.getElementById("J_Medicine"),
            color: colorArr,
            option: {
                legend: {
                    orient: 'vertical',
                    top: '20%',
                    left: 20,
                    itemWidth: 14,
                    itemHeight: 14,
                    formatter: function (name) {
                        var nameArr = name.split(',');
                        var ratio = ((+nameArr[1] / totalValue) * 100).toFixed(2);
                        return nameArr[0] + '\n' + ratio + '%';
                    },
                    data: legendData
                },
                series: [{
                    name: 'example',
                    type: 'pie',
                    radius: ['65%', '80%'],
                    center: ['65%', '50%'],
                    label: {
                        normal: {
                            show: false,
                            position: 'inner',
                            formatter: '{b} {d}%',
                            textStyle: {
                                fontSize: 12,
                                fontWeight: 500
                            }
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    data: [{
                            value: 10,
                            name: '转诊'
                        },
                        {
                            value: 5,
                            name: '预约'
                        },
                        {
                            value: 15,
                            name: '挂号'
                        },
                        {
                            value: 35,
                            name: '预约'
                        },
                    ]
                }]
            }
        });
        pieChart.render(medicineData);
    },
    /**
     * desc: 院区收入
     */
    drawHosIncome: function (data) {
        var option = {
            dom: document.getElementById("J_HosIncome"),
            color: ['#26C6DA', '#EEF3F6'],
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c}"
            },
            data: !!data ? data : [{
                    name: '万松',
                    value: 323
                },
                {
                    name: '瑞祥',
                    value: 123
                }
            ]
        }

        // 饼图
        var pieChart = new PieChart();
        pieChart.init(option);
        // pieChart.render(pieData);
    },
    /**
     * desc: 门诊双控
     */
    drawOutpatient: function (data) {
        this.drawLineChart('J_Outpatient', data);
    },
    /**
     * desc: 住院双控
     */
    drawHospital: function (data) {
        this.drawLineChart('J_Hospital', data);
    },
    /**
     * desc: 危重人数
     */
    drawCriticallyIllNum: function (data) {
        this.drawBarChart('J_CriticallyIllNum', '危重人数', data);
    },
    /**
     * desc: 死亡人数
     */
    drawDeadNum: function (data) {
        this.drawBarChart('J_DeadNum', '死亡人数', data);
    },

    drawBarChart: function (dom, title, data) {
        var option = {
            dom: document.getElementById(dom),
            title: {
                text: title,
                textStyle: {
                    color: '#7C949F',
                    fontSize: '14',
                    fontWeight: '300'
                }
            },
            data: !!data ? data : {
                max: '500',
                current: '220',
                lastValue: '210',
                flag: true, // false
                color: '#5C6BC0' //'#26C6DA' // '#5C6BC0'
            }
        };

        var barChart = new OneBarChart();
        barChart.init(option);
    },
    drawLineChart: function (dom, data) {
        var newData = !!data ? data : [{
                    xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    isLine: true,
                    yAxisIndex: 0,
                    min: 20,
                    minInterval: 40,
                    name: '均次费用',
                    hasPoint: false,
                    data: [43, 23, 92, 60, 94, 120000, 63, 26, 100, 33, 112, 42]
                },
                {
                    isLine: true,
                    yAxisIndex: 1,
                    name: '药占',
                    hasPoint: false,
                    data: [60, 107, 28, 4, 87, 6, 47, 10, 27, 89, 3, 31]
                }
            ],
            areaLineChart = new AreaLineChart();

        areaLineChart.init({
            dom: document.getElementById(dom)
        });
        areaLineChart.render(newData);
    }
}