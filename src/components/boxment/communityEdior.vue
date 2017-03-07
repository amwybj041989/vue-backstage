<template>
<div id="staffmenteditor" class="right-content">
    <topbar bone="城市小区管理" :btwo="btwo"></topbar>
    <el-row class="mb-10">
        <el-col :span="24" class="el-item editor-form display-table">
            <div class="form-left">
                <el-form ref="form" :rules="rules" label-position="right" :model="form" label-width="150px">
                    <el-form-item label="所属省份" prop="progress">
                        <el-select v-model="form.progress" placeholder="请选择盒子所属省份">
                              <el-option label="广东省" value="广东"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属城市" prop="city">
                        <el-select v-model="form.city" placeholder="请选择盒子所属城市" no-data-text="请先选择省份">
                            <el-option label="中山市" value="中山市"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属区域" prop="area">
                        <el-select v-model="form.area" placeholder="请选择盒子所属区域" no-data-text="请先选择城市">
                            <el-option label="三乡" value="三乡"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="address">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="小区名称" prop="residential">
                        <el-input v-model="form.residential"></el-input>
                    </el-form-item>
                    <el-form-item label="启动开关">
                        <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
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
            <el-button>取消</el-button>
        </el-col>
    </el-row>
</div>
</template>

<script>
// 编辑理货员
import topbar from '../common/topbar.vue'
import '../../static/style/boxment/communityEdior.scss'

export default {
    data() {
        return {
            param: this.$route.params.id,
            btwo: '新增小区',
            form: {
                progress: '',
                city: '',
                area: '',
                address: '',
                residential: '',
                delivery: false
            },
            rules: {
                progress: [{
                    required: true,
                    message: '请选择所属省份',
                    trigger: 'change'
                }],
                city: [{
                    required: true,
                    message: '请选择所属城市',
                    trigger: 'change'
                }],
                area: [{
                    required: true,
                    message: '请选择所属区域',
                    trigger: 'change'
                }],
                address: [{
                        required: true,
                        message: '请输入详细地址',
                        trigger: 'blur'
                    }
                ],
                residential: [{
                        required: true,
                        message: '请输入小区名称',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    created() {
        this.btwo = this.param === 'new' ? '新增小区' : '编辑小区'
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('可以提交')
                } else {
                    this.$alert('必填的字段不能为空，请检查填写后重新提交', '系统通知', { confirmButtonText: '确定' })

                    console.log('error submit!!')
                }
            })
        }
    },
    components: {
        topbar
    }
}
</script>
