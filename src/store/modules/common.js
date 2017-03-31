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
    communityList: [],
    productBigclassList: [],
    productMediumclassList: [],
    productSmallclassList: [],
    dictionarySearchList: [],
    productSupplier: []
}

const getters = {
    boxList: state => state.boxList,
    provinceList: state => state.provinceList,
    cityList: state => state.cityList,
    areaList: state => state.areaList,
    communityList: state => state.communityList,
    productBigclassList: state => state.productBigclassList,
    productMediumclassList: state => state.productMediumclassList,
    productSmallclassList: state => state.productSmallclassList,
    dictionarySearchList: state => state.dictionarySearchList,
    productSupplier: state => state.productSupplier
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
    resetUnitList ({ commit }) {
        commit(types.RESET_UNITLIST_SUCCESS)
    },
    /**
     * 获取大类列表
     */
    getProductBigClass ({ commit }) {
        api.getProductBigClass(function (response) {
            commit(types.GET_PRODUCTBIGCLASSLIST_SUCCESS, { response })
        })
    },
    /**
     * 获取中类列表
     */
    getProductMediumClass ({ commit }, param) {
        api.getProductMediumClass(param, function (response) {
            commit(types.GET_PRODUCTMEDIUMCLASSLIST_SUCCESS, { response })
        })
    },
    /**
     * 获取小类列表
     */
    getProductSmallClass ({ commit }, param) {
        api.getProductSmallClass(param, function (response) {
            commit(types.GET_PRODUCTSMALLCLASSLIST_SUCCESS, { response })
        })
    },
    /**
     * 获取字典列表
     */
    getDictionarySearchList ({ commit }, param) {
        api.getDictionarySearchList(param, function (response) {
            commit(types.GET_DICTIONARYSEARCHLIST_SUCCESS, { response })
        })
    },
    /**
     * 重置省份／城市／区镇／小区列表
     */
    resetClass ({ commit }) {
        commit(types.RESET_CLASS_SUCCESS)
    },
    /**
     * 获取供应商列表
     */
    getProductSupplier ({ commit }) {
        api.getProductSupplier(function (response) {
            commit(types.GET_PRODUCTSUPPLIER_SUCCESS, { response })
        })
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
    [types.GET_PRODUCTBIGCLASSLIST_SUCCESS] (state, { response }) {
        state.productBigclassList = (response.status !== '404') ? response.data : []
    },
    [types.GET_PRODUCTMEDIUMCLASSLIST_SUCCESS] (state, { response }) {
        state.productMediumclassList = (response.status !== '404') ? response.data : []
    },
    [types.GET_PRODUCTSMALLCLASSLIST_SUCCESS] (state, { response }) {
        state.productSmallclassList = (response.status !== '404') ? response.data : []
    },
    [types.GET_DICTIONARYSEARCHLIST_SUCCESS] (state, { response }) {
        state.dictionarySearchList = (response.status !== '404') ? response.data : []
    },
    [types.RESET_CLASS_SUCCESS] (state) {
        state.productBigclassList = []
        state.productMediumclassList = []
        state.productSmallclassList = []
    },
    [types.GET_PRODUCTSUPPLIER_SUCCESS] (state, { response }) {
        state.productSupplier = (response.status !== '404') ? response.data : []
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}
