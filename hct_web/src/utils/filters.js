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
export function zhDatetime1(t) {
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
        return Y + "/" + M + "/" + D + "/" + h + ":" + m;
    }
}
export function zhDate(t) {
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
        return Y + "-" + M + "-" + D;
    }
}
export function zhDate1(t) {
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
        return Y + "年" + M + "月" + D + '日';
    }
}
export function isStaffFormat(val) { //是否职员状态
    if (val == 1) {
        return '是'
    } else if (val == 2) {
        return '否'
    }
}
export function isSuperuserFormat(val) { //是否超级用户
    if (val == 1) {
        return '超级用户'
    } else if (val == 2) {
        return '普通用户'
    }
}
export function isActiveFormat(val) { //是否有效
    if (val == 1) {
        return '有效'
    } else if (val == 2) {
        return '无效'
    }
}
export function is01choice(val) { //是否（1/0）
    if (val == 0) {
        return '否'
    } else if (val == 1) {
        return '是'
    }
}
export function activeStatusFormat(val) { //活跃状态
    if (val == 0) {
        return '新注册'
    } else if (val == 1) {
        return '活跃'
    } else if (val == 2) {
        return '休眠'
    } else if (val == 1) {
        return '流失'
    }
}
export function logType(val) { //日志类型
    if (val == 0) {
        return 'PC'
    } else if (val == 1) {
        return '门店'
    } else if (val == 2) {
        return '商户'
    }
}
export function consumptionFormat(val) { //用量
    if (val == 1) {
        return '大'
    } else if (val == 2) {
        return '中'
    } else if (val == 3) {
        return '小'
    }
}

export function statusIdFormat(val) { //订单状态
    if (val == 0) {
        return '待结算'
    } else if (val == 1) {
        return '已接单'
    } else if (val == 2) {
        return '已终止'
    } else if (val == 3) {
        return '已完成'
    } else {
        return val
    }
}
export function refundStatusFormat(val) { //退款状态 0无，1待批，2驳回，3同意
    if (val == 0) {
        return '无'
    } else if (val == 1) {
        return '待批'
    } else if (val == 2) {
        return '驳回'
    } else if (val == 3) {
        return '同意'
    }
}