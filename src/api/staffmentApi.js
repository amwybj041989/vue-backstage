/**
 * 员工管理api
 */
import Vue from 'vue'
import { MessageBox } from 'element-ui'
import axios from 'axios'
import { API_HOST,setParams } from '../config/config'
import querystring from 'querystring'

export default {
    /**
     * 理货员列表
     */
    getStafftalist(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Tallyman/TallymanList', querystring.stringify(params))
            .then(function(response) {
                callback(response.data)
            })
    },
    /**
     * 新建理货员
     */
    createTallyman(param, callback) {
        var params = setParams(param)
        axios.post(API_HOST + '/Tallyman/CreateTally', querystring.stringify(params))
            .then(function(response) {
                callback(response.data)
            })
    },
}
