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
    detDvrList(pageNum, pageSize, deviceIp) { //查询DVR列表
        return http.get({
            url: 'sysUser/detDvrList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                deviceIp: deviceIp,
            }
        })
    },
    addDvr(deviceIp, port, userName, password) { //新增DVR
        return http.post({
            url: 'sysUser/addDvr',
            data: {
                deviceIp: deviceIp,
                port: port,
                userName: userName,
                password: password
            }
        })
    },
    updateDvr(id, deviceIp, port, userName, password) { //编辑DVR
        return http.post({
            url: 'sysUser/updateDvr',
            data: {
                id: id,
                deviceIp: deviceIp,
                port: port,
                userName: userName,
                password: password
            }
        })
    },
    getDvrInfo(id) { //查询DVR详情
        return http.get({
            url: 'sysUser/getDvrInfo',
            data: {
                id: id,
            }
        })
    },
    detAllDvrIp() { //获取DVR摄像机ip
        return http.get({
            url: 'sysUser/detAllDvrIp',
        })
    },
    deviceList(pageNum, pageSize, deviceIp, deviceCode, type, state) { //获取摄像机列表
        return http.get({
            url: 'sysUser/deviceList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                deviceIp: deviceIp,
                deviceCode: deviceCode,
                type: type, //1模拟摄像机 2.数码摄像机
                state: state //摄像机状态（1.未加入 2.已加入）
            }
        })
    },
    deviceJoinOrRemove(deviceId) { //加入或移除摄像机
        return http.post({
            url: 'sysUser/deviceJoinOrRemove',
            data: {
                deviceId: deviceId,
            }
        })
    },
    removeDvCamera(deviceId) { //删除摄像机
        return http.post({
            url: 'sysUser/removeDvCamera',
            data: {
                deviceId: deviceId,
                _method: 'delete'
            }
        })
    },
    getAddChannel() { //获取数码摄像机频道
        return http.get({
            url: 'sysUser/getAddChannel',
        })
    },
    getDVCameraInfo(id) { //获取数码摄像机详情
        return http.post({
            url: 'sysUser/getDVCameraInfo',
            data: {
                id: id,
            }
        })
    },
    addDVCamera(channel, deviceName, address, protocolType, deviceIp, username, password, cotrolType, controlPort, videoPort, videoParam, url1, url2) { //添加数码摄像机
        return http.post({
            url: 'sysUser/addDVCamera',
            data: {
                channel: channel,
                deviceName: deviceName,
                address: address,
                protocolType: protocolType,
                deviceIp: deviceIp,
                username: username,
                password: password,
                cotrolType: cotrolType,
                controlPort: controlPort,
                videoPort: videoPort,
                videoParam: videoParam,
                url1: url1,
                url2: url2,
            }
        })
    },
    updateDvCamera(deviceId, channel, deviceName, address, protocolType, deviceIp, username, password, cotrolType, controlPort, videoParam, videoPort, url1, url2) { //编辑数码摄像机
        return http.post({
            url: 'sysUser/updateDvCamera',
            data: {
                deviceId: deviceId,
                channel: channel,
                deviceName: deviceName,
                address: address,
                protocolType: protocolType,
                deviceIp: deviceIp,
                username: username,
                password: password,
                cotrolType: cotrolType,
                controlPort: controlPort,
                videoParam: videoParam,
                videoPort: videoPort,
                url1: url1,
                url2: url2,
            }
        })
    },
}
export default apis