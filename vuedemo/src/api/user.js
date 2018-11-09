/**
 * 保存数据到服务器
 * @export
 * @param {object} data 需要提交保存的数据
 * @returns Promise
 * @Author:M.Lin zkm
 * @Date: 2018-9-20 13:43:55
 * @Last Modified time: 2018-10-11 23:15:57
 */

import http from '@/utils/request';
import utils from '@/utils/utils.js'
const apis = {
    getCode(phone, type) { //
        return http.post({ //获取手机验证码
            url: 'pc/user/getCode',
            data: {
                phone: phone,
                type: type
            }
        })
    },
    forgetPassword(phone, code, password) { // 忘记密码
        return http.post({
            url: 'pc/user/forgetPassword',
            data: {
                phone: phone,
                code: code,
                password: password,
            }
        })
    },
    updateAccount(oldPhone, oldCode, newPhone, newCode) { // 修改账号
        return http.post({
            url: 'pc/user/updateAccount',
            data: {
                oldPhone: oldPhone,
                oldCode: oldCode,
                newPhone: newPhone,
                newCode: newCode
            }
        })
    },
    updatePassword(phone, code, oldPassword, newPassword) { // 修改密码
        return http.post({
            url: 'pc/user/updatePassword',
            data: {
                phone: phone,
                code: code,
                oldPassword: oldPassword,
                newPassword: newPassword
            }
        })
    },
    register(userType, account, code, password, nickName) { // 注册
        return http.post({
            url: 'pc/user/register',
            data: {
                userType: userType,
                account: account,
                code: code,
                password: password,
                nickName: nickName
            }
        })
    },
    login(tel, pwd) { // 登录
        return http.post({
            url: 'pc/user/login',
            data: {
                userName: tel,
                password: pwd,
            }
        })
    },
    getUserInfo() { // 获取用户信息
        return http.get({
            url: 'pc/user/getUserInfo',
        })
    },
    getUserAccountBalance() { // 获取账户余额
        return http.post({
            url: 'pc/user/getUserAccountBalance',
        })
    },
    getNotReadMessageCount() { // 获取用户未读消息数量
        return http.post({
            url: 'pc/notification/getNotReadMessageCount',
        })
    },
    checkToken() { // 检查token
        return http.get({
            url: 'pc/user/checkToken',
        })
    },
    applyProjectAccount(company, address, unifiedSocialCreditCode, website, companyPhone, contact, contactTel, contactEmail, businessLicense, bankCard, bank) { // 项目方申请提交
        return http.post({
            url: 'pc/user/applyProjectAccount',
            data: {
                company: company,
                address: address,
                unifiedSocialCreditCode: unifiedSocialCreditCode,
                website: website,
                companyPhone: companyPhone,
                contact: contact,
                contactTel: contactTel,
                contactEmail: contactEmail,
                businessLicense: businessLicense,
                bankCard: bankCard,
                bank: bank
            }
        })
    },
    updateProjectAccount(userId, company, address, unifiedSocialCreditCode, website, companyPhone, contact, contactTel, contactEmail, businessLicense, bankCard, bank) { // 项目方修改资料
        return http.post({
            url: 'pc/user/updateProjectAccount',
            data: {
                userId: userId,
                company: company,
                address: address,
                unifiedSocialCreditCode: unifiedSocialCreditCode,
                website: website,
                companyPhone: companyPhone,
                contact: contact,
                contactTel: contactTel,
                contactEmail: contactEmail,
                businessLicense: businessLicense,
                bankCard: bankCard,
                bank: bank
            }
        })
    },
    applyLabelerAccount(legalName, region, email, educationDegree, hospital, address, phone, department, professionalTitle, yearsOfWorking, citizenIdCardNumber, citizenIdCardFront, citizenIdCardBack, physicianPracticeLicense, bankCard, alipay, bank) { // 项目方申请提交
        return http.post({
            url: '/pc/user/applyLabelerAccount',
            data: {
                legalName: legalName,
                region: region,
                email: email,
                educationDegree: educationDegree,
                hospital: hospital,
                address: address,
                phone: phone,
                department: department,
                professionalTitle: professionalTitle,
                yearsOfWorking: yearsOfWorking,
                citizenIdCardNumber: citizenIdCardNumber,
                citizenIdCardFront: citizenIdCardFront,
                citizenIdCardBack: citizenIdCardBack,
                physicianPracticeLicense: physicianPracticeLicense,
                bankCard: bankCard,
                alipay: alipay,
                bank: bank
            }
        })
    },

}
export default apis