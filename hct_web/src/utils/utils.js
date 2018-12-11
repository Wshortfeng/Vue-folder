'use strict';
import md5 from 'js-md5'
import Vue from 'vue'
// import VueLocalStorage from 'vue-localstorage'
export default {
    isSearch: function(str) { //只能输入数字字母和中文
        return /^[A-Za-z0-9\u4e00-\u9fa5\.]+$/.test(str)
    },
    isString: function(str, num) {
        if (typeof str !== 'string') return false
        if (str.trim().length < 6 || str.trim().length > 20) return false
        if (str.trim().length != num && num) {
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
    isIp: function(ip) { //ip
        var reg =
            /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/
        return reg.test(ip);
    },
    isPort: function(port) { //端口号
        var reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
        return reg.test(port);
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
        return /^(?!([a-zA-Z]+|[a-z\d]+|[a-z~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+|[A-Z\d]+|[A-Z~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+|[\d~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+)$)[a-zA-Z\d~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+$/
            .test(str);
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
    zhDatetime1: function(t) { //格式化时间
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
            return h + ":" + m + ":" + s;
        }
    },
    zhDate: function(t) { //格式化时间
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
    },
    zhDate2: function(t) { //格式化时间
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
            return Y + '' + M + '' + D;
        }
    },
    filteremoji: function(str) { //过滤表情
        var emojiReg =
            /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
        var msgHdnValue = str;
        //替换emoji表情，以及末尾空格，和&nbsp;空格
        msgHdnValue = msgHdnValue.replace(emojiReg, "").replace(/(\s*$)/g, "").trim();
        return msgHdnValue
    },
    filteremojifun(self, e, name, ruleForm) { //限制输入表情
        if (ruleForm) {
            self[ruleForm][name] = this.filteremoji(e);
        } else {
            self[name] = this.filteremoji(e);
        }
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
        return sessionStorage.getItem('TOKEN')
    },
    setToken(token) {
        this.setSession('TOKEN', token)
    },
    removeToken() {
        return sessionStorage.removeItem('TOKEN')
    },
    //设置cookie
    setCookie(c_name, c_pwd, exdays, c_remeberFlag) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "USERNAME" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "PASSWORD" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "REMEBERFLAG" + "=" + c_remeberFlag + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie(self) {
        if (document.cookie.length > 0) {
            var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
            // console.log(arr)
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('='); //再次切割
                //判断查找相对应的值
                // console.log(arr2)
                if (arr2[0] == 'USERNAME') {
                    self.ruleForm.username = arr2[1]; //保存到保存数据的地方
                } else if (arr2[0] == 'PASSWORD') {
                    self.ruleForm.password = arr2[1];
                } else if (arr2[0] == 'REMEBERFLAG') {
                    self.rememberpassword = arr2[1] == 'true'
                }
            }
        }
    },
    //清除cookie
    clearCookie() {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
    calcuMD5(pwd) {
        // pwd = pwd.toUpperCase();//小写转大写
        pwd = md5(md5(pwd) + 'bby');
        return pwd;
    },
}