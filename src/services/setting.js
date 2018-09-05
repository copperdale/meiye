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

export async function addTable(param) {
    return request(`${prefix}MeiYe/public/api/setting/table/saveTable?token=${getToken()}`, {
        method: 'POST',
        body: param,
    });
}

export async function updateTable(param) {
    return request(`${prefix}MeiYe/public/api/setting/table/updateTable?token=${getToken()}`, {
        method: 'POST',
        body: param,
    });
}

export async function deleteTable(tableId) {
    return request(`${prefix}MeiYe/public/api/setting/table/deleteTable/${tableId}?token=${getToken()}`, {
        method: 'GET',
    });
}

export async function addArea(param) {
    return request(`${prefix}MeiYe/public/api/setting/tableArea/saveTableArea?token=${getToken()}`, {
        method: 'POST',
        body: param,
    });
}

export async function updateArea(param) {
    return request(`${prefix}MeiYe/public/api/setting/tableArea/updateTableArea?token=${getToken()}`, {
        method: 'POST',
        body: param,
    });
}

export async function deleteArea(areaId) {
    return request(`${prefix}MeiYe/public/api/setting/tableArea/deleteTableArea/${areaId}?token=${getToken()}`, {
        method: 'GET',
    });
}
