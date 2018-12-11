export function zhDatetime(t) {
    if (t == "" || t == null || t == undefined) {
        return ''
    } else {
        var d = new Date();
        d.setTime(t);
        var Y = d.getFullYear();
        var M = d.getMonth() + 1;
        var D = d.getDate();
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        M = M > 9 ? M : '0' + M;
        D = D > 9 ? D : '0' + D;
        h = h > 9 ? h : '0' + h;
        m = m > 9 ? m : '0' + m;
        s = s > 9 ? s : '0' + s;
        return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
    }
}

export function userTypeFormat(val) { //管理员类型
    if (val == 1) {
        return '超级管理员'
    } else if (val == 2) {
        return '管理员'
    }
}

export function alarmStatusFormat(val) { //告警处理状态
    if (val == 1) {
        return '未处理'
    } else if (val == 2) {
        return '已处理'
    }
}

export function priorityFormat(val) { //告警优先级
    if (val == 1) {
        return '普通'
    } else if (val == 2) {
        return '中等'
    } else if (val == 3) {
        return '严重'
    }
}

export function alarmTypeFormat(val) { //告警类型
    if (val == 1) {
        return '越界检测'
    } else if (val == 2) {
        return '工服检测'
    } else if (val == 3) {
        return '防护检测'
    }
}

export function alarmcamerStatusFormat(val) { //摄像机状态
    if (val == 1) {
        return '未告警'
    } else if (val == 2) {
        return '已告警'
    }
}

export function controlStatusFormat(val) { //布控状态
    if (val == 1) {
        return '未布控'
    } else if (val == 2) {
        return '已布控'
    }
}
export function enterStatusFormat(val) { //加入状态
    if (val == 1) {
        return '已加入'
    } else if (val == 2) {
        return '未加入'
    }
}