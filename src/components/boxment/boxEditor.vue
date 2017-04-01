<template>
<div id="boxeditor" class="right-content">
    <topbar bone="缤果盒子列表" btwo="编辑盒子"></topbar>
    <el-row class="mb-10">
        <el-col :span="24" class="el-item editor-form display-table">
            <div class="form-left">
                <el-form ref="form" :rules="rules" label-position="right" :model="form" label-width="150px">
                    <el-form-item label="唯一编号" prop="box_no">
                        <el-input v-model="form.box_no" placeholder="请填写盒子box_no，如“A1001”"></el-input>
                    </el-form-item>
                    <el-form-item label="门禁编号">
                        <el-input v-model="form.access_number" placeholder="请填写盒子门禁编号"></el-input>
                    </el-form-item>
                    <el-form-item label="隶属省份" prop="province">
                        <el-select v-model="form.province" placeholder="请选择盒子所在省份" @change="getCity">
                            <el-option :label="item.code + ' ' + item.name" :value="item.code + ',' + item.id + ',' + item.name" :key="item.id" v-for="item in provincelist">
                                {{ item.code }} {{ item.name }}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="隶属城市" prop="city">
                        <el-select v-model="form.city" placeholder="请选择盒子所在城市" no-data-text="请先选择省份" @change="getArea">
                            <el-option :label="item.code + ' ' + item.name" :value="item.code + ',' + item.id + ',' + item.name" :key="item.id" v-for="item in citylist">
                                {{ item.code }} {{ item.name }}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="隶属区镇" prop="area">
                        <el-select v-model="form.area" placeholder="请选择盒子所在区镇" no-data-text="请先选择城市" @change="getCommunity">
                            <el-option :label="item.code + ' ' + item.name" :value="item.code + ',' + item.id + ',' + item.name" :key="item.id" v-for="item in areaList">
                                {{ item.code }} {{ item.name }}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="隶属小区" prop="community">
                        <el-select v-model="form.community" placeholder="请选择盒子所在小区" no-data-text="请先选择区镇">
                            <el-option :label="item.name" :value="item.name" :key="item.id" v-for="item in communityList">
                                {{ item.name }}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="详细地址">
                        <el-input v-model="form.addr" placeholder="请填写小区所在详细地址"></el-input>
                    </el-form-item>
                    <el-form-item label="盒子名称" prop="display_name">
                        <el-input v-model="form.display_name" placeholder="请填写盒子名称，如“缤果盒子A1001”"></el-input>
                    </el-form-item>
                    <el-form-item label="用户实名认证">
                        <el-switch on-text="开" off-text="关" v-model="realnameStatus"></el-switch>
                    </el-form-item>
                    <el-form-item label="人脸识别功能">
                        <el-switch on-text="开" off-text="关" v-model="humanfaceStatus"></el-switch>
                    </el-form-item>
                    <el-form-item label="业主认证功能">
                        <el-switch on-text="开" off-text="关" v-model="ownerStatue"></el-switch>
                    </el-form-item>
                    <el-form-item label="启动开关">
                        <el-switch on-text="开" off-text="关" v-model="switchStatus"></el-switch>
                    </el-form-item>
                </el-form>
            </div>
            <div class="form-right">
                <a href="http://lbs.amap.com/api/javascript-api/example/map/click-to-get-lnglat" target="_blank" class="editor-coordinate mb-15">手动选择坐标</a>
                <el-input v-model="form.apoints" placeholder="填入坐标"></el-input>
                <p><br>隶属省份城市区镇小区暂时无法获取<br>等待后续开发，请重新选择</p>
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
// 新建盒子
import api from '../../api/boxmentApi.js'
import topbar from '../common/topbar.vue'
import cancel from '../common/cancel.vue'
import '../../static/style/boxment/boxEditor.scss'

export default {
    data() {
        return {
            id: this.$route.params.id,
            form: {
                box_no: '',
                access_number: '',
                province: '',
                city: '',
                area: '',
                community: '',
                addr: '',
                display_name: '',
                apoints: ''
            },
            realnameStatus: false,
            humanfaceStatus: false,
            ownerStatue: false,
            switchStatus: true,
            rules: {
                box_no: [{ required: true, message: '请输入盒子编号', trigger: 'blur' }],
                province: [{ required: true, message: '请选择盒子隶属省份', trigger: 'change' }],
                city: [{ required: true, message: '请选择盒子隶属城市', trigger: 'change' }],
                area: [{ required: true, message: '请选择盒子隶属区镇', trigger: 'change' }],
                display_name: [{ required: true, message: '请填写盒子名', trigger: 'blur' }]
            }
        }
    },
    created() {
        this.$store.dispatch('resetUnitList')
        this.$store.dispatch('getBoxList', {})
        this.$store.dispatch('getProvinceList', {})
        this.getBoxInfo()
    },
    computed: {
        provincelist() { return this.$store.getters.provinceList },
        citylist() { return this.$store.getters.cityList },
        areaList() { return this.$store.getters.areaList },
        communityList() { return this.$store.getters.communityList },
        boxinfo() { return this.$store.getters.boxinfo }
    },
    methods: {
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let param = {
                        id: this.id,
                        box_no: this.form.box_no,
                        access_number: this.form.access_number,
                        province: this.form.province.split(',')[2],
                        province_code: this.form.province.split(',')[0],
                        city: this.form.city.split(',')[2],
                        city_code: this.form.city.split(',')[0],
                        area: this.form.area.split(',')[2],
                        area_code: this.form.area.split(',')[0],
                        community: this.form.community,
                        addr: this.form.addr,
                        display_name: this.form.display_name,
                        apoints: this.form.apoints,
                        status: this.switchStatus ? 1 : 0,
                        realname: this.realnameStatus ? 1 : 0,
                        face: this.humanfaceStatus ? 1 : 0,
                        owner: this.ownerStatue ? 1 : 0
                    }
                    let that = this
                    api.updateBox(param, function (response) {
                        if (response.status === '200') {
                            that.$message({
                                message: '修改成功！',
                                type: 'success'
                            })
                            // 修改成功，回到列表页
                            that.$router.go(-1)
                        } else {
                            that.$alert('修改失败，未知错误', '系统通知', { confirmButtonText: '确定', type: 'error' })
                        }
                    })

                } else {
                    this.$alert('必填的字段不能为空，请检查填写后重新提交', '系统通知', { confirmButtonText: '确定' })
                }
            })
        },
        getBoxInfo() {
            // 获取盒子详情
            let that = this
            api.getBoxInfo({ id: that.id }, function (response) {
                if (response.status === '200') {
                    let _data = response.data
                    that.form.box_no = _data.box_no
                    that.form.access_number = _data.access_number
                    that.form.addr = _data.addr
                    that.form.display_name = _data.display_name
                    that.realnameStatus = _data.realname === '1' ? true : false
                    that.humanfaceStatus = _data.face === '1' ? true : false
                    that.ownerStatue = _data.owner === '1' ? true : false
                    that.switchStatus = _data.status === '1' ? true : false
                } else {
                    that.$alert('获取数据失败，服务器出错', '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        getCity(val) {
            // 根据省份找城市
            this.$store.dispatch('getCityList', { id: val.split(',')[1] })
        },
        getArea(val) {
            // 根据城市找区镇
            this.$store.dispatch('getAreaList', { id: val.split(',')[1] })
        },
        getCommunity(val) {
            // 根据区镇找小区
            this.$store.dispatch('getCommunityList', { id: val.split(',')[1] })
        }
    },
    components: {
        topbar,
        cancel
    }
}
</script>
