/**
 * 商品分类管理
 */
import api from '../../api/api'
import * as types from '../mutation'


const state = {
    bigclass: {},
    mediumclass: {},
    smallclass: {},
    nbigclass: [],
    nmediumclass: []
}

const getters = {
    bigclassdata: state => state.bigclass,
    mediumclassdata: state => state.mediumclass,
    smallclassdata: state => state.smallclass,
    nbigclassdata: state => state.nbigclass,
    nmediumclassdata: state => state.nmediumclass
}

const actions = {
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
    }
}

const mutations = {
    [types.GET_BIGCLASS_SUCCESS] (state, { response }) {
        if(response.data.status === '404') {
            state.bigclass = {}
            return false
        }
        let _data = response.data.data
        _data.count = Number(_data.count)
        state.bigclass = _data
    },
    [types.GET_MEDIUMCLASS_SUCCESS] (state, { response }) {
        if(response.data.status === '404') {
            state.mediumclass = {}
            return false
        }
        let _data = response.data.data
        _data.count = Number(_data.count)
        state.mediumclass =_data
    },
    [types.GET_SMALLCLASS_SUCCESS] (state, { response }) {
        if(response.data.status === '404') {
            state.smallclass = {}
            return false
        }
        let _data = response.data.data
        _data.count = Number(_data.count)
        state.smallclass = _data
    },
    [types.GET_NBIGCLASS_SUCCESS] (state, { response }) {
        state.nbigclass = response.data.status === '404' ? [] : response.data.data
    },
    [types.GET_NMEDIUMCLASS_SUCCESS] (state, { response }) {
        state.nmediumclass = response.data.status === '404' ? [] : response.data.data
    },
}

export default{
    state,
    getters,
    actions,
    mutations
}
