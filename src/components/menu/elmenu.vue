<template>
<div id="elmenu">
    <el-menu :default-active="defaultElmenu" :unique-opened="true" class="el-menu-vertical-demo" theme="dark" :router="true">
        <template v-for="item in elmenu">
			<template v-if="item.child">
				<el-submenu :index="item.url">
					<template slot="title"><i class="el-icon-menu"></i>{{ item.name }}</template>
					<el-menu-item-group v-for="childitem in item.child">
						<el-menu-item :index="childitem.url">{{ childitem.name }}</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</template>
			<template v-else>
				<el-menu-item :index="item.url">{{ item.name }}</el-menu-item>
			</template>
		</template>
	</el-menu>
</div>
</template>

<script>
// 销售管理左侧导航

import '../../static/style/menu/elmenu.scss'

export default {
    props: ['type'],
    data () {
        return {
            defaultElmenu: this.$route.path
        }
    },
    created () {
        // 获取数据
        this.$store.dispatch('elmenuSwitch', this.type)
    },
    computed: {
        elmenu() { return this.$store.getters.elmenu }
    },
	methods: {

	}

}
</script>
