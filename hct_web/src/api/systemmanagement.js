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
    getFeedbackList(pageNum, pageSize, content) { //用户反馈
        return http.post({
            url: 'pc/feedback/getFeedbackList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                content: content,
            }
        })
    },
    getCitys() { //获取城市列表
        return http.get({
            url: 'pc/city/getCitys',
        })
    },
    getUAnnouncementList(pageNum, pageSize, content) { //用户反馈
        return http.post({
            url: 'pc/announcement/getAnnouncementList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                content: content,
            }
        })
    },
    addAnnouncement(cityId, content) { //新增公告
        return http.post({
            url: 'pc/announcement/addAnnouncement',
            data: {
                cityId: cityId,
                content: content,
            }
        })
    },
    getAnnouncement(id) { //公告详情
        return http.get({
            url: 'pc/announcement/getAnnouncement',
            data: {
                id: id,
            }
        })
    },
    updateAnnouncement(id, cityId, content) { //修改公告
        return http.post({
            url: 'pc/announcement/updateAnnouncement',
            data: {
                id: id,
                cityId: cityId,
                content: content,
            }
        })
    },
    getGreengrocerList(pageNum, pageSize, keyword, cityId, beginDate, endDate) { //商户列表（分页）
        return http.post({
            url: 'pc/greengrocer/getGreengrocerList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                keyword: keyword,
                cityId: cityId,
                beginDate: beginDate,
                endDate: endDate
            }
        })
    },
    addGreengrocer(realName, phone, vegetableMarketName, vegetableMarketAddress, cityId, regionId, boothNumber, password, remark) { //新增商户
        return http.post({
            url: 'pc/greengrocer/addGreengrocer',
            data: {
                realName: realName,
                phone: phone,
                vegetableMarketName: vegetableMarketName,
                vegetableMarketAddress: vegetableMarketAddress,
                cityId: cityId,
                regionId: regionId,
                boothNumber: boothNumber,
                password: password,
                remark: remark
            }
        })
    },
    getGreengrocer(id) { //获取商户信息
        return http.get({
            url: 'pc/greengrocer/getGreengrocer',
            data: {
                id: id,
            }
        })
    },
// 	getGreengrocers(cityIds,regionIds) { //根据城市ids和区域ids查询所有商户
// 		return http.get({
// 			url: 'pc/greengrocer/getGreengrocers',
// 			data: {
// 				cityIds: cityIds,
// 				regionIds:regionIds
// 			}
// 		})
// 	},
    getLuRegionsByCityId(id) { //根据城市id查询所有区域
        return http.get({
            url: 'pc/luRegion/getLuRegionsByCityId',
            data: {
                id: id
            }
        })
    },
	getLuRegionsByCityIds(ids) { //根据城市ids查询所有区域
		return http.get({
			url: 'pc/luRegion/getLuRegionsByCityIds',
			data: {
				ids: ids
			}
		})
	},
    updateGreengrocer(id, realName, phone, vegetableMarketName, vegetableMarketAddress, cityId, regionId, boothNumber, password, remark) { //修改商户
        return http.post({
            url: 'pc/greengrocer/updateGreengrocer',
            data: {
                id: id,
                realName: realName,
                phone: phone,
                vegetableMarketName: vegetableMarketName,
                vegetableMarketAddress: vegetableMarketAddress,
                cityId: cityId,
                regionId: regionId,
                boothNumber: boothNumber,
                password: password,
                remark: remark
            }
        })
    },
    getGreengrocers(id) { //获取所有商户(根据城市id)
        return http.get({
            url: 'pc/greengrocer/getGreengrocers',
			data:{
				id
			}
        })
    },
    getAddressList(pageNum, pageSize, keyword, cityId, isConfirmed, isBlackList) { //门店列表（分页）
        return http.post({
            url: 'pc/address/getAddressList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                keyword: keyword,
                cityId: cityId,
                isConfirmed: isConfirmed,
                isBlackList: isBlackList
            }
        })
    },
    updateAddress(id, isConfirmed, isBlackList, greengrocerId,cityId) { //修改门店信息
        return http.post({
            url: 'pc/address/updateAddress',
            data: {
                id: id,
                isConfirmed: isConfirmed,
                isBlackList: isBlackList,
                greengrocerId: greengrocerId,
				cityId:cityId
            }
        })
    },
    getAddress(id) { //获取门店信息
        return http.get({
            url: 'pc/address/getAddress',
            data: {
                id: id
            }
        })
    },
    getLogList(pageNum, pageSize, title, type, startDate, endDate) { //日志
        return http.post({
            url: 'pc/log/getLogList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                title: title,
                type: type,
                startDate: startDate,
                endDate: endDate
            }
        })
    },
}
export default apis