(function(){
	/* 屏幕高度适配 */
	function adjustmentBody(){
		var height = document.documentElement.clientHeight;
		//var offset = 64; //头部高度
		var bottom = height;// - offset;
		var fontSize = bottom/12 + "px";
		$("html").css("font-size", fontSize);
		$(".search").trigger("adjustHeight");
	}
	adjustmentBody();
	window.addEventListener("resize", adjustmentBody);
}());

var commUtil = {
	init: function(host){
		this.Host = host || 'http://192.168.200.117:8084';
	},
	/*
		name: 'postData',
		@param: {
			url: '接口路径',
			method: '请求方式，get,post...',
			param: 'json格式的请求参数',
			fnSuccess: '请求成功后的回调函数',
			fnError: '请求失败的回调函数'
		}
	*/
	postData: function(url, method, param, fnSuccess, fnError){
		var defer = $.Deferred();
		url = this.Host + url;
		$.ajax({
			url: url,
			method: method,
			data: param,
			dataType: 'json'
		}).success(function(data, status, headers, config){
			if(data && typeof(data) !== "object"){
				data = JSON.parse(data);
			}
			fnSuccess && fnSuccess(data);
			defer.resolve(data);
		}).error(function(data, status, headers, config){
			fnError && fnError(status);
		});
		return defer.promise;
	},
	/*
		name: 'thousandBitSeparator',
		@params: {
			num: '欲转化的数字'
		},
		desc: '数字分隔符，将超过三位数字用','隔开'
	*/
	thousandBitSeparator: function(num) {
	    return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
	},
	/* 
		author: tangb
		name: 'extend',
		@param:{
			dest: '目标对象',
			src: '源对象'
		},
		desc: '对象继承'
	*/
	extend: function(dest, src){
	    var _complete,
	    _extend,
	    _isObject;
	    _isObject = function(o){
	        return (Object.prototype.toString.call(o) === '[object Object]' || Object.prototype.toString.call(o) === '[object Array]');
	    },
	    _extend = function self(destination, source) {
	        var property;
	        for (property in destination) {
	            if (destination.hasOwnProperty(property)) {

	                // 若destination[property]和sourc[property]都是对象，则递归
	                if (_isObject(destination[property]) && _isObject(source[property])) {
	                    self(destination[property], source[property]);
	                };

	                // 若sourc[property]已存在，则跳过
	                if (source.hasOwnProperty(property)) {
	                    continue;
	                } else {
	                    source[property] = destination[property];
	                }
	            }
	        }
	    },
	    _complete = function(){
	        var arr = arguments,
	            result = {},
	            i;

	        if (!arr.length) return {};

	        for (i = arr.length - 1; i >= 0; i--) {
	            if (_isObject(arr[i])) {
	                _extend(arr[i], result);
	            };
	        }

	        arr[0] = result;
	        return result;
	    };
	    return _complete(dest, src);
	},
	/*
		name: 'drawPieChart',
		@params: {
			dom: 'HTMLDocumentElement',
			option: '参考echarts.option的配置规则'
		}
	*/
	drawPieChart: function(dom, option) {
		var chart, opt, flag;
		chart = echarts.init(dom);
		opt = {
			tooltip: {
                show: false,
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                bottom: '0',
                itemWidth: 13,
                itemHeight: 13,
                x: 'left',
                data:[
                    
                ]
            },
            series: [
                
            ]
        };
		flag = !!option;
		flag && (opt = commUtil.extend(opt, option));
		chart.setOption(opt);
		return chart;
		// opt = commUtil.extend(opt ,option);
		// chart.setOption(opt);
	}
}