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

export async function newSingleProduct({
  type,
  name,
  dishCode,
  marketPrice,
  unitName,
  dishQty,
  dishTypeId
}) {
    return request(`${prefix}MeiYe/public/api/part/dishShop/save?token=${getToken()}`, {
        method: 'POST',
        body: {
          type,
          name,
          dishCode,
          marketPrice,
          unitName,
          dishQty,
          dishTypeId
        }
    });
}

export async function updateSingleProduct({
  id,
  type,
  name,
  dishCode,
  marketPrice,
  unitName,
  dishQty,
  dishTypeId
}) {
    return request(`${prefix}MeiYe/public/api/part/dishShop/update?token=${getToken()}`, {
        method: 'POST',
        body: {
          id,
          type,
          name,
          dishCode,
          marketPrice,
          unitName,
          dishQty,
          dishTypeId
        }
    });
}

// /public/api/part/dishShop/getDishShopPageByCriteria
