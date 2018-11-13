"use strict";
$(function() {
  
  var _LNG = 126.639717;
  var _LAT = 45.763195;

  var map = new AMap.Map('homeMap', {
		zoom: 11,
		center: [_LNG, _LAT],
		mapStyle: 'amap://styles/blue', //设置地图的显示样式
		viewMode: '2D', //设置地图模式
	});
	var infoWindow;
	var district, polygons = [];
	AMap.plugin(['AMap.DistrictSearch', 'AMap.MarkerClusterer'], function() {});
	map.on('zoomchange', function() {
		var zoom = map.getZoom();
		// if(zoom < 9 && $('.home_type_switch>ul>.select').index() == 0) {
		if(zoom < 9) {
			map.remove(polygons) //清除上次结果
			getProjectMap();
			getProjctType(''); //项目类型统计
			getEquipCount(''); //设备统计
			_THISCITY='';
			$('.home_equip_count>dl').removeClass('select');
		}
	})
  
  
  
  // 月项目数据  echart
  var middle_echart = echarts.init(document.getElementById('middle_echart'));
  var option = {
  	tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: '项目数:{c0}'
    },
    xAxis: {
        type: 'category',
        data: ['1', '2', '3','4', '5', '6','7', '8', '9','10', '11', '12'],
        splitLine: {
		        show: false,
		        lineStyle: {
		          width: 1,
		        }
		      },
		    axisTick:{
        	show:false,
        },
        axisLine: {
		    	show: false,
	        lineStyle: {
	          color: '#fff',
	        }
	      }
    },
    yAxis: {
        type: 'value',
        splitLine: {
		        show: true,
		        lineStyle: {
		          width: 0,
		        }
		      },
				axisTick:{
        	show:false,
        },
        axisLabel : {
            formatter: function(){
                  return "";
            }
        },
        axisLine: {
		    	show: false,
	        lineStyle: {
	          color: '#fff',
	        }
	      }

    },
    series: [{
        data: [9,16,7,20,25,4,12,23,11,22,34,50],
        type: 'line',
        smooth: true,
        symbol: 'circle',     //设定为实心点
        symbolSize: 10,   //设定实心点的大小
        itemStyle: {
		        normal: {
		          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
				            offset: 0,
				            color: '#2BB0C6'
				          }, {
				            offset: 1,
				            color: '#48F987'
				          }])
				        }
		      }
    }],
	
	};
  middle_echart.setOption(option);
 
  //省份排名   echarts
  var bottom_echart = echarts.init(document.getElementById('bottom_echart'));
  var option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: '{a0}:{c0}μg/m3'
    },
    legend: {
      data: []
    },
    grid: {
      height: '200',
      top: 0 ,
      left: '10%',
      right: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      lineStyle: {
        color: '#fff'
      },
      axisLabel : {
            formatter: function(){
                  return "";
            }
        },
      axisTick:{
        	show:false,
       },
      splitLine: {
		        show: true,
		        lineStyle: {
		          width: 0,
		        }
		      },
      axisLine: {
      	show: false,
        lineStyle: {
          color: '#fff',
        }
      },
    },
    yAxis: {
      type: 'category',
      color: '#fff',
      data: ['黑龙江','宁夏省','海南省','河南省','湖北省','北京市'],
      splitLine: {
        show: false,
        lineStyle: {
          width: 0,
        }
      },
      axisTick:{
        	show:false,
        },
      axisLine: {
      	show: false,
        lineStyle: {
          color: '#fff',
        }
      }
    },
    series: [{
      name: 'pm2.5',
      type: 'bar',
      color: ['#fff'],
      stack: '总量',
      barWidth: '60%',
      label: {
        normal: {
          show: false,
          position: 'insideRight'
        }
      },
      data: [30,40,70,60,45,89],
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: '#2BB0C6'
          }, {
            offset: 1,
            color: '#48F987'
          }])
        }
      }
    }]
  };
  bottom_echart.setOption(option);
  
  
  //模块使用排名
  var top_echart = echarts.init(document.getElementById('top_echart'));
  var option = {
  	top:0,
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    color:['#FFF5A4','#09A5FE','#F95076','#60F8D6','#608FF8','#C86EFC','#E0FC6E','#FCBB6E','#FF8155','#1CCC7F'],
    legend: {
        y: 'bottom',
        x:'left',
        data:['项目大事','工地首页','BIM应用','人员管理','全景应用','绿色施工','资料管理','视频监控','智慧应用','我的工地'],
        textStyle:{
        	color:'#fff',
        },
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            center: ['50%', '43%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'项目大事'},
                {value:310, name:'工地首页'},
                {value:234, name:'BIM应用'},
                {value:135, name:'人员管理'},
                {value:1548, name:'全景应用'},
                {value:4, name:'绿色施工'},
                {value:5, name:'资料管理'},
                {value:66, name:'视频监控'},
                {value:77, name:'智慧应用'},
                {value:123, name:'我的工地'}
            ]
        }
	    ],
 
		};
	    top_echart.setOption(option);
  
  // 省份     城市     最新项目  切换
  $('.bottom_switch p').on('click',function(){
 				$(this).siblings().removeClass('left_active'),
 				$(this).addClass('left_active');
 				console.log($(this).index());
 				if($(this).index() === 0){
 					$('.bottom_rank').show();
 					$('.bottom_newproject').hide();
 				}else if($(this).index() === 1){
 					$('.bottom_rank').show();
 					$('.bottom_newproject').hide();
 				}else{
 					   $('.bottom_rank').hide();
 					   $('.bottom_newproject').show();
 				}
  })
  
  
  
  
  

  laydate.render({
    elem: '#trainTime',
    value: new Date(new Date()),
    // min: -7, //7天前
    max: 0, //0天后
  });



})
