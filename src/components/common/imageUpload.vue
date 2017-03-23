<template>
<el-upload class="image-upload" :action="actionUrl" :show-file-list="false" :on-success="handleAvatarScucess" :on-error="handleAvatarError" :before-upload="beforeAvatarUpload" drag>
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</template>

<script>
// 单图片上传组件
import { API_HOST } from '../../config/config.js'
import '../../static/style/common/imageUpload.scss'

export default {
    data() {
        return {
            imageUrl: '',
            actionUrl: API_HOST + '/Upload/CreateImg'
        }
    },
    methods: {
        beforeAvatarUpload(file) {
            // 上传文件前的钩子
            console.log("正在上传");
        },
        handleAvatarScucess(res, file) {
            console.log(res);
            console.log(file);
            // 图片上传成功钩子
            this.imageUrl = res.data
        },
        handleAvatarError(err, file) {
            // 图片上传失败钩子
            that.$alert('图片上传失败，请确认图片格式大小正确后重试', '系统通知', { confirmButtonText: '确定', type: 'error' })
        }
    }
}
</script>
