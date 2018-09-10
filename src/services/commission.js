// import { stringify } from 'qs';
import request from '../utils/request';
import { prefix } from './URL';
import { getToken } from '../utils/authority';

export async function queryPlan(params) {
    params.pageNum = 0;
    params.pageSize = 100000;
    return request(`${prefix}MeiYe/public/api/talentPlan/getTalentPage?token=${getToken()}`, {
        method: 'POST',
        body: params,
    });
}

