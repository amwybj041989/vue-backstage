/**
 * 地图概览页数据管理
 */
import api from '../../api/api'
import * as types from '../mutation'


const state = {
    overview: {}
}

const getters = {
    overviewdata: state => state.overview
}

const actions = {
    /**
     * 获取地图概览数据
     */
    getOverviewData ({ commit }) {
        // loading 开始
        // commit(types.COM_LOADING_STATUS,true)
        api.getOverviewData(function (response) {
            // console.log(response);
            // 获取成功，提交mutations处理数据
            commit(types.GET_OVERVIEW_DATA_SUCCESS, { response })
            // loading 结束
            // commit(types.COMM_LOADING_STATUS,false)
        })
    }
}

const mutations = {
    [types.GET_OVERVIEW_DATA_SUCCESS] (state, { response }) {
        state.overview = response.data
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}
