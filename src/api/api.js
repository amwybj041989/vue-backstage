/**
 * api相关，所有接口操作都在这里完成
 */
import Vue from 'vue'
import { MessageBox } from 'element-ui'
import axios from 'axios'
import { API_HOST } from '../config/config'
import querystring from 'querystring'
// import store from '../store/store'

export default {
    token() {
        // return store.getters.getToken
        return 'test'
    },
    /**
     * 用户登录
     */
    onLogin(userinfo, callback) {
        axios.post(API_HOST + '/Login/login', querystring.stringify(userinfo))
            .then(function(response) {
                if (response.status === 200) {
                    callback(response)
                } else {
                    MessageBox.alert('登录失败，请检查用户名或密码重新填写登录或者联系管理员', '系统通知', { confirmButtonText: '确定' })
                }
            })
            .catch(function(error) {
                console.log(error)
                MessageBox.alert('登录失败，接口出错，请联系管理员', '系统通知', { confirmButtonText: '确定' })
            })
    },
    /**
     * 地图概览
     */
    getOverviewData(callback) {
        var params = {
            token: this.token()
        }
        axios.post(API_HOST + '/Sales/getDashboardData', querystring.stringify(params))
            .then(function(response) {
                if (response.status === 200) {
                    callback(response)
                } else {
                    MessageBox.alert('登录失败，请检查用户名或密码重新填写登录或者联系管理员', '系统通知', { confirmButtonText: '确定' })
                }
            })
            .catch(function(error) {
                console.log(error)
                MessageBox.alert('登录失败，接口出错，请联系管理员', '系统通知', { confirmButtonText: '确定' })
            })
    },
    /**
     * 销售数据概览
     */
    getDashboardData(callback) {
        var params = {
            token: this.token()
        }
        axios.post(API_HOST + '/Sales/SalesData', querystring.stringify(params))
            .then(function(response) {
                if (response.status === 200) {
                    callback(response)
                } else {
                    MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定' })
                }
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    /**
     * 理货员列表
     */
    getStafftalist(callback) {

    },
    /**
     * 注册用户列表
     */
    getUserList(param, callback) {
        var token = {
            token: this.token()
        }
        var params = Object.assign(token, param)
        axios.post(API_HOST + '/User/getUserList', querystring.stringify(params))
            .then(function(response) {
                if (response.status === 200) {
                    callback(response)
                } else {
                    MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定' })
                }
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    /**
     * 注册用户基础资料
     */
    getUserBasisData(param, callback) {
        var token = {
            token: this.token()
        }
        var params = Object.assign(token, param)
        axios.post(API_HOST + '/User/getUserInfo', querystring.stringify(params))
            .then(function(response) {
                if (response.status === 200) {
                    callback(response)
                } else {
                    MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定' })
                }
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    /**
     * 注册用户购买记录
     */
    getUserBuyRecord(param, callback){
        var token = {
            token: this.token()
        }
        var params = Object.assign(token, param)
        axios.post(API_HOST + '/User/getBuyRecord', querystring.stringify(params))
            .then(function(response) {
                if (response.status === 200) {
                    callback(response)
                } else {
                    MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定' })
                }
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    /**
     * 订单数据查询
     */
    getOrderList(param, callback) {
        var token = {
            token: this.token()
        }
        var params = Object.assign(token, param)
        axios.post(API_HOST + '/Order/OrderList', querystring.stringify(params))
            .then(function(response) {
                if (response.status === 200) {
                    callback(response)
                } else {
                    MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定' })
                }
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    /**
     * 销售时间段分析
     */
    getSalesTime(callback) {
        var token = {
            token: this.token()
        }
        var params = Object.assign(token, {})
        axios.post(API_HOST + '/Sales/getTimeData', querystring.stringify(params))
            .then(function(response) {
                if (response.status === 200) {
                    callback(response)
                } else {
                    MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定' })
                }
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    /**
     * 销售额/订单量曲线图
     */
    getSalesAmount(param, callback) {
        var token = {
            token: this.token()
        }
        var params = Object.assign(token, param)
        axios.post(API_HOST + '/Sales/getSalesAmount', querystring.stringify(params))
            .then(function(response) {
                if (response.status === 200) {
                    callback(response)
                } else {
                    MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定' })
                }
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    /**
     * 所有盒子列表
     */
    getBoxList(callback) {
        var params = {
            token: this.token()
        }
        axios.post(API_HOST + '/Box/BoxList', querystring.stringify(params))
            .then(function(response) {
                if (response.status === 200) {
                    callback(response)
                } else {
                    MessageBox.alert('获取数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定' })
                }
            })
            .catch(function(error) {
                console.log(error)
            })
    }
}
