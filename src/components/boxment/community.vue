<template>
<div id="community" class="right-content">
    <el-row class="mb-10">
        <el-col :span="24" class="el-item display-table top-toolbar-complex">
            <div class="toolbar-path tn">城市小区管理</div>
            <div class="toolbar-function tr">
                <el-form :model="toolbarFrom" :inline="true" class="tr">
                    <el-form-item>
                        <el-button type="primary" @click="routerPush('new')">新增小区</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="toolbarFrom.progress" disabled placeholder="广东省"></el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="toolbarFrom.city" placeholder="选择城市">
                            <el-option label="中山市" value="zhongshang"></el-option>
                            <el-option label="广州市" value="guangzhou"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="toolbarFrom.area" placeholder="选择区/镇" no-data-text="请先选择城市"></el-select>
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
            <el-table :data="tableData" :stripe="true" class="w-100">
                <el-table-column prop="progress" label="省份" width="100"></el-table-column>
                <el-table-column prop="city" label="城市" width="100"></el-table-column>
                <el-table-column prop="area" label="区/镇" width="100"></el-table-column>
                <el-table-column prop="residential" label="小区/商务区名称" width="150"></el-table-column>
                <el-table-column prop="address" label="详细地址"></el-table-column>
                <el-table-column prop="status" label="状态" width="100"></el-table-column>
                <el-table-column label="操作" width="80">
                    <template scope="scope">
                        <el-button type="primary" size="small" @click="routerPush(scope.row.id)">编辑</el-button>
					</template>
			  	</el-table-column>
			</el-table>

            <el-pagination @current-change="handleCurrentChange" :current-page="1" layout="total, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>

		</el-col>
	</el-row>
</div>
</template>

<script type="text/javascript">
// 缤果盒子列表
import '../../static/style/boxment/community.scss'

export default {
    data() {
        return {
            toolbarFrom: {
                progress: '',
                city: '',
                area: ''
            },
            tableData: [{
                id: 1,
                progress: '广东省',
                city: '中山市',
                area: '三乡',
                residential: '东城花园',
                address: '温泉村东城温泉里',
                status: '启用中'
            },{
                id: 2,
                progress: '广东省',
                city: '中山市',
                area: '三乡',
                residential: '东城花园',
                address: '温泉村东城温泉里',
                status: '启用中'
            },{
                id: 3,
                progress: '广东省',
                city: '中山市',
                area: '三乡',
                residential: '东城花园',
                address: '温泉村东城温泉里',
                status: '启用中'
            },{
                id: 4,
                progress: '广东省',
                city: '中山市',
                area: '三乡',
                residential: '东城花园',
                address: '温泉村东城温泉里',
                status: '启用中'
            },{
                id: 5,
                progress: '广东省',
                city: '中山市',
                area: '三乡',
                residential: '东城花园',
                address: '温泉村东城温泉里',
                status: '启用中'
            },{
                id: 6,
                progress: '广东省',
                city: '中山市',
                area: '三乡',
                residential: '东城花园',
                address: '温泉村东城温泉里',
                status: '启用中'
            }]
        }
    },
    methods: {
        routerPush(id) {
            // 路由跳转
            this.$router.push({ name: 'communityeditor', params: { id: id } })
        },
        handleCurrentChange(val) {
            // 这里调用接口更新表格数据
            console.log(`当前页：${val}`)
        },
        searchToolbar() {
             // 页内导航搜索
            if(this.toolbarFrom.progress === '' && this.toolbarFrom.city === '' && this.toolbarFrom.area === ''){
                this.$alert('请至少选择一个查询字段', '系统通知', { confirmButtonText: '确定' })
                return false
            }
        }
    }
}
</script>
