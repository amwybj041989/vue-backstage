<template>
<div id="toolbar">
    <div class="toolbar-nav">
        <el-menu theme="dark" :default-active="type" class="el-menu-demo" mode="horizontal" :router="true" @select="handleSelect">
            <template v-for="item in headernav">
				<el-menu-item :index="item.url">{{ item.name }}</el-menu-item>
			</template>
		</el-menu>
		<div class="toolbar-features">
			<el-dropdown trigger="click" @command="handleCommand">
				<div class="el-dropdown-link">
					<i class="iconfont icon-user"></i><span class="features-name">{{ account }}</span><i class="iconfont icon-menu"></i>
				</div>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item disabled>账号管理</el-dropdown-item>
					<el-dropdown-item disabled>修改密码</el-dropdown-item>
					<el-dropdown-item command="outLogin">退出登录</el-dropdown-item>
                    <el-dropdown-item disabled>仓储系统</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</div>
</template>

<script>
// 顶部导航栏
import '../../static/style/navigation/headernav.scss'

export default {
    props: ['type'],
    data() {
        return {

        }
    },
    created() {
        // 获取数据
        this.$store.dispatch('headernavSwitch')
    },
    computed: {
        headernav() { return this.$store.getters.headernav },
        account() { return this.$store.getters.getAccount }
    },
    methods: {
        handleSelect(key, keyPath) {

        },
		handleCommand(command) {
			console.log(command);
			switch(command){
				case 'outLogin':
					// 退出登录
					this.$store.dispatch('outLogin')
					break;
			}
		}
    }
}
</script>
