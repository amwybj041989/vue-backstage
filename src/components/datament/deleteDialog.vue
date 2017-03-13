<template>

    <el-dialog title="提示" v-model="dialogVisible" size="tiny" top="38%" :close-on-click-modal="false" :close-on-press-escape="false">
        <span><i class="el-icon-warning dialog-icon"></i>操作失败！该类目下已关联多个商品，删除将导致商品不可用。</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="sureemit">确 定</el-button>
        </span>
    </el-dialog>

</template>

<script>
// 商品中类管理
import '../../static/style/datament/productClass.scss'

export default {
    props: ['visible'],
    data() {
        return {

        }
    },
    computed: {
        dialogVisible() { return this.visible }
    },
    methods: {
        sureemit() {
            this.$emit('visible')
        }
    }
}
</script>
