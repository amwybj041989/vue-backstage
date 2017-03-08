/**
 * 程序配置项
 */

// 接口
export const API_HOST = (process.env.NODE_ENV === 'production') ?
    'http://box.bingofresh.com/api.php?s=' :
    'http://t-box.bingofresh.com/Api'
