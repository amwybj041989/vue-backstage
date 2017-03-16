<template>
<el-row :gutter="20" class="stafftallyman">
    <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }">
            <div class="tallyman-wrap">
                <p class="tallyman-status"><i class="el-icon-circle-check"></i>&nbsp;启用中</p>
                <p class="tallyman-head tc"><img src="../../static/img/head.png"></p>
                <p class="tc fs-s9em lh-1s8em mt-10">中山东区理货员001</p>
                <p class="tc cl-dove fs-s9em lh-1s8em">136****2457</p>
                <el-progress :text-inside="true" :stroke-width="24" :percentage="80" status="success" class="mt-15"></el-progress>
                <div class="tallyman-linedata display-table">
                    <div class="tn">管理盒子：20</div>
                    <div class="tn">今日维护：10</div>
                </div>
            </div>
            <router-link class="tallyman-editor bg-picton" :to="{ name: 'staffmenteditor', params: { id: 11 }}">编辑</router-link>
        </el-card>
    </el-col>
</el-row>
</template>

<script type="text/javascript">

import '../../static/style/staffment/tallyman.scss'

export default {
    data () {
        return {

        }
    },
    methods: {
        // 编辑理货员
        // editortallyman() {
        //
        // }
        // 点击搜索，出发vux里的数据，从而改变
    }
}
</script>
