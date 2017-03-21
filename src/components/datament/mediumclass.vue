<template>
<div id="mediumclass" class="right-content">
    <el-row class="mb-10">
        <el-col :span="24" class="el-item display-table top-toolbar-complex">
            <div class="toolbar-path tn">商品中类管理(二级类目)</div>
            <div class="toolbar-function tr">
                <el-form :model="toolbarFrom" :inline="true" class="tr">
                    <el-form-item>
                        <el-button type="primary" @click="routerPushNew()">新增中类</el-button>
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
            <el-table :data="productClassList.list" :stripe="true" class="w-100" :row-class-name="tableRowDisabled">
                <el-table-column prop="number" label="编号" width="100"></el-table-column>
                <el-table-column prop="bigclass" label="一级类目" width="130"></el-table-column>
                <el-table-column prop="mediumclass" label="二级类目"></el-table-column>
                <el-table-column prop="status" label="状态" width="100">
                    <template scope="scope">
                        <span :class="scope.row.status === '1' ? 'f-success' : '' ">{{ scope.row.status | enableStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80">
                    <template scope="scope">
                        <!-- <el-button type="primary" size="small" @click="routerPush(scope.row.id)">编辑</el-button> -->
                        <el-button type="danger" size="small" @click="deleteItem(scope.row.id)">删除</el-button>
                    </template>
			  	</el-table-column>
			</el-table>

			<el-pagination @current-change="handleCurrentChange" :page-size="20" :current-page="1" layout="total, prev, pager, next, jumper" :total="productClassList.count">
            </el-pagination>
		</el-col>
	</el-row>
</div>
</template>

<script>
// 商品中类管理
import api from '../../api/api.js'
import '../../static/style/datament/productClass.scss'

export default {
    data() {
        return {
            toolbarFrom: {
                searchkey: ''
            }
        }
    },
    created() {
        this.getProductClassList(1)
    },
    computed: {
        productClassList() { return this.$store.getters.mediumclassdata }
    },
    methods: {
        routerPush(id) {
            this.$router.push({ name: 'classeditor', params: { id: id, type: 'm' } })
        },
        routerPushNew() {
            this.$router.push({ name: 'classnew', params: { type: 'm' } })
        },
        deleteItem(id) {
            var that = this
            this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let param = {
                    id: id
                }
                api.deleteProductClass(param, function (response) {
                    if (response.data.status === '200') {
                        that.$message({
                            message: '删除成功！',
                            type: 'success'
                        })
                        // 删除成功，重新获取列表
                        that.getProductClassList(1)
                    } else {
                        that.$alert('删除失败，该类目下已关联分类或者商品', '系统通知', { confirmButtonText: '确定', type: 'error' })
                    }
                })
            })
        },
        searchToolbar() {
            this.getProductClassList(1,this.toolbarFrom)
        },
        handleCurrentChange(val) {
            if(this.toolbarFrom.searchkey !== '') {
                this.getProductClassList(val, this.toolbarFrom)
            }else {
                this.getProductClassList(val)
            }
        },
        getProductClassList(page, toolbarFrom) {
            let param = {
                type: 2,
                page: page
            }
            if(toolbarFrom) {
                param.title = toolbarFrom.searchkey
            }
            this.$store.dispatch('getProductClassList', param)
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
