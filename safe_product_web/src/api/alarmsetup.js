
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
    getSet() { //获取分屏数量
        return http.get({
            url: 'spAlarmTemplate/getSet',
        })
    },
    saveSet(number,showDeviceIds) { //保存分屏设置
        return http.post({
            url: 'spAlarmTemplate/saveSet',
            data: {
                number: number,
				showDeviceIds:showDeviceIds
            }
        })
    },
	getDeviceChoseList() { //获取设备选择列表
		return http.get({
			url: 'spAlarmTemplate/getDeviceChoseList',
		})
	},
    getAlarmTemplateList(pageNum, pageSize) { //获取告警模板列表
        return http.get({
            url: 'spAlarmTemplate/getAlarmTemplateList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
            }
        })
    },
    getSenderList() { //获取发送人列表
        return http.get({
            url: 'sysUser/getSenderList',
        })
    },
    addAlarmTemplate(alarmType, alarmColor, priority, alarmText, similarInterval, difInterval, sendUser) { //新增告警模板
        return http.post({
            url: 'spAlarmTemplate/addAlarmTemplate',
            data: {
                alarmType: alarmType,
                alarmColor: alarmColor,
                priority: priority,
                alarmText: alarmText,
                similarInterval: similarInterval,
                difInterval: difInterval,
                sendUser: sendUser
            }
        })
    },
    getAlarmTemplate(id) { //获取告警模板详情
        return http.get({
            url: 'spAlarmTemplate/getAlarmTemplate',
            data: {
                id: id
            }
        })
    },
    updateAlarmTemplate(id, alarmType, alarmColor, priority, alarmText, similarInterval, difInterval, sendUser) { //编辑告警模板
        return http.post({
            url: 'spAlarmTemplate/updateAlarmTemplate',
            data: {
                id: id,
                alarmType: alarmType,
                alarmColor: alarmColor,
                priority: priority,
                alarmText: alarmText,
                similarInterval: similarInterval,
                difInterval: difInterval,
                sendUser: sendUser
            }
        })
    },
}
export default apis