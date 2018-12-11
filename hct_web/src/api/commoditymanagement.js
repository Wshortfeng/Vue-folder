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
    getProductCategoryList(pageNum, pageSize, categoryName, active) { //商品大类(分页)
        return http.post({
            url: 'pc/productCategory/getProductCategoryList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                categoryName: categoryName,
                active: active
            }
        })
    },
    getProductCategory(id) { //获取商品大类详情
        return http.get({
            url: 'pc/productCategory/getProductCategory',
            data: {
                id: id
            }
        })
    },
    addProductCategory(categoryName, image, active) { //新增商品大类
        return http.post({
            url: 'pc/productCategory/addProductCategory',
            data: {
                categoryName: categoryName,
                image: image,
                active: active,
            }
        })
    },
    updateProductCategory(id, categoryName, image, active) { //修改商品大类
        return http.post({
            url: 'pc/productCategory/updateProductCategory',
            data: {
                id: id,
                categoryName: categoryName,
                image: image,
                active: active,
            }
        })
    },
    getProductCategorys(id) { //获取所有商品大类
        return http.get({
            url: 'pc/productCategory/getProductCategorys',
        })
    },
    getProductSubCategoryList(pageNum, pageSize, subCategoryName, categoryId, active) { //商品子类(分页)
        return http.post({
            url: 'pc/productSubCategory/getProductSubCategoryList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                subCategoryName: subCategoryName,
                categoryId: categoryId,
                active: active
            }
        })
    },
    getProductSubCategory(id) { //获取商品子类详情
        return http.get({
            url: 'pc/productSubCategory/getProductSubCategory',
            data: {
                id: id
            }
        })
    },
    addProductSubCategory(subCategoryName, categoryId, image, active) { //新增商品子类
        return http.post({
            url: 'pc/productSubCategory/addProductSubCategory',
            data: {
                subCategoryName: subCategoryName,
                categoryId: categoryId,
                image: image,
                active: active,
            }
        })
    },
    updateProductSubCategory(id, subCategoryName, categoryId, image, active) { //修改商品子类
        return http.post({
            url: 'pc/productSubCategory/updateProductSubCategory',
            data: {
                id: id,
                subCategoryName: subCategoryName,
                categoryId: categoryId,
                image: image,
                active: active,
            }
        })
    },
    getProductSubCategorys(categoryId) { //获取所有子类
        return http.get({
            url: 'pc/productSubCategory/getProductSubCategorys',
            data: {
                categoryId: categoryId
            }
        })
    },
    getProductBuyDateList(pageNum, pageSize) { //秒杀时间(分页)
        return http.post({
            url: 'pc/productBuyDate/getProductBuyDateList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
            }
        })
    },
    addProductBuyDate(startDate, endDate, startTime, endTime) { //新增秒杀时间
        return http.post({
            url: 'pc/productBuyDate/addProductBuyDate',
            data: {
                startDate: startDate,
                endDate: endDate,
                startTime: startTime,
                endTime: endTime,
                remark: undefined
            }
        })
    },
    updateProductBuyDate(id, startDate, endDate, startTime, endTime) { //修改秒杀时间
        return http.post({
            url: 'pc/productBuyDate/updateProductBuyDate',
            data: {
                id: id,
                startDate: startDate,
                endDate: endDate,
                startTime: startTime,
                endTime: endTime,
                remark: undefined
            }
        })
    },
    getProductBuyDate(id) { //秒杀详情
        return http.get({
            url: 'pc/productBuyDate/getProductBuyDate',
            data: {
                id: id,
            }
        })
    },
    getLuSourcesByCityId(cityId) { //获取所有来源
        return http.get({
            url: 'pc/luSource/getLuSourcesByCityId',
            data: {
                cityId: cityId
            }
        })
    },
    getProductList(pageNum, pageSize, cityId, sourceId, categoryId, subCategoryId, isFullCut, histroyProductDate,
        productName, supplierMobileNumber) { //商品列表(分页)
        return http.post({
            url: 'pc/product/getProductList',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                cityId: cityId,
                sourceId: sourceId,
                categoryId: categoryId,
                subCategoryId: subCategoryId,
                isFullCut: isFullCut,
                histroyProductDate: histroyProductDate,
                productName: productName,
                supplierMobileNumber: supplierMobileNumber,
            }
        })
    },
    getPriceMeasureUnits() { //获取所有计量单位
        return http.get({
            url: 'pc/priceMeasureUnit/getPriceMeasureUnits',
        })
    },
    getPriceCalculationFormula(id, price0, date) { //价格计算公式
        return http.get({
            url: 'pc/product/getPriceCalculationFormula',
            data: {
                id,
                price0,
                date
            }
        })
    },
    updateProductInfo(id, price1, price0, promotionPrice1, isPromotion, active,
        supplierMobileNumber, date, remark) { //保存商品
        return http.post({
            url: 'pc/product/updateProductInfo',
            data: {
                id,
                price1,
                price0,
                promotionPrice1,
                isPromotion,
                active,
                supplierMobileNumber,
                date,
                remark
            }
        })
    },
    addProduct(productType, productName, productDetail, subCategoryId, cityId, sourceId, consumption, price0,
        price0MeasureUnitId, price1, price1MeasureUnitId, price2, price2MeasureUnitId, measureUnit1And2Relation, isPromotion,
        promotionPrice1, promotionPrice2, image, ordinalNumber, active, supplierMobileNumber, supplierName, supplierAddress,
        remark, stock, surplusStock, maxBuyNum) { //新增商品
        return http.post({
            url: '/pc/product/addProduct',
            data: {
                productType,
                productName,
                productDetail,
                subCategoryId,
                cityId,
                sourceId,
                consumption,
                price0,
                price0MeasureUnitId,
                price1,
                price1MeasureUnitId,
                price2,
                price2MeasureUnitId,
                measureUnit1And2Relation,
                isPromotion,
                promotionPrice1,
                promotionPrice2,
                image,
                ordinalNumber,
                active,
                supplierMobileNumber,
                supplierName,
                supplierAddress,
                remark,
                stock,
                surplusStock,
                maxBuyNum
            }
        })
    },
    getProduct(id, date) { //获取商品详情
        return http.get({
            url: 'pc/product/getProduct',
            data: {
                id,
                date
            }
        })
    },
    updateProduct(id, date, productName, productDetail, subCategoryId, cityId, sourceId, consumption, price0,
        price0MeasureUnitId, price1, price1MeasureUnitId, price2, price2MeasureUnitId, measureUnit1And2Relation, isPromotion,
        promotionPrice1, promotionPrice2, image, ordinalNumber, active, supplierMobileNumber, supplierName, supplierAddress,
        remark, stock, surplusStock, maxBuyNum) { //修改商品
        return http.post({
            url: 'pc/product/updateProduct',
            data: {
                id,
                date,
                productName,
                productDetail,
                subCategoryId,
                cityId,
                sourceId,
                consumption,
                price0,
                price0MeasureUnitId,
                price1,
                price1MeasureUnitId,
                price2,
                price2MeasureUnitId,
                measureUnit1And2Relation,
                isPromotion,
                promotionPrice1,
                promotionPrice2,
                image,
                ordinalNumber,
                active,
                supplierMobileNumber,
                supplierName,
                supplierAddress,
                remark,
                stock,
                surplusStock,
                maxBuyNum,
            }
        })
    },
}
export default apis