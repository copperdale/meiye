// import { stringify } from 'qs';
import request from '../utils/request';
import { prefix } from './URL.js';
import { getToken } from '../utils/authority';

// export async function newSingleProduct(id) {
//     return request(`${prefix}MeiYe/public/api/part/deleteBrandType/${id}?token=${getToken()}`, { method: 'GET' });
// }
export async function getProductById(id){
  return request(`${prefix}MeiYe/public/api/part/dishShop/load/${id}?token=${getToken()}`);
};

export async function getSetById(id) {
  return request(`${prefix}MeiYe/public/api/part/dishShop/group/${id}/find?token=${getToken()}`);
}

export async function newSingleProduct(param) {
  return request(`${prefix}MeiYe/public/api/part/dishShop/save?token=${getToken()}`, {
      method: 'POST',
      body: param
  });
}

export async function newSetProduct(param) {
  return request(`${prefix}MeiYe/public/api/part/dishShop/group/save?token=${getToken()}`, {
      method: 'POST',
      body: param
  });
}

export async function updateSingleProduct(param) {
  return request(`${prefix}MeiYe/public/api/part/dishShop/update?token=${getToken()}`, {
      method: 'POST',
      body: param
  });
}

export async function updateSetProduct(param) {
  return request(`${prefix}MeiYe/public/api/part/dishShop/group/update?token=${getToken()}`, {
      method: 'POST',
      body: param
  });
}

export async function querySingleProductItems() {
  return request(`${prefix}MeiYe/public/api/part/dishShop/getDishShopPageByCriteria?token=${getToken()}`, {
      method: 'POST',
      body: {
          'pageNum':0,
          'pageSize':1000000,
          'type': '0'
      }
  });
}

// /public/api/part/dishShop/getDishShopPageByCriteria
