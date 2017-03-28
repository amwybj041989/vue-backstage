/**
 * 公共api
 */
import Vue from 'vue'
import { MessageBox } from 'element-ui'
import axios from 'axios'
import { API_HOST,setParams } from '../config/config'
import querystring from 'querystring'

export default {
    /**
     * 用户登录
     */
    onLogin(userinfo, callback) {
        axios.post(API_HOST + '/Login/login', querystring.stringify(userinfo)).then(function(response) {
            if (response.status === 200) {
                callback(response.data)
            } else {
                MessageBox.alert('登录失败，请检查用户名或密码重新填写登录或者联系管理员', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
            MessageBox.alert('登录失败，接口出错，请联系管理员', '系统通知', { confirmButtonText: '确定', type: 'error' })
        })
    },
    /**
     * 所有盒子列表
     */
    getBoxList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Box/BoxList', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response.data)
            } else {
                MessageBox.alert('获取盒子数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 所有省份列表
     */
    getProvinceList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/City/ProvinceList', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response.data)
            } else {
                MessageBox.alert('获取省份数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 根据省份返回城市列表
     */
    getCityList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/City/CityList', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response.data)
            } else {
                MessageBox.alert('获取城市数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 根据城市返回区镇列表
     */
    getAreaList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/City/AreaList', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response.data)
            } else {
                MessageBox.alert('获取区镇数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 根据区镇返回小区列表
     */
    getCommunityList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/City/CommunityList', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response.data)
            } else {
                MessageBox.alert('获取小区数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    }
}
