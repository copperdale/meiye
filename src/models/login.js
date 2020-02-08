import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { notification } from 'antd';
import { login, getVerifyCode, loginBrand } from '../services/api';
import { setUserInfo, setToken, removeToken, removeUserInfo } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { getPageQuery } from '../utils/utils';
import store from '../index';

const listenMessage = (e) => {
  if (!store) {
    removeToken();
    removeUserInfo();
    window.open(location.href.split('#')[0] + '#/user/login', '_self');
    return;
  }
  const { dispatch } = store;
  if (e.data === 'logout') {
    dispatch({
      type: 'login/logout',
    });
  }
}

export default {
  namespace: 'login',

  state: {
    status: undefined,
    verifyImage: '',
    verifyCode: '',
  },

  effects: {
    *login({ payload }, { call, put, select }) {
      const verifyCode = yield select(state => state.login.verifyCode);
      if (verifyCode !== payload.verifyCode) {
        notification.error({
          message: '登录错误',
          description: '请输入正确的验证码',
        });
        yield put({
          type: 'login/getVerifyCode',
        });
        return;
      }
      const response = yield call(login, payload);
      if (response.statusCode === 200 && response.messageType === 'ignore') {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
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
        if (redirect && redirect.startsWith && redirect.startsWith('/user/login')) {
          redirect = '/home';
        }
        yield put(routerRedux.replace(redirect || '/home'));
      }
    },
    *loginBrand({ payload }, { call, put }) {
      const response = yield call(loginBrand, payload);
      // loginBrand(payload).then((d) => {
      //   console.log('d', d);
      // });
      // console.log('response', response);
      if (response.message === 'OK') {
        window.open(response.content.homeUrl, '_self');
      }
      // if (response.statusCode === 200 && response.messageType === 'ignore') {
      //   yield put({
      //     type: 'changeLoginStatus',
      //     payload: response,
      //   });
        
      // }
    },
    *logout(_, { put }) {
      removeToken();
      removeUserInfo();
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
      const response = yield call(getVerifyCode);
      yield put({
        type: 'login/updateState',
        payload: {
          verifyCode: response.data.verifyCode,
          verifyImage: response.data.verifyImage,
        },
      });
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority('admin');
      // console.log(payload);
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

        window.addEventListener('message', listenMessage, false);

      });

    }
  }
};
