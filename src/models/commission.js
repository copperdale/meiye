import { parse } from 'qs';
// import { 
//   getTableArea, loadTablesByAreaId,
//   addTable, updateTable, deleteTable,

//   addArea, updateArea, deleteArea,
// } from '../services/setting';

export default {
  namespace: 'setting',

  state: {
    queryFormData: {
      planState: { value: '' },
      planPype: { value: '' },
    },
    // tableArea: [{ areaName: 'area1', id: 1 }, { areaName: 'area2', id: 2 }],
    // selectedTableAreaId: null,
    // tables: [{ tableName: '1', tableNum: 1 }, { tableName: '2', tableNum: 2 }],
  },

  effects: {
    *getTableArea(_, { call, put, select }) {
      
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
        // if (pathname === '/setting' || pathname === '/') {
        //   dispatch({
        //     type: 'setting/getTableArea',
        //   });
        // }

        // if (pathname !== '/product-new') {
        //   const searchParam = parse(search, { ignoreQueryPrefix: true });
        //   const result = {};
        //   if (searchParam.selecteDishTypeId) {
        //     dispatch({
        //       type: 'product/updateState',
        //       payload: {
        //         selecteDishTypeId: searchParam.selecteDishTypeId
        //       }
        //     });
        //   }
        // }
        
      });
    },
  },
};
