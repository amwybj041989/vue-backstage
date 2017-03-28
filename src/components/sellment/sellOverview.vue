<template>
<div id="sellmentoverview" class="right-content">
    <el-row :gutter="15">
        <el-col :span="6">
            <div class="el-item item-2x">
                <h1 class="theme-h1 tn tc">{{ dashboardData.enableBox }}<span class="fs-s5em">个</span></h1>
                <p class="theme-p tn tc mt-5">启用中的盒子</p>
                <el-progress :text-inside="true" :stroke-width="24" :percentage="dashboardData.maintainProportions" status="success" class="mt-15"></el-progress>
                <p class="theme-p tn tc mt-10">{{ dashboardData.maintainProportions }}% 今日已完成补货维护</p>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="el-item item-2x">
                <h1 class="theme-h1 tc tn">{{ dashboardData.todayOrderQuantity }}</h1>
                <p class="theme-p tc tn mt-5">今日订单量</p>
                <div class="tc mt-20">
                    <el-tooltip class="item" effect="dark" content="同比：对比昨天订单量" placement="top">
                        <el-tag v-if="Number(dashboardData.orderContrast) >= 0 " color="#54D7DB">+{{ dashboardData.orderContrast }}%</el-tag>
                        <el-tag v-else color="#FF4949">{{ dashboardData.orderContrast }}%</el-tag>
                    </el-tooltip>
                </div>
                <p class="theme-p tn tc mt-10">
                    <a href="javascript:void(0)" class="el-icon-arrow-left fs-s9em" v-on:click="getOrderQuantity"></a> {{ date }}
                    <a href="javascript:void(0)" class="el-icon-arrow-right fs-s9em" v-on:click="getOrderQuantity"></a>
                </p>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="el-item item-2x">
                <h1 class="theme-h1">{{ dashboardData.todayGrossIncome }} <span class="fs-s5em">&yen;</span>
                    <el-tooltip class="item" effect="dark" content="同比：对比昨天营业额" placement="top">
                        <span class="fs-s35em fr mt-10" v-if="Number(dashboardData.grossIncome) >= 0" style="color: #B9D963">{{ dashboardData.grossIncome }}%<i class="iconfont icon-up fs-1s2em"></i></span>
                        <span class="fs-s35em fr mt-10" v-else style="color: #FF4949">{{ dashboardData.grossIncome }}%<i class="iconfont icon-down fs-1s2em"></i></span>
                    </el-tooltip>
                </h1>
                <p class="theme-p mt-5">
                    <span>截止当前今日营业额</span>
                    <span class="fr">
                        <a href="javascript:void(0)" class="el-icon-arrow-left fs-s9em" v-on:click="getOrderQuantity"></a> {{ date }} <a href="javascript:void(0)" class="el-icon-arrow-right fs-s9em" v-on:click="getOrderQuantity"></a>
                    </span>
                </p>
                <div class="month-turnover cl-white bg-supernova">
                    本月累计营业额 <span class="fr">&yen; {{ dashboardData.turnover }}</span>
                </div>
            </div>
        </el-col>
    </el-row>

    <el-row>
        <el-col :span="24" class="el-item inline-datalist">
            <ul>
                <li>
                    <h2 class="theme-h2 tc cl-supernova">{{ dashboardData.todayGrossProfit }}</h2>
                    <p class="theme-p tc mt-5">当天毛利收入(元)</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc">{{ dashboardData.todayGrossMargin }}%</h2>
                    <p class="theme-p tc mt-5">当天毛利率</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc">{{ dashboardData.totalProduct }}</h2>
                    <p class="theme-p tc mt-5">在售商品数(份)</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc">{{ dashboardData.todayAvgPrice }}</h2>
                    <p class="theme-p tc mt-5">当天平均客单价(元)</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc">{{ dashboardData.todayAvgSku }}</h2>
                    <p class="theme-p tc mt-5">平均每单SKU(份)</p>
                </li>
            </ul>
        </el-col>
    </el-row>

    <order-sales></order-sales>
    <sales-time></sales-time>
</div>
</template>

<script type="text/javascript">
/**
 * 销售数据概览页组件
 */
import { getNowTime } from '../../utils/com.js'
import orderSales from './orderSales.vue'
import salesTime from './salesTime.vue'
import '../../static/style/sellment/sellOverview.scss'

export default {
    data() {
        return {
            date: getNowTime()
            // date: new Date().format("yyyy-MM-dd")
        }
    },
    created() {
        this.$store.dispatch('getDashboardData')
    },
    computed: {
        dashboardData() { return this.$store.getters.selldata }
    },
    mounted() {

    },
    methods: {
        // 功能开发中
        getOrderQuantity() {
            this.$alert('该功能还在开发中', '系统通知', {
                confirmButtonText: '确定'
            })
        }
    },
    components: {
        orderSales,
        salesTime
    }
}
</script>
