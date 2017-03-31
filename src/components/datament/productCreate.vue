<template>
<div id="productmgt" class="right-content">
    <topbar bone="商品管理" btwo="新建商品"></topbar>
    <el-row class="mb-10">
        <el-col :span="24" class="el-item editor-form display-table">
            <div class="form-left">
                <el-form ref="form" :rules="rules" label-position="right" :model="form" label-width="90px">

                    <el-form-item label="商品ID">
                        <el-input placeholder="创建后自动生成" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="商品名称" prop="title">
                        <el-input v-model="form.title" placeholder="请填写商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="国际条码" prop="code">
                        <el-input v-model="form.code" placeholder="请填写国际条码"></el-input>
                    </el-form-item>

                    <el-form-item label="所属大类" prop="first_class">
                        <el-select v-model="form.first_class" placeholder="请选择" @change="getMediumclass">
                            <el-option :label="item.number + ' ' + item.title" :value="item.id" :key="item.id" v-for="item in bigclass">
                                {{ item.number }} {{ item.title }}
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="所属中类" prop="second_class">
                        <el-select v-model="form.second_class" placeholder="请选择" no-data-text="请先选择所属大类/没有数据" @change="getSmallclass">
                            <el-option :label="item.number + ' ' + item.title" :value="item.id" :key="item.id" v-for="item in mediumclass">
                                {{ item.number }} {{ item.title }}
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="所属小类" prop="thirth_class">
                        <el-select v-model="form.thirth_class" placeholder="请选择" no-data-text="请先选择所属中类/没有数据">
                            <el-option :label="item.number + ' ' + item.title" :value="item.id" :key="item.id" v-for="item in smallclass">
                                {{ item.number }} {{ item.title }}
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="包装" prop="packing_id">
                        <el-select v-model="form.packing_id" placeholder="请选择">
                            <el-option :label="item.title" :value="item.id" :key="item.id" v-for="item in packing"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="商品规格" prop="spec">
                        <el-input v-model="form.spec" placeholder="请输入商品规格，如500g"></el-input>
                    </el-form-item>
                    <el-form-item label="销售价格" prop="price">
                        <el-input v-model.number="form.price" placeholder="请填写销售价格，如6.88" @change="changePrice">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>

                    <div class="gross-margin">
                        <el-form-item label="预估进价" prop="purchasePrice">
                            <el-input v-model.number="purchasePrice" placeholder="预估进价只用于计算毛利率" @change="changePurchasePrice">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="毛利率">
                            <el-input v-model="grossMargin" placeholder="自动计算毛利率，仅做参考" :disabled="true">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </div>

                    <el-form-item label="保质期">
                        <el-input v-model="form.time_validity" placeholder="填写保质期天数">
                            <template slot="append">天</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="报警天数">
                        <el-input v-model="form.yu_validity" placeholder="距离过期报警天数">
                            <template slot="append">天</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品产地">
                        <el-input v-model="form.orgin" placeholder="填写商品产地"></el-input>
                    </el-form-item>

                    <el-form-item label="供货商" class="supplier">
                        <el-input :value="supplierNum" :disabled="true"></el-input>

                        <el-popover ref="addsupplier" placement="right" width="400" trigger="click" v-model="popoverVisible">

                            <el-form ref="supplierForm" :rules="supplierRules" label-position="right" :model="supplierForm" label-width="120px" class="supplier-form">

                                <el-form-item label="选择供货商" prop="name">
                                    <el-select v-model="supplierForm.name" filterable placeholder="请选择">
                                        <el-option :label="item.company" :value="item.id + ',' + item.company" :key="item.id" v-for="item in supplierSelectList"></el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="初始报价" prop="bprice">
                                    <el-input v-model.number="supplierForm.bprice" placeholder="请输入商品初始报价">
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="" class="supplier-submitform">
                                    <el-button type="primary" @click="submitSupplier('supplierForm')">添加</el-button>
                                </el-form-item>
                            </el-form>

                        </el-popover>

                        <el-button type="primary" v-popover:addsupplier>添加供货商</el-button>
                    </el-form-item>

                    <el-form-item class="supplier-list" label-width="0">
                        <el-table :data="supplier" :stripe="true" class="w-100">
                            <el-table-column prop="name" label="供货商" width="218"></el-table-column>
                            <el-table-column prop="bprice" label="初始报价" width="100">
                                <template scope="scope">
                                    {{ scope.row.bprice }} 元
            					</template>
                            </el-table-column>
                            <el-table-column label="操作" width="80">
                                <template scope="scope">
                                    <el-button type="danger" size="small" @click="deleteSupplier(scope.$index)">删除</el-button>
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
// 新建商品
import api from '../../api/datamentApi.js'
import topbar from '../common/topbar.vue'
import cancel from '../common/cancel.vue'
import imageUpload from '../common/imageUpload.vue'
import '../../static/style/datament/productMgt.scss'

export default {
    data() {
        return {
            imageUrl: '',
            form: {
                title: '',
                code: '',
                first_class: '',
                second_class: '',
                thirth_class: '',
                packing_id: '',
                spec: '',
                price: '',
                time_validity: '',
                yu_validity: '',
                orgin: ''
            },
            supplierForm: {
                name: '',
                bprice: ''
            },
            supplierNum: '已选0个供货商',
            popoverVisible: false,
            purchasePrice: '',
            grossMargin: '',
            switchStatus: true,
            rules: {
                title: [{ required: true, message: '请填写类目名称', trigger: 'blur' }],
                code: [{ required: true, message: '请填写类目名称', trigger: 'blur' }],
                first_class: [{ required: true, message: '请选择商品所属大类', trigger: 'change' }],
                second_class: [{ required: true, message: '请选择商品所属中类', trigger: 'change' }],
                thirth_class: [{ required: true, message: '请选择商品所属小类', trigger: 'change' }],
                packing_id: [{ required: true, message: '请选择商品包装', trigger: 'change' }],
                spec: [{ required: true, message: '请填写商品规格', trigger: 'blur' }],
                price: [
                     { required: true, message: '请填写商品销售价格'},
                    { type: 'number', message: '商品价格必须为数字值'}
                ],
                purchasePrice: [{ type: 'number', message: '进货价格必须为数字值'}]
            },
            supplierRules: {
                name: [{ required: true, message: '请选择供货商', trigger: 'change' }],
                bprice: [
                    { required: true, message: '请填写供货商初始报价'},
                   { type: 'number', message: '价格必须为数字值'}
                ]
            },
            supplier: []
        }
    },
    created() {
        // 获取大类
        // 获取包装
        // 获取供货商
        this.$store.dispatch('resetClass')
        this.$store.dispatch('getProductBigClass')
        this.$store.dispatch('getDictionarySearchList', { code: 'packing' })
        this.$store.dispatch('getProductSupplier')
    },
    computed: {
        bigclass() { return this.$store.getters.productBigclassList },
        mediumclass() { return this.$store.getters.productMediumclassList },
        smallclass() { return this.$store.getters.productSmallclassList },
        packing() { return this.$store.getters.dictionarySearchList },
        supplierSelectList() { return this.$store.getters.productSupplier }
    },
    methods: {
        submit(formName) {
            let that = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 新建商品
                    let param = this.form
                    param.status = this.switchStatus === true ? 1 : 0
                    param.supplier = JSON.stringify(this.supplier)
                    param.img = this.imageUrl
                    console.log(param);

                    api.CreateProduct(param, function (response) {
                        if (response.status === '200') {
                            that.$message({
                                message: '新建成功！',
                                type: 'success'
                            })
                            // 创建成功，回到列表页
                            that.$router.go(-1)
                        } else {
                            that.$alert('新增商品失败，请检查字段重新提交或者刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
                        }
                    })

                } else {
                    this.$alert('必填的字段不能为空或者字段格式不符合，请检查填写后重新提交', '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        submitSupplier(formName) {
            // 添加供货商
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 新建类
                    let _item = {
                        id: this.supplierForm.name.split(',')[0],
                        name: this.supplierForm.name.split(',')[1],
                        bprice: this.supplierForm.bprice
                    }
                    // 检查是否已存在该供货商
                    if(this.supplier.find((n) => n.id === _item.id) === undefined) {
                        // 添加供货商
                        this.supplier.push(_item)
                        this.supplierNum = '已选' + this.supplier.length + '个供货商'
                        // 关闭弹出框
                        this.popoverVisible = false
                    } else {
                        this.$alert('请勿重复提交同一个供货商', '系统通知', { confirmButtonText: '确定', type: 'error' })
                    }
                } else {
                    this.$alert('必填的字段不能为空或者字段格式不符合，请检查填写后重新提交', '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        deleteSupplier(val) {
            this.supplier.splice(val,1)
            this.supplierNum = '已选' + this.supplier.length + '个供货商'
        },
        handleAvatarScucess(val) {
            // 图片上传成功钩子，接收子组件数据
            this.imageUrl = val
        },
        changePrice(val) {
            // 改变销售价
            if(this.purchasePrice !== ''){
                this.calculationGrossMargin(val, this.purchasePrice)
            }
        },
        changePurchasePrice(val) {
            // 改变进货价
            if(this.form.price !== ''){
                this.calculationGrossMargin(this.form.price, val)
            }
        },
        calculationGrossMargin(price, purchasePrice) {
            // 计算进货价
            let _grossMargin = (price - purchasePrice)/price*100
            this.grossMargin = _grossMargin.toFixed(2)
        },
        getMediumclass(val) {
            // 根据大类找中类
            this.$store.dispatch('getProductMediumClass', { id: val })
        },
        getSmallclass(val) {
            // 根据中类找小类
            this.$store.dispatch('getProductSmallClass', { id: val })
        }
    },
    components: {
        imageUpload,
        topbar,
        cancel
    }
}
</script>
