/**
 * 配置一些公用的方法
 */

export function getNowTime(format) {
    var d = new Date(),
        year = d.getFullYear(),
        month = d.getMonth() + 1,
        date = d.getDate(),
        hours = d.getHours(),
        minutes = d.getMinutes(),
        seconds = d.getSeconds()
    if(format !== 'yyyy-mm-dd hh-mm-ss'){
        return year + '-' + month + '-' + date
    }
    return year + '-' + month + '-' + date + ' ' + hours + '-' + minutes + '-' + seconds
}

// 为Date原型添加时间格式化方法
Date.prototype.format = function(fmt) {
     var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    }
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length))
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)))
        }
     }
    return fmt
}
