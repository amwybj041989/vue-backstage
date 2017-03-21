<template>
<div class="right-content">
    <el-row class="mb-10">
        <el-col :span="24" class="el-item display-table top-toolbar-complex">
            <div class="toolbar-path tn">商品字典类型管理</div>
            <div class="toolbar-function tr">
                <el-form :model="toolbarFrom" :inline="true" class="tr">
                    <el-form-item>
                        <el-button type="primary" @click="routerPush('created')">新增字典类型</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="输入类型名称" class="function-search" icon="search" v-model="toolbarFrom.searchkey" :on-icon-click="searchToolbar"></el-input>
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
            <el-table :data="list.list" :stripe="true" class="w-100">
                <el-table-column prop="id" label="ID" width="70"></el-table-column>
                <el-table-column prop="code" label="编码" width="150"></el-table-column>
                <el-table-column prop="title" label="名称"></el-table-column>
                <el-table-column prop="status" label="状态" width="100">
                    <template scope="scope">
                        <span :class="scope.row.status === '1' ? 'f-success' : '' ">{{ scope.row.status | enableStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80">
                    <template scope="scope">
                        <el-button type="danger" size="small" @click="deleteItem(scope.row.id)">删除</el-button>
                    </template>
			  	</el-table-column>
			</el-table>
			<el-pagination @current-change="handleCurrentChange" :page-size="20" :current-page="1" layout="total, prev, pager, next, jumper" :total="list.count">
            </el-pagination>
		</el-col>
	</el-row>
</div>
</template>

<script>
// 商品字典类型管理

export default {
    data() {
        return {
            toolbarFrom: {
                searchkey: ''
            }
        }
    },
    created() {
        this.$store.dispatch('getDictionaryTypeList', { page: 1 })
    },
    computed: {
        list() { return this.$store.getters.dictionaryTypeList }
    },
    methods: {
        deleteItem(id) {
            this.$alert('功能还在开发中', '系统通知', { confirmButtonText: '确定', type: 'error' })

        },
        routerPush(id) {
            this.$router.push({ name: 'dictionarytypeeditor', params: { id: id } })
        },
        searchToolbar() {

        },
        handleCurrentChange() {

        }
    }
}
</script>
