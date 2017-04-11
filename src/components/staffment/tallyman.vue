<template>
<el-row :gutter="20" class="stafftallyman">
    <el-col :span="6" v-for="item in stafftalist" :key="item.id">
        <el-card :body-style="{ padding: '0px' }">
            <div class="tallyman-wrap">
                <p class="tallyman-status"><i class="el-icon-circle-check"></i>&nbsp;启用中</p>
                <p class="tallyman-head tc">
                    <img v-if="item.img" :src="item.img">
                    <img v-else src="../../static/img/head.png">
                </p>
                <p class="tc fs-s9em lh-1s8em mt-10">{{ item.name }}</p>
                <p class="tc cl-dove fs-s9em lh-1s8em">{{ item.phone }}</p>
                <el-progress :text-inside="true" :stroke-width="24" :percentage="0" status="success" class="mt-15"></el-progress>
                <div class="tallyman-linedata display-table">
                    <div class="tn">管理盒子：{{ item.boxes.length }}</div>
                    <div class="tn">今日维护：0</div>
                </div>
            </div>
            <router-link class="tallyman-editor bg-picton" :to="{ name: 'tallymaneditor', params: { id: 11 }}">编辑</router-link>
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
    created() {
        this.$store.dispatch('getStafftalist', {})
    },
    computed: {
        stafftalist() { return this.$store.getters.stafftalist }
    },
    methods: {

    }
}
</script>
