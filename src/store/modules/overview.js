/**
 * 地图概览页数据管理
 */
import api from '../../api/api'
import * as types from '../mutation'


const state = {
    overview: {
        allOrdersTotal: 0,
        todayOrdersTotal: 0,
        dataList: [
            { todayname: '总共在售sku', todayvalue: 0, icon: 'src/static/img/list-sku.png' },
            { todayname: '当天营业收入', todayvalue: 0, historyname: '近7天营业收入', historyvalue: 0, icon: 'src/static/img/list-ys.png' },
            { todayname: '当天平均客单价', todayvalue: 0, historyname: '历史平均客单价', historyvalue: 0, icon: 'src/static/img/list-kdj.png' },
            { todayname: '当天平均每单sku', todayvalue: 0, historyname: '历史平均每单sku', historyvalue: 0, icon: 'src/static/img/list-mdsku.png' },
            { todayname: '当天顾客流失率', todayvalue: '0%', historyname: '历史顾客流失率', historyvalue: '0%', icon: 'src/static/img/list-lsl.png'}
        ]
    }
}

const getters = {
    overviewdata: state => state.overview
}

 const actions = {
     /*
     * 获取地图概览数据
     * */
    getOverviewData ({ commit }) {
        // loading 开始
        // commit(types.COM_LOADING_STATUS,true)
        api.getOverviewData(function (response) {
            // console.log(response);
            // 获取成功，提交mutations处理数据
            commit(types.GET_OVERVIEW_DATA_SUCCESS, { response })
            // loading 结束
            // commit(types.COMM_LOADING_STATUS,false)
        })
    }
}

const mutations = {
    [types.GET_OVERVIEW_DATA_SUCCESS] (state, { response }) {
        let _data = response.data.data
        state.overview.allOrdersTotal = _data.all_orders_total
        state.overview.todayOrdersTotal = _data.today_orders_total
        state.overview.dataList[0].todayvalue = _data.all_sku_total
        state.overview.dataList[1].todayvalue = _data.today_gross_income
        state.overview.dataList[1].historyvalue = _data.last_seven_sales
        state.overview.dataList[2].todayvalue = _data.today_avg_price
        state.overview.dataList[2].historyvalue = _data.history_avg_price
        state.overview.dataList[3].todayvalue = _data.today_avg_sku
        state.overview.dataList[3].historyvalue = _data.history_avg_sku
        state.overview.dataList[4].todayvalue = _data.today_conversion_rate + '%'
        state.overview.dataList[4].historyvalue = _data.history_conversion_rate + '%'
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}
