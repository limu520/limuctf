function PercentPie(option){
    this.backgroundColor = option.backgroundColor||'transparent';
    this.color           = option.color||['#566ab3','#e66d39'];
    this.fontSize        = option.fontSize||12;
    this.domEle          = option.domEle;
    this.value           = option.value;
    this.name            = option.name;
    this.title           = option.title;
    this.formatter           = option.formatter||'{b}\n{c}%';
}

PercentPie.prototype.init = function(){
    var _that = this;
    var option = {
        backgroundColor:_that.backgroundColor,
        color:_that.color,
        title: {
            text: _that.title,
            top:'0',
            left:'0',
            textStyle:{
                color: '#333',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontFamily: 'sans-serif',
                fontSize: 14,
            }
        },
        series: [{
            name: '',
            type: 'pie',
            radius: ['60%', '75%'],
            avoidLabelOverlap: false,
            hoverAnimation:false,
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    textStyle: {
                        fontSize: _that.fontSize,
                        fontWeight: 'normal'
                    },
                    formatter: _that.formatter
                }
            },
            data: [{
                    value: _that.value,
                    name: _that.name,
                    label:{
                        normal:{
                            show:true
                        }
                    }
                 },
                {
                    value: 100-_that.value,
                    name: ''
                }
            ]
        }]
    };

    echarts.init(_that.domEle).setOption(option);
};