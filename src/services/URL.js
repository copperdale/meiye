import store from '../index';
import { getToken, getUserInfo } from '../utils/authority';

const checkLoginStatus = () => {
	if (getToken() && getToken().length <= 20) {
		store.dispatch({
			type: 'login/logout',
		});
	}
}

const getCreatorName = () => {
	checkLoginStatus();
	return getUserInfo() && getUserInfo().user && getUserInfo().user.username;
}

const getBrandIdenty = () => {
	checkLoginStatus();
	return getUserInfo() && getUserInfo().user && getUserInfo().user.storeBo && getUserInfo().user.storeBo.brandId;
}

const getShopIdenty = () => {
	checkLoginStatus();
	return getUserInfo() && getUserInfo().user && getUserInfo().user.storeBo && getUserInfo().user.storeBo.commercialId;
}

const getCreatorId = () => {
	checkLoginStatus();
	return getUserInfo() && getUserInfo().user && getUserInfo().user && getUserInfo().user.id;
}

export const prefix = window.PREFIX || 'http://b.zhongmeiyunfu.com/';
// export const prefix = '/';

const iframeUrlPrefix = 'http://mk.zhongmeiyunfu.com/marketing';

// 首页
export const homePage = () => {
	return `${iframeUrlPrefix}/internal/report/main?brandIdenty=${getBrandIdenty()}&shopIdenty=${getShopIdenty()}&creatorId=${getCreatorId()}&creatorName=${getCreatorName()}`;
}

// 报表
export const reportPage = () => {
	return `${iframeUrlPrefix}/internal/report/salesReport?brandIdenty=${getBrandIdenty()}&shopIdenty=${getShopIdenty()}&creatorId=${getCreatorId()}&creatorName=${getCreatorName()}`;
}

// 订单
export const getOrderPage = () => {
	return `${iframeUrlPrefix}/internal/trade/listData?brandIdenty=${getBrandIdenty()}&shopIdenty=${getShopIdenty()}&creatorId=${getCreatorId()}&creatorName=${getCreatorName()}`;
}

// 营销
export const getMarketingPage = () => {
	return `${iframeUrlPrefix}/internal/home?brandIdenty=${getBrandIdenty()}&shopIdenty=${getShopIdenty()}&creatorId=${getCreatorId()}&creatorName=${getCreatorName()}`;
}

// 会员
export const vipUser = () => {
	return `${iframeUrlPrefix}/internal/customer?brandIdenty=${getBrandIdenty()}&shopIdenty=${getShopIdenty()}&creatorId=${getCreatorId()}&creatorName=${getCreatorName()}`;
}

// 设置
// 门店设置：
export const commercialSetting = () => {
	return `${iframeUrlPrefix}/internal/commercial/settingPage?brandIdenty=${getBrandIdenty()}&shopIdenty=${getShopIdenty()}&creatorId=${getCreatorId()}&creatorName=${getCreatorName()}`;
}

// 会员设置：
export const customerSetting = () => {
	return `${iframeUrlPrefix}/internal/customerLevelRule/gotoPage?brandIdenty=${getBrandIdenty()}&shopIdenty=${getShopIdenty()}&creatorId=${getCreatorId()}&creatorName=${getCreatorName()}`;
}

// 人效核算：
export const commissionCalculate = () => {
	return `${iframeUrlPrefix}/internal/salary/userSalary?brandIdenty=${getBrandIdenty()}&shopIdenty=${getShopIdenty()}&creatorId=${getCreatorId()}&creatorName=${getCreatorName()}`;
}

export const getProductURL = () => {
	return `${iframeUrlPrefix}/internal/dishShopType/dishShopMainPage?brandIdenty=${getBrandIdenty()}&shopIdenty=${getShopIdenty()}&creatorId=${getCreatorId()}&creatorName=${getCreatorName()}`;
}
