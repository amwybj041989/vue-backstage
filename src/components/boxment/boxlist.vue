<template>
<div id="boxmentlist" class="right-content">
    <el-row class="mb-10">
        <el-col :span="24" class="el-item display-table top-toolbar-complex">
            <div class="toolbar-path tn">缤果盒子列表</div>
            <div class="toolbar-function tr">
                <el-form :model="toolbarFrom" :inline="true" class="tr">
                    <el-form-item>
                        <el-button type="primary" @click="routerPush('create')">新增盒子</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="toolbarFrom.province" placeholder="选择省份" :clearable="true" @change="getCity">
                            <el-option :label="item.name" :value="item.code + ',' + item.id" :key="item.id" v-for="item in provincelist">
                                {{ item.code }} {{ item.name }}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="toolbarFrom.city" placeholder="请选择城市" :clearable="true" no-data-text="请先选择省份" @change="getArea">
                            <el-option :label="item.name" :value="item.code + ',' + item.id" :key="item.id" v-for="item in citylist">
                                {{ item.code }} {{ item.name }}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="toolbarFrom.area" placeholder="请选择区镇" :clearable="true" no-data-text="请先选择城市">
                            <el-option :label="item.name" :value="item.code + ',' + item.id" :key="item.id" v-for="item in areaList">
                                {{ item.code }} {{ item.name }}
                            </el-option>
                        </el-select>
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
            toolbarFrom: {
                province: '',
                city: '',
                area: ''
            },
            searchBtn: 0,
        }
    },
    created() {
        this.$store.dispatch('resetUnitList')
        this.$store.dispatch('getBoxList', {})
        this.$store.dispatch('getProvinceList', {})
    },
    computed: {
        boxlist() { return this.$store.getters.boxList },
        provincelist() { return this.$store.getters.provinceList },
        citylist() { return this.$store.getters.cityList },
        areaList() { return this.$store.getters.areaList }
    },
    methods: {
        routerPush(id) {
            if(id === 'create'){
                this.$router.push({ name: 'boxcreate' })
            } else {
                this.$router.push({ name: 'boxeditor', params: { id: id } })
            }
        },
        handleCurrentChange(val) {
            if(this.searchBtn > 0 && (this.toolbarFrom.province !== '' || this.toolbarFrom.city !== '' || this.toolbarFrom.area !== '')) {
                this.searchToolbar(val)
                return false
            }
            this.$store.dispatch('getBoxList', { page: val })
        },
        searchToolbar(val) {
            let param = {
                page: (typeof val === "number") ? val : 1
            }
            if(this.toolbarFrom.province !== '') {
                param.province = this.toolbarFrom.province.split(',')[0]
            }
            if(this.toolbarFrom.city !== ''){
                param.city = this.toolbarFrom.city.split(',')[0]
            }
            if(this.toolbarFrom.area !== ''){
                param.area = this.toolbarFrom.area.split(',')[0]
            }
            this.$store.dispatch('getBoxList', param).then(() => {
                if(!(typeof val === "number")){
                    this.$message({
                        message: '获取数据成功',
                        type: 'success'
                    })
                }
            })
            this.searchBtn++
        },
        tableRowDisabled(row, index) {
            // 设置表格禁用行样式
            if(row.status == 0) {
                return 'row-disabled'
            }
        },
        getCity(val) {
            // 根据省份获取城市
            this.$store.dispatch('getCityList', { id: val.split(',')[1] })
        },
        getArea(val) {
            // 根据城市获取区镇
            this.$store.dispatch('getAreaList', { id: val.split(',')[1] })
        }
    }
}

</script>
