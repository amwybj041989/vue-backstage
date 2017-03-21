/**
 * 程序配置项
 */

import store from '../store/store'

// 接口路径配置
// export const API_HOST = (process.env.NODE_ENV === 'production') ?
//     'http://box.bingofresh.com/api.php?s=' :
//     'http://t-box.bingofresh.com/Api'

export const API_HOST = (window.location.host === 'admin.binguobox.com') ?
    'http://bapi.binguobox.com/Api' :
    'http://t-box.bingofresh.com/Api'

// 配置接口token
export const TOKEN = store.getters.getToken

// 接口参数配置
export function setParams(param) {
    var token = {
        token: TOKEN
        // token: 'test'
    }
    var params = Object.assign(token, param)
    return params
}
