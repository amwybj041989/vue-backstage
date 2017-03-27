<template>
<div id="classeditor" class="right-content">
    <topbar :bone="bone" :btwo="btwo"></topbar>
    <el-row class="mb-10">
        <el-col :span="24" class="el-item editor-form display-table">
            <div class="form-left">
                <el-form ref="form" :rules="rules" label-position="right" :model="form" label-width="150px">

                    <el-form-item label="所属一级类目" prop="parentId1" v-if="type === 's' || type === 'm'">
                        <el-select v-model="form.parentId1" placeholder="请选择">
                            <el-option :label="item.number + ' ' + item.bigclass" :value="item.id" :key="item.id" v-for="item in nbigclass">
                                {{ item.number }} {{ item.bigclass }}
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="所属二级类目" prop="parentId2" v-if="type === 's'">
                        <el-select v-model="form.parentId2" placeholder="请选择" no-data-text="请先选择一级类目">
                            <el-option :label="item.number + ' ' + item.bigclass" :value="item.id" :key="item.id" v-for="item in nmediumclass">
                                {{ item.number }} {{ item.bigclass }}
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="label" prop="title">
                        <el-input v-model="form.title" placeholder="请填写类目名称"></el-input>
                    </el-form-item>

                    <el-form-item label="编号" prop="number">
                        <el-input v-model="form.number" placeholder="请填写类目编号，如“01、02”" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="">查看商品结构分类表&gt;</el-button>
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
            <cancel></cancel>
        </el-col>
    </el-row>
</div>
</template>

<script>
// 编辑/新增商品分类
import api from '../../api/api.js'
import cancel from '../common/cancel.vue'
import topbar from '../common/topbar.vue'

export default {
    data() {
        // 自定义编号检查规则
        var checkNumber = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请填写类目编号'))
            }
            let val = Number(value)
            if (!Number.isInteger(val)) {
                callback(new Error('请输入数字值'))
            } else {
                callback()
            }
        }
        return {
            type: this.$route.params.type,
            id: this.$route.params.id,
            label: '',
            bone: '',
            btwo: '',
            form: {
                parentId1: '',
                parentId2: '',
                title: '',
                number: ''
            },
            switchStatus: true,
            rules: {
                parentId1: [{ required: true, message: '请选择所属一级类目', trigger: 'change' }],
                parentId2: [{ required: true, message: '请选择所属二级类目', trigger: 'blur' }],
                title: [{ required: true, message: '请填写类目名称', trigger: 'blur' }],
                number: [
                    { required: true, message: '类目编号不能为空'},
                    { validator: checkNumber, trigger: 'blur' }
                ]
            },
        }
    },
    created() {
        // 如果是一级类目，直接填写获取的资料
        // 如果是二级类目，要获取一级类目列表匹配
        // 如果是三级类目，要获取一级类目列表匹配，再根据一级类目获取二级类目列表匹配
        switch (this.type) {
            case 'b':
                this.label = '一级类目'
                this.bone = '商品大类管理（一级类目）'
                this.btwo = '编辑一级目录'
                break;
            case 'm':
                this.label = '二级类目'
                this.bone = '商品中类管理（二级类目）'
                this.btwo = '编辑二级目录'
                this.$store.dispatch('getClass', { type: 1 })
                break;
            case 's':
                this.label = '三级类目'
                this.bone = '商品小类管理（三级类目）'
                this.btwo = '编辑三级目录'
                this.$store.dispatch('getClass', { type: 1 })
                break;
            default:
        }
        this.getClassInfo({ id: this.id })

    },
    computed: {
        nbigclass() { return this.$store.getters.nbigclassdata },
        nmediumclass() { return this.$store.getters.nmediumclassdata }
    },
    methods: {
        submit(formName) {
            let that = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 更新商品分类
                    let param = this.form
                    param.id = this.id
                    param.status = this.switchStatus === true ? 1 : 0

                    api.updateProductClass(param, function (response) {
                        if (response.status === '200') {
                            that.$message({
                                message: '更新成功！',
                                type: 'success'
                            })
                            // 更新成功，回到列表页
                            that.$router.go(-1)
                        } else {
                            that.$alert('更新失败，请重试', '系统通知', { confirmButtonText: '确定', type: 'error' })
                        }
                    })

                } else {
                    this.$alert('必填的字段不能为空，请检查填写后重新提交', '系统通知', { confirmButtonText: '确定' })
                }
            })
        },
        getClassInfo(param) {
            // 获取分类详情
            let that = this
            api.getProductClassInfo(param, function (response) {
                if (response.status === '200') {
                    let _data = response.data
                    that.form.parentId1 = _data.parentId1
                    that.form.parentId2 = _data.parentId2
                    that.form.title = _data.title
                    that.form.number = _data.number
                    that.switchStatus = _data.status === '1' ? true : false
                } else {
                    that.$alert('获取数据失败，服务器出错', '系统通知', { confirmButtonText: '确定', type: 'error' })
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
