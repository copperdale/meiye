import { getToken, getUserInfo } from '../utils/authority';

const getUserName = () => {
	return getUserInfo() && getUserInfo().user.userName;
}

export const prefix = window.PREFIX || 'http://47.105.100.99:8090/';
// export const prefix = '/';

const iframeUrlPrefix = 'http://47.105.100.99';

// 首页
export const homePage = `${iframeUrlPrefix}/internal/report/main?brandIdenty=59659&shopIdenty=810180656&creatorId=1001&creatorName=${getUserName}`;

// 报表
export const reportPage = `${iframeUrlPrefix}/internal/report/salesReport？brandIdenty=59659&shopIdenty=810180656&creatorId=1001&creatorName=${getUserName}`;

// 营销
export const getMarketingPage = `${iframeUrlPrefix}/internal?brandIdenty=59659&shopIdenty=810180656&creatorId=1001&creatorName=${getUserName}`;

// 会员
export const vipUser = `${iframeUrlPrefix}/internal/customer?brandIdenty=59659&shopIdenty=810180656&creatorId=1001&creatorName=${getUserName}`;

// 设置
// 门店设置：
export const commercialSetting = `${iframeUrlPrefix}/internal/commercial/settingPage?brandIdenty=59659&shopIdenty=810180656&creatorId=1001&creatorName=${getUserName}`;
// 会员设置：
export const customerSetting = `${iframeUrlPrefix}/internal/customerLevelRule/gotoPage?brandIdenty=59659&shopIdenty=810180656&creatorId=1001&creatorName=${getUserName}`;