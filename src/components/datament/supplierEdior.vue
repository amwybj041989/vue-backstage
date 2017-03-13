<template>
<div id="supplieredior" class="right-content">
    <topbar bone="供应商管理" btwo="新建供货商"></topbar>
    <el-row class="mb-10">
        <el-col :span="24" class="el-item editor-form display-table">
            <div class="form-left">
                <el-form ref="form" :rules="rules" label-position="right" :model="form" label-width="150px">

                    <el-form-item label="公司名称" prop="companyName">
                        <el-input v-model="form.companyName" placeholder="请填写公司名称"></el-input>
                    </el-form-item>

                    <el-form-item label="营业工商号" prop="businessNumber">
                        <el-input v-model="form.businessNumber" placeholder="请填写营业执照工商号"></el-input>
                    </el-form-item>

                    <el-form-item label="一般纳税人" prop="taxpayers">
                        <el-select v-model="form.taxpayers" placeholder="请选择">
                              <el-option label="是" value="是"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="收款人姓名" prop="payee">
                        <el-input v-model="form.payee" placeholder="请填写收款人姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="联系方式" prop="phone">
                        <el-input v-model="form.phone" placeholder="请填写联系方式"></el-input>
                    </el-form-item>

                    <el-form-item label="开户银行" prop="bank">
                        <el-input v-model="form.bank" placeholder="请填写开户银行"></el-input>
                    </el-form-item>

                    <el-form-item label="银行账号" prop="bankAccount">
                        <el-input v-model="form.bankAccount" placeholder="请填写银行账号"></el-input>
                    </el-form-item>

                    <el-form-item label="主营业务" prop="business">
                        <el-input v-model="form.business" placeholder="请填写公司主营业务"></el-input>
                    </el-form-item>

                </el-form>
            </div>
            <div class="form-right">
                <el-upload action="//jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarScucess" :before-upload="beforeAvatarUpload" drag>
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p class="mt-10">营业执照图片</p>
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
// 编辑供货商
import topbar from '../common/topbar.vue'
import '../../static/style/datament/supplierEdior.scss'

export default {
    data() {
        return {
            imageUrl: '',
            form: {
                companyName: '',
                businessNumber: '',
                taxpayers: '',
                payee: '',
                phone: '',
                bank: '',
                bankAccount: '',
                business: ''
            },
            rules: {
                companyName: [{
                        required: true,
                        message: '请输入公司名称',
                        trigger: 'blur'
                    }
                ],
                businessNumber: [{
                        required: true,
                        message: '请输入营业执照工商号',
                        trigger: 'blur'
                    }
                ],
                taxpayers: [{
                    required: true,
                    message: '请选择纳税人类型',
                    trigger: 'change'
                }],
                payee: [{
                    required: true,
                    message: '请输入收款人姓名',
                    trigger: 'blur'
                }],
                phone: [{
                    required: true,
                    message: '请输入联系方式',
                    trigger: 'blur'
                }],
                bank: [{
                    required: true,
                    message: '请输入开户银行',
                    trigger: 'blur'
                }],
                bankAccount: [{
                    required: true,
                    message: '请输入银行账号',
                    trigger: 'blur'
                }]
            },
            fileList: [],
            supplierId: this.$route.params.id
        }
    },
    methods: {
        handleAvatarScucess(res, file) {
            // 图片上传成功的回调
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {

                } else {
                    this.$alert('必填的字段不能为空，请检查填写后重新提交', '系统通知', { confirmButtonText: '确定' })
                }
            })
        },
        beforeAvatarUpload() {
            
        }
    },
    components: { topbar }
}
</script>
