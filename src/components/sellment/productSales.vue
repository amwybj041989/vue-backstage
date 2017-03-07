<template>
<div id="sellproductsales" class="right-content">
    <el-row class="mb-10">
        <el-col :span="24" class="el-item display-table top-toolbar-complex">
            <div class="toolbar-path tn">订单数据统计</div>
            <div class="toolbar-function">
                <el-form :inline="true" :model="toolbarFrom" class="tr">
                    <el-form-item>
                        <el-date-picker v-model="toolbarFrom.time" type="daterange" align="right" placeholder="选择查询/导出时间范围" :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="toolbarFrom.box" placeholder="选择盒子">
                            <el-option label="缤果盒子A1001" value="缤果盒子A1001"></el-option>
                            <el-option label="缤果盒子A1002" value="缤果盒子A1002"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchToolbar">查询</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-col>
    </el-row>

    <el-row class="mb-10">
        <el-col :span="24" class="el-item inline-datalist">
            <ul>
                <li>
                    <h2 class="theme-h2 tc">62987.08</h2>
                    <p class="theme-p tc mt-5">销售总金额(元)</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc cl-supernova">61843.7</h2>
                    <p class="theme-p tc mt-5">实收总金额(元)</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc">12580</h2>
                    <p class="theme-p tc mt-5">销售商品总量</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc">24853.2</h2>
                    <p class="theme-p tc mt-5">商品总毛利(元)</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc">39.45</h2>
                    <p class="theme-p tc mt-5">总毛利率(%)</p>
                </li>
            </ul>
        </el-col>
    </el-row>

    <el-row class="mb-10">
        <el-col :span="24" class="el-item pa-10">
            <div class="tableTopbar"><span>查询时间内商品销售情况</span>
                <el-button type="success">导出ESCEL</el-button>
            </div>
            <el-table :data="tableData" :stripe="true" style="width: 100%">
                <el-table-column prop="id" label="商品ID" width="110"></el-table-column>
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column prop="code" label="国际条码" width="150"></el-table-column>
                <el-table-column prop="package" label="包装" width="95"></el-table-column>
                <el-table-column prop="specification" label="规格" width="95"></el-table-column>
                <el-table-column prop="sales" label="销量(份)" width="130"></el-table-column>
                <el-table-column prop="price" label="售价(元)" width="130"></el-table-column>
                <el-table-column prop="money" label="销售额(元)" width="130"></el-table-column>
            </el-table>

            <el-pagination @current-change="handleCurrentChange" :current-page="1" layout="total, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
        </el-col>
    </el-row>

</div>
</template>

<script type="text/javascript">
// 订单数据查询页
import '../../static/style/sellment/productSales.scss'

export default {
    data() {
        return {
            toolbarFrom: {
                box: '',
                time: ''
            },
            pickerOptions: {
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
            },
            tableData: [{
                id: '9666',
                name: '大白兔奶糖',
                code: '056418562541',
                package: '1包',
                specification: '100g',
                sales: 1568,
                price: 16.88,
                money: 26822.32
            }]
        }
    },
    methods: {
        searchToolbar() {
            if(this.toolbarFrom.box === '' && this.toolbarFrom.time === ''){
                this.$alert('请至少选择一个查询字段', '系统通知', { confirmButtonText: '确定' })
                return false
            }
            console.log(this.toolbarFrom)
        },
        handleCurrentChange(val) {

        }
    }
}
</script>
