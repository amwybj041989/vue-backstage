<template>
<div id="usermentlist" class="right-content">
    <el-row class="mb-10">
        <el-col :span="24" class="el-item display-table top-toolbar-complex">
            <div class="toolbar-path tn">注册用户列表</div>
            <div class="toolbar-function tr">
                <el-form :model="toolbarFrom" :inline="true" class="tr">
                    <el-form-item>
                        <el-input placeholder="请输入查询ID/手机号码" class="function-search" icon="search" v-model="toolbarFrom.searchkey" :on-icon-click="searchToolbar"></el-input>
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
            <el-table :data="userlist.list" border :stripe="true" class="w-100">
                <el-table-column prop="id" label="用户ID" width="100"></el-table-column>
                <el-table-column prop="phone" label="手机号码" width="130"></el-table-column>
                <el-table-column prop="bingoopenid" label="BinGoOpenID" width="200"></el-table-column>
                <el-table-column prop="formBox" label="来源盒子"></el-table-column>
                <el-table-column prop="buy" label="购买次数" width="100"></el-table-column>
                <el-table-column prop="consumption" label="累计消费" width="100"></el-table-column>
                <el-table-column prop="name" label="实名认证" width="110"></el-table-column>
                <el-table-column prop="sex" label="性别" width="70">
                    <template scope="scope">
                        {{ scope.row.sex | setsex }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80">
                    <template scope="scope">
                        <el-button type="primary" size="small" @click="routerPush(scope.row.id)">详情</el-button>
                    </template>
			  	</el-table-column>
			</el-table>

			<el-pagination @current-change="handleCurrentChange" :page-size="20" :current-page="1" layout="total, prev, pager, next, jumper" :total="userlist.count">
            </el-pagination>
		</el-col>
	</el-row>

</div>
</template>

<script type="text/javascript">
// 注册用户列表
import '../../static/style/userment/userlist.scss'

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
        this.$store.dispatch('getUserList', { page: 1 })
    },
    computed: {
        // 计算属性
        userlist() { return this.$store.getters.userlist }
    },
    methods: {
        searchToolbar(val) {
            let param = {
                page: (typeof val === "number") ? val : 1
            }
            if(this.toolbarFrom.searchkey !== ''){
                param.key = this.toolbarFrom.searchkey
            }
            this.$store.dispatch('getUserList', param).then(() => {
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
            this.$router.push({ name: 'usermentdetail', params: { id: id } })
        },
        handleCurrentChange(val) {
            if(this.searchBtn > 0 && this.toolbarFrom.searchkey !== '') {
                this.searchToolbar(val)
                return false
            }
            this.$store.dispatch('getUserList', { page: val })
        }
    },
    filters: {
        // 过滤器
        setsex (value) {
            return value === '2' ? '男': '女'
        }
    }
}
</script>
