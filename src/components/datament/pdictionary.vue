<template>
<div class="right-content">
    <el-row class="mb-10">
        <el-col :span="24" class="el-item display-table top-toolbar-complex">
            <div class="toolbar-path tn">商品字典管理</div>
            <div class="toolbar-function tr">
                <el-form :model="toolbarFrom" :inline="true" class="tr">
                    <el-form-item>
                        <el-button type="primary" @click="routerPush('created')">新增字典</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="输入字典名称" class="function-search" icon="search" v-model="toolbarFrom.searchkey" :on-icon-click="searchToolbar"></el-input>
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
            <el-table :data="datalist.list" :stripe="true" class="w-100">
                <el-table-column prop="id" label="编号" width="100"></el-table-column>
                <el-table-column prop="parentTitle" label="字典类型" width="130"></el-table-column>
                <el-table-column prop="title" label="字典名称"></el-table-column>
                <el-table-column prop="status" label="状态" width="100">
                    <template scope="scope">
                        <span :class="scope.row.status === '1' ? 'f-success' : '' ">{{ scope.row.status | enableStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="140">
                    <template scope="scope">
                        <el-button type="primary" size="small" @click="development">编辑</el-button>
                        <el-button type="danger" size="small" @click="development">删除</el-button>
                    </template>
			  	</el-table-column>
			</el-table>
			<el-pagination @current-change="handleCurrentChange" :page-size="20" :current-page="1" layout="total, prev, pager, next, jumper" :total="datalist.count">
            </el-pagination>
		</el-col>
	</el-row>

</div>
</template>

<script>
// 商品字典管理

export default {
    data() {
        return {
            toolbarFrom: {
                searchkey: ''
            }
        }
    },
    created() {
        this.$store.dispatch('getDictionaryList', { page: 1 })
    },
    computed: {
        datalist() { return this.$store.getters.dictionaryList }
    },
    methods: {
        routerPush(id) {
            this.$router.push({ name: 'pdictionaryeditor', params: { id: id } })
        },
        deleteItem(id) {

        },
        searchToolbar(val) {
            let param = {
                page: (typeof val === "number") ? val : 1
            }
            if(this.toolbarFrom.searchkey !== ''){
                param.key = this.toolbarFrom.searchkey
            }
            this.$store.dispatch('getDictionaryList', param).then(() => {
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
            if(this.searchBtn > 0 && this.toolbarFrom.searchkey !== '') {
                this.searchToolbar(val)
                return false
            }
            this.$store.dispatch('getDictionaryList', { page: val })
        },
        development() {
            this.$alert('功能正开发中.....', '系统通知', { confirmButtonText: '确定', type: 'warning' })
        }
    }
}
</script>
