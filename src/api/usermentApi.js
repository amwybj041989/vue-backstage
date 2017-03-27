/**
 * 用户管理api
 */
import Vue from 'vue'
import { MessageBox } from 'element-ui'
import axios from 'axios'
import { API_HOST,setParams } from '../config/config'
import querystring from 'querystring'

export default {
    /**
     * 注册用户列表
     */
    getUserList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/User/getUserList', querystring.stringify(params)).then(function(response) {
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
     * 注册用户基础资料
     */
    getUserBasisData(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/User/getUserInfo', querystring.stringify(params)).then(function(response) {
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
     * 注册用户购买记录
     */
    getUserBuyRecord(param, callback){
        var params = setParams(param)
        axios.post(API_HOST + '/User/getBuyRecord', querystring.stringify(params)).then(function(response) {
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
