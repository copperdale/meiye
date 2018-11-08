import { parse } from 'qs';
import { cloneDeep } from 'lodash/lang';
import { routerRedux } from 'dva/router';

import { fieldsKeys as newFormFieldsKeys } from '../routes/Commission/NewCommission/NewCommissionSolutionForm'
// import { getLatestEmployee, addNewEmployee, getEmployee } from '../services/employee-new';
import { getEmployeeRoles } from '../services/employee';
import { newCommission, getCommission, updateCommission } from '../services/commission';
// const dateKeys = 'jobEntryTime jobPositiveTime intoWorkDate birthday'.split(' ');
const initNewFormData = newFormFieldsKeys.reduce((temp, item) => {
  const result = temp;
  result[item] = { value: '' };
  // if (item === 'talentRuleBos') {
  //   result[item] = [];
  // }
  if (item === 'talentRoleBoList') {
    result[item] = { value: ['1'] };
  }
  if ('planType planMode'.split(' ').indexOf(item) !== -1 ) {
    result[item] = {
      value: '1',
    };
  }
  result.planState = {
    value: '1',
  };
  return result;
}, {});


export default {
  namespace: 'commission-new',

  state: {
    newCommissionSolutionFormData: cloneDeep(initNewFormData),
    isEdit: false,
    EmployeeRoleList: [],
    commission: {},
    id: null,
  },

  effects: {
    *getEmployeeRoles(_, { call, put }) {
      const response = yield call(getEmployeeRoles);
    //   if (!response) {
    //     response = {"data":[{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":5,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534338859756,"serverUpdateTime":1534338859756,"sort":900000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"f45c07c6-1445-4412-b5af-f610bd2f461c"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":6,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534341921890,"serverUpdateTime":1534341921890,"sort":800000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"6f9cab11-58ab-4f00-90d0-b5335f221618"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":1,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534168060069,"serverUpdateTime":1534168060069,"sort":700000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"eae49042-0c88-47d8-8d8f-70f4b1d40910"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":3,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534259632792,"serverUpdateTime":1534259632792,"sort":600000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"f9896b55-27fe-407c-8a0a-7298cc4f534b"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":7,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534345162250,"serverUpdateTime":1534345162250,"sort":300000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"213d2c03-c2ff-4cd6-a550-77117757ed9d"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":15,"isCure":2,"isOrder":1,"name":"String","parentId":11,"serverCreateTime":1534082241089,"serverUpdateTime":1534429989860,"sort":300000,"statusFlag":1,"typeCode":"ffff","updatorId":0,"updatorName":"","uuid":"b956a567-2f63-4566-8422-fa16b887408f"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":2,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534168678267,"serverUpdateTime":1534168678267,"sort":200000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"81ea563a-e1f6-468c-814e-a27e134877ac"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":4,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534259705102,"serverUpdateTime":1534259705102,"sort":200000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"acbafa01-74ef-4312-a479-ddc3ff69fb0d"}],"dishTypeDesc":"","enabledFlag":1,"id":11,"isCure":2,"isOrder":1,"name":"保健","parentId":0,"serverCreateTime":1534079891779,"serverUpdateTime":1534079891779,"sort":500000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"8bd17894-38df-49bf-9ad2-72c02509cbff"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":8,"isCure":2,"isOrder":1,"name":"护肤类","parentId":0,"serverCreateTime":1534077078830,"serverUpdateTime":1534077078830,"sort":300000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"19d76e88-f84b-47f2-a55d-3c52b61e9a58"}],"message":"","messageType":"ignore","statusCode":200}
    //   }
      yield put({
        type: 'updateState',
        payload: {
            EmployeeRoleList: JSON.stringify(response.data) === '{}' ? [] : response.data,
        },
      });
    },
    *newOrUpdate(_, { call, select, put }) {
      const newCommissionSolutionFormData = yield select(state => state['commission-new'].newCommissionSolutionFormData);
      const isEdit = yield select(state => state['commission-new'].isEdit);
      const id = yield select(state => state['commission-new'].id);
      const params = {};
      Object.keys(newCommissionSolutionFormData).forEach((key) => {
        params[key] = newCommissionSolutionFormData[key].value;
        if (key === 'talentRuleBos') {
          params[key].forEach((item) => {
            // eslint-disable-next-line
            item.ruleType = newCommissionSolutionFormData.planMode.value
          })
        }
      })
      params.talentRoleBoList = params.talentRoleBoList.map((item) => {
        return {
          roleId: item,
        };
      })
      if (isEdit) {
        params.id = id;
        yield call(updateCommission, params);
      } else {
        yield call(newCommission, params);
      }
      yield put(routerRedux.push('/commission'));
    },
    *getCommission({ payload: { id } }, { call, put, select }) {
      const response = yield call(getCommission, id);
      const commission = response.data;
      let newCommissionSolutionFormData = yield select(state =>
        state['commission-new'].newCommissionSolutionFormData);

      'planName planType planState planMode talentRuleBos talentRoleBoList'
      .split(' ')
      .forEach((item) => {
        newCommissionSolutionFormData[item].value = `${commission[item]}`;
        if (item === 'talentRoleBoList') {
          newCommissionSolutionFormData[item].value =
            commission[item].map(cItem => `${cItem.roleId}`);
        }
        if (item === 'talentRuleBos') {
          newCommissionSolutionFormData[item].value = commission[item];
        }
      });
      yield put({
        type: 'commission-new/updateState',
        payload: {
          commission,
          newCommissionSolutionFormData: cloneDeep(newCommissionSolutionFormData),
        },
      });
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (pathname === '/commission/new') {
          dispatch({
            type: 'commission-new/getEmployeeRoles',
          });
          const searchParam = parse(search, { ignoreQueryPrefix: true });
          
          const isEdit = searchParam.isEdit === 'true';
          const id = searchParam.id;
          dispatch({
            type: 'commission-new/updateState',
            payload: {
              isEdit,
              id,
              newCommissionSolutionFormData: cloneDeep(initNewFormData),
            },
          });
          if (searchParam.id) {
            dispatch({
              type: 'commission-new/getCommission',
              payload: {
                id: searchParam.id,
              },
            });
          }
        }
      });
    },
  },
};
