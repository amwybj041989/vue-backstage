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
                        <el-input placeholder="输入供货商" class="function-search" icon="search" v-model="toolbarFrom.searchkey" :on-icon-click="searchToolbar"></el-input>
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
                <el-table-column prop="id" label="编号" width="80"></el-table-column>
                <el-table-column prop="companyName" label="公司名称"></el-table-column>
                <el-table-column prop="businessNumber" label="营业工商号" width="180"></el-table-column>
                <el-table-column prop="payee" label="收款人" width="100"></el-table-column>

                <el-table-column label="" width="70">
                    <template scope="scope">
                        <el-popover ref="popover" placement="right" width="312" trigger="click">
                            <ul class="payee-datawrap">
                                <li>
                                    <div>收款人姓名:</div>
                                    <div>{{ scope.row.basisdata.name }}</div>
                                </li>
                                <li>
                                    <div>联系方式:</div>
                                    <div>{{ scope.row.basisdata.phone }}</div>
                                </li>
                                <li>
                                    <div>一般纳税人:</div>
                                    <div>{{ scope.row.basisdata.taxpayers }}</div>
                                </li>
                                <li>
                                    <div>开户银行:</div>
                                    <div>{{ scope.row.basisdata.bank }}</div>
                                </li>
                                <li>
                                    <div>银行账号:</div>
                                    <div>{{ scope.row.basisdata.bankAccount }}</div>
                                </li>
                            </ul>
                        </el-popover>
                        <el-button v-popover:popover class="" size="mini">详情</el-button>
                    </template>
                </el-table-column>

                <el-table-column prop="business" label="主营业务" width="300"></el-table-column>
                <el-table-column label="操作" width="140">
                    <template scope="scope">
                        <el-button type="primary" size="small" @click="routerPush(scope.row.id)">详情</el-button>
                        <el-button type="danger" size="small" @click="deleteItem(scope.row.id)">删除</el-button>
                    </template>
			  	</el-table-column>
			</el-table>

			<el-pagination @current-change="handleCurrentChange" :page-size="20" :current-page="1" layout="total, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
		</el-col>
	</el-row>

</div>
</template>

<script type="text/javascript">
// 供货商列表
import '../../static/style/datament/supplierList.scss'

export default {
    data() {
        return {
            toolbarFrom: {
                searchkey: ''
            },
            tableData: [{
                id: 254,
                companyName: '中山市乡下仔商贸有限公司',
                businessNumber: '166855625145215',
                payee: '王朝',
                business: '零食、饮料、特产供应',
                basisdata: {
                    name: '王朝',
                    phone: 15622222222,
                    taxpayers: '是',
                    bank: '中国交通银行中山支行',
                    bankAccount: '46521634646421651'
                }
            }]
        }
    },
    created() {
        // let param = {
        //     page: 1
        // }
        // this.$store.dispatch('getUserList', param)
    },
    computed: {
        // 计算属性
        // userlist() { return this.$store.getters.userlist }
    },
    methods: {
        searchToolbar() {
            // 页内导航页搜索
            // if(this.toolbarFrom.searchkey === ''){
            //     this.$alert('请至少选择一个查询字段', '系统通知', { confirmButtonText: '确定' })
            //     return false
            // }
            // let param = {
            //     page: 1,
            //     key: this.toolbarFrom.searchkey
            // }
            // this.$store.dispatch('getUserList', param)
        },
        routerPush(id) {
            this.$router.push({ name: 'supplierEdior', params: { id: id } })
        },
        deleteItem(id) {
            // 删除供应商
        },
        handleCurrentChange(val) {
        //     // 页码切换
        //     let param = {
        //         page: val
        //     }
        //     this.$store.dispatch('getUserList', param)
        }
    }
}
</script>
