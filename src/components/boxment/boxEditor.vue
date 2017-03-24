<template>
<div id="boxeditor" class="right-content">
    <topbar bone="缤果盒子列表" btwo="编辑盒子"></topbar>
    <el-row class="mb-10">
        <el-col :span="24" class="el-item editor-form display-table">
            <div class="form-left">
                <el-form ref="form" :rules="rules" label-position="right" :model="form" label-width="150px">
                    <el-form-item label="唯一编号" prop="boxno">
                        <el-input v-model="form.boxno" placeholder="请填写盒子box_no，如“A1001”"></el-input>
                    </el-form-item>
                    <el-form-item label="门禁编号">
                        <el-input v-model="form.doorno" placeholder="请填写盒子门禁编号"></el-input>
                    </el-form-item>
                    <el-form-item label="所属省份" prop="progress">
                        <el-select v-model="form.progress" placeholder="请选择盒子所属省份">
                              <el-option label="广东省" value="广东"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属城市" prop="city">
                        <el-select v-model="form.city" placeholder="请选择盒子所属城市" no-data-text="请先选择省份"></el-select>
                    </el-form-item>
                    <el-form-item label="所属区域" prop="area">
                        <el-select v-model="form.area" placeholder="请选择盒子所属区域" no-data-text="请先选择城市"></el-select>
                    </el-form-item>
                    <el-form-item label="所属小区">
                        <el-select v-model="form.residential" placeholder="请选择" no-data-text="请先选择区域"></el-select>
                    </el-form-item>
                    <el-form-item label="详细地址">
                        <el-input v-model="form.address" placeholder="请填写小区所在详细地址"></el-input>
                    </el-form-item>
                    <el-form-item label="盒子名称" prop="name">
                        <el-input v-model="form.name" placeholder="请填写盒子名称，如“缤果盒子A1001”"></el-input>
                    </el-form-item>
                    <el-form-item label="用户实名认证">
                        <el-switch on-text="" off-text="" v-model="form.realname"></el-switch>
                    </el-form-item>
                    <el-form-item label="人脸识别功能">
                        <el-switch on-text="" off-text="" v-model="form.humanface"></el-switch>
                    </el-form-item>
                    <el-form-item label="业主认证功能">
                        <el-switch on-text="" off-text="" v-model="form.owner"></el-switch>
                    </el-form-item>
                    <el-form-item label="启动开关">
                        <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
                    </el-form-item>
                </el-form>
            </div>
            <div class="form-right">
                <a href="" class="editor-coordinate mb-15">编辑盒子坐标</a>
                <el-input type="textarea" placeholder="使用“编辑盒子坐标”工具绘制盒子区域及中心点坐标，将代码复制到文本框内。" v-model="form.coordinate"></el-input>
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
// 编辑理货员
import topbar from '../common/topbar.vue'
import cancel from '../common/cancel.vue'
import '../../static/style/boxment/boxEditor.scss'

export default {
    data() {
        return {
            form: {
                boxno: '',
                progress: '',
                city: '',
                area: '',
                name: '',
                coordinate: '',
                realname: true,
                humanface: false,
                owner: false,
                delivery: false
            },
            rules: {
                boxno: [{
                        required: true,
                        message: '请输入登录账号',
                        trigger: 'blur'
                    }
                ],
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
                name: [{
                    required: true,
                    message: '请填写盒子名',
                    trigger: 'blur'
                }]
            },
            dropdown: {
                city: '选择城市',
                area: '选择区域'
            },
            fileList: [],
            boxid: this.$route.params.id
        }
    },
    // 如果manid为new就是新增理货员
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        dropdownCity(command) {
            this.dropdown.city = command
        },
        dropdownArea(command) {
            this.dropdown.area = command
        },
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {

                } else {
                    this.$alert('必填的字段不能为空，请检查填写后重新提交', '系统通知', { confirmButtonText: '确定' })
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
