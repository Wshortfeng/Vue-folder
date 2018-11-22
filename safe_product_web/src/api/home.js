/**
 * 保存数据到服务器
 * @export
 * @param {object} data 需要提交保存的数据
 * @returns Promise
 * @Author:M.Lin
 * @Date: 2018-11-19 10:03:56
 * @Last Modified time: 2018-11-19 10:03:56
 */

import http from '@/utils/request';
const apis = {
    getAlarmHistoryList() { //获取历史告警
        return http.get({
            url: 'spPage/getAlarmHistoryList',
        })
    },
    getAlarmImageList() { //获取告警图片
        return http.get({
            url: 'spPage/getAlarmImageList',
        })
    },
    getAlarmTimeList() { //获取报警发生时间段
        return http.get({
            url: 'spPage/getAlarmTimeList',
        })
    },
    getAlarmTotal() { //获取报警总数
        return http.get({
            url: 'spPage/getAlarmTotal',
        })
    },
    getAlarmTypeList() { //获取报警类型
        return http.get({
            url: 'spPage/getAlarmTypeList',
        })
    },
    getCameraList() { //获取Camera统计
        return http.get({
            url: 'spPage/getCameraList',
        })
    },
    getDistributionAreaList() { //获取分布区域
        return http.get({
            url: 'spPage/getDistributionAreaList',
        })
    },
    getRealtimeAlarmList() { //获取实时报警
        return http.get({
            url: 'spPage/getRealtimeAlarmList',
        })
    },
}
export default apis