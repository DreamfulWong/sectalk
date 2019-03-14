const  weekArr=['天','一','二','三','四','五','六']

export function timeDesc(time) {
    let date = new Date().getTime()
    let decTime = date-time
    let decDay = Math.floor(decTime/(1000*60*60*24))

    var msgTime=new Date(time)
    if (decDay<=1){
        let h = msgTime.getHours()
        let m = msgTime.getMinutes()+''
        h=h>12?`下午${h-12}`:`上午${h}`
        return h+':'+returnDoubleDate(m)
    }else if(decDay>1&&decDay<5){
        let week = msgTime.getDay()
        return `星期${weekArr[week]}`
    }else{
        let M = returnDoubleDate(msgTime.getMonth() + 1 + '')
        let d = returnDoubleDate(msgTime.getDate() + '')
        return M + '-' + d
    }
}
function returnDoubleDate(time) {
    return ('00' + time).substr(time.length)
}