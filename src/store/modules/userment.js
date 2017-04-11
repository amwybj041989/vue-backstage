/**
 * 用户管理
 */
import api from '../../api/api'
import * as types from '../mutation'


const state = {
    userlist: [],
    userBasisData: {},
    userBuyRecord: []
}

const getters = {
    userlist: state => state.userlist,
    userBasisData: state => state.userBasisData,
    userBuyRecord: state => state.userBuyRecord
}

 const actions = {
    /**
     * 获取注册用户列表
     */
    getUserList ({ commit }, param) {
        api.apiCommunication('/User/getUserList', param, function (response) {
            commit(types.GET_USERLIST_SUCCESS, { response })
        })
    },
    /**
     * 获取注册用户基本资料
     */
    getUserBasisData ({ commit }, param) {
        api.apiCommunication('/User/getUserInfo', param, function (response) {
            commit(types.GET_USERBASIS_DATA_SUCCESS, { response })
        })
    },
    /**
     * 获取注册用户购买记录
     */
    getUserBuyRecord ({ commit }, param) {
        api.apiCommunication('/User/getBuyRecord', param, function (response) {
            commit(types.GET_USERBUYRECORD_SUCCESS, { response })
        })
    }
}

const mutations = {
    [types.GET_USERLIST_SUCCESS] (state, { response }) {
        if(response.status === '404') {
            state.userlist = {
                list: [],
                count: 0
            }
            return false
        }
        let _data = response.data
        _data.count = Number(_data.count)
        state.userlist = _data
    },
    [types.GET_USERBASIS_DATA_SUCCESS] (state, { response }) {
        state.userBasisData = response.data
    },
    [types.GET_USERBUYRECORD_SUCCESS] (state, { response }) {
        if(response.status === '404') {
            state.userBuyRecord = {
                list: [],
                count: 0
            }
            return false
        }
        let _data = response.data
        _data.count = Number(_data.count)
        state.userBuyRecord = _data
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}
