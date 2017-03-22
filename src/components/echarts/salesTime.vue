<template>
<el-row>
    <el-col :span="24" class="el-item">
        <div id="salesTime" class="echarts-wrap"></div>
        <!-- <el-alert class="echarts-alert" title="没有数据，无法显示销售时间段分析图表" type="info" show-icon :closable="false"></el-alert> -->
    </el-col>
</el-row>
</template>

<script type="text/javascript">
/**
 * 销售时间段分析
 */
import echarts from 'echarts'
import api from '../../api/api'
import '../../static/style/common/echarts.scss'

export default {
    data() {
        return {
            setOption: {
                title: {
                    text: '销售时间段分析'
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    feature: {
                        dataView: {
                            show: false,
                            readOnly: false
                        },
                        magicType: {
                            show: false,
                            type: ["bar"]
                        },
                        restore: {
                            show: false
                        },
                        saveAsImage: {
                            show: false
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                },
                legend: {
                    left: 'right',
                    align: 'right',
                    data: []
                },
                series: [],
                yAxis: {
                    type: 'value',
                    name: '订单份数',
                    min: 0,
                    interval: 2,
                    axisLabel: {
                        formatter: '{value} 份'
                    },
                    axisLabel: {
                        inside: true
                    },
                    axisTick: {
                        show: false
                    }
                },
                // dataZoom: [{
                //     type: 'slider',
                //     show: true,
                //     xAxisIndex: [0],
                //     start: 0,
                //     end: 50
                // }],
                grid: {
                    left: '0%',
                    right: '0%',
                    top: '55px',
                    bottom: '20px',
                    backgroundColor: '#f8f8f8',
                    containLabel: false
                }
            }
        }
    },
    mounted() {
        let that = this
        api.getSalesTime(function (response) {
            let _data = response.data.data,
                _legendData = []
            for (let index of _data.keys()) {
                _legendData.push(_data[index].name)
            }
            that.setOption.legend.data = _legendData
            that.setOption.series = _data
            let myChart = echarts.init(document.getElementById('salesTime'))
            myChart.setOption(that.setOption)
        })
    },
    methods: {

    }
}
</script>
