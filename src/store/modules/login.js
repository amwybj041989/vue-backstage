/**
 * 账号登录相关
 */
import api from '../../api/commonApi'
import * as types from '../mutation'
import cookie from 'react-cookie'

const state = {
    token: cookie.load('bingoboxtoken') || null,
    account: cookie.load('bingoboxaccount') || null
}

const getters = {
    getToken: state => state.token,
    getAccount: state => state.account
}

const actions = {
    /**
     * 用户登录
     */
    onLogin({ commit }, param) {
        api.onLogin(param, function(response) {
            //设置cookie过期时间
            var exp = new Date()
            exp.setTime(exp.getTime() + 7 * 24 * 60 * 60 * 1000)
            // 保存token
            cookie.save('bingoboxtoken', response.data, {
                path: '/',
                expires: exp
            })
            cookie.save('bingoboxaccount', param.username, {
                path: '/',
                expires: exp
            })
            // 获取成功，提交mutations处理数据
            commit(types.USER_LOGIN_SUCCESS, { response }, param.username)
            // 重定向销售概览页
            window.location.pathname = '/sellment'
        })
    },
    /**
     * 退出登录
     */
    outLogin({ commit }) {
        // 移除cookie
        cookie.remove('bingoboxtoken', { path: '/' })
        cookie.remove('bingoboxaccount', { path: '/' })
        // 清除tonken
        commit(types.USER_OUT_LOGIN)
        // 重定向登录页
        window.location.pathname = '/login'
    }
}

const mutations = {
    [types.USER_LOGIN_SUCCESS](state, { response }, account) {
        state.token = response.data
        state.account = account
    },
    [types.USER_OUT_LOGIN](state) {
        state.token = null
        state.account = null
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
