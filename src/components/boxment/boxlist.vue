<template>
<div id="boxmentlist" class="right-content">
    <el-row class="mb-10">
        <el-col :span="24" class="el-item display-table top-toolbar-complex">
            <div class="toolbar-path tn">缤果盒子列表</div>
            <div class="toolbar-function tr">
                <el-button type="primary" @click="routerPush('new')">新增盒子</el-button>
                <el-select v-model="progress" disabled placeholder="广东省"></el-select>
                <el-select v-model="city" placeholder="选择城市">
                    <el-option label="中山市" value="zhongshang"></el-option>
                    <el-option label="广州市" value="guangzhou"></el-option>
                </el-select>
                <el-select v-model="area" placeholder="选择区/镇" no-data-text="请先选择城市"></el-select>
                <el-button type="primary" @click="searchToolbar">查询</el-button>
            </div>
        </el-col>
    </el-row>

    <el-row class="mb-10">
        <el-col :span="24" class="el-item pa-10">
            <el-table :data="boxlist" :stripe="true" class="w-100" :row-class-name="tableRowDisabled">
                <el-table-column prop="box_no" label="盒子编号" width="100"></el-table-column>
                <el-table-column prop="province" label="省份" width="100"></el-table-column>
                <el-table-column prop="city" label="城市" width="100"></el-table-column>
                <el-table-column prop="area" label="区/镇" width="100"></el-table-column>
                <el-table-column prop="community" label="小区/商务区名称" width="150"></el-table-column>
                <el-table-column prop="addr" label="详细地址"></el-table-column>
                <el-table-column prop="status" label="状态" width="100">
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
            <el-pagination @current-change="handleCurrentChange" :page-size="20" :current-page="1" layout="total, prev, pager, next, jumper" :total="boxlist.length">
            </el-pagination>
		</el-col>
	</el-row>

</div>
</template>

<script type="text/javascript">
// 缤果盒子列表
import '../../static/style/boxment/boxlist.scss'
export default {
    data() {
        return {
            progress: '',
            city: '',
            area: ''
        }
    },
    created() {
        this.$store.dispatch('getBoxList')
    },
    computed: {
        boxlist() { return this.$store.getters.boxList }
    },
    methods: {
        routerPush(id) {
            console.log(id)
            this.$router.push({ name: 'boxedior', params: { id: id } })
        },
        handleCurrentChange(val) {

        },
        searchToolbar() {

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
