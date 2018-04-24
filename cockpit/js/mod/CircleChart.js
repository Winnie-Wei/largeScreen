/**
 *  className: CircleChart
    dependences: [
        uderscore.1.8.3,
    ]
 * 	desc: 折线图
 *  auth: tangb
 */

function CircleChart(){}
CircleChart.prototype = new Base();
/**
 * funcName: init
 * param: {
	  dom: HTML dOM Document 对象；
	  title: echarts.title,
      status: false, // 指定颜色为红色或绿色,
      data: [{name:'', value:''},{name:'', value:''}]
      option: 参考 echarts.option
   }
 * desc: 初始化折线图
 */

CircleChart.prototype.init = function(opt){
	if(!opt.dom || typeof opt.dom !== "object" || opt.dom.nodeType !==1) throw new Error("请传入正确的dom元素");
	this._dom_ = opt.dom;
    var that = this;
	var chart = echarts.init(this._dom_);
    var size = this.getSize(this._dom_);
    var fonts = size.h < size.w ? size.h : size.w;
    fonts = fonts / 14;
	var option = {
        // tooltip: {
        //     trigger: 'item',
        //     formatter: "{a} <br/>{b}: {c} ({d}%)"
        // },
        title: opt.title || {},
        legend: {
            top: '25%',
            itemWidth: 0,
            itemHeight: 0,
            orient: 'vertical',
            left: 'left',
            textStyle: {
                color: ['#26C6DA', '#5C6BC0']
            },
            data: [opt.data[0][0].name, opt.data[1][0].name],
        },
        series: [
            {
                type:'pie',
                selectedMode: 'single',
                radius: ['70%', '78%'],
                center: ['70%', '50%'],
                label: {
                    normal: {
                        show: false,
                        position: 'left',
                        formatter: function(item){
                            var value = (item.value * 100);
                            value = value.toFixed(2) + '%';
                            return value +'\n' + item.name;
                        },
                        textStyle:{
                            color: '#EEF3F6',
                            fontSize: opt.fontSize || fonts,
                        }
                    },
                    emphasis: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                data:[
                    {value:335, itemStyle:{normal:{color: '#26C6DA'}}},{value:234, itemStyle:{normal:{color:'#CCCCCC'}}}
                ]
            },
            {
                type:'pie',
                radius: ['54%', '62%'],
                center: ['70%', '50%'],
                label: {
                    normal: {
                        show: false,
                        position: 'left',
                        textStyle:{
                            color: '#26C6DA',
                            fontSize: 30
                        }
                    },
                    emphasis: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                data:[
                    {value:335, itemStyle:{normal:{color: '#5C6BC0'}}},{value:234, itemStyle:{normal:{color:'#CCCCCC'}}}
                ]
            }
        ]
    };
	!!this.opt && (option = _.extend(option, this.opt));
	this.chart = chart;
    this.chart.aResize = function(e){
        var dom = chart.getDom(),
        size = that.getSize(dom),
        r = size.h < size.w ? size.h : size.w,
        fontSize = r / 14,
        option = chart.getOption();
        chart.setOption({
            series: [
            {
                label: {
                    normal: {
                        textStyle:{
                            fontSize: fontSize,
                        }
                    }
                }
            }]
        });
        chart.resize(e);
    }
    window.addEventListener("resize", chart.aResize);
    this._option_ = option;
    if(opt.data){
        this.render(opt.data);
    }
}
/**
 * 渲染视图
 * data: [
        [{name: '上月', value: 300},{name: '', value: 132}],
        [{name: '去年同期', value: 234},{name: '', value: 132}]
    ]
 */
CircleChart.prototype.render = function(data){
    // var total = 0;
    // data.forEach(function(v, i){
    //     total += (+v.value);
    // });
    // data.map(function(v){
    //     v.value = +v.value / total;
    // })
    // this._option_.series[0]['data'][0] = _.extend(this._option_.series[0]['data'][0], data[0]);
    for (var j = 0; j < 2; j++) {
        for(var i=0; i<this._option_.series[1]['data'].length; i++){
            this._option_.series[j]['data'][i] = _.extend(this._option_.series[j]['data'][i], data[j][i]);
            // this._option_.series[1]['data'][i] = _.extend(this._option_.series[1]['data'][i], data[i]);
        }
    }
    this.chart.setOption(this._option_);
}
/**
 *
 *  设置数据
 *  data: [{name:'', value:''},{name:'', value:''}]
 */

CircleChart.prototype.setData = function(data){
	var option = this.chart.getOption();
    option.series[0]['data'][0] = _.extend(option.series[0]['data'][0], data[0]);
    option.series[1]['data'] = _.extend(option.series[1]['data'], data);
    this.chart.setOption(option);
}
/**
 * 获取echart图表实例
 * 
*/
CircleChart.prototype.getChart = function(){
	return this.chart;
}


