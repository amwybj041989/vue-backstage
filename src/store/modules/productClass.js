/**
 * 地图概览页数据管理
 */
import api from '../../api/api'
import * as types from '../mutation'


const state = {
    bigclass: {},
    mediumclass: {},
    smallclass: {}
}

const getters = {
    bigclassdata: state => state.bigclass,
    mediumclassdata: state => state.mediumclass,
    smallclassdata: state => state.smallclass
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
    getClass () {

    }
}

const mutations = {
    [types.GET_BIGCLASS_SUCCESS] (state, { response }) {
        let _data = response.data.data
        _data.count = Number(_data.count)
        state.bigclass = _data
    },
    [types.GET_MEDIUMCLASS_SUCCESS] (state, { response }) {
        let _data = response.data.data
        _data.count = Number(_data.count)
        state.mediumclass =_data
    },
    [types.GET_SMALLCLASS_SUCCESS] (state, { response }) {
        let _data = response.data.data
        _data.count = Number(_data.count)
        state.smallclass = _data
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}
