<template>
<div id="pdictionary" class="right-content">
    <el-row class="mb-10">
        <el-col :span="24" class="el-item display-table top-toolbar-complex">
            <div class="toolbar-path tn">商品字典管理</div>
            <div class="toolbar-function tr">
                <el-form :model="toolbarFrom" :inline="true" class="tr">
                    <el-form-item>
                        <el-button type="primary" @click="routerPush('new')">新增字典</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="查找关键字" class="function-search" icon="search" v-model="toolbarFrom.searchkey" :on-icon-click="searchToolbar"></el-input>
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
            <el-table :data="tableData" :stripe="true" class="w-100">
                <el-table-column prop="id" label="编号" width="100"></el-table-column>
                <el-table-column prop="level" label="一级字典" width="130"></el-table-column>
                <el-table-column prop="secondary" label="二级字典"></el-table-column>
                <el-table-column prop="status" label="状态" width="100"></el-table-column>
                <el-table-column label="操作" width="80">
                    <template scope="scope">
                        <el-button type="primary" size="small" @click="routerPush(scope.row.id)">编辑</el-button>
                    </template>
			  	</el-table-column>
			</el-table>

			<el-pagination @current-change="handleCurrentChange" :page-size="20" :current-page="1" layout="total, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
		</el-col>
	</el-row>

</div>
</template>

<script>
// 商品中类管理
import '../../static/style/datament/productClass.scss'

export default {
    data() {
        return {
            toolbarFrom: {
                searchkey: ''
            },
            tableData: [{
                id: '1654',
                level: '包装',
                secondary: '一盒',
                status: '启用中',
            }],
            dialogVisible: false
        }
    },
    methods: {
        routerPush(id) {
            this.$router.push({ name: 'classeditor', params: { id: id, type: 'm' } })
        },
        deleteItem(id) {
            this.dialogVisible = true
        },
        hideDialog() {
            this.dialogVisible = false
        },
        searchToolbar() {

        },
        handleCurrentChange(val) {

        }
    }
}
</script>
