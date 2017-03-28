/**
 * 全局数据
 */
import api from '../../api/commonApi'
import * as types from '../mutation'


const state = {
    boxList: [],
    provinceList: [],
    cityList: [],
    areaList: [],
    communityList: []
}

const getters = {
    boxList: state => state.boxList,
    provinceList: state => state.provinceList,
    cityList: state => state.cityList,
    areaList: state => state.areaList,
    communityList: state => state.communityList
}

 const actions = {
    /**
     * 获取盒子列表
     */
    getBoxList ({ commit }, param) {
        api.getBoxList(param, function (response) {
            commit(types.GET_BOXLIST_SUCCESS, { response })
        })
    },
    /**
     * 获取省份列表
     */
    getProvinceList ({ commit }, param) {
        api.getProvinceList(param, function (response) {
            commit(types.GET_PROVINCELIST_SUCCESS, { response })
        })
    },
    /**
     * 获取城市列表
     */
    getCityList ({ commit }, param) {
        api.getCityList(param, function (response) {
            commit(types.GET_CITYLIST_SUCCESS, { response })
        })
    },
    /**
     * 获取区镇列表
     */
    getAreaList ({ commit }, param) {
        api.getAreaList(param, function (response) {
            commit(types.GET_AREALIST_SUCCESS, { response })
        })
    },
    /**
     * 获取小区列表
     */
    getCommunityList ({ commit }, param) {
        api.getCommunityList(param, function (response) {
            commit(types.GET_COMMUNITYLIST_SUCCESS, { response })
        })
    },
    /**
     * 重置省份／城市／区镇／小区列表
     */
    resetUnitList ({ commit }, param) {
        commit(types.RESET_UNITLIST_SUCCESS)
    }
}

const mutations = {
    [types.GET_BOXLIST_SUCCESS] (state, { response }) {
        state.boxList = (response.status !== '404') ? response.data.list : []
    },
    [types.GET_PROVINCELIST_SUCCESS] (state, { response }) {
        state.provinceList = (response.status !== '404') ? response.data : []
    },
    [types.GET_CITYLIST_SUCCESS] (state, { response }) {
        state.cityList = (response.status !== '404') ? response.data : []
    },
    [types.GET_AREALIST_SUCCESS] (state, { response }) {
        state.areaList = (response.status !== '404') ? response.data : []
    },
    [types.GET_COMMUNITYLIST_SUCCESS] (state, { response }) {
        state.communityList = (response.status !== '404') ? response.data : []
    },
    [types.RESET_UNITLIST_SUCCESS] (state) {
        state.provinceList = []
        state.cityList = []
        state.areaList = []
        state.communityList = []
    },
}

export default{
    state,
    getters,
    actions,
    mutations
}
