<template>
<div class="right-content">
    <topbar bone="商品字典类型管理" :btwo="btwo"></topbar>
    <el-row class="mb-10">
        <el-col :span="24" class="el-item editor-form display-table">
            <div class="form-left">
                <el-form ref="form" :rules="rules" label-position="right" :model="form" label-width="150px">
                    <el-form-item label="名称" prop="title">
                        <el-input v-model="form.title" placeholder="请填写类型名称"></el-input>
                    </el-form-item>
                    <el-form-item label="编号" prop="code">
                        <el-input v-model="form.code" placeholder="使用英文或拼音编码"></el-input>
                    </el-form-item>
                    <el-form-item label="启动开关">
                        <el-switch on-text="" off-text="" v-model="switchStatus"></el-switch>
                    </el-form-item>
                </el-form>
            </div>
            <div class="form-right">

            </div>
        </el-col>
    </el-row>
    <el-row class="mb-10">
        <el-col :span="24" class="el-item pa-20">
            <p class="theme-p mb-10">是否保存</p>
            <el-button type="primary" @click="submit('form')">保存</el-button>
            <el-button>取消</el-button>
        </el-col>
    </el-row>
</div>
</template>

<script>
// 编辑/新增商品分类
import api from '../../api/api.js'
import topbar from '../../components/common/topbar.vue'

export default {
    data() {
        return {
            btwo: '新增字典类型',
            form: {
                title: '',
                code: ''
            },
            switchStatus: true,
            rules: {
                title: [{ required: true, message: '请填写类型名称',trigger: 'blur' }],
                code: [{ required: true, message: '请填写编码',trigger: 'blur' }]
            }
        }
    },
    methods: {
        submit(formName) {
            let that = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 新建类
                    let param = this.form
                    param.status = this.switchStatus === true ? 1 : 0

                    api.createDictionaryType(param, function (response) {
                        if (response.data.status === '200') {
                            that.$message({
                                message: '新建成功！',
                                type: 'success'
                            })
                            // 创建成功，回到列表页
                            that.$router.go(-1)
                        } else {
                            that.$alert('创建失败，编号不能重复', '系统通知', { confirmButtonText: '确定', type: 'error' })
                        }
                    })

                } else {
                    this.$alert('必填的字段不能为空，请检查填写后重新提交', '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        }
    },
    components: { topbar }
}
</script>
