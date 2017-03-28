/**
 * 理货员管理页数据管理
 */
import api from '../../api/staffmentApi'
import * as types from '../mutation'


const state = {
    stafftalist: []
}

const getters = {
    stafftalist: state => state.stafftalist
}

const actions = {
    /**
     * 获取理货员列表
     */
    getStafftalist ({ commit }, param) {
        api.getStafftalist(param, function (response) {
            commit(types.GET_STAFFTALIST_SUCCESS, { response })
        })
    }

}

const mutations = {
    [types.GET_STAFFTALIST_SUCCESS] (state, { response }) {
        state.stafftalist = response.data
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}
