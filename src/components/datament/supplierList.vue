<template>
<div id="supplierlist" class="right-content">
    <el-row class="mb-10">
        <el-col :span="24" class="el-item display-table top-toolbar-complex">
            <div class="toolbar-path tn">供货商管理</div>
            <div class="toolbar-function tr">
                <el-form :model="toolbarFrom" :inline="true" class="tr">
                    <el-form-item>
                        <el-button type="primary" @click="routerPush('new')">新增供货商</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="输入公司名称" class="function-search" icon="search" v-model="toolbarFrom.searchkey" :on-icon-click="searchToolbar"></el-input>
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
            <el-table :data="supplierList.list" :stripe="true" class="w-100">
                <el-table-column prop="id" label="编号" width="80"></el-table-column>
                <el-table-column prop="company" label="公司名称"></el-table-column>
                <el-table-column prop="business_number" label="营业工商号" width="180"></el-table-column>
                <el-table-column prop="name" label="收款人" width="100"></el-table-column>
                <el-table-column label="" width="70">
                    <template scope="scope">
                        <el-popover ref="popover" placement="right" width="312" trigger="click">
                            <ul class="payee-datawrap">
                                <li>
                                    <div>收款人姓名:</div>
                                    <div>{{ scope.row.name }}</div>
                                </li>
                                <li>
                                    <div>联系方式:</div>
                                    <div>{{ scope.row.phone }}</div>
                                </li>
                                <li>
                                    <div>一般纳税人:</div>
                                    <div>{{ scope.row.general_taxpayer | taxpayer }}</div>
                                </li>
                                <li>
                                    <div>开户银行:</div>
                                    <div>{{ scope.row.bank }}</div>
                                </li>
                                <li>
                                    <div>银行账号:</div>
                                    <div>{{ scope.row.bank_account }}</div>
                                </li>
                            </ul>
                        </el-popover>
                        <el-button v-popover:popover class="" size="mini">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="service" label="主营业务" width="300"></el-table-column>
                <el-table-column label="操作" width="140">
                    <template scope="scope">
                        <el-button type="primary" size="small" @click="routerPush(scope.row.id)">编辑</el-button>
                        <el-button type="danger" size="small" @click="deleteItem(scope.row.id)">删除</el-button>
                    </template>
			  	</el-table-column>
			</el-table>

			<el-pagination @current-change="handleCurrentChange" :page-size="20" :current-page="1" layout="total, prev, pager, next, jumper" :total="supplierList.count">
            </el-pagination>
		</el-col>
	</el-row>

</div>
</template>

<script type="text/javascript">
// 供货商列表
import api from '../../api/api.js'
import '../../static/style/datament/supplierList.scss'

export default {
    data() {
        return {
            toolbarFrom: {
                searchkey: ''
            }
        }
    },
    created() {
        this.getSupplierList(1)
    },
    computed: {
        // 计算属性
        supplierList() { return this.$store.getters.supplierlist }
    },
    methods: {
        searchToolbar() {
            this.getSupplierList(1,this.toolbarFrom)
        },
        routerPush(id) {
            this.$router.push({ name: 'supplierEditor', params: { id: id } })
        },
        deleteItem(id) {
            var that = this
            this.$confirm('此操作将永久删除该供货商, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let param = {
                    id: id
                }
                api.deleteSupplier(param, function (response) {
                    if (response.status === '200') {
                        that.$message({
                            message: '删除成功！',
                            type: 'success'
                        })
                        // 删除成功，重新获取列表
                        that.getSupplierList(1)
                    } else {
                        that.$alert('删除失败', '系统通知', { confirmButtonText: '确定', type: 'error' })
                    }
                })
            }).catch(() => {})
        },
        handleCurrentChange(val) {
            if(this.toolbarFrom.searchkey !== '') {
                this.getSupplierList(val, this.toolbarFrom)
            }else {
                this.getSupplierList(val)
            }
        },
        getSupplierList(page, toolbarFrom) {
            let param = {
                page: page
            }
            if(toolbarFrom) {
                param.key = toolbarFrom.searchkey
            }
            this.$store.dispatch('getSupplierList', param)
        }
    },
    filters: {
        taxpayer(value) {
            return value === '1' ? '是' : '否'
        }
    }
}
</script>
