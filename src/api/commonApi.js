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
    onLogin(param, callback) {
        axios.post(API_HOST + '/Login/login', querystring.stringify(param)).then(function(response) {
            if (response.status === 200 && response.data.status !== '-1') {
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
    },
    /**
     * 获取商品大类列表
     */
    getProductBigClass(callback) {
        var params = setParams({})
        axios.post(API_HOST + '/Material/ProductBigClass', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response.data)
            } else {
                MessageBox.alert('获取商品大类数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 根据商品大类id获取商品中类
     */
    getProductMediumClass(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/ProductMediumClass', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response.data)
            } else {
                MessageBox.alert('获取商品中类数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 根据商品中类id获取商品小类
     */
    getProductSmallClass(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/ProductSmallClass', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response.data)
            } else {
                MessageBox.alert('获取商品小类数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    },
    /**
     * 根据字典类型编码获取字典列表
     */
    getDictionarySearchList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Material/DictionarySearchList', querystring.stringify(params)).then(function(response) {
            if (response.status === 200) {
                callback(response.data)
            } else {
                MessageBox.alert('获取字典数据失败，请刷新页面或者重新登录', '系统通知', { confirmButtonText: '确定', type: 'error' })
            }
        }).catch(function(error) {
            console.log(error)
        })
    }
}
