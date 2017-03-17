<template>
<div id="login">
    <el-row>
        <el-col :span="8" class="login-left">
            <h1 class="login-left-up"><img src="../../static/img/login-left-up.png"></h1>
            <img src="../../static/img/login-left-down.png" class="login-left-down">
        </el-col>
        <el-col :span="16" class="login-right">
            <div class="login-right-wrap">
                <h2>USER LOGIN</h2>
                <h1>用户登录</h1>
                <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item prop="username">
                        <el-input placeholder="请输入账号" v-model="form.username" class="mt-20" size="large">
                            <template slot="prepend">账号</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="请输入密码" v-model="form.password" class="mt-20" size="large">
						    <template slot="prepend">密码</template>
						</el-input>
					</el-form-item>
					<el-button type="primary" @click="onLogin('form')" class="login-login">登录</el-button>
				</el-form>
			</div>
		</el-col>
	</el-row>
</div>
</template>

<script type="text/javascript">
/**
 * 后台登录页面
 */
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
                username: [{
                        required: true,
                        message: '请输入登录账号',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                password: [{
                        required: true,
                        message: '请输入登录密码',
                        trigger: 'blur'
                    },
                    {
                        min: 5,
                        max: 20,
                        message: '长度在 5 到 20 个字符',
                        trigger: 'blur'
                    }
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
