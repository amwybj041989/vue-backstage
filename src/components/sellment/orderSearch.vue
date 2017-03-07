<template>
<div id="sellordersearch" class="right-content">
    <el-row class="mb-10">
        <el-col :span="24" class="el-item display-table top-toolbar-complex">
            <div class="toolbar-path tn">订单数据统计</div>
            <div class="toolbar-function">
                <el-form :inline="true" :model="toolbarFrom" class="tr">
                    <el-form-item>
                        <el-select v-model="toolbarFrom.progress" disabled placeholder="广东省"></el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="toolbarFrom.city" placeholder="选择城市">
                            <el-option label="中山市" value="zhongshang"></el-option>
                            <el-option label="广州市" value="guangzhou"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="toolbarFrom.area" placeholder="选择区/镇" no-data-text="请先选择城市"></el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker v-model="toolbarFrom.time" type="daterange" align="right" placeholder="选择查询/导出时间范围" :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchToolbar">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success">导出ESCEL</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>

    <el-row class="mb-10">
        <el-col :span="24" class="el-item inline-datalist">
            <ul >
                <li>
                    <h2 class="theme-h2 tc">6389</h2>
                    <p class="theme-p tc mt-5">订单总数量</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc">9571</h2>
                    <p class="theme-p tc mt-5">售出商品(份)</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc cl-supernova">16843.7</h2>
                    <p class="theme-p tc mt-5">订单总金额(元)</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc">16791.8</h2>
                    <p class="theme-p tc mt-5">实收订单金额(元)</p>
                </li>
                <li>
                    <h2 class="theme-h2 tc">16.8</h2>
                    <p class="theme-p tc mt-5">平均客单价(元)</p>
                </li>
            </ul>
        </el-col>
    </el-row>

    <el-row class="mb-10">
        <el-col :span="24" class="el-item pa-10">
            <el-table :data="tableData" :stripe="true" style="width: 100%">
                <el-table-column prop="boxno" label="来源盒子" width="110"></el-table-column>
                <el-table-column prop="date" label="付款时间" width="125"></el-table-column>
                <el-table-column prop="orderno" label="订单号"></el-table-column>
                <el-table-column prop="product" label="购买商品" width="130"></el-table-column>
                <el-table-column label="" width="70">
                    <template scope="scope">
                        <el-popover ref="popover" placement="right" width="531" trigger="click">
                            <el-table :data="scope.row.productlsit">
                                <el-table-column width="170" property="name" label="商品"></el-table-column>
                                <el-table-column width="120" property="code" label="国际条码"></el-table-column>
                                <el-table-column width="70" property="quantity" label="数量"></el-table-column>
                                <el-table-column width="85" property="original" label="原价"></el-table-column>
                                <el-table-column width="85" property="price" label="现价"></el-table-column>
                            </el-table>
                        </el-popover>
                        <el-button v-popover:popover class="" size="mini">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="voucher" label="使用代金券" width="110"></el-table-column>
                <el-table-column prop="integration" label="使用积分" width="95"></el-table-column>
                <el-table-column prop="amount" label="实付金额" width="95"></el-table-column>
                <el-table-column prop="paytype" label="支付方式" width="95"></el-table-column>
            </el-table>

            <el-pagination @current-change="handleCurrentChange" :current-page="1" layout="total, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
        </el-col>
    </el-row>
</div>
</template>

<script type="text/javascript">
// 订单数据查询页
import '../../static/style/sellment/orderSearch.scss'

export default {
    data() {
        return {
            toolbarFrom: {
                provinces: '',
                city: '',
                area: '',
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
                boxno: 'A1006',
                date: '2017-02-02',
                orderno: 'A1002-148654564',
                product: '14份 500.00元',
                voucher: '5元盒子券',
                integration: '10',
                amount: '40.0',
                paytype: '微信',
                productlsit: [{
                    name: '可口可乐',
                    code: 650956545,
                    quantity: 1,
                    original: 5.0,
                    price: 114.55
                }, {
                    name: '可口可乐',
                    code: 650956545,
                    quantity: 1,
                    original: 5.0,
                    price: 4.5
                }, {
                    name: '可口可乐',
                    code: 650956545,
                    quantity: 1,
                    original: 5.0,
                    price: 4.5
                }]
            }, {
                boxno: 'A1006',
                date: '2017-02-02',
                orderno: 'A1002-148654564',
                product: '14份 500.00元',
                voucher: '5元盒子券',
                integration: '10',
                amount: '40.0',
                paytype: '微信',
                productlsit: [{
                    name: '可口可乐',
                    code: 650956545,
                    quantity: 1,
                    original: 5.0,
                    price: 4.5
                }, {
                    name: '可口可乐',
                    code: 650956545,
                    quantity: 1,
                    original: 5.0,
                    price: 4.5
                }]
            }, {
                boxno: 'A1006',
                date: '2017-02-02',
                orderno: 'A1002-148654564',
                product: '14份 500.00元',
                voucher: '5元盒子券',
                integration: '10',
                amount: '40.0',
                paytype: '微信',
                productlsit: [{
                    name: '可口可乐',
                    code: 650956545,
                    quantity: 1,
                    original: 5.0,
                    price: 4.5
                }]
            }, {
                boxno: 'A1006',
                date: '2017-02-02',
                orderno: 'A1002-148654564',
                product: '14份 500.00元',
                voucher: '5元盒子券',
                integration: '10',
                amount: '40.0',
                paytype: '微信',
                productlsit: [{
                    name: '可口可乐',
                    code: 650956545,
                    quantity: 1,
                    original: 5.0,
                    price: 4.5
                }]
            }],
        }
    },
    methods: {
        searchToolbar() {
            console.log(this.toolbarFrom.time)
            if(this.toolbarFrom.provinces === '' && this.toolbarFrom.city === '' && this.toolbarFrom.area === '' && this.toolbarFrom.time === ''){
                this.$alert('请至少选择一个查询字段', '系统通知', { confirmButtonText: '确定' })
                return false
            }
            console.log('submit!')
        },
        handleCurrentChange(val) {

        }
    }
}
</script>
