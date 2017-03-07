<template>
<div class="buy">
    <el-table :data="userBuyRecord.list" :stripe="true" style="width: 100%">
        <el-table-column prop="time" label="付款时间" width="110"></el-table-column>
        <el-table-column prop="orderno" label="订单号"></el-table-column>
        <el-table-column label="购买商品" width="125">
            <template scope="scope">
                {{ scope.row.product.length }}份 {{ scope.row.price }}元
            </template>
        </el-table-column>
        <el-table-column label="" width="70">
            <template scope="scope">
                <el-popover ref="popover" placement="right" width="371" trigger="click">
                    <el-table :data="scope.row.product">
                        <el-table-column width="220" property="name" label="商品"></el-table-column>
                        <el-table-column width="75" property="num" label="数量"></el-table-column>
                        <el-table-column width="75" property="price" label="共计"></el-table-column>
                    </el-table>
                </el-popover>
                <el-button v-popover:popover class="" size="mini">详情</el-button>
            </template>
        </el-table-column>
        <el-table-column label="使用代金券" width="110">
            <template scope="scope">
                {{ scope.row.coupon_fee | couponFee }}
            </template>
        </el-table-column>
        <el-table-column prop="integral" label="使用积分" width="95"></el-table-column>
        <el-table-column prop="money" label="支付金额" width="95"></el-table-column>
        <el-table-column label="支付方式" width="95">
            <template scope="scope">
                {{ scope.row.payType | payType }}
            </template>
        </el-table-column>
        <el-table-column prop="cashBack" label="消费返现" width="95"></el-table-column>
    </el-table>

    <el-pagination @current-change="handleCurrentChange" :page-size="20" :current-page="1" layout="total, prev, pager, next, jumper" :total="userBuyRecord.count" class="mb-15"></el-pagination>

</div>
</template>

<script type="text/javascript">
// 注册用户列表
import '../../static/style/userment/detailBuy.scss'

export default {
    data() {
        return {

        }
    },
    created() {
        let param = {
            id: this.$route.params.id,
            page: 1
        }
        this.$store.dispatch('getUserBuyRecord', param)
    },
    computed: {
        userBuyRecord() { return this.$store.getters.userBuyRecord }
    },
    methods: {
        handleCurrentChange(val) {
            let param = {
                id: this.$route.params.id,
                page: val
            }
            this.$store.dispatch('getUserBuyRecord', param)
        }
    },
    filters: {
        // 过滤器
        payType (value) {
            let type = ''
            switch(value){
                case '1':
                    type = '微信'
                    break;
                case '2':
                    type = '支付宝'
                    break;
                case '3':
                    type = '翼支付'
                    break;
            }
            return type
        },
        couponFee(value) {
            return Number(value) > 0 ? value + '元盒子券' : '--'
        }
    }
}
</script>
