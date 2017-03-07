/**
 * 销售数据概览数据管理
 */
import api from '../../api/api'
import * as types from '../mutation'

const state = {
    overview: {}
}

const getters = {
    selldata: state => state.overview
}

 const actions = {
     /*
     * 获取销售数据概览
     * */
    getDashboardData ({ commit }) {
        // loading 开始
        // commit(types.COM_LOADING_STATUS,true)
        api.getDashboardData(function (response) {
            // console.log(response);
            // 获取成功，提交mutations处理数据
            commit(types.GET_DASHBOARD_DATA_SUCCESS, { response })
            // loading 结束
            // commit(types.COMM_LOADING_STATUS,false)
        })
    }
}

const mutations = {
    [types.GET_DASHBOARD_DATA_SUCCESS] (state, { response }) {
        let _data = response.data.data
        _data.maintainProportions = Number(_data.maintainProportions)
        state.overview = _data
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}
