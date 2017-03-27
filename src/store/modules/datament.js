/**
 * 资料管理
 */
import api from '../../api/api'
import * as types from '../mutation'


const state = {
    supplierlist: {},
    supplierinfo: {
        company: '',
        business_number: '',
        general_taxpayer: '',
        name: '',
        phone: '',
        bank: '',
        bank_account: '',
        service: ''
    },
    bigclass: {},
    mediumclass: {},
    smallclass: {},
    nbigclass: [],
    nmediumclass: [],
    dictionaryTypeList: {},
    dictionaryList: {}
}

const getters = {
    supplierlist: state => state.supplierlist,
    supplierinfo: state => state.supplierinfo,
    bigclassdata: state => state.bigclass,
    mediumclassdata: state => state.mediumclass,
    smallclassdata: state => state.smallclass,
    nbigclassdata: state => state.nbigclass,
    nmediumclassdata: state => state.nmediumclass,
    dictionaryTypeList: state => state.dictionaryTypeList,
    dictionaryList: state => state.dictionaryList
}

const actions = {
    /**
     * 获取供货商列表
     */
    getSupplierList ({ commit }, param) {
        api.getSupplierList(param, function (response) {
            commit(types.GET_SUPPLIERLIST_SUCCESS, { response })
        })
    },
    /**
     * 获取某个供货商详情
     */
    getSupplierInfo ({ commit }, param) {
        api.getSupplierInfo(param, function (response) {
            commit(types.GET_SUPPLIERINFO_SUCCESS, { response })
        })
    },
    /**
     * 获取商品分类数据列表
     */
    getProductClassList ({ commit }, param) {
        api.getProductClassList(param, function (response) {
            switch (param.type) {
                case 1:
                    // 大类
                    commit(types.GET_BIGCLASS_SUCCESS, { response })
                    break;
                case 2:
                    // 中类
                    commit(types.GET_MEDIUMCLASS_SUCCESS, { response })
                    break;
                case 3:
                    // 小类
                    commit(types.GET_SMALLCLASS_SUCCESS, { response })
                    break;
                default:

            }
        })
    },
    /**
     * 获取商品全部分类
     */
    getClass ({ commit }, param) {
        var _param = (param.type === 1) ? {} : param
        api.getClass(_param, function (response) {
            if(param.type === 1){
                commit(types.GET_NBIGCLASS_SUCCESS, { response })
            } else {
                commit(types.GET_NMEDIUMCLASS_SUCCESS, { response })
            }
        })
    },
    /**
     * 获取商品字典类型列表
     */
    getDictionaryTypeList ({ commit }, param) {
        api.getDictionaryTypeList(param, function (response) {
            commit(types.GET_DICTIONARYTYPELIST_SUCCESS, { response })
        })
    },
    /**
     * 获取商品字典列表
     */
    getDictionaryList ({ commit }, param) {
        api.getDictionaryList(param, function (response) {
            commit(types.GET_DICTIONARYLIST_SUCCESS, { response })
        })
    },
}

const mutations = {
    [types.GET_SUPPLIERLIST_SUCCESS] (state, { response }) {
        let _data = response.data
        _data.count = Number(_data.count)
        state.supplierlist = _data
    },
    [types.GET_SUPPLIERINFO_SUCCESS] (state, { response }) {
        state.supplierinfo = response.data
    },
    [types.GET_BIGCLASS_SUCCESS] (state, { response }) {
        if(response.status === '404') {
            state.bigclass = {
                list: [],
                count: 0
            }
            return false
        }
        let _data = response.data
        _data.count = Number(_data.count)
        state.bigclass = _data
    },
    [types.GET_MEDIUMCLASS_SUCCESS] (state, { response }) {
        if(response.status === '404') {
            state.mediumclass = {
                list: [],
                count: 0
            }
            return false
        }
        let _data = response.data
        _data.count = Number(_data.count)
        state.mediumclass =_data
    },
    [types.GET_SMALLCLASS_SUCCESS] (state, { response }) {
        if(response.status === '404') {
            state.smallclass = {
                list: [],
                count: 0
            }
            return false
        }
        let _data = response.data
        _data.count = Number(_data.count)
        state.smallclass = _data
    },
    [types.GET_NBIGCLASS_SUCCESS] (state, { response }) {
        state.nbigclass = response.status === '404' ? [] : response.data
    },
    [types.GET_NMEDIUMCLASS_SUCCESS] (state, { response }) {
        state.nmediumclass = response.status === '404' ? [] : response.data
    },
    [types.GET_DICTIONARYTYPELIST_SUCCESS] (state, { response }) {
        if(response.status === '404') {
            state.dictionaryTypeList = {
                list: [],
                count: 0
            }
            return false
        }
        let _data = response.data
        _data.count = Number(_data.count)
        state.dictionaryTypeList = _data
    },
    [types.GET_DICTIONARYLIST_SUCCESS] (state, { response }) {
        if(response.status === '404') {
            state.dictionaryList = {
                list: [],
                count: 0
            }
            return false
        }
        let _data = response.data
        _data.count = Number(_data.count)
        state.dictionaryList = _data
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}
