/**
 * 盒子管理
 */
import api from '../../api/api'
import * as types from '../mutation'

const state = {
    provinceAdminList: {},
    cityAdminList: {},
    areaAdminList: {},
    communityAdminList: {}
}

const getters = {
    provinceAdminList: state => state.provinceAdminList,
    cityAdminList: state => state.cityAdminList,
    areaAdminList: state => state.areaAdminList,
    communityAdminList: state => state.communityAdminList,
    boxinfo: state => state.boxinfo
}

const actions = {
    /**
     * 获取省份列表
     */
    getProvinceAdminList ({ commit }, param) {
        api.apiCommunication('/City/ProvinceAdminList', param, function (response) {
            commit(types.GET_PROVINCEADMINLIST_SUCCESS, { response })
        })
    },
    /**
     * 获取城市列表
     */
    getCityAdminList ({ commit }, param) {
        api.apiCommunication('/City/CityAdminList', param, function (response) {
            commit(types.GET_CITYADMINLIST_SUCCESS, { response })
        })
    },
    /**
     * 获取区域列表
     */
    getAreaAdminList ({ commit }, param) {
        api.apiCommunication('/City/AreaAdminList', param, function (response) {
            commit(types.GET_AREAADMINLIST_SUCCESS, { response })
        })
    },
    /**
     * 获取小区列表
     */
    getCommunityAdminList ({ commit }, param) {
        api.apiCommunication('/City/CommunityAdminList', param, function (response) {
            commit(types.GET_COMMUNITYADMINLIST_SUCCESS, { response })
        })
    }
}

const mutations = {
    [types.GET_PROVINCEADMINLIST_SUCCESS] (state, { response }) {
        if(response.status === '404') {
            state.provinceAdminList = {
                list: [],
                count: 0
            }
            return false
        }
        let _data = response.data
        _data.count = Number(_data.count)
        state.provinceAdminList = _data
    },
    [types.GET_CITYADMINLIST_SUCCESS] (state, { response }) {
        if(response.status === '404') {
            state.cityAdminList = {
                list: [],
                count: 0
            }
            return false
        }
        let _data = response.data
        _data.count = Number(_data.count)
        state.cityAdminList = _data
    },
    [types.GET_AREAADMINLIST_SUCCESS] (state, { response }) {
        if(response.status === '404') {
            state.areaAdminList = {
                list: [],
                count: 0
            }
            return false
        }
        let _data = response.data
        _data.count = Number(_data.count)
        state.areaAdminList = _data
    },
    [types.GET_COMMUNITYADMINLIST_SUCCESS] (state, { response }) {
        if(response.status === '404') {
            state.communityAdminList = {
                list: [],
                count: 0
            }
            return false
        }
        let _data = response.data
        _data.count = Number(_data.count)
        state.communityAdminList = _data
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}
