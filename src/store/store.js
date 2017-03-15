/**
 * 全局状态管理
 */
import Vue from 'vue'
import Vuex from 'vuex'
import navmenu from './modules/navmenu'
import overview from './modules/overview'
import selloverview from './modules/selloverview'
import orderstatistics from './modules/orderStatistics'
import userlist from './modules/userlist'
import userdata from './modules/userdata'
import productclass from './modules/productClass'
import common from './modules/common'
import login from './modules/login'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        navmenu,
        overview,
        selloverview,
        orderstatistics,
        userlist,
        userdata,
        productclass,
        login,
        common
    },
    strict: process.env.NODE_ENV !== 'production', //是否开启严格模式
})

export default store
