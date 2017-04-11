/**
 * 盒子管理api
 */
import Vue from 'vue'
import { MessageBox } from 'element-ui'
import axios from 'axios'
import { API_HOST,setParams } from '../config/config'
import querystring from 'querystring'

export default {
    /**
     * 新建盒子
     */
    createBox(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Box/CreateBox', querystring.stringify(params))
            .then(function(response) {
                callback(response.data)
            })
    },
    /**
     * 盒子详情
     */
    getBoxInfo(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Box/getBoxInfo', querystring.stringify(params))
            .then(function(response) {
                callback(response.data)
            })
    },
    /**
     * 更新盒子数据
     */
    updateBox(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Box/UpdateBox', querystring.stringify(params))
            .then(function(response) {
                callback(response.data)
            })
    },
    /**
     * 省份管理列表
     */
    getProvinceAdminList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/City/ProvinceAdminList', querystring.stringify(params))
            .then(function(response) {
                callback(response.data)
            })
    },
    /**
     * 新建省份
     */
    createProvince(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/City/CreateProvince', querystring.stringify(params))
            .then(function(response) {
                callback(response.data)
            })
    },
    /**
     * 城市管理列表
     */
    getCityAdminList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/City/CityAdminList', querystring.stringify(params))
            .then(function(response) {
                callback(response.data)
            })
    },
    /**
     * 新建城市
     */
    createCity(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/City/CreateCity', querystring.stringify(params))
            .then(function(response) {
                callback(response.data)
            })
    },
    /**
     * 区镇管理列表
     */
    getAreaAdminList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/City/AreaAdminList', querystring.stringify(params))
            .then(function(response) {
                callback(response.data)
            })
    },
    /**
     * 新建区镇
     */
    createArea(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/City/CreateArea', querystring.stringify(params))
            .then(function(response) {
                callback(response.data)
            })
    },
    /**
     * 小区管理列表
     */
    getCommunityAdminList(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/City/CommunityAdminList', querystring.stringify(params))
            .then(function(response) {
                callback(response.data)
            })
    },
    /**
     * 小区管理列表
     */
    createCommunity(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/City/CreateCommunity', querystring.stringify(params))
            .then(function(response) {
                callback(response.data)
            })
    },
}
