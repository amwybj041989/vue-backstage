/**
 * 程序入口
 */

// 基本组件
import Vue from 'vue'
import router from './router/router'
import store from './store/store'
import ElementUI from 'element-ui'
import league from './components/league.vue'
import AMap from 'vue-amap'
import 'element-ui/lib/theme-default/index.css'

// 使用 ElementUI\高德地图

Vue.use(ElementUI)
Vue.use(AMap)

// 高德地图初始化配置
AMap.initAMapApiLoader({
    key: '9a33bd2b9fa27f10c3c4c9533cb8fa26',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})

// 注册导航全局钩子，检查是否已登录
router.beforeEach((to, from, next) => {
    let token = store.getters.getToken
    console.log(token)
    if (token != null && to.path == '/login') {
        // 已登录不能进入登录页
        next('/overview')
    }
    if (token === null && to.path !== '/login' && to.path !== '/404') {
        // 未登录
        next('/login')
    } else {
        next()
    }
})

// 注册全局过滤器
// Vue.filter('hahaha', function (value) {
//     return value === '2' ? '男': '女'
// })

new Vue({
    el: '#league',
    router,
    store,
    render: h => h(league)
})
