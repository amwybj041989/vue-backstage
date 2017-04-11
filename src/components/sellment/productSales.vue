<template>
<div id="sellproductsales" class="right-content">
    <el-row class="mb-10">
        <el-col :span="24" class="el-item display-table top-toolbar-complex">
            <div class="toolbar-path tn">商品数据统计</div>
            <div class="toolbar-function">
                <el-form :inline="true" :model="toolbarFrom" class="tr">
                    <el-form-item>
                        <el-select v-model="toolbarFrom.box" clearable placeholder="选择盒子" no-data-text="没有盒子">
                            <el-option v-for="item in boxlist" :label="item.box_name" :value="item.box_no" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker v-model="toolbarFrom.time" type="daterange" align="right" placeholder="选择查询/导出时间范围" :picker-options="pickerOptions"></el-date-picker>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="searchToolbar">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>

    <el-row class="mb-10" v-if="salesData.top">
        <el-col :span="24" class="el-item inline-datalist">
            <ul>
                <li>
                    <h2 class="theme-h2 tc">{{ salesData.top.sales }}</h2>
                    <p class="theme-p tc mt-5">销售总金额(元)</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc f-color f-money">{{ salesData.top.shiSales }}</h2>
                    <p class="theme-p tc mt-5">实收总金额(元)</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc">{{ salesData.top.salesCount }}</h2>
                    <p class="theme-p tc mt-5">销售商品总量</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc">{{ salesData.top.profit }}</h2>
                    <p class="theme-p tc mt-5">商品总毛利(元)</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc">{{ salesData.top.profitM }}</h2>
                    <p class="theme-p tc mt-5">总毛利率(%)</p>
                </li>
            </ul>
        </el-col>
    </el-row>

    <el-row class="mb-10">
        <el-col :span="24" class="el-item pa-10">
            <div class="tableTopbar">
                <span>查询时间内商品销售情况（默认为全部数据）</span>
                <el-button type="success" @click="exportExcel">导出EXCEL</el-button>
            </div>
            <el-table :data="salesData.ProductList" :stripe="true" class="w-100">
                <el-table-column prop="productId" label="商品ID" width="110"></el-table-column>
                <el-table-column prop="code" label="国际条码" width="150"></el-table-column>
                <el-table-column prop="title" label="商品名称"></el-table-column>
                <el-table-column prop="pack" label="包装" width="95"></el-table-column>
                <el-table-column prop="spec" label="规格" width="95"></el-table-column>
                <el-table-column prop="num" label="销量(份)" width="130"></el-table-column>
                <el-table-column prop="single_price" label="售价(元)" width="130"></el-table-column>
                <el-table-column label="销售额(元)" width="130" >
                    <template scope="scope">
                        <span class="f-color f-money">{{ scope.row.all_price }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="handleCurrentChange" :page-size="20" :current-page="1" layout="total, prev, pager, next, jumper" :total="salesData.count">
            </el-pagination>
        </el-col>
    </el-row>

</div>
</template>

<script type="text/javascript">
// 商品销售统计
import { API_HOST } from '../../config/config.js'
import '../../static/style/sellment/productSales.scss'

export default {
    data() {
        return {
            toolbarFrom: {
                box: '',
                time: ''
            },
            searchBtn: 0,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                },
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            }
        }
    },
    created() {
        this.$store.dispatch('getBoxList', { page: 0 })
        this.$store.dispatch('getProductSales', { page: 1 })
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
        salesData() { return this.$store.getters.productSales }
    },
    methods: {
        searchToolbar(val) {
            let param = {
                page: (typeof val === "number") ? val : 1
            }
            if(this.toolbarFrom.box !== '') {
                param.box_no = this.toolbarFrom.box
            }
            if(this.toolbarFrom.time !== '' && this.toolbarFrom.time[0] !== null) {
                param.start_time = new Date(this.toolbarFrom.time[0]).format("yyyy-MM-dd")
                param.end_time = new Date(this.toolbarFrom.time[1]).format("yyyy-MM-dd")
            }
            this.$store.dispatch('getProductSales', param).then(() => {
                if(!(typeof val === "number")){
                    this.$message({
                        message: '获取数据成功',
                        type: 'success'
                    })
                }
            })
            this.searchBtn++
        },
        handleCurrentChange(val) {
            // 页码改变
            if(this.searchBtn > 0 && (this.toolbarFrom.box !== '' || this.toolbarFrom.time !== '')){
                this.searchToolbar(val)
                return false
            }
            this.$store.dispatch('getProductSales', { page: val })
        },
        exportExcel() {
            // 导出excel
            let token = this.$store.getters.getToken,
                url = API_HOST + '/Order/getProductsExcel.html?token=' + token
            if(this.searchBtn > 0) {
                if(this.toolbarFrom.box !== '') {
                    url += '&box_no=' + this.toolbarFrom.box
                }
                if(this.toolbarFrom.time !== '' && this.toolbarFrom.time[0] !== null) {
                    url += '&start_time=' + new Date(this.toolbarFrom.time[0]).format("yyyy-MM-dd")
                    url += '&end_time=' + new Date(this.toolbarFrom.time[1]).format("yyyy-MM-dd")
                }
            }

            window.open(url)

        }
    }
}
</script>
