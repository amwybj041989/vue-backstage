<template>
<div id="sellordersearch" class="right-content">
    <el-row class="mb-10">
        <el-col :span="24" class="el-item display-table top-toolbar-complex">
            <div class="toolbar-path tn">订单数据统计</div>
            <div class="toolbar-function">
                <el-form :inline="true" :model="toolbarFrom" class="tr">
                    <!-- <el-form-item>
                        <el-select v-model="toolbarFrom.progress" disabled placeholder="选择省份"></el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="toolbarFrom.city" disabled placeholder="选择城市" no-data-text="请先选择省份"></el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="toolbarFrom.area" disabled placeholder="选择区/镇" no-data-text="请先选择城市"></el-select>
                    </el-form-item> -->
                    <el-form-item>
                        <el-select v-model="toolbarFrom.box" clearable placeholder="选择盒子" no-data-text="没有盒子">
                            <el-option v-for="item in boxlist" :label="item.box_name" :value="item.box_no"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker v-model="toolbarFrom.time" type="daterange" align="right" placeholder="选择查询/导出时间范围" :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchToolbar(1)">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="exportExcel">导出EXCEL</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>

    <el-row class="mb-10" v-if="orderList.orderNum">
        <el-col :span="24" class="el-item inline-datalist">
            <ul >
                <li>
                    <h2 class="theme-h2 tc">{{ orderList.orderNum }}</h2>
                    <p class="theme-p tc mt-5">订单总数量</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc">{{ orderList.productNum }}</h2>
                    <p class="theme-p tc mt-5">售出商品(份)</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc cl-supernova">{{ orderList.orderMoney }}</h2>
                    <p class="theme-p tc mt-5">订单总金额(元)</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc">{{ orderList.orderIncome }}</h2>
                    <p class="theme-p tc mt-5">实收订单金额(元)</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc">{{ orderList.orderSku }}</h2>
                    <p class="theme-p tc mt-5">平均客单价(元)</p>
                </li>
            </ul>
        </el-col>
    </el-row>

    <el-row class="mb-10">
        <el-col :span="24" class="el-item pa-10">
            <el-table :data="orderList.order" :stripe="true" style="width: 100%">
                <el-table-column prop="box" label="来源盒子" width="110"></el-table-column>
                <el-table-column prop="time" label="付款时间" width="170"></el-table-column>
                <el-table-column prop="order_no" label="订单号"></el-table-column>
                <el-table-column prop="phone" label="联系方式" width="130"></el-table-column>
                <el-table-column label="购买商品" width="130">
                    <template scope="scope">
                        {{ scope.row.product.length }}份 {{ scope.row.productMoney }}元
                    </template>
                </el-table-column>
                <el-table-column label="" width="70">
                    <template scope="scope">
                        <el-popover ref="popover" placement="right" width="531" trigger="click">
                            <el-table :data="scope.row.product">
                                <el-table-column width="170" property="name" label="商品"></el-table-column>
                                <el-table-column width="120" property="code" label="国际条码"></el-table-column>
                                <el-table-column width="70" property="num" label="数量"></el-table-column>
                                <el-table-column width="85" property="original" label="原价"></el-table-column>
                                <el-table-column width="85" property="price" label="现价"></el-table-column>
                            </el-table>
                        </el-popover>
                        <el-button v-popover:popover class="" size="mini">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="vouchers" label="使用代金券" width="130"></el-table-column>
                <el-table-column prop="integral" label="使用积分" width="95"></el-table-column>
                <el-table-column prop="money" label="实付金额" width="95"></el-table-column>
                <el-table-column prop="payType" label="支付方式" width="95"></el-table-column>
            </el-table>

            <el-pagination @current-change="handleCurrentChange" :page-size="20" :current-page="1" layout="total, prev, pager, next, jumper" :total="orderList.count">
            </el-pagination>
        </el-col>
    </el-row>
</div>
</template>

<script type="text/javascript">
// 订单数据查询页
import api from '../../api/api.js'
import { API_HOST } from '../../config/config.js'
import '../../static/style/sellment/orderSearch.scss'

export default {
    data() {
        return {
            toolbarFrom: {
                // provinces: '',
                // city: '',
                // area: '',
                time: '',
                box: ''
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                },
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                        picker.$emit('pick', [start, end])
                    }
                }]
            }
        }
    },
    created() {
        this.getOrderList()
        let param = {
            page: 0
        }
        this.$store.dispatch('getBoxList', param)
    },
    computed: {
        boxlist() {
            let _data = this.$store.getters.boxList,
                _boxList = []
            for (let elem of _data.values()) {
                if(elem.status === '1'){
                    _boxList.push(elem)
                }
            }
            return _boxList
         },
        orderList() { return this.$store.getters.orderList }
    },
    methods: {
        searchToolbar(val) {
            // 搜索
            if(this.toolbarFrom.provinces === '' && this.toolbarFrom.city === '' && this.toolbarFrom.area === '' && this.toolbarFrom.time === ''){
                this.getOrderList()
                return false
            }
            let param = {
                page: (val != undefined) ? val : 1
            }
            if(this.toolbarFrom.box !== '') {
                param.box_no = this.toolbarFrom.box
            }
            if(this.toolbarFrom.time !== '') {
                param.start_time = new Date(this.toolbarFrom.time[0]).format("yyyy-MM-dd")
                param.end_time = new Date(this.toolbarFrom.time[1]).format("yyyy-MM-dd")
            }
            this.$store.dispatch('getOrderList', param)
        },
        handleCurrentChange(val) {
            // 页码改变
            if(this.toolbarFrom.provinces !== '' || this.toolbarFrom.city !== '' || this.toolbarFrom.area !== '' || this.toolbarFrom.time !== ''){
                this.searchToolbar(val)
                return false
            }
            let param = {
                page: val
            }
            this.$store.dispatch('getOrderList', param)
        },
        getOrderList() {
            // 获取所有订单
            let param = {
                page: 1
            }
            this.$store.dispatch('getOrderList', param)
        },
        exportExcel() {
            // 导出excel
            // let token = this.$store.getters.getToken
            console.log(this.$store.getters.getToken)
            let token = 'test',
                url = API_HOST + '/Order/getExcel.html?token=' + token

            if(this.toolbarFrom.box !== '') {
                url += '&box_no=' + this.toolbarFrom.box
            }
            if(this.toolbarFrom.time !== '') {
                url += '&start_time=' + new Date(this.toolbarFrom.time[0]).format("yyyy-MM-dd")
                url += '&end_time=' + new Date(this.toolbarFrom.time[1]).format("yyyy-MM-dd")
            }
            window.open(url)

        }
    }
}
</script>
