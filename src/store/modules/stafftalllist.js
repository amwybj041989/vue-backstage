/**
 * 理货员管理页数据管理
 */
import api from '../../api/api'
import * as types from '../mutation'


const state = {
    stafftalist: []
}

const getters = {
    stafftalist: state => state.stafftalist
}

 const actions = {
     /*
     * 获取理货员列表
     **/
    getStafftalist ({ commit }) {
        api.getStafftalist(function (response) {
            
        })
    }

}

const mutations = {
    [types.GET_STAFFTALIST_SUCCESS] (state, { response }) {

    }
}

export default{
    state,
    getters,
    actions,
    mutations
}
