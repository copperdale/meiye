import { parse } from 'qs';
import { 
  queryPlan,
} from '../services/commission';

export default {
  namespace: 'commission',

  state: {
    queryFormData: {
      planState: { value: '' },
      planPype: { value: '' },
    },
    searchResult: {
      content: [],
    },
  },

  effects: {
    *queryPlan(_, { call, put, select }) {
      const queryFormData = yield select(state => state.commission.queryFormData);
      const params = {
        planState: queryFormData.planState.value,
        planPype: queryFormData.planPype.value,
      };
      const response = yield call(queryPlan, params);
      yield put({
        type: 'commission/updateState',
        payload: {
          searchResult: response.data,
        },
      })
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
