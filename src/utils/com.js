export function getNowTime(format) {
    var d = new Date(),
        year = d.getFullYear(),
        month = d.getMonth() + 1,
        date = d.getDate(),
        hours = d.getHours(),
        minutes = d.getMinutes(),
        seconds = d.getSeconds()
    if(format !== 'yyyy-mm-dd h-m-s'){
        return year + '-' + month + '-' + date
    }
    return year + '-' + month + '-' + date + ' ' + hours + '-' + minutes + '-' + seconds
}
