
/**
 * 保存数据到服务器
 * @export
 * @param {object} data 需要提交保存的数据
 * @returns Promise
 * @Author:M.Lin 
 * @Date: 2018-11-12 9:47:56
 * @Last Modified time: 2018-11-15 9:47:56
 */

import http from '@/utils/request';
import utils from '@/utils/utils.js'
const apis = {
    getSysLogList(pageNum, pageSize, title, type, startTime, endTime) { //系统日志
        return http.post({
            url: 'spSysLog/getSysLogList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                title: title,
                type: type,
                startTime: startTime,
                endTime: endTime
            }
        })
    },
    timeSynchro(serviceType, isSynchro, isNowSynchro) { //时间同步
        return http.post({
            url: 'server/timeSynchro',
            data: {
                serviceType: serviceType,
                isSynchro: isSynchro,
                isNowSynchro: isNowSynchro,
            }
        })
    },
    getTimeService() { //获取已选定的时间服务器
        return http.get({
            url: 'server/getTimeService',
        })
    },
    renewEmailService(smtpService, hairBox, username, password, port) { //邮箱服务器更新
        return http.post({
            url: 'server/renewEmailService',
            data: {
                smtpService: smtpService,
                hairBox: hairBox,
                username: username,
                password: password,
                port: port
            }
        })
    },
    sendEmailTest(mailHost, mailFrom, username, password, mailTo) { //邮箱测试
        return http.post({
            url: 'server/sendEmailTest',
            data: {
                mailHost: mailHost,
                mailFrom: mailFrom,
                username: username,
                password: password,
                mailTo: mailTo
            }
        })
    },
    getEmailServiceInfo() { //获取邮箱服务器详情
        return http.get({
            url: 'server/getEmailServiceInfo',
        })
    },
}
export default apis