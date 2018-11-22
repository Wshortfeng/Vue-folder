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
    getControlList(pageNum, pageSize, deviceCode, deviceName, address, controlStatus) { //查询布控列表列表
        return http.get({
            url: 'spControl/getControlList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                deviceCode: deviceCode,
                deviceName: deviceName,
                address: address,
                controlStatus: controlStatus
            }
        })
    },
    deleteControl(deviceId) { //移除
        return http.post({
            url: 'spControl/deleteControl',
            data: {
                deviceId: deviceId,
                _method: 'delete'
            }
        })
    },
    getAlarmTemplateByType(type) { //获取告警模板列表
        return http.get({
            url: 'spAlarmTemplate/getAlarmTemplateByType',
            data: {
                type: type,
            }
        })
    },
    addControl(deviceId, controlObject, controlStartDate, controlEndDate, controlType, alarmTempId) { //添加布控
        return http.post({
            url: 'spControl/addControl',
            data: {
                deviceId: deviceId,
                controlObject: controlObject,
                controlStartDate: controlStartDate,
                controlEndDate: controlEndDate,
                controlType: controlType,
                alarmTempId: alarmTempId
            }
        })
    },

}
export default apis