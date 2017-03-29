<template>
<div class="right-content">
    <topbar bone="商品管理" btwo="新建商品"></topbar>
    <el-row class="mb-10">
        <el-col :span="24" class="el-item editor-form display-table">
            <div class="form-left">
                <el-form ref="form" :rules="rules" label-position="right" :model="form" label-width="150px">

                    <el-form-item label="商品ID">
                        <el-input placeholder="创建后自动生成" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="商品名称" prop="">
                        <el-input v-model="" placeholder="请填写商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="国际条码" prop="">
                        <el-input v-model="" placeholder="请填写国际条码"></el-input>
                    </el-form-item>

                    <el-form-item label="商品规格" prop="">
                        <el-input v-model="" placeholder="请输入商品规格，如500g"></el-input>
                    </el-form-item>
                    <el-form-item label="销售价格" prop="">
                        <el-input v-model="" placeholder="请填写销售价格，如6.88">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>

                    <div style="background: #F5F5F5;">
                        <el-form-item label="预估进价">
                            <el-input v-model="" placeholder="预估进价只用于计算毛利率">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="毛利率">
                            <el-input v-model="" placeholder="自动计算毛利率，仅做参考">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </div>

                    <el-form-item label="保质期">
                        <el-input v-model="" placeholder="填写保质期天数">
                            <template slot="append">天</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="报警天数">
                        <el-input v-model="" placeholder="距离过期报警天数">
                            <template slot="append">天</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品产地">
                        <el-input v-model="" placeholder="填写商品产地"></el-input>
                    </el-form-item>

                    <el-form-item label="供货商">
                        <el-input value="已选4个供货商" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="">
                        <el-table :data="supplier" :stripe="true" class="w-100" :row-class-name="tableRowDisabled">
                            <el-table-column prop="id" label="供货商" width="150"></el-table-column>
                            <el-table-column prop="code" label="初始报价" width="85"></el-table-column>
                            <el-table-column label="操作" width="80">
                                <template scope="scope">
                                    <el-button type="primary" size="small" @click="">删除</el-button>
            					</template>
            			  	</el-table-column>
            			</el-table>
                    </el-form-item>

                    <el-form-item label="启动开关">
                        <el-switch on-text="开" off-text="关" v-model="switchStatus"></el-switch>
                    </el-form-item>
                </el-form>
            </div>
            <div class="form-right">
                <image-upload :imageUrl="imageUrl" @increment="handleAvatarScucess"></image-upload>
                <p class="mt-10">产品图片</p>
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
import api from '../../api/datamentApi.js'
import topbar from '../common/topbar.vue'
import cancel from '../common/cancel.vue'
import imageUpload from '../common/imageUpload.vue'

export default {
    data() {
        return {
            type: this.$route.params.type,
            imageUrl: '',
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
                number: [
                    { required: true, message: '类目编号不能为空'},
                    { validator: checkNumber, trigger: 'blur' }
                ]
            },
            supplier: []
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
                        if (response.status === '200') {
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
    components: {
        imageUpload,
        topbar,
        cancel
    }
}
</script>
