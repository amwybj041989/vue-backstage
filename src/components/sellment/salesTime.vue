<template>
<el-row>
    <el-col :span="24" class="el-item">
        <div id="salesTime" class="echarts-wrap" v-show="echartsDisplay"></div>
        <el-alert title="系统提示" type="info" description="没有数据，无法显示销售时间段分析图表" show-icon v-if="!echartsDisplay"></el-alert>
    </el-col>
</el-row>
</template>

<script type="text/javascript">
/**
 * 销售时间段分析
 */
import echarts from 'echarts'
import api from '../../api/api.js'
import '../../static/style/sellment/echarts.scss'

export default {
    data() {
        return {
            echartsDisplay: true,
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
        api.apiCommunication('/Sales/getTimeData', {}, function (response) {
            if (response.status === '404') {
                that.echartsDisplay = false
                return false
            }
            that.echartsDisplay = true
            let _data = response.data,
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
