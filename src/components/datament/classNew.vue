<template>
<div id="classeditor" class="right-content">
    <topbar :bone="bone" :btwo="btwo"></topbar>
    <el-row class="mb-10">
        <el-col :span="24" class="el-item editor-form display-table">
            <div class="form-left">
                <el-form ref="form" :rules="rules" label-position="right" :model="form" label-width="150px">
                    <el-form-item label="所属一级类目" prop="parentId1" v-if="type === 's' || type === 'm'">
                        <el-select v-model="form.parentId1" placeholder="请选择" @change="getMediumclass">
                            <el-option :label="item.number + ' ' + item.bigclass" :value="item.id" :key="item.id" v-for="item in nbigclass">
                                {{ item.number }} {{ item.bigclass }}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属二级类目" prop="parentId2" v-if="type === 's'">
                        <el-select v-model="form.parentId2" placeholder="请选择" no-data-text="请选择一级类目/没有数据">
                            <el-option :label="item.number + ' ' + item.bigclass" :value="item.id" :key="item.id" v-for="item in nmediumclass">
                                {{ item.number }} {{ item.bigclass }}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="label" prop="title">
                        <el-input v-model="form.title" placeholder="请填写类目名称"></el-input>
                    </el-form-item>
                    <el-form-item label="编号" prop="number">
                        <el-input v-model="form.number" placeholder="请填写类目编号，如“01、02”"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="">查看商品结构分类表&gt;</el-button>
                    </el-form-item>
                    <el-form-item label="启动开关">
                        <el-switch on-text="" off-text="" v-model="switchStatus" disabled></el-switch>
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
                title: [{ required: true, message: '请填写类目名称',trigger: 'blur' }],
                number: [ { validator: checkNumber, trigger: 'blur' } ]
            },
        }
    },
    created() {
        switch (this.type) {
            case 'b':
                this.label = '一级类目'
                this.bone = '商品大类管理（一级类目）'
                this.btwo = '新建一级目录'
                break;
            case 'm':
                this.label = '二级类目'
                this.bone = '商品中类管理（二级类目）'
                this.btwo = '新建二级目录'
                var param = {
                    type: 1
                }
                this.$store.dispatch('getClass', param)
                break;
            case 's':
                this.label = '三级类目'
                this.bone = '商品小类管理（三级类目）'
                this.btwo = '新建三级目录'
                var param = {
                    type: 1
                }
                this.$store.dispatch('getClass', param)
                break;
            default:

        }
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
                    // 新建类
                    let param = this.form
                    param.status = this.switchStatus === true ? 1 : 0

                    api.createProductClass(param, function (response) {
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
        },
        getMediumclass(val) {
            // 根据大类查找中类
            if(this.type !== 's'){
                return false
            }
            let param = {
                type: 2,
                parentId: val
            }
            this.$store.dispatch('getClass', param)
        }
    },
    components: { topbar }
}
</script>
