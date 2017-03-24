/**
 * 全局数据
 */
import api from '../../api/api'
import * as types from '../mutation'


const state = {
    boxList: [],
    provinceList: [],
    cityList: [],
    areaList: []
}

const getters = {
    boxList: state => state.boxList,
    provinceList: state => state.provinceList,
    cityList: state => state.cityList,
    areaList: state => state.areaList
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
    getProvinceList ({ commit }) {
        api.getProvinceList(function (response) {
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
     * 获取区域列表
     */
    getCreaList ({ commit }, param) {
        api.getCreaList(param, function (response) {
            commit(types.GET_AREALIST_SUCCESS, { response })
        })
    }
}

const mutations = {
    [types.GET_BOXLIST_SUCCESS] (state, { response }) {
        state.boxList = (response.data.status !== '404') ? response.data.data.list : []
    },
    [types.GET_PROVINCELIST_SUCCESS] (state, { response }) {
        state.provinceList = (response.data.status !== '404') ? response.data.data : []
    },
    [types.GET_CITYLIST_SUCCESS] (state, { response }) {
        state.cityList = (response.data.status !== '404') ? response.data.data : []
    },
    [types.GET_AREALIST_SUCCESS] (state, { response }) {
        state.areaList = (response.data.status !== '404') ? response.data.data : []
    },
}

export default{
    state,
    getters,
    actions,
    mutations
}
