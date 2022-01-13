/*
* Plugins:PercentBar.js
* Version:v1.0.0
* Author:www.axui.cn or ax.hobly.cn
* Contact:3217728223@qq.com
* Release:2020-05-30
* Introduction:
*/


function PercentBar(option){
    this.backgroundColor = option.backgroundColor||'transparent';
    this.startColor      = option.startColor||'#6619ff';
    this.endColor        = option.endColor||'#198cff';
    this.trackColor      = option.trackColor||'#ebebeb';
    this.fontSize        = option.fontSize||14;
    this.domEle          = option.domEle;
    this.name            = option.name||'%';
    this.title           = option.title;
    this.titleColor      = option.titleColor||'#666666';
    this.label           = option.label;
    this.labelColor      = option.labelColor||'#198cff';
    this.labelFont       = option.labelFont||'"微软雅黑","microsoft yahei","Arial"';
    this.barWidth        = option.barWidth||6;
    this.formatter       = option.formatter||'{c}{a}';
    this.lineHeight      = option.lineHeight||28;
    this.position        = option.position||'bottom';
    this.yData           = option.yData;
    this.labelData       = option.labelData;
    this.maxData         = option.maxData||[100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100];
    this.maxColor        = option.maxColor||'#666666';
    this.follow          = option.follow||false;
    this.leftGap         = option.leftGap||61;
    this.rightGap        = option.rightGap||42;
}


PercentBar.prototype.init = function(){
    var _that = this;
    var option = {
        backgroundColor:_that.backgroundColor,
        grid: {
            left: 0,
            top: _that.lineHeight - 8 + _that.barWidth/2,
            right: 0,
            bottom: _that.barWidth/2,
            containLabel: true
        },
        xAxis: {
            type: 'value',
            splitLine: {show: false},
            splitArea:{show: false},
            axisLabel: {show: false},
            axisTick: {show: false},
            axisLine: {show: false},
        },
        yAxis: {
            type: 'category',
            splitLine: {show: false},
            splitArea:{show: false},
            axisTick: {show: false},
            axisLine: {show: false},
            boundaryGap:false,
            axisLabel: {
                show: true,
                inside:true,
                verticalAlign:_that.position,
                lineHeight:_that.lineHeight,
                color: _that.titleColor,
                fontSize:_that.fontSize,
            },
            data: _that.yData,
            offset:8,
        },
        series: [ {
            name: _that.name,
            type: 'bar',
            barWidth: _that.barWidth,
            data:_that.labelData,
            label: {
                show: false,
                left:'100%',
                offset: [-5,0],
                align:'right',
                lineHeight:_that.lineHeight,
                verticalAlign:_that.position,
                position: 'right',
                formatter: _that.formatter,
                color: _that.labelColor,
                fontSize:_that.fontSize,
                fontFamily:_that.labelFont,
            },
            itemStyle: {
                    barBorderRadius: _that.barWidth,
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 0,
                        color: _that.endColor,
                    }, {
                        offset: 1,
                        color: _that.startColor,
                    }]),
            },
            emphasis:{
                itemStyle: {
                    opacity: .8,
                }
            },
            zlevel:1
        },
            {
                name: _that.name,
                type: 'bar',
                barGap: '-100%',
                barWidth:_that.barWidth,
                data:_that.maxData,
                label: {
                    show:true,
                    offset: [-5,0],
                    align:'right',
                    lineHeight:_that.lineHeight,
                    verticalAlign:_that.position,
                    position: 'right',
                    formatter: function (params) {
                        return option.series[0].data[params.dataIndex] + _that.name;
                    },
                    color: _that.maxColor,
                    fontSize: _that.fontSize,
                    fontFamily:_that.labelFont,
                },
                color:_that.trackColor,
                itemStyle: {
                        barBorderRadius: _that.barWidth,
                },
                emphasis:{
                    itemStyle: {
                        color:_that.trackColor,
                        opacity: .8,
                    }
                }
            }
        ],
    };


    if(_that.follow==true){
        option.series[0].label.show=true;
        option.series[1].label.show=false;
    }else if(_that.follow==false){
        option.series[0].label.show=false;
        option.series[1].label.show=true;
    }else{
    option.series[0].label.show=false;
    option.series[1].label.show=true;
    }

    if(_that.position=='top'){
        option.grid.top=_that.barWidth/2;
        option.grid.bottom=_that.lineHeight - 8 + _that.barWidth/2;
        option.yAxis.axisLabel.padding= [4, 0, 0, 0];
        option.series[0].label.offset= [-5,4];
        option.series[1].label.offset= [-5,4];
    }else if(_that.position=='middle'){
        option.yAxis.boundaryGap=true;
        option.grid.top=0;
        option.grid.bottom=0;
        option.grid.left=_that.leftGap;
        option.grid.right=_that.rightGap;
        option.yAxis.offset=_that.leftGap + 8;
        option.yAxis.axisLabel.padding= [4, 0, 0, 0];
        option.series[0].label.align='left';
        option.series[0].label.offset= [0,2];
        option.series[1].label.align='left';
        option.series[1].label.offset= [0,2];
        if(_that.follow==true){
            option.series[1].color='transparent';
            option.series[1].emphasis.itemStyle.color='transparent';
        }
    }else{
    }


    echarts.init(_that.domEle).setOption(option);

};