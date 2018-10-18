import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getVerifyCode } from '../services/api';
import { setAuthority, setUserInfo, setToken } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { getPageQuery } from '../utils/utils';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    verifyImage: '',
    verifyCode: '',
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.statusCode === 200) {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/home'));
      }
    },
    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
    *getVerifyCode(_, { put, call }) {
      const response = yield call(getVerifyCode, payload);
      yield put({
        type: 'login/updateState',
        payload: {
          verifyCode: response.data.verifyCode,
          verifyImage: response.data.verifyImage,
        }
      });
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority('admin');
      console.log(payload);
      setUserInfo(JSON.stringify(payload.data));
      setToken(payload.data.token);
      return {
        ...state,
        // status: payload.status,
        // type: payload.type,
      };
    },
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
        if (pathname === '/user/login') {
          dispatch({
            type: 'login/getVerifyCode',
          });
        }
      })
    }
  }
};
