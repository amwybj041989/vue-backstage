<template>
<el-row>
    <el-col :span="24" class="el-item">
        <div id="orderSales" class="echarts-wrap"></div>
        <div class="echarts-bar">
            <el-button-group>
                <el-button :type="groupStatus.today" size="small" @click="switchData(1)">今天</el-button>
                <el-button :type="groupStatus.seven" size="small" @click="switchData(7)">7天</el-button>
                <el-button :type="groupStatus.thirty" size="small" @click="switchData(30)">30天</el-button>
                <el-button :type="groupStatus.ninety" size="small" @click="switchData(90)">90天</el-button>
            </el-button-group>
        </div>
    </el-col>
</el-row>
</template>

<script type="text/javascript">
/**
 * 销售额／订单量曲线图
 */
import echarts from 'echarts'
import api from '../../api/api'
import '../../static/style/common/echarts.scss'

export default {
    data() {
        return {
            groupStatus: {
                now: 7,
                today: '',
                seven: 'primary',
                thirty: '',
                ninety: ''
            },
            setOption: {
                title: {
                    text: '销售额／订单量曲线图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                label: {
                    normal: {
                        show: false
                    }
                },
                grid: {
                    left: '0%',
                    right: '1px',
                    top: '40px',
                    bottom: '20px',
                    backgroundColor: '#f8f8f8',
                    containLabel: false
                },
                legend: {
                    data: ['订单数', '销售额'],
                    x: 'center'
                },
                xAxis: {
                    axisTick: {
                        alignWithLabel: true
                    },
                    type: 'category',
                    data: []
                },
                yAxis: [{
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#006486',
                                width: 1,
                                type: 'dashed'
                            }
                        },
                        axisTick: {
                            inside: true
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#EA6673',
                                width: 1
                            }
                        },
                        axisLabel: {
                            inside: true
                        },
                        min: 0,
                        interval: 10,
                        type: 'value'
                    },
                    {
                        axisLine: {
                            lineStyle: {
                                color: '#FAC888',
                                width: 1
                            }
                        },
                        axisTick: {
                            inside: true
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            inside: true
                        },
                        min: 0,
                        interval: 100,
                        type: 'value'
                    }
                ],
                series: [{
                        showAllSymbol: true,
                        name: '订单数',
                        type: 'line',
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                color: '#EA6673'
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 3,
                                color: '#EA6673'
                            }
                        },
                        label: {
                            emphasis: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: []
                    },
                    {
                        name: '销售额',
                        type: 'line',
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                color: '#FAC888'
                            }
                        },
                        yAxisIndex: 1,
                        lineStyle: {
                            normal: {
                                width: 3,
                                color: '#FAC888'
                            }
                        },
                        label: {
                            emphasis: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: []
                    }
                ]
            }
        }
    },
    mounted() {
        this.getSalesAmount(7)
    },
    methods: {
        switchData(val) {
            if(val === this.groupStatus.now){
                return false
            }
            let _data = {
                now: val,
                today: '',
                seven: '',
                thirty: '',
                ninety: ''
            }
            switch(val){
                case 1:
                    _data.today = 'primary'
                    break;
                case 7:
                    _data.seven = 'primary'
                    break;
                case 30:
                    _data.thirty = 'primary'
                    break;
                case 90:
                    _data.ninety = 'primary'
                    break;
            }
            this.groupStatus = _data
            this.getSalesAmount(val)
        },
        getSalesAmount(day) {
            let that = this,
                param = {
                    days: day
                }
            api.getSalesAmount(param, function (response) {
                let _data = response.data.data,
                    _xAxis = [],
                    _sales = [],
                    _order = []
                for (let index of _data.sales.keys()) {
                    _xAxis.push(_data.sales[index].time)
                    _sales.push(_data.sales[index].todaySales)
                }
                for (let index of _data.order.keys()) {
                    _order.push(_data.order[index].todayOrder)
                }
                that.setOption.xAxis.data = _xAxis
                that.setOption.series[0].data = _order
                that.setOption.series[1].data = _sales
                let myChart = echarts.init(document.getElementById('orderSales'))
                myChart.setOption(that.setOption)
            })
        }
    }
}
</script>
