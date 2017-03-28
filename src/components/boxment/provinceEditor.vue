<template>
<div class="right-content">
    <topbar bone="省份管理" btwo="编辑省份"></topbar>
    <el-row class="mb-10">
        <el-col :span="24" class="el-item editor-form display-table">
            <div class="form-left">
                <el-form ref="form" :rules="rules" label-position="right" :model="form" label-width="150px">
                    <el-form-item label="省份名称" prop="province">
                        <el-input v-model="form.province" placeholder="请填写省份名称"></el-input>
                    </el-form-item>
                    <el-form-item label="省份编码" prop="province_code">
                        <el-input v-model="form.province_code" placeholder="请填写省份编码"></el-input>
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
// 编辑省份
import api from '../../api/boxmentApi.js'
import topbar from '../common/topbar.vue'
import cancel from '../common/cancel.vue'

export default {
    data() {
        // 自定义编号检查规则
        var checkNumber = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请填写省份编码'))
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
                province_code: ''
            },
            switchStatus: true,
            rules: {
                province: [{ required: true, message: '请填写省份名称',trigger: 'blur' }],
                province_code: [
                    { required: true, message: '省份编码不能为空'},
                    { validator: checkNumber, trigger: 'blur' }
                ]
            }
        }
    },
    created() {

    },
    methods: {
        submit(formName) {
            let that = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 新建省份
                    let param = this.form
                    param.status = this.switchStatus === true ? 1 : 0

                    api.createProvince(param, function (response) {
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
        }
    },
    components: {
        topbar,
        cancel
    }
}
</script>
