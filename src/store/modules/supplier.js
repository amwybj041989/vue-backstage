/**
 * 供货商管理
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
    }
}

const getters = {
    supplierlist: state => state.supplierlist,
    supplierinfo: state => state.supplierinfo
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
}

const mutations = {
    [types.GET_SUPPLIERLIST_SUCCESS] (state, { response }) {
        let _data = response.data.data
        _data.count = Number(_data.count)
        state.supplierlist = _data
    },
    [types.GET_SUPPLIERINFO_SUCCESS] (state, { response }) {
        state.supplierinfo = response.data.data
    },
}

export default{
    state,
    getters,
    actions,
    mutations
}
