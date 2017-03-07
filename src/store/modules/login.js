/**
 * 地图概览页
 */
import api from '../../api/api'
import * as types from '../mutation'
import cookie from 'react-cookie'

const state = {
    token: cookie.load('bingoboxtoken') || null
}

const getters = {
    getToken: state => state.token
}

const actions = {
    /**
     * 用户登录
     */
    onLogin({ commit }, userinfo) {
        api.onLogin(userinfo, function(response) {
            //设置cookie过期时间
            var exp = new Date()
            exp.setTime(exp.getTime() + 7 * 24 * 60 * 60 * 1000)
            // 保存token
            cookie.save('bingoboxtoken', response.data.data, {
                path: '/',
                expires: exp
            })
            // 获取成功，提交mutations处理数据
            commit(types.USER_LOGIN_SUCCESS, { response })
            // 重定向地图概览页
            window.location.pathname = '/overview'
        })
    },
    /**
     * 退出登录
     */
    outLogin({ commit }) {
        // 移除cookie
        cookie.remove('bingoboxtoken', { path: '/' })
        // 清除tonken
        commit(types.USER_OUT_LOGIN)
        // 重定向登录页
        window.location.pathname = '/login'
    }
}

const mutations = {
    [types.USER_LOGIN_SUCCESS](state, { response }) {
        state.token = response.data.data
    },
    [types.USER_OUT_LOGIN](state) {
        state.token = null
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
