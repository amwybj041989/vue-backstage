/**
 * 地图概览api
 */
import Vue from 'vue'
import { MessageBox } from 'element-ui'
import axios from 'axios'
import { API_HOST,setParams } from '../config/config'
import querystring from 'querystring'

export default {
    /**
     * 地图概览
     */
    getOverviewData(callback) {
        var params = setParams({})
        axios.post(API_HOST + '/Sales/getDashboardData', querystring.stringify(params)).then(function(response) {
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
}
