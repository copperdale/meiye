// import { stringify } from 'qs';
import request from '../utils/request';
import { prefix } from './URL';
import { getToken } from '../utils/authority';

export async function getSupplierList({ supplierName = '', contactName = '', contactPhone = '' }) {
    return request(`${prefix}MeiYe/public/api/supplier/getSuppliers?contactPhone=${contactPhone}&contactName=${contactName}&supplierName=${supplierName}&pageNo=-1&pageSize=10&token=${getToken()}`, { method: 'GET' });
}

export async function deleteSupplier({ id }) {
  return request(`${prefix}MeiYe/public/api/supplier/deleteSupplier?supplierId=${id}&token=${getToken()}`, { method: 'GET' });
}

