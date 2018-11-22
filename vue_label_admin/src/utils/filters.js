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
export function read(val) {
    return val.replace(/<[^>]*>/g).replace(/undefined/g, '').replace(/&lt;/g, '').replace(/\//g, '').replace(/em&gt;/g, '').replace(/u&gt;/g, '').substring(0, 80) + '...'; //去除文字的<...></...>标签
}
export function batchstate(val) { //项目方批次状态
    if (val == 1) {
        return '待分配'
    } else if (val == 2) {
        return '进行中'
    } else if (val == 3) {
        return '待验收'
    } else if (val == 4) {
        return '验收不通过'
    } else if (val == 5) {
        return '待仲裁'
    } else if (val == 6) {
        return '待结算'
    } else if (val == 7) {
        return '完成'
    } else if (val == 8) {
        return '失败'
    } else if (val == 9) {
        return '过期'
    }
}

export function labelType(val) { // 标注工具类型
    if (val == 1) {
        return '点'
    } else if (val == 2) {
        return '线'
    } else if (val == 3) {
        return '框'
    }
}

export function labelState(val) { // 我的标注工具申请状态
    if (val == '1') {
        return "待申请";
    } else if (val == '2') {
        return "审核中";
    } else if (val == '3') {
        return "已通过";
    } else if (val == '4') {
        return "未通过";
    }
}

export function problemType(val) { // 问题类型
    if (val == '1') {
        return "选择题";
    } else if (val == '2') {
        return "问答题";
    }
}
export function timeType(val) { // 时间类型
    if (val == 1) {
        return "周";
    } else if (val == 2) {
        return "天";
    } else if (val == 3) {
        return "小时";
    }
}
export function acceptanceType(val) {
    if (val == 1) {
        return '直接验收'
    } else if (val == 2) {
        return '审核验收'
    }
}
export function presentType(val) { //提现类型
    if (val == 1) {
        return '银行卡'
    } else if (val == 2) {
        return '支付宝'
    }
}
export function presentStatus(val) { //提现状态
    if (val == 1) {
        return '待审核'
    } else if (val == 2) {
        return '审核失败'
    } else if (val == 3) {
        return '提现中'
    } else if (val == 4) {
        return '提现成功'
    } else if (val == 5) {
        return '提现失败'
    }
}
export function professionalTitleType(val) { //职称
    if (val == 1) {
        return '初级职称'
    } else if (val == 2) {
        return '中级职称'
    } else if (val == 3) {
        return '副高职称'
    } else if (val == 4) {
        return '高级职称'
    } else if (val == 5) {
        return '未定职称'
    }
}
export function educationDegreeType(val) { //学历
    if (val == 1) {
        return '其他'
    } else if (val == 2) {
        return '大专'
    } else if (val == 3) {
        return '本科'
    } else if (val == 4) {
        return '硕士'
    } else if (val == 5) {
        return '博士'
    }
}
export function projectdetailbatchstate(val) { //项目方项目详情批次状态
    // 0：待分配，1：待提交，2：审核中，3：初审未通过，4：待复审，5：复审未通过，6：待验收，7：验收未通过，8:待仲裁，9：待结算，10：完成，11：失败，12：过期，13：放弃
    if (val == 0) {
        return '待分配'
    } else if (val == 1) {
        return '待提交'
    } else if (val == 2) {
        return '审核中'
    } else if (val == 3) {
        return '初审未通过'
    } else if (val == 4) {
        return '待复审'
    } else if (val == 5) {
        return '复审未通过'
    } else if (val == 6) {
        return '待验收'
    } else if (val == 7) {
        return '验收未通过'
    } else if (val == 8) {
        return '待仲裁'
    } else if (val == 9) {
        return '待结算'
    } else if (val == 10) {
        return '已完成'
    } else if (val == 11) {
        return '已失败'
    } else if (val == 12) {
        return '已过期'
    } else if (val == 13) {
        return '已放弃'
    }
}
export function batchtaskstate(val) { //疑难杂症任务状态
    if (val == -1) {
        return '待提交'
    } else if (val == 0) {
        return '待分配'
    } else if (val == 1) {
        return '待初审'
    } else if (val == 2) {
        return '初审未通过'
    } else if (val == 3) {
        return '待复审'
    } else if (val == 4) {
        return '待会诊'
    } else if (val == 5) {
        return '待验收'
    } else if (val == 6) {
        return '验收未通过'
    } else if (val == 7) {
        return '待仲裁'
    } else if (val == 8) {
        return '待结算'
    } else if (val == 9) {
        return '已完成'
    } else if (val == 10) {
        return '已过期'
    } else if (val == 11) {
        return '已放弃'
    } else if (val == 12) {
        return '已失败'
    }
}