<template>
    <div>
        <el-upload class="image-upload" :action="actionUrl" :show-file-list="false" :on-success="handleAvatarScucess" :on-error="handleAvatarError" :before-upload="beforeAvatarUpload" drag>
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <a :href="imageUrl" class="f-color f-link" target="_blank" v-if="imageUrl">点我查看大图</a>
    </div>
</template>

<script>
// 单图片上传组件
import '../../static/style/common/imageUpload.scss'

export default {
    props: ['imageUrl'],
    data() {
        return {
            actionUrl: 'http://img.bingofresh.com/admin/Upload.php'
        }
    },
    methods: {
        beforeAvatarUpload(file) {
            // 上传文件前的钩子
            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
              this.$message.error('上传的图片只能是 JPG/PNG 格式!')
            }
            if (!isLt2M) {
              this.$message.error('上传的图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        handleAvatarScucess(response, file) {
            // 图片上传成功钩子，使用自定义事件给父组件传数据
            if(response.status === 404) {
                this.$alert(response.data, '系统通知', { confirmButtonText: '确定', type: 'error' })
                return false
            }
            this.$emit('increment',response.data)
        },
        handleAvatarError(err, file) {
            // 图片上传失败钩子
            this.$alert('图片上传失败，请确认图片格式大小正确后重试', '系统通知', { confirmButtonText: '确定', type: 'error' })
        }
    }
}
</script>
