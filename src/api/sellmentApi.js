/**
 * 销售管理api
 */
import Vue from 'vue'
import { MessageBox } from 'element-ui'
import axios from 'axios'
import { API_HOST,setParams } from '../config/config'
import querystring from 'querystring'

export default {
    /**
     * 销售数据概览
     */
    getDashboardData(callback) {
        var params = setParams({})
        axios.post(API_HOST + '/Sales/SalesData', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response.data)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 获取商品销售统计
     */
    getProductSales(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Order/ProductSalesData', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response.data)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 订单数据查询
     */
    getOrderList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Order/OrderList', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response.data)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 销售时间段分析
     */
    getSalesTime(callback) {
        var params = setParams({})
        axios.post(API_HOST + '/Sales/getTimeData', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response.data)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 销售额/订单量曲线图
     */
    getSalesAmount(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Sales/getSalesAmount', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response.data)
            } else {
                MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
}
