/**
 * 注册用户详情
 */
import api from '../../api/api'
import * as types from '../mutation'


const state = {
    orderList: {}
}

const getters = {
    orderList: state => state.orderList
}

 const actions = {
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
