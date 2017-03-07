<template>
<div class="basisdata">
    <table border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td class="table-left bb">
                <img v-if="userBasisData.avatar" :src="userBasisData.avatar">
                <img v-else src="../../static/img/head.png">
            </td>
            <td>
                <table class="table-wrap" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>UnionID</td>
                        <td>{{ userBasisData.unionid }}</td>
                    </tr>
                    <tr>
                        <td>用户昵称</td>
                        <td>{{ userBasisData.nickname }}</td>
                    </tr>
                    <tr>
                        <td>注册盒子</td>
                        <td>{{ userBasisData.box }}</td>
                    </tr>
                    <tr>
                        <td>注册时间</td>
                        <td>{{ userBasisData.time }}</td>
                    </tr>
                </table>
            </td>
            <td>
                <table class="table-wrap" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>微信OpenID</td>
                        <td>{{ userBasisData.openid }}</td>
                    </tr>
                    <tr>
                        <td>绑定手机号</td>
                        <td>{{ userBasisData.mobi }}</td>
                    </tr>
                    <tr>
                        <td>注册区域</td>
                        <td>{{ userBasisData.area }}</td>
                    </tr>
                    <tr>
                        <td>最近使用时间</td>
                        <td>{{ userBasisData.useTime }}</td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td class="table-left bb">消费信息</td>
            <td>
                <table class="table-wrap" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>购买次数</td>
                        <td>{{ userBasisData.buyNum }}</td>
                    </tr>
                    <tr>
                        <td>消费积分</td>
                        <td>{{ userBasisData.integral }}</td>
                    </tr>
                </table>
            </td>
            <td>
                <table class="table-wrap" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>累计消费金额</td>
                        <td>{{ userBasisData.consumption }}</td>
                    </tr>
                    <tr>
                        <td>账户余额</td>
                        <td>{{ userBasisData.balance }}</td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr v-if="userBasisData.user">
            <td class="table-left bb">*已通过实名认证</td>
            <td>
                <table class="table-wrap" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>真实姓名</td>
                        <td>{{ userBasisData.user.name }}</td>
                    </tr>
                    <tr>
                        <td>出生年月</td>
                        <td>{{ userBasisData.user.bornTime }}</td>
                    </tr>
                </table>
            </td>
            <td>
                <table class="table-wrap" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>性别</td>
                        <td>{{ userBasisData.user.sex }}</td>
                    </tr>
                    <tr>
                        <td>年龄</td>
                        <td>{{ userBasisData.user.age }}</td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr v-else>
            <td colspan="3" class="bb">
                <p class="development">未通过实名认证</p>
            </td>
        </tr>
        <tr v-if="userBasisData.owner">
            <td class="table-left">业主认证</td>
            <td>
                <table class="table-wrap" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>是否业主认证</td>
                        <td>已通过业主认证</td>
                    </tr>
                    <tr>
                        <td>所属省份</td>
                        <td>{{ userBasisData.owner.progress }}</td>
                    </tr>
                    <tr>
                        <td>所属城区</td>
                        <td>{{ userBasisData.owner.area }}</td>
                    </tr>
                    <tr>
                        <td>具体门牌</td>
                        <td>{{ userBasisData.owner.doorNumber }}</td>
                    </tr>
                    <tr>
                        <td>消费已返现</td>
                        <td>{{ userBasisData.owner.uncashBack }}</td>
                    </tr>
                </table>
            </td>
            <td>
                <table class="table-wrap" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>注册盒子</td>
                        <td>{{ userBasisData.owner.box }}</td>
                    </tr>
                    <tr>
                        <td>所属城市</td>
                        <td>{{ userBasisData.owner.city }}</td>
                    </tr>
                    <tr>
                        <td>所属小区</td>
                        <td>{{ userBasisData.owner.residential }}</td>
                    </tr>
                    <tr>
                        <td>认证时间</td>
                        <td>{{ userBasisData.owner.time }}</td>
                    </tr>
                    <tr>
                        <td>剩余可返现</td>
                        <td>{{ userBasisData.owner.cashBack }}</td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr v-else>
            <td colspan="3" class="bb">
                <p class="development">未通过业主认证</p>
            </td>
        </tr>
    </table>
</div>
</template>

<script type="text/javascript">
// 注册用户列表
import '../../static/style/userment/detailBasisdata.scss'

export default {
    data() {
        return {

        }
    },
    created() {
        let param = {
            id: this.$route.params.id
        }
        this.$store.dispatch('getUserBasisData',param)
    },
    computed: {
        userBasisData() { return this.$store.getters.userBasisData }
    },
    methods: {

    }
}
</script>
