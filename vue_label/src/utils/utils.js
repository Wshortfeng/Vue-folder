'use strict';
import md5 from 'js-md5'
// import VueLocalStorage from 'vue-localstorage'
export default {
    isSearch: function(str) { //只能输入数字字母和中文
        return /^[A-Za-z0-9\u4e00-\u9fa5\.]+$/.test(str)
    },
    isString: function(str, num) {
        if (typeof str !== 'string') return false
        if ($.trim(str).length < 6 || $.trim(str).length > 20) return false
        if ($.trim(str).length != num && num) {
            return false
        }
        return true
    },
    isInt: function(num) {
        // if (typeof num !== 'number') return false
        return /^[0-9]+$/.test(num)
    },
    isInteger: function(str) { //整数
        return /^-?\d+$/.test(str)
    },
    isPositiveInteger: function(str) { //正整数
        return /^[1-9]\d*$/.test(str)
    },
    credit: function(num) { // 社会统一信用证号
        return /[0-9A-Z]{18}/.test(num)
    },
    phonecode: function(num) { // 电话
        return /^0\d{2,3}-?\d{7,8}$/.test(num)
    },
    telphone: function(num) { // 手机号
        return /^(1)[0-9]{10}$/.test(num)
    },
    isEmail: function(str) { // 邮箱
        // return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(str)
        // return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(str)
        return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str)
    },
    bankaccount: function(num) { // 银行账号
        return /^([1-9]{1})(\d{14}|\d{18})$/.test(num)
    },
    maxLength: function(str, len = 140) {
        if (!this.isString(str)) return false
        if (str.length >= ~~len) return false
        return true
    },
    minLength: function(str, len = 1) {
        if (!this.isString(str)) return false
        if (str.length < ~~len) return false
        return true
    },
    isMoney: function(num) { // 人民币
        if (!num) return false
        return /^[0-9]+(.[0-9]{1,2})?$/.test(num)
    },
    isZeroOrNum: function(num) {
        if (!num) return false
        return /^(0|[1-9][0-9]*)$/.test(num)
    },
    isFloatNum: function(num) {
        if (!num) return false
        return /^(-?\d+)(\.\d+)?$/.test(num)
    },
    isID: function(num) { // 身份证
        if (!num) return false
        return /^\d{15}|\d{18}$/.test(num)
    },
    isAccount: function(account) {
        if (!account) return false
        return /^[a-zA-Z][a-zA-Z0-9_]{5,13}$/.test(account)
    },
    isName: function(str) {
        if (!str) return false
        return /^[\u4e00-\u9fa5]{0,}$/.test(str)
    },
    isAlipay: function(str) { //支付宝
        if (/^(1)[0-9]{10}$/.test(str)) { //手机号
            return true;
        } else if (/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str)) { //邮箱
            return true;
        } else {
            return false;
        }
    },
    isPsd(str) {
        if (!str) return false
        return /^(?!([a-zA-Z]+|[a-z\d]+|[a-z~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+|[A-Z\d]+|[A-Z~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+|[\d~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+)$)[a-zA-Z\d~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+$/.test(str);
    },

    zhDatetime: function(t) { //格式化时间
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
    },
    filteremoji: function(str) { //过滤表情
        var emojiReg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
        var msgHdnValue = str;
        //替换emoji表情，以及末尾空格，和&nbsp;空格
        msgHdnValue = msgHdnValue.replace(emojiReg, "").replace(/(\s*$)/g, "").trim();
        return msgHdnValue
    },
    setStorage(name, value) {
        return localStorage.setItem(name, value)
    },
    getStorage(name) {
        return localStorage.getItem(name)
    },
    delStorage(name) {
        return localStorage.removeItem(name)
    },
    delAllStorage() {
        return localStorage.clear()
    },
    setSession(name, value) { //暂时存储
        return sessionStorage.setItem(name, value)
    },
    getSession(name) { //暂时存储
        return sessionStorage.getItem(name)
    },
    delSession(name) { //暂时存储
        return sessionStorage.removeItem(name)
    },
    delAllSession() {
        return sessionStorage.clear()
    },
    getToken() {
        return localStorage.getItem('TokenKey')
    },
    setToken(token) {
        this.setStorage('TokenKey', token)
    },
    removeToken() {
        return localStorage.removeItem('TokenKey')
    },
    calcuMD5(pwd) {
        pwd = pwd.toUpperCase();
        pwd = md5(md5(pwd + 'bby'));
        return pwd;
    },
}