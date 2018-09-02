// import { stringify } from 'qs';
import request from '../utils/request';
import { prefix } from './URL';
import { getToken } from '../utils/authority';

export async function getTableArea() {
    return request(`${prefix}MeiYe/public/api/setting/tableArea/loadTableAreas?token=${getToken()}`, { method: 'GET' });
}

// /public/api/part/dishShop/getDishShopPageByCriteria
export async function loadTablesByAreaId(id) {
    return request(`${prefix}MeiYe/public/api/setting/table/loadTablesByAreaId/${id}?token=${getToken()}`, { method: 'GET' });
}

export async function addEmployeeRole(param) {
    return request(`${prefix}MeiYe/public/api/role/authRole/save?token=${getToken()}`, {
        method: 'POST',
        body: param,
    });
}