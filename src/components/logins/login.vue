<template>
<div id="login">
    <div class="login-header">
        <div class="header-logo">
            <h1>
                <a href="">
                    <img src="../../static/img/logo.png" alt="缤果盒子logo">
                </a>
            </h1>
            <div class="header-link"><a href="" target="_blank">仓储系统</a><span>|</span><a href="http://www.binguohezi.com/" target="_blank">官方网站</a></div>
        </div>
    </div>
    <div class="login-content">
        <div class="content-wrap">
            <div class="content-title">
                <div class="title-wrap">
                    <img src="../../static/img/login-tips.png" alt="加盟商管理系统">
                </div>
            </div>
            <div class="content-form">
                <div class="form-wrap">
                    <h2>USER LOGIN</h2>
                    <h1>用户登录</h1>
                    <el-form :model="form" :rules="rules" ref="form">
                        <el-form-item prop="username">
                            <el-input placeholder="请输入账号" v-model="form.username" class="mt-20" size="large">
                                <template slot="prepend">
                                    <i class="iconfont icon-account fs-1s2em"></i>
                                </template>
    						</el-input>
    					</el-form-item>
    					<el-form-item prop="password">
    						<el-input type="password" placeholder="请输入密码" v-model="form.password" class="mt-20" size="large">
    						    <template slot="prepend">
                                    <i class="iconfont icon-Password fs-1s2em"></i>
                                </template>
    						</el-input>
    					</el-form-item>
    					<el-button type="primary" @click="onLogin('form')" class="content-login">登录</el-button>
    				</el-form>
                </div>
            </div>
        </div>
    </div>
    <div class="login-footer">
        <p>中山市宾哥网络科技有限公司</p>
        <p>粤ICP备16097902号-1</p>
    </div>
</div>
</template>

<script type="text/javascript">
// 后台登录页面
import '../../static/style/logins/login.scss'

// 可以用滑块组件做右滑登录认证
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入登录账号', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        onLogin(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 执行登录
                    this.$store.dispatch('onLogin', this.form)
                } else {
                    this.$alert('用户名或密码不能为空', '系统通知', { confirmButtonText: '确定' })
                }
            });
        }
    }
}
</script>
