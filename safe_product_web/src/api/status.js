
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
    getAlarmStatusList(pageNum, pageSize, alarmStatus) { //告警列表
        return http.get({
            url: 'spDevice/getAlarmStatusList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                alarmStatus: alarmStatus,
            }
        })
    },
    updateAlarm(id) { //告警处理
        return http.post({
            url: 'spDevice/updateAlarm',
            data: {
                id: id,
            }
        })
    },
    getControlStatusList(pageNum, pageSize, deviceCode, deviceName, address, alarmStatus) { //布控状态列表
        return http.get({
            url: 'spDevice/getControlStatusList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                deviceCode: deviceCode,
                deviceName: deviceName,
                address: address,
                alarmStatus: alarmStatus,
            }
        })
    },
    getDeviceStatusList(pageNum, pageSize, deviceCode, deviceName, address, onlineStatus, controlStatus) { //摄像机状态列表
        return http.get({
            url: 'spDevice/getDeviceStatusList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                deviceCode: deviceCode,
                deviceName: deviceName,
                address: address,
                onlineStatus: onlineStatus,
                controlStatus: controlStatus
            }
        })
    },
}
export default apis