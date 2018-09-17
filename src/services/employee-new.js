// import { stringify } from 'qs';
import request from '../utils/request';
import { prefix } from './URL.js';
import { getToken } from '../utils/authority';

// export async function newSingleProduct(id) {
//     return request(`${prefix}MeiYe/public/api/part/deleteBrandType/${id}?token=${getToken()}`, { method: 'GET' });
// }
export async function getLatestEmployee(){
  return request(`${prefix}MeiYe/public/api/role/authUser/getLatestAuthUser?token=${getToken()}`, {
    method: 'GET',
  });
};

export async function getEmployee(id){
  return request(`${prefix}MeiYe/public/api/role/authUser/load/${id}?token=${getToken()}`, {
    method: 'GET',
  });
};

export async function addNewEmployee(params) {
  return request(`${prefix}MeiYe/public/api/role/authUser/addAuthUser?token=${getToken()}`, {
      method: 'POST',
      body: params,
  });
}

export async function updateNewEmployee(params) {
  return request(`${prefix}MeiYe/public/api/role/authUser/updateAuthUser?token=${getToken()}`, {
      method: 'POST',
      body: params,
  });
}

// /public/api/part/dishShop/getDishShopPageByCriteria
