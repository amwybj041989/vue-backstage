<template>
    <el-button @click="cancel">取消</el-button>
</template>

<script>
// 表单取消按钮／返回上一页

export default {
    data() {
        return {

        }
    },
    methods: {
        cancel() {
            this.$router.go(-1)
        }
    }
}
</script>
