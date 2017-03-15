<template>
<div id="mediumclass" class="right-content">
    <el-row class="mb-10">
        <el-col :span="24" class="el-item display-table top-toolbar-complex">
            <div class="toolbar-path tn">商品中类管理(二级类目)</div>
            <div class="toolbar-function tr">
                <el-form :model="toolbarFrom" :inline="true" class="tr">
                    <el-form-item>
                        <el-button type="primary" @click="routerPush('new')">新增中类</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="输入类目名称" class="function-search" icon="search" v-model="toolbarFrom.searchkey" :on-icon-click="searchToolbar"></el-input>
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
            <el-table :data="productClassList.list" :stripe="true" class="w-100">
                <el-table-column prop="number" label="编号" width="100"></el-table-column>
                <el-table-column prop="bigclass" label="一级类目" width="130"></el-table-column>
                <el-table-column prop="mediumclass" label="二级类目"></el-table-column>
                <el-table-column prop="status" label="状态" width="100">
                    <template scope="scope">
                        <span class="f-success">{{ scope.row.status | enableStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="140">
                    <template scope="scope">
                        <el-button type="primary" size="small" @click="routerPush(scope.row.id)">编辑</el-button>
                        <el-button type="danger" size="small" @click="deleteItem(scope.row.id)">删除</el-button>
                    </template>
			  	</el-table-column>
			</el-table>

			<el-pagination @current-change="handleCurrentChange" :page-size="20" :current-page="1" layout="total, prev, pager, next, jumper" :total="productClassList.count">
            </el-pagination>
		</el-col>
	</el-row>

    <delete-dialog :visible="dialogVisible" @visible="hideDialog"></delete-dialog>

</div>
</template>

<script>
// 商品中类管理
import deleteDialog from './deleteDialog.vue'
import '../../static/style/datament/productClass.scss'

export default {
    data() {
        return {
            toolbarFrom: {
                searchkey: ''
            },
            tableData: [{
                id: '0601',
                level: '便利食品',
                secondary: '牛奶',
                status: '启用中',
            }],
            dialogVisible: false
        }
    },
    created() {
        let param = {
            type: 2,
            page: 1
        }
        this.$store.dispatch('getProductClassList', param)
    },
    computed: {
        productClassList() { return this.$store.getters.mediumclassdata }
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
    },
    components: { deleteDialog }
}
</script>
