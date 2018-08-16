import { stringify } from 'qs';
import request from '../utils/request';
import { prefix } from './URL.js';

export async function getProductList() {
    return request(prefix + 'MeiYe/public/api/part/loadBrandTypes', { method: 'GET' });
}

export async function deleteProduct(id) {
    return request(prefix + 'MeiYe/public/api/part/deleteBrandType/' + id, { method: 'GET' });
}

