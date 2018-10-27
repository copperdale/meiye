import { getToken, getUserInfo } from '../utils/authority';

const getCreatorName = () => {
	return getUserInfo() && getUserInfo().user && getUserInfo().user.username;
}

const getBrandIdenty = () => {
	return getUserInfo() && getUserInfo().user && getUserInfo().user.storeBo && getUserInfo().user.storeBo.brandId;
}

const getShopIdenty = () => {
	return getUserInfo() && getUserInfo().user && getUserInfo().user.storeBo && getUserInfo().user.storeBo.commercialId;
}

const getCreatorId = () => {
	return getUserInfo() && getUserInfo().user && getUserInfo().user && getUserInfo().user.id;
}

export const prefix = window.PREFIX || 'http://b.zhongmeiyunfu.com/';
// export const prefix = '/';

const iframeUrlPrefix = 'http://mk.zhongmeiyunfu.com';

// 首页
export const homePage = `${iframeUrlPrefix}/internal/report/main?brandIdenty=${getBrandIdenty()}&shopIdenty=${getShopIdenty()}&creatorId=${getCreatorId()}&creatorName=${getCreatorName()}`;

// 报表
export const reportPage = `${iframeUrlPrefix}/internal/report/salesReport?brandIdenty=${getBrandIdenty()}&shopIdenty=${getShopIdenty()}&creatorId=${getCreatorId()}&creatorName=${getCreatorName()}`;

// 订单
export const getOrderPage = `${iframeUrlPrefix}/internal/trade/listData?brandIdenty=${getBrandIdenty()}&shopIdenty=${getShopIdenty()}&creatorId=${getCreatorId()}&creatorName=${getCreatorName()}`;
// 营销
export const getMarketingPage = `${iframeUrlPrefix}/internal/?brandIdenty=${getBrandIdenty()}&shopIdenty=${getShopIdenty()}&creatorId=${getCreatorId()}&creatorName=${getCreatorName()}`;

// 会员
export const vipUser = `${iframeUrlPrefix}/internal/customer?brandIdenty=${getBrandIdenty()}&shopIdenty=${getShopIdenty()}&creatorId=${getCreatorId()}&creatorName=${getCreatorName()}`;

// 设置
// 门店设置：
export const commercialSetting = `${iframeUrlPrefix}/internal/commercial/settingPage?brandIdenty=${getBrandIdenty()}&shopIdenty=${getShopIdenty()}&creatorId=${getCreatorId()}&creatorName=${getCreatorName()}`;
// 会员设置：
export const customerSetting = `${iframeUrlPrefix}/internal/customerLevelRule/gotoPage?brandIdenty=${getBrandIdenty()}&shopIdenty=${getShopIdenty()}&creatorId=${getCreatorId()}&creatorName=${getCreatorName()}`;