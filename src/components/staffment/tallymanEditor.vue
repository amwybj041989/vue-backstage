<template>
<div id="staffmenteditor" class="right-content">
    <topbar bone="理货员管理" btwo="编辑理货员"></topbar>
    <el-row class="mb-10">
        <el-col :span="24" class="el-item editor-form display-table">
            <div class="form-left">
                <el-form ref="form" :rules="rules" label-position="right" :model="form" label-width="150px">
                    <el-form-item label="登录账号" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="登录密码" prop="password">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="管理区域职位" prop="post">
                        <el-input v-model="form.post"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="phone">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="启动开关">
                        <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
                    </el-form-item>
                </el-form>
            </div>
            <div class="form-right">
                <image-upload :imageUrl="imageUrl" @increment="handleAvatarScucess"></image-upload>
                <p class="mt-10">理货员头像</p>
            </div>
        </el-col>
    </el-row>
    <el-row class="mb-10">
        <el-col :span="24" class="el-item pa-20">
            <div class="tableTopbar"><span>分配理货员管理的盒子</span></div>
            <el-table :data="boxlist" :stripe="true" class="w-100 mt-10" max-height="540" @selection-change="handleSelectionChange">
                <el-table-column prop="province" label="省份" width="90" :filters="provinceList" :filter-method="filterProvince"></el-table-column>
                <el-table-column prop="city" label="城市" width="100" :filters="cityList" :filter-method="filterCity"></el-table-column>
                <el-table-column prop="area" label="区域" width="110" :filters="areaList" :filter-method="filterArea"></el-table-column>
                <el-table-column prop="community" label="盒子名称" width="170"></el-table-column>
                <el-table-column prop="addr" label="所在地址"></el-table-column>
                <el-table-column type="selection" label="分配管理" width="55"></el-table-column>
            </el-table>
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
// 编辑理货员
import topbar from '../common/topbar.vue'
import cancel from '../common/cancel.vue'
import imageUpload from '../common/imageUpload.vue'
import '../../static/style/staffment/tallymanEditor.scss'

export default {
    data() {
        return {
            imageUrl: '',
            form: {
                name: '',
                password: '',
                post: '',
                phone: '',
                delivery: false
            },
            switchStatus: true,
            rules: {
                name: [
                    { required: true, message: '请输入登录账号', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
                ],
                post: [
                    { required: true, message: '请输入管理区域职位', trigger: 'blur' },
                    { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入联系方式', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
                ]
            },
            filters: [{ text: '已分配', value: true }, { text: '未分配', value: false }],
            selectBox: []
        }
    },
    created() {
        var that = this
        this.$store.dispatch('getBoxList',{ page: 0 })
    },
    computed: {
        boxlist() { return this.$store.getters.boxList },
        provinceList() {
            let _data = this.boxlist,
                _list = [],
                _filter = []
            for(let item of _data) {
                if(!_filter.includes(item.province)){
                    _filter.push(item.province)
                }
            }
            for(let item of _filter) {
                _list.push({ text: item, value: item })
            }
            return _list
        },
        cityList() {
            let _data = this.boxlist,
                _list = [],
                _filter = []
            for(let item of _data) {
                if(!_filter.includes(item.city)){
                    _filter.push(item.city)
                }
            }
            for(let item of _filter) {
                _list.push({ text: item, value: item })
            }
            return _list
        },
        areaList() {
            let _data = this.boxlist,
                _list = [],
                _filter = []
            for(let item of _data) {
                if(!_filter.includes(item.area)){
                    _filter.push(item.area)
                }
            }
            for(let item of _filter) {
                _list.push({ text: item, value: item })
            }
            return _list
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {

                } else {
                    this.$alert('必填的字段不能为空，请检查填写后重新提交', '系统通知', { confirmButtonText: '确定' })
                }
            })
        },
        handleAvatarScucess(row) {
            // 图片上传成功钩子，接收子组件数据
            this.imageUrl = row
        },
        filterProvince(value, row) {
            return row.province === value
        },
        filterCity(value, row) {
            return row.city === value
        },
        filterArea(value, row) {
            return row.area === value
        },
        handleSelectionChange(val) {
            this.selectBox = val
        }
    },
    components: {
        topbar,
        cancel,
        imageUpload
    }
}
</script>
