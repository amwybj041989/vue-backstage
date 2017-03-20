<template>
<div id="staffmentlist" class="right-content">
    <el-row class="mb-10">
        <el-col :span="24" class="el-item display-table top-toolbar-complex">
            <div class="toolbar-path tn">理货员管理</div>
            <div class="toolbar-function tr">
                <el-form :model="toolbarFrom" :inline="true" class="tr">
                    <el-form-item>
                        <el-button type="primary" @click="routerPush('new')">新增理货员</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="请输入查询关键字" class="function-search" icon="search" v-model="toolbarFrom.searchkey" :on-icon-click="searchToolbar"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchToolbar">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
    <stafftallyman></stafftallyman>
</div>
</template>

<script type="text/javascript">
/**
 * 理货员管理页
 */
import stafftallyman from './tallyman.vue'
import '../../static/style/staffment/list.scss'

export default {
    data () {
        return {
            toolbarFrom: {
                searchkey: ''
            }
        }
    },
    methods: {
        // 员工搜索
        searchToolbar() {
            if(this.toolbarFrom.searchkey === ''){
                this.$alert('请输入查询关键字', '系统通知', { confirmButtonText: '确定', type: 'error' })
                return false
            }
            let param = {
                key: this.toolbarFrom.searchkey
            }
            this.$store.dispatch('getStafftalist', param)
        },
        routerPush(id) {

        }
    },
	components: { stafftallyman }
}
</script>
