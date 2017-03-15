/**
 * 注册用户详情
 */
import api from '../../api/api'
import * as types from '../mutation'


const state = {
    boxList: []
}

const getters = {
    boxList: state => state.boxList
}

 const actions = {
    /**
     * 获取盒子列表
     */
    getBoxList ({ commit }, param) {
        api.getBoxList(param, function (response) {
            commit(types.GET_BOXLIST_SUCCESS, { response })
        })
    }
}

const mutations = {
    [types.GET_BOXLIST_SUCCESS] (state, { response }) {
        state.boxList = response.data.data.list
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}
