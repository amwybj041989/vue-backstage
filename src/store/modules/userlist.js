/**
 * 注册用户列表
 */
import api from '../../api/api'
import * as types from '../mutation'


const state = {
    userlist: []
}

const getters = {
    userlist: state => state.userlist
}

 const actions = {
     /*
     * 获取注册用户列表
     * */
    getUserList ({ commit }, param) {
        api.getUserList(param, function (response) {
            commit(types.GET_USERLIST_SUCCESS, { response })
        })
    }
}

const mutations = {
    [types.GET_USERLIST_SUCCESS] (state, { response }) {
        let _data = response.data.data
        _data.count = Number(_data.count)
        state.userlist = _data
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}
