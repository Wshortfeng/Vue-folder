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
    getOrderList(cityIds, regionIds, deliverDate, statusIds, addressIsConfirmeds, orderDisplayId, deliverRestName,
        consigneeName, consigneePhone, productName, orderType, addressNumber, greengrocerName, greengrocerPhone,
        vegetableMarketName) { //查询订单列表
        return http.post({
            url: 'pc/order/getOrderList',
            data: {
                cityIds,
                regionIds,
                deliverDate,
                statusIds,
                addressIsConfirmeds,
                orderDisplayId,
                deliverRestName,
                consigneeName,
                consigneePhone,
                productName,
                orderType,
                addressNumber,
                greengrocerName,
                greengrocerPhone,
                vegetableMarketName
            }
        })
    },
    exportOrders(ids) { //导出配送单
        return http.post({
            url: 'pc/order/exportOrders',
            data: {
                ids,
            }
        })
    },
    updateOrder(id, payStatus, statusId, remark) { //修改订单
        return http.post({
            url: 'pc/order/updateOrder',
            data: {
                id,
                payStatus,
                statusId,
                remark
            }
        })
    },
    getAddressOrderCollectList(cityIds, regionIds, deliverDate, statusIds, addressIsConfirmeds, orderDisplayId,
        deliverRestName, consigneeName, consigneePhone, productName, orderType, addressNumber, greengrocerName,
        greengrocerPhone, vegetableMarketName) { //报表：门店订单汇总
        return http.post({
            url: 'pc/order/getAddressOrderCollectList',
            data: {
                cityIds,
                regionIds,
                deliverDate,
                statusIds,
                addressIsConfirmeds,
                orderDisplayId,
                deliverRestName,
                consigneeName,
                consigneePhone,
                productName,
                orderType,
                addressNumber,
                greengrocerName,
                greengrocerPhone,
                vegetableMarketName,
            }
        })
    },
    updateRefundStatus(id, refundStatus) { //修改退款状态 退款状态（0无，1待批，2驳回，3同意）
        return http.post({
            url: 'pc/order/updateRefundStatus',
            data: {
                id,
                refundStatus
            }
        })
    },
    getMonthlyTotalList(cityIds, regionIds, startTime, endTime, addressNumber, deliverRestName) { //报表：月度分析
        return http.post({
            url: 'pc/order/getMonthlyTotalList',
            data: {
                cityIds,
                regionIds,
                startTime,
                endTime,
                addressNumber,
                deliverRestName
            }
        })
    },
	exportMonthlyTotal(cityIds, regionIds, startTime, endTime, addressNumber, deliverRestName) { //报表：月度分析 导出
		return http.post({
			url: 'pc/order/exportMonthlyTotal',
			data: {
				cityIds,
				regionIds,
				startTime,
				endTime,
				addressNumber,
				deliverRestName
			}
		})
	},
}
export default apis