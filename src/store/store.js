/**
 * 全局状态管理
 */
import Vue from 'vue'
import Vuex from 'vuex'
import navmenu from './modules/navmenu'
import overview from './modules/overview'
import sellment from './modules/sellment'
import userment from './modules/userment'
import boxment from './modules/boxment'
import staffment from './modules/staffment'
import datament from './modules/datament'
import common from './modules/common'
import login from './modules/login'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        overview,
        sellment,
        userment,
        boxment,
        staffment,
        datament,
        login,
        navmenu,
        common
    },
    strict: process.env.NODE_ENV !== 'production', //是否开启严格模式
})

export default store
