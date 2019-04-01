// import { stringify } from 'qs';
import request from '../utils/request';
import { prefix } from './URL';
import { getToken } from '../utils/authority';

export async function saveOrUpdateSupplier(params) {
    return request(`${prefix}MeiYe/public/api/supplier/saveOrUpdateSupplier?token=${getToken()}`, {
      method: 'POST',
      body: {
        ...params
      },
    });
}

export async function deleteSupplier({ id }) {
  return request(`${prefix}MeiYe/public/api/supplier/deleteSupplier?supplierId=${id}&token=${getToken()}`, { method: 'GET' });
}

