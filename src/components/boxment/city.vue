<template>
<div class="right-content">
    <el-row class="mb-10">
        <el-col :span="24" class="el-item display-table top-toolbar-complex">
            <div class="toolbar-path tn">城市管理</div>
            <div class="toolbar-function tr">
                <el-form :model="toolbarFrom" :inline="true" class="tr">
                    <el-form-item>
                        <el-button type="primary" @click="routerPush('create')">新增城市</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="输入城市名称" class="function-search" icon="search" v-model="toolbarFrom.searchkey" :on-icon-click="searchToolbar"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchToolbar">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>

    <el-row class="mb-15">
        <el-col :span="24" class="el-item pa-10">
            <el-table :data="dataList.list" :stripe="true" class="w-100" :row-class-name="tableRowDisabled">
                <el-table-column prop="code" label="城市编码" width="100"></el-table-column>
                <el-table-column prop="province" label="隶属省份" width="100"></el-table-column>
                <el-table-column prop="name" label="城市名称"></el-table-column>
                <el-table-column prop="status" label="状态" width="100">
                    <template scope="scope">
                        <span :class="scope.row.status === '1' ? 'f-success' : '' ">{{ scope.row.status | enableStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80">
                    <template scope="scope">
                        <el-button type="primary" size="small" @click="routerPush(scope.row.id)">编辑</el-button>
                        <!-- <el-button type="danger" size="small" @click="deleteItem(scope.row.id)">删除</el-button> -->
                    </template>
			  	</el-table-column>
			</el-table>

			<el-pagination @current-change="handleCurrentChange" :page-size="20" :current-page="1" layout="total, prev, pager, next, jumper" :total="dataList.count">
            </el-pagination>
		</el-col>
	</el-row>

</div>
</template>

<script type="text/javascript">
// 城市管理

export default {
    data() {
        return {
            toolbarFrom: {
                searchkey: ''
            },
            searchBtn: 0
        }
    },
    created() {
        this.$store.dispatch('getCityAdminList', { page: 1 })
    },
    computed: {
        dataList() { return this.$store.getters.cityAdminList }
    },
    methods: {
        searchToolbar(val) {
            let param = {
                page: (typeof val === "number") ? val : 1
            }
            if(this.toolbarFrom.searchkey !== ''){
                param.key = this.toolbarFrom.searchkey
            }
            this.$store.dispatch('getCityAdminList', param).then(() => {
                if(!(typeof val === "number")){
                    this.$message({
                        message: '获取数据成功',
                        type: 'success'
                    })
                }
            })
            this.searchBtn++
        },
        routerPush(id) {
            if(id === 'create') {
                this.$router.push({ name: 'citycreate' })
            } else {
                this.$alert('正在开发中。。', '系统通知', { confirmButtonText: '确定', type: 'warning' })
                // this.$router.push({ name: 'cityeditor' })
            }
        },
        deleteItem(id) {

        },
        handleCurrentChange(val) {
            if(this.searchBtn > 0 && this.toolbarFrom.searchkey !== '') {
                this.searchToolbar(val)
                return false
            }
            this.$store.dispatch('getCityAdminList', { page: val })
        },
        tableRowDisabled(row, index) {
            // 设置表格禁用行样式
            if(row.status == 0) {
                return 'row-disabled'
            }
        }
    }
}
</script>
