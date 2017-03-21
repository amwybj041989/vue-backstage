/**
 * 销售数据概览数据管理
 */
import api from '../../api/api'
import * as types from '../mutation'

const state = {
    overview: {},
    orderList: {}
}

const getters = {
    selldata: state => state.overview,
    orderList: state => state.orderList
}

 const actions = {
    /**
     * 获取销售数据概览数据
     */
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
    },
    /**
     * 获取订单列表
     */
    getOrderList ({ commit }, param) {
        api.getOrderList(param, function (response) {
            commit(types.GET_ORDERLIST_SUCCESS, { response })
        })
    }
}

const mutations = {
    [types.GET_DASHBOARD_DATA_SUCCESS] (state, { response }) {
        let _data = response.data.data
        _data.maintainProportions = Number(_data.maintainProportions)
        state.overview = _data
    },
    [types.GET_ORDERLIST_SUCCESS] (state, { response }) {
        let _data = {}
        if(response.data.status === '404'){
            _data.order = []
            _data.count = 0
        } else {
            _data = response.data.data
            _data.count = Number(response.data.data.count)
        }
        state.orderList = _data
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}