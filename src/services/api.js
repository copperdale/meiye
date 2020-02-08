import { stringify } from 'qs';
import fetch from 'dva/fetch';
import request from '../utils/request';
import { prefix } from './URL.js';


export async function login(params) {
  // eslint-disable-next-line
  // params = {"userName":"admin",
  //   "password":"123456",
  //   "storeId":"1",
  //   "verifyCode":"ab1255",
  // }
  // console.log(params);
  return request(`${prefix}MeiYe/login?${stringify(params)}`, {
    method: 'POST',
    body: {},
  });
}

export async function loginBrand(params) {
  return fetch(`http://mk.ziranyukj.com/marketing/internal/login`, {
    method: 'POST',
    'mode': 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({ account: params.brandAccount, password: params.brandPassword, loginType: 3, orgId: params.orgId }),
  }).then((response) => {
    return response.json ? response.json() : response;
  })
}

export async function getVerifyCode() {
  // eslint-disable-next-line
  return request(`${prefix}MeiYe/verifyCode/get?timestamp=${(new Date()).getTime()}`);
}

export async function fakeRegister(params) {
  
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
