/**
 *  className: PieChart,
    dependences: {uderscore.1.8.3}
 * 	desc: 饼图
 *  auth: tangb
 */

function PieChart(){}
PieChart.prototype = new Base();
/**
 * funcName: init
 * param: {
	  dom: HTML dOM Document 对象；
	  title: 参考 echarts.option.title,
      data: [{
        name: '', value: '',
        name: '', value: ''
      }],
      option: 参考echarts.option
   }
 * desc: 初始化饼图
 */

PieChart.prototype.init = function(opt){
	if(!opt.dom || typeof opt.dom !== "object" || opt.dom.nodeType !==1) throw new Error("请传入正确的dom元素");
    this._dom_ = opt.dom;
	var chart = echarts.init(this._dom_);
	var option = {
        color: !!opt.color ? opt.color : ['#26C6DA', '#EEF3F6', '#43C2F2', '#3FB391'],
        title: opt.title || {},
        calculable : true,
        tooltip : opt.tooltip || {show:false},
        series : [
            {
                name: 'example',
                type:'pie',
                radius : [0,'86%'],
                center : ['50%', '50%'],
                label: {
                    normal: {
                        color: '#7C949F',
                        show: true,
                        // position: 'inner',
                        formatter: '{b}\n{d}%',
                        textStyle: {
                            // color: '#263238',
                            fontSize: 12,
                            fontWeight: 500
                        }
                    },
                },
                labelLine: {
                    normal: {
                        show: true,
                        lineStyle: {
                            color: '#7C949F'
                        }
                    },
                    emphasis: {
                        show: false
                    }
                },
                data:[
                    {value:10, name:'转诊'},
                    {value:5, name:'预约'}
                    // {value:15, name:'挂号'}
                ]
            }
        ]
    };
	!!opt.option && (option = _.extend(option, opt.option));
    this._option_ = option;
	this.chart = chart;
    
    if(opt.data){
        this.render(opt.data);
    }

    this.resize();
}
/**
 * 图形渲染
 * [{name: '', value: ''}]
 */
PieChart.prototype.render = function(data){
    // this._option_.series[0] = _.extend(this._option_.series[0], data);
    // this.chart.setOption(this._option_);
    this._option_.series[0].data = data;
    // for (var i = 0; i < data.length; i++) {
    //     this._option_.series[0].data[i] = _.extend(this._option_.series[0].data[i], data[i]);
    // }
    this.chart.setOption(this._option_);
}
/**
 *
 *  设置数据
 *  data: [{value: 10, name: '转诊'},{}]
 */

PieChart.prototype.setData = function(data){
	var option = this.chart.getOption();
	option.series[0]['data'] = data;
	this.chart.setOption(option);
}
/**
 * 获取echart图表实例
 * 
*/
PieChart.prototype.getChart = function(){
	return this.chart;
}


