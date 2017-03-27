<template>
<div id="supplieredior" class="right-content">
    <topbar bone="供应商管理" :btwo="btwo"></topbar>
    <el-row class="mb-10">
        <el-col :span="24" class="el-item editor-form display-table">
            <div class="form-left">
                <el-form ref="form" :rules="rules" label-position="right" :model="form" label-width="150px">
                    <el-form-item label="公司名称" prop="company">
                        <el-input v-model="form.company" placeholder="请填写公司名称"></el-input>
                    </el-form-item>
                    <el-form-item label="营业工商号" prop="business_number">
                        <el-input v-model.number="form.business_number" placeholder="请填写营业执照工商号"></el-input>
                    </el-form-item>
                    <el-form-item label="一般纳税人" prop="general_taxpayer">
                        <el-select v-model="form.general_taxpayer" placeholder="请选择">
                              <el-option label="是" value="1"></el-option>
                              <el-option label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收款人姓名" prop="name">
                        <el-input v-model="form.name" placeholder="请填写收款人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="phone">
                        <el-input v-model.number="form.phone" placeholder="请填写联系方式"></el-input>
                    </el-form-item>
                    <el-form-item label="开户银行" prop="bank">
                        <el-input v-model="form.bank" placeholder="请填写开户银行"></el-input>
                    </el-form-item>
                    <el-form-item label="银行账号" prop="bank_account">
                        <el-input v-model.number="form.bank_account" placeholder="请填写银行账号"></el-input>
                    </el-form-item>
                    <el-form-item label="主营业务" prop="service">
                        <el-input v-model="form.service" placeholder="请填写公司主营业务"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="form-right">
                <image-upload :imageUrl="imageUrl" @increment="handleAvatarScucess"></image-upload>
                <p class="mt-10">营业执照图片 <a :href="imageUrl" class="f-color f-link" target="_blank" v-if="imageUrl">点我查看大图</a></p>
            </div>
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
// 编辑供货商
import api from '../../api/api.js'
import topbar from '../common/topbar.vue'
import cancel from '../common/cancel.vue'
import imageUpload from '../common/imageUpload.vue'
import '../../static/style/datament/supplierEditor.scss'

export default {
    data() {
        return {
            imageUrl: '',
            btwo: '新建供货商',
            form: {
                company: '',
                business_number: '',
                general_taxpayer: '',
                name: '',
                phone: '',
                bank: '',
                bank_account: '',
                service: ''
            },
            rules: {
                company: [{ required: true,message: '请输入公司名称',trigger: 'blur' }],
                business_number: [
                    { required: true, message: '请输入营业执照工商号' },
                    { type: 'number', message: '营业执照工商号必须为数字值'}
                ],
                general_taxpayer: [{ required: true, message: '请选择纳税人类型', trigger: 'change' }],
                name: [{ required: true, message: '请输入收款人姓名', trigger: 'blur' }],
                phone: [
                    { required: true, message: '请输入联系方式' },
                    { type: 'number', message: '联系方式必须为数字值'}
                ],
                bank: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
                bank_account: [
                    { required: true, message: '请输入银行账号' },
                    { type: 'number', message: '银行账号必须为数字值'}
                ]
            },
            fileList: [],
            supplierId: this.$route.params.id
        }
    },
    created() {
        if(this.supplierId !== 'new'){
            this.btwo = '编辑供货商'
            let that = this,
                param = {
                    id: this.supplierId
                }
            api.getSupplierInfo(param, function (response) {
                if (response.status === '200') {
                    let _data = response.data
                    that.form.company = _data.company
                    that.form.business_number = Number(_data.business_number)
                    that.form.general_taxpayer = _data.general_taxpayer
                    that.form.name = _data.name
                    that.form.phone = Number(_data.phone)
                    that.form.bank = _data.bank
                    that.form.bank_account = Number(_data.bank_account)
                    that.form.service = _data.service
                    that.imageUrl = _data.img
                } else {
                    that.$alert('获取数据失败，服务器出错', '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        }
    },
    computed: {

    },
    methods: {
        submit(formName) {
            var that = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let param = this.form
                    param.id = this.supplierId
                    param.img = this.imageUrl

                    if(this.supplierId !== 'new') {
                        api.updateSupplier(param, function (response) {
                            if (response.status === '200') {
                                that.$message({
                                    message: '更新成功！',
                                    type: 'success'
                                })
                                // 创建成功，回到列表页
                                that.$router.go(-1)
                            } else {
                                that.$alert('更新失败，服务器出错', '系统通知', { confirmButtonText: '确定', type: 'error' })
                            }
                        })
                    } else {
                        api.createSupplier(param, function (response) {
                            if (response.status === '200') {
                                that.$message({
                                    message: '新建成功！',
                                    type: 'success'
                                })
                                // 创建成功，回到列表页
                                that.$router.go(-1)
                            } else {
                                that.$alert('创建失败，服务器出错', '系统通知', { confirmButtonText: '确定', type: 'error' })
                            }
                        })
                    }

                } else {
                    this.$alert('必填的字段不能为空，请检查填写后重新提交', '系统通知', { confirmButtonText: '确定' })
                }
            })
        },
        handleAvatarScucess(row) {
            // 图片上传成功钩子，接收子组件数据
            this.imageUrl = row
        }
    },
    components: {
        topbar,
        imageUpload,
        cancel
    }
}
</script>
