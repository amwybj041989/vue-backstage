<template>
<div class="right-content">
    <el-row :gutter="15">
        <el-col :span="6">
            <div class="el-item">{{ author }}<br><br><br><br></div>
        </el-col>
        <el-col :span="6">
            <div class="el-item">{{ author }}<br><br><br><br></div>
        </el-col>
        <el-col :span="12">
            <div class="el-item">{{ author }}<br><br><br><br></div>
        </el-col>
    </el-row>

    <el-row>
        <el-col :span="24">
            <div class="el-item">{{ author }}<br><br><br><br></div>
        </el-col>
    </el-row>

</div>
</template>

<script type="text/javascript">
import '../../static/style/datament/productMgt.scss'

export default {
    data() {
        return {
            author: "在售商品管理"
        }
    }
}
</script>
