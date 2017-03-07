<template>
    <div class="overview-dataList">
        <div class="overview-ordernum">
            <div class="overview-ordernum-item display-table total-ordernum">
                <div class="ordernum-title"><span>累积订单</span></div>
                <div class="ordernum-text">{{ overviewdata.allOrdersTotal }}</div>
            </div>
            <div class="overview-ordernum-item display-table">
                <div class="ordernum-title"><span>今日订单</span></div>
                <div class="ordernum-text">{{ overviewdata.todayOrdersTotal }}</div>
            </div>
        </div>
        <el-card class="overview-datalist">
            <div class="text item display-table" v-for="item in overviewdata.dataList">
                <div class="list-left">
                    <img :src="item.icon" height="65" width="65">
                </div>
                <div class="list-right" v-if="item.historyname">
                    <el-carousel height="100%" arrow="always" indicator-position="none" :autoplay="false">
                        <el-carousel-item>
                            <div class="list-right-box">
                                <p class="list-value">{{ item.todayvalue }}</p>
                                <p class="list-name">{{ item.todayname }}</p>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item>
                            <div class="list-right-box">
                                <p class="list-value">{{ item.historyvalue }}</p>
                                <p class="list-name">{{ item.historyname }}</p>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="list-right" v-else>
                    <div class="list-right-box">
                        <p class="list-value">{{ item.todayvalue }}</p>
                        <p class="list-name">{{ item.todayname }}</p>
                    </div>
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
  		data () {
    		return {

    		}
  		},
        created () {
            // 获取数据
            this.$store.dispatch('getOverviewData')
        },
        computed: {
            overviewdata() { return this.$store.getters.overviewdata }
        },
        mounted () {

        }
	}

</script>
