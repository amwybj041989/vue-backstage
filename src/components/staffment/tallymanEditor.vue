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
                <el-upload action="//jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarScucess" :before-upload="beforeAvatarUpload" drag>
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p class="mt-10">理货员头像<br>只能上传jpg/png文件且不超过2mb</p>
            </div>
        </el-col>
    </el-row>
    <el-row class="mb-10">
        <el-col :span="24" class="el-item pa-20">
            <el-dropdown trigger="click" @command="dropdownCity">
                <el-button>
                    {{ dropdown.city }}<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="中山市">中山市</el-dropdown-item>
                    <el-dropdown-item command="广州市">广州市</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown trigger="click" @command="dropdownArea">
                <el-button>
                    {{ dropdown.area }}<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="东区">东区</el-dropdown-item>
                    <el-dropdown-item command="三乡">三乡</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-table :data="tableData" :stripe="true" class="w-100 mt-10">
                <el-table-column prop="provinces" label="省份" width="90"></el-table-column>
                <el-table-column prop="city" label="城市" width="90"></el-table-column>
                <el-table-column prop="area" label="区域" width="90"></el-table-column>
                <el-table-column prop="boxname" label="盒子名称" width="150"></el-table-column>
                <el-table-column prop="address" label="所在地址"></el-table-column>
                <el-table-column type="selection" width="55"></el-table-column>
            </el-table>

            <el-pagination @current-change="handleCurrentChange" :current-page="1" layout="total, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>

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
            rules: {
                name: [{
                        required: true,
                        message: '请输入登录账号',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                password: [{
                        required: true,
                        message: '请输入登录密码',
                        trigger: 'blur'
                    },
                    {
                        min: 5,
                        max: 20,
                        message: '长度在 5 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                post: [{
                        required: true,
                        message: '请输入管理区域职位',
                        trigger: 'blur'
                    },
                    {
                        min: 5,
                        max: 20,
                        message: '长度在 5 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                phone: [{
                        required: true,
                        message: '请输入联系方式',
                        trigger: 'blur'
                    },
                    {
                        min: 11,
                        max: 11,
                        message: '长度为11个字符',
                        trigger: 'blur'
                    }
                ]
            },
            tableData: [{
                provinces: '广东省',
                city: '中山市',
                area: '三乡',
                boxname: '缤果盒子A1001',
                address: '中山市三乡温泉村温泉里小区'
            }, {
                provinces: '广东省',
                city: '中山市',
                area: '三乡',
                boxname: '缤果盒子A1001',
                address: '中山市三乡温泉村温泉里小区'
            }, {
                provinces: '广东省',
                city: '中山市',
                area: '三乡',
                boxname: '缤果盒子A1001',
                address: '中山市三乡温泉村温泉里小区'
            }, {
                provinces: '广东省',
                city: '中山市',
                area: '三乡',
                boxname: '缤果盒子A1001',
                address: '中山市三乡温泉村温泉里小区'
            }, {
                provinces: '广东省',
                city: '中山市',
                area: '三乡',
                boxname: '缤果盒子A1001',
                address: '中山市三乡温泉村温泉里小区'
            }],
            dropdown: {
                city: '选择城市',
                area: '选择区域'
            },
            fileList: [],
            manid: this.$route.params.id
        }
    },
    // 如果manid为new就是新增理货员
    methods: {
        handleAvatarScucess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M;
        },
        dropdownCity(command) {
            this.dropdown.city = command
        },
        dropdownArea(command) {
            this.dropdown.area = command
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
        },
        submitForm(formName) {
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
