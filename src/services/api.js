import { stringify } from 'qs';
import request from '../utils/request';
import { prefix } from './URL.js';

export async function fakeAccountLogin(params) {
  params = {"userName":"admin",
    "password":"123456",
    "storeId":"1",
    "verifyCode":"ab1255",
  }
  return request(prefix + 'MeiYe/login', {
    method: 'POST',
    body: params,
  });
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
