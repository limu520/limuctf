/*
* Plugins:PercentCircle.js
* Version:v1.0.0
* Author:www.axui.cn or ax.hobly.cn
* Contact:3217728223@qq.com
* Release:2020-05-30
* Introduction:
*/


function PercentCircle(option){
    this.backgroundColor = option.backgroundColor||'transparent';
    this.startColor      = option.startColor||'#6619ff';
    this.endColor        = option.endColor||'#198cff';
    this.trackColor      = option.trackColor||'#ebebeb';
    this.fontSize        = option.fontSize||28;
    this.domEle          = option.domEle;
    this.value           = option.value;
    this.max             = option.max||100;
    this.name            = option.name;
    this.title           = option.title;
    this.titleColor      = option.titleColor||'#198cff';
    this.subText         = option.subText;
    this.subColor        = option.subColor||'#909090';
    this.fontFamily      = option.fontFamily||'"微软雅黑","microsoft yahei","Arial"';
    this.itemGap         = option.itemGap||0;
    this.barWidth        = option.barWidth||6;
    this.formatter       = option.formatter||this.value+'%';
    this.zoom            = option.zoom||'180%';
    this.left            = option.left||'center';
    this.top             = option.top||'center';
}

PercentCircle.prototype.init = function(){
    var _that = this;
    var option = {
        backgroundColor:_that.backgroundColor,
        title: {
            text: _that.formatter,
            textStyle: {
                color: _that.titleColor,
                fontSize: _that.fontSize,
                fontFamily:_that.fontFamily,
                fontWeight: 'lighter',
            },
            subtext: _that.subText ,
            subtextStyle: {
                color: _that.subColor,
            },
            itemGap:_that.itemGap,
            left: _that.left,
            top: _that.top,
        },
        angleAxis: {
            max: _that.max,
            clockwise: false,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        radiusAxis: {
            type: 'category',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        polar: {
            center: ['50%', '50%'],
            radius: _that.zoom
        },
        series: [{
            type: 'bar',
            data: [{
                name: _that.name,
                value: _that.value,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: _that.startColor
                        }, {
                            offset: 1,
                            color: _that.endColor
                        }])
                    }
                },
            }],
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: _that.barWidth,
            barGap: '-100%',
            z: 2,
            emphasis: {
                itemStyle: {
                    opacity: .8,
                }
            }
        },{
            type: 'bar',
            data: [{
                value: _that.max,
                    itemStyle: {
                        color: _that.trackColor,
                    },
                emphasis:{
                    itemStyle: {
                        color: _that.trackColor,
                        opacity: .8,
                    }
                }
            }],
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: _that.barWidth,
            barGap: '-100%',
            z: 1
        }]
    };
    echarts.init(_that.domEle).setOption(option);
};