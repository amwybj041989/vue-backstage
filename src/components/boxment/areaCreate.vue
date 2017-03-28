<template>
<div class="right-content">
    <topbar bone="区镇管理" btwo="新建区镇"></topbar>
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
                    <el-form-item label="隶属城市" prop="parent_id">
                        <el-select v-model="form.parent_id" placeholder="请选择">
                            <el-option :label="item.code + ' ' + item.name" :value="item.id" :key="item.id" v-for="item in citylist">
                                {{ item.code }} {{ item.name }}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区镇名称" prop="area">
                        <el-input v-model="form.area" placeholder="请填写区镇名称"></el-input>
                    </el-form-item>
                    <el-form-item label="区镇编码" prop="area_code">
                        <el-input v-model="form.area_code" placeholder="请填写区镇编码"></el-input>
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
            <el-button type="primary" @click="submit('form')">保存</el-button>
            <cancel></cancel>
        </el-col>
    </el-row>
</div>
</template>

<script>
// 新增区镇
import api from '../../api/boxmentApi.js'
import topbar from '../common/topbar.vue'
import cancel from '../common/cancel.vue'

export default {
    data() {
        // 自定义编号检查规则
        var checkNumber = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请填写区镇编码'))
            }
            let val = Number(value)
            if (!Number.isInteger(val)) {
                callback(new Error('请输入数字值'))
            } else {
                callback()
            }
        }
        return {
            form: {
                province: '',
                parent_id: '',
                area: '',
                area_code: ''
            },
            switchStatus: true,
            rules: {
                province: [{ required: true, message: '请选择所属省份', trigger: 'change' }],
                parent_id: [{ required: true, message: '请选择所属城市', trigger: 'change' }],
                area: [{ required: true, message: '请填写区镇名称',trigger: 'blur' }],
                area_code: [
                    { required: true, message: '区镇编码不能为空'},
                    { validator: checkNumber, trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        this.$store.dispatch('resetUnitList')
        this.$store.dispatch('getProvinceList', {})
    },
    computed: {
        provincelist() { return this.$store.getters.provinceList },
        citylist() { return this.$store.getters.cityList }
    },
    methods: {
        submit(formName) {
            let that = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 新建区镇
                    let param = this.form
                    param.status = this.switchStatus === true ? 1 : 0

                    api.createArea(param, function (response) {
                        if (response.status === '200') {
                            that.$message({
                                message: '新建成功！',
                                type: 'success'
                            })
                            // 创建成功，回到列表页
                            that.$router.go(-1)
                        } else {
                            that.$alert('创建失败，编码不能重复或者其他错误', '系统通知', { confirmButtonText: '确定', type: 'error' })
                        }
                    })

                } else {
                    this.$alert('必填的字段不能为空，请检查填写后重新提交', '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        getCityList(val) {
            // 根据省份找城市
            this.$store.dispatch('getCityList', { id: val })
        }
    },
    components: {
        topbar,
        cancel
    }
}
</script>
