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
import axios from 'axios'
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
    if (token != null && to.path == '/login') {
        // 已登录不能进入登录页
        next('/sellment')
    }
    if (token === null && to.path !== '/login' && to.path !== '/404') {
        // 未登录
        next('/login')
    } else {
        next()
    }
})

// 注册全局模版数据过滤器
Vue.filter('enableStatus', function (value) {
    return value === '1' ? '启用中' : '已禁用'
})

// 添加接口回调拦截器，处理token过期
axios.interceptors.response.use(function (response) {
    if(response.data.status === '-1') {
        // token过期，执行退出登录
        store.dispatch('outLogin')
    } else {
        return response;
    }
}, function (error) {
    return Promise.reject(error);
})

new Vue({
    el: '#league',
    router,
    store,
    render: h => h(league)
})
