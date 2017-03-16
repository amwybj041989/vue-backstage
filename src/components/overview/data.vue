<template>
    <div class="overview-dataList">
        <div class="overview-ordernum">
            <div class="overview-ordernum-item display-table total-ordernum">
                <div class="ordernum-title"><span>累积订单</span></div>
                <div class="ordernum-text">{{ overviewdata.allOrdersTotal }}</div>
            </div>
            <div class="overview-ordernum-item display-table">
                <div class="ordernum-title"><span>今日订单</span></div>
                <div class="ordernum-text">{{ overviewdata.todayOrderQuantity }}</div>
            </div>
        </div>
        <el-card class="overview-datalist">

            <div class="text item display-table">
                <div class="list-left">
                    <img src="../../static/img/list-sku.png" height="65" width="65">
                </div>
                <div class="list-right">
                    <div class="list-right-box">
                        <p class="list-value">{{ overviewdata.totalProduct }}</p>
                        <p class="list-name">总共在售sku</p>
                    </div>
                </div>
            </div>

            <div class="text item display-table">
                <div class="list-left">
                    <img src="../../static/img/list-ys.png" height="65" width="65">
                </div>
                <div class="list-right">
                    <el-carousel height="100%" arrow="always" indicator-position="none" :autoplay="false">
                        <el-carousel-item>
                            <div class="list-right-box">
                                <p class="list-value">{{ overviewdata.todayGrossIncome }}</p>
                                <p class="list-name">当天营业收入</p>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item>
                            <div class="list-right-box">
                                <p class="list-value">{{ overviewdata.DaysFee }}</p>
                                <p class="list-name">近7天平均营业收入</p>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>

            <div class="text item display-table">
                <div class="list-left">
                    <img src="../../static/img/list-kdj.png" height="65" width="65">
                </div>
                <div class="list-right">
                    <el-carousel height="100%" arrow="always" indicator-position="none" :autoplay="false">
                        <el-carousel-item>
                            <div class="list-right-box">
                                <p class="list-value">{{ overviewdata.todayAvgPrice }}</p>
                                <p class="list-name">当天平均客单价</p>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item>
                            <div class="list-right-box">
                                <p class="list-value">{{ overviewdata.historyAvgPrice }}</p>
                                <p class="list-name">历史平均客单价</p>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>

            <div class="text item display-table">
                <div class="list-left">
                    <img src="../../static/img/list-mdsku.png" height="65" width="65">
                </div>
                <div class="list-right">
                    <el-carousel height="100%" arrow="always" indicator-position="none" :autoplay="false">
                        <el-carousel-item>
                            <div class="list-right-box">
                                <p class="list-value">{{ overviewdata.todayAvgSku }}</p>
                                <p class="list-name">当天平均每单sku</p>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item>
                            <div class="list-right-box">
                                <p class="list-value">{{ overviewdata.historySku }}</p>
                                <p class="list-name">历史平均每单sku</p>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>

            <div class="text item display-table">
                <div class="list-left">
                    <img src="../../static/img/list-lsl.png" height="65" width="65">
                </div>
                <div class="list-right">
                    <el-carousel height="100%" arrow="always" indicator-position="none" :autoplay="false">
                        <el-carousel-item>
                            <div class="list-right-box">
                                <p class="list-value">{{ overviewdata.NowDayRetention }}</p>
                                <p class="list-name">当天顾客流失率</p>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item>
                            <div class="list-right-box">
                                <p class="list-value">{{ overviewdata.HistoryRetention }}</p>
                                <p class="list-name">历史顾客流失率</p>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>

        </el-card>
    </div>
</template>

<script type="text/javascript">
/**
 * 地图概览页数据列表组件
 */
import '../../static/style/overview/data.scss'

export default {
	data() {
		return {

		}
	},
    created() {
        // 获取数据
        this.$store.dispatch('getOverviewData')
    },
    computed: {
        overviewdata() { return this.$store.getters.overviewdata }
    },
    mounted() {

    }
}

</script>
