<template>
<div class="right-content">
    <topbar bone="小区管理" btwo="新增小区"></topbar>
    <el-row class="mb-10">
        <el-col :span="24" class="el-item editor-form display-table">
            <div class="form-left">
                <el-form ref="form" :rules="rules" label-position="right" :model="form" label-width="150px">

                    <el-form-item label="隶属省份" prop="province">
                        <el-select v-model="form.province" placeholder="请选择" @change="getCityList">
                            <el-option :label="item.code + ' ' + item.name" :value="item.id" :key="item.id" v-for="item in provincelist">
                                {{ item.code }} {{ item.name }}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="隶属城市" prop="city">
                        <el-select v-model="form.city" placeholder="请选择隶属城市" no-data-text="请先选择省份" @change="getArea">
                            <el-option :label="item.code + ' ' + item.name" :value="item.id" :key="item.id" v-for="item in citylist">
                                {{ item.code }} {{ item.name }}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="隶属区镇" prop="parent_id">
                        <el-select v-model="form.parent_id" placeholder="请选择隶属区镇" no-data-text="请先选择城市">
                            <el-option :label="item.code + ' ' + item.name" :value="item.id" :key="item.id" v-for="item in areaList">
                                {{ item.code }} {{ item.name }}
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="详细地址" prop="address">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="小区名称" prop="community">
                        <el-input v-model="form.community"></el-input>
                    </el-form-item>
                    <el-form-item label="启动开关">
                        <el-switch on-text="开" off-text="关" v-model="switchStatus"></el-switch>
                    </el-form-item>
                </el-form>
            </div>
            <div class="form-right"></div>
        </el-col>
    </el-row>

    <el-row class="mb-10">
        <el-col :span="24" class="el-item pa-20">
            <p class="theme-p mb-10">是否保存</p>
            <el-button type="primary" @click="submitForm('form')">保存</el-button>
            <cancel></cancel>
        </el-col>
    </el-row>
</div>
</template>

<script>
// 小区编辑
import api from '../../api/api.js'
import topbar from '../common/topbar.vue'
import cancel from '../common/cancel.vue'

export default {
    data() {
        return {
            param: this.$route.params.id,
            form: {
                province: '',
                city: '',
                parent_id: '',
                address: '',
                community: ''
            },
            switchStatus: true,
            rules: {
                province: [{ required: true, message: '请选择所属省份', trigger: 'change' }],
                city: [{ required: true, message: '请选择所属城市', trigger: 'change' }],
                parent_id: [{ required: true, message: '请选择所属区镇', trigger: 'change' }],
                address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
                community: [{ required: true, message: '请输入小区名称', trigger: 'blur' }]
            }
        }
    },
    created() {
        this.$store.dispatch('getProvinceList', {})
    },
    computed: {
        provincelist() { return this.$store.getters.provinceList },
        citylist() { return this.$store.getters.cityList },
        areaList() { return this.$store.getters.areaList }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 新建区镇
                    let param = this.form,
                        that = this
                    param.status = this.switchStatus === true ? 1 : 0

                    api.apiCommunication('/City/CreateCommunity', param, function (response) {
                        if (response.status === '200') {
                            that.$message({
                                message: '新建成功！',
                                type: 'success'
                            })
                            // 创建成功，回到列表页
                            that.$router.go(-1)
                        } else {
                            that.$alert('创建失败', '系统通知', { confirmButtonText: '确定', type: 'error' })
                        }
                    })

                } else {
                    this.$alert('必填的字段不能为空，请检查填写后重新提交', '系统通知', { confirmButtonText: '确定' })
                }
            })
        },
        getCityList(val) {
            this.$store.dispatch('getCityList', { id: val })
        },
        getArea(val) {
            this.$store.dispatch('getAreaList', { id: val })
        }

    },
    components: {
        topbar,
        cancel
    }
}
</script>
