// import { stringify } from 'qs';
import request from '../utils/request';
import { prefix } from './URL.js';
import { getToken } from '../utils/authority';

export async function getProductList() {
    return request(`${prefix}MeiYe/public/api/part/loadBrandTypes?token=${getToken()}`, { method: 'GET' });
}

export async function deleteProduct(id) {
    return request(`${prefix}MeiYe/public/api/part/deleteBrandType/${id}?token=${getToken()}`, { method: 'GET' });
}

export async function addProductType({ id, name, typeCode }) {
    return request(`${prefix}MeiYe/public/api/part/saveBrandType?token=${getToken()}`, {
        method: 'POST',
        body: { parentId: id, name, typeCode }
    });
}

export async function editProductType({ id, name, typeCode }) {
    return request(`${prefix}MeiYe/public/api/part/updateBrandType?token=${getToken()}`, {
        method: 'POST',
        body: { id, name, typeCode }
    });
}

