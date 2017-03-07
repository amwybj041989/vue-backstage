<template>
<div id="usermentdetail" class="right-content">
    <topbar bone="注册用户列表" btwo="用户详情"></topbar>
    <el-row class="mb-10">
        <el-col :span="24" class="el-item pa-10">
            <el-tabs type="border-card">
                <el-tab-pane label="基础资料">
                    <basisdata></basisdata>
                </el-tab-pane>
                <el-tab-pane label="购买记录">
                    <buy></buy>
                </el-tab-pane>
                <el-tab-pane label="积分记录">
                    <p class="development">待开发</p>
                    <!-- <integral></integral> -->
                </el-tab-pane>
                <el-tab-pane label="人脸识别">
                    <p class="development">待开发</p>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>

</div>
</template>

<script type="text/javascript">
// 用户详情
import topbar from '../common/topbar.vue'
import basisdata from './detailBasisdata.vue'
import buy from './detailBuy.vue'
import integral from './detailIntegral.vue'
import '../../static/style/userment/detail.scss'

export default {
    data() {
        return {
            userid: this.$route.params.id
        }
    },
    methods: {

    },
    components: { basisdata, buy, integral, topbar }
}
</script>
