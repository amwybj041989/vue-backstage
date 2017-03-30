<template>
<div class="right-content">
    <el-row class="mb-10">
        <el-col :span="24" class="el-item display-table top-toolbar-complex">
            <div class="toolbar-path tn">商品管理</div>
            <div class="toolbar-function tr">
                <el-form :model="toolbarFrom" :inline="true" class="tr">
                    <el-form-item>
                        <el-button type="primary" @click="routerPush('create')">新增商品</el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-input placeholder="输入商品名称" class="function-search" icon="search" v-model="toolbarFrom.searchkey" :on-icon-click="searchToolbar"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="searchToolbar">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>

    <el-row class="mb-10">
        <el-col :span="24" class="el-item pa-10">
            <el-table :data="datalist.list" :stripe="true" class="w-100" :row-class-name="tableRowDisabled">
                <el-table-column prop="id" label="商品ID" width="85"></el-table-column>
                <el-table-column prop="code" label="国际条码" width="150"></el-table-column>
                <el-table-column prop="title" label="商品名称"></el-table-column>
                <el-table-column prop="packing" label="包装" width="100"></el-table-column>
                <el-table-column prop="spec" label="规格" width="85"></el-table-column>
                <el-table-column prop="first_class" label="所属大类" width="100"></el-table-column>
                <el-table-column prop="second_class" label="所属种类" width="110"></el-table-column>
                <el-table-column prop="thirth_class" label="所属小类" width="120"></el-table-column>
                <el-table-column label="状态" width="90">
                    <template scope="scope">
                        <span :class="scope.row.status === '1' ? 'f-success' : '' ">{{ scope.row.status | enableStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80">
                    <template scope="scope">
                        <el-button type="primary" size="small" @click="routerPush(scope.row.id)">编辑</el-button>
					</template>
			  	</el-table-column>
			</el-table>
            <el-pagination @current-change="handleCurrentChange" :page-size="20" :current-page="1" layout="total, prev, pager, next, jumper" :total="datalist.count">
            </el-pagination>
		</el-col>
	</el-row>

</div>
</template>

<script type="text/javascript">
// 商品管理
import '../../static/style/datament/productMgt.scss'

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
        this.$store.dispatch('getProductList',{ page: 1 })
    },
    computed: {
        datalist() { return this.$store.getters.productList }
    },
    methods: {
        routerPush(id) {
            if (id === 'create') {
                this.$router.push({ name: 'productcreate' })
            } else {
                this.$router.push({ name: 'productcreate', params: { id: id } })
            }
        },
        searchToolbar() {
            let param = {
                type: 1,
                page: (typeof val === "number") ? val : 1
            }
            if(this.toolbarFrom.searchkey !== ''){
                param.key = this.toolbarFrom.searchkey
            }
            this.$store.dispatch('getProductList', param).then(() => {
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
            this.$store.dispatch('getProductList', { type: 1, page: val })
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
