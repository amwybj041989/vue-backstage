<template>
<div id="classeditor" class="right-content">
    <topbar :bone="bone" :btwo="btwo"></topbar>
    <el-row class="mb-10">
        <el-col :span="24" class="el-item editor-form display-table">
            <div class="form-left">
                <el-form ref="form" :rules="rules" label-position="right" :model="form" label-width="150px">

                    <el-form-item label="所属一级类目" prop="bigclass" v-if="type === 's' || type === 'm'">
                        <el-select v-model="form.bigclass" placeholder="请选择">
                              <el-option label="是" value="是"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="所属二级类目" prop="mediumclass" v-if="type === 's'">
                        <el-select v-model="form.mediumclass" placeholder="请选择" no-data-text="请先选择一级类目">

                        </el-select>
                    </el-form-item>

                    <el-form-item :label="label" prop="smallclass">
                        <el-input v-model="form.smallclass" placeholder="请填写类目名称"></el-input>
                    </el-form-item>

                    <el-form-item label="编号" prop="number">
                        <el-input v-model="form.number" placeholder="请填写类目编号，如“01、02”"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="">查看商品结构分类表&gt;</el-button>
                    </el-form-item>

                    <el-form-item label="启动开关">
                        <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
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
import topbar from '../../components/common/topbar.vue'

export default {
    data() {
        return {
            type: this.$route.params.type,
            id: this.$route.params.id,
            label: '',
            bone: '',
            btwo: '',
            form: {
                bigclass: '',
                mediumclass: '',
                smallclass: '',
                number: '',
                delivery: true
            },
            rules: {
                bigclass: [{
                    required: true,
                    message: '请选择所属一级类目',
                    trigger: 'change'
                }],
                mediumclass: [{
                    required: true,
                    message: '请选择所属二级类目',
                    trigger: 'blur'
                }],
                smallclass: [{
                    required: true,
                    message: '请填写类目名称',
                    trigger: 'blur'
                }],
                number: [{
                    required: true,
                    message: '请填写类目编号',
                    trigger: 'blur'
                }]
            },
        }
    },
    created() {
        switch (this.type) {
            case 'b':
                this.label = '一级类目'
                this.bone = '商品大类管理（一级类目）'
                this.btwo = (this.id === 'new') ? '新建一级目录' : '编辑一级目录'
                break;
            case 'm':
                this.label = '二级类目'
                this.bone = '商品大类管理（二级类目）'
                this.btwo = (this.id === 'new') ? '新建二级目录' : '编辑二级目录'
                break;
            case 's':
                this.label = '三级类目'
                this.bone = '商品大类管理（三级类目）'
                this.btwo = (this.id === 'new') ? '新建三级目录' : '编辑三级目录'
                break;
            default:

        }
    },
    methods: {
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {

                } else {
                    this.$alert('必填的字段不能为空，请检查填写后重新提交', '系统通知', { confirmButtonText: '确定' })
                }
            })
        }
    },
    components: { topbar }
}
</script>
