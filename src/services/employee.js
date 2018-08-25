// import { stringify } from 'qs';
import request from '../utils/request';
import { prefix } from './URL';
import { getToken } from '../utils/authority';

export async function getEmployeeRoles() {
    return request(`${prefix}MeiYe/public/api/role/authRole/findAll?token=${getToken()}`, { method: 'GET' });
}

// /public/api/part/dishShop/getDishShopPageByCriteria
