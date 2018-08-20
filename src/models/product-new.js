import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import { newSingleProduct, getProductById, updateSingleProduct, querySingleProductItems } from '../services/product-new';


export default {
  namespace: 'product-new',

  state: {
    isEdit: false,
    id: false,
    singleFormData: {
      name: { value: '' },
      code: { value: '' },
      type: { value: '' },
      price: { value: '' },
      amount: { value: '' },
      unit: { value: '' },
      addons: [{ name: '测试名字', price: '测试价格' }],
    },
    SetFormBottomAddModalFormData: {
      name: { value: '' },
      orderMin: { value: '' },
      orderMax: { value: '' },
    },
    setFormData: {
      name: { value: '' },
      code: { value: '' },
      type: { value: '' },
      price: { value: '' },
      amount: { value: '' },
      unit: { value: '' },
      'dishSetmealGroupBos': [
        {
          'name': '经济套餐',
          'orderMin': 0,
          'orderMax': 5,
          'dishSetmealBos': [{
            'childDishId': 11,
            'price': 122,
            'isReplace': 1,
            'isDefault': 1,
            'isMulti': 1,
            'leastCellNum': 1,
          }],
        }, {
          'name': '商务套餐',
          'orderMin': 0,
          'orderMax': 5,
          'dishSetmealBos': [{
            'childDishId': 11,
            'price': 124,
            'isReplace': 1,
            'isDefault': 1,
            'isMulti': 1,
            'leastCellNum': 1,
          }],
        },
      ],
    },
    setProductTypeToBeEdit: {

    },
    selectedSetProductType: {},
    showSetFormBottomRightAddModal: false,
    SetFormBottomRightAddModalTableData: [],
    addtype: '0',

    // 用于选择构造套餐时候的子项
    singleProductList: [],
    selectedSingleProductList: [],
    selectedSingleProducKeytList: [],
  },

  effects: {
    // 创建子品项组
    *newSubType(_, { call, put, select }) {
      const SetFormBottomAddModalFormData = yield select(state => state['product-new'].SetFormBottomAddModalFormData);
      let setFormData = yield select(state => state['product-new'].setFormData);
      setFormData = JSON.parse(JSON.stringify(setFormData));
      setFormData.dishSetmealGroupBos.push({
        'name': SetFormBottomAddModalFormData.name.value,
        'orderMin': SetFormBottomAddModalFormData.orderMin.value,
        'orderMax': SetFormBottomAddModalFormData.orderMax.value,
        'dishSetmealBos': [],
      });
      yield put({
        type: 'updateState',
        payload: {
          setFormData,
        },
      });
    },
    *getProductInfo({ payload: { id } }, { call, put, select }) {
      const response = yield call(getProductById, id);
      yield put({
        type: 'product-new/updateState',
        payload: {
          singleFormData: {
            name: { value: response.data.name },
            code: { value: response.data.dishCode },
            type: { value: '' },
            price: { value: response.data.marketPrice },
            amount: { value: response.data.dishQty },
            unit: { value: response.data.unitName },
            addons: response.data.dishPropertyBos,
          },
        },
      });
    },
    *getSingleProductList(_, { call, put, select }) {
      const response = yield call(querySingleProductItems);
      yield put ({
        type: 'product-new/updateState',
        payload: {
          singleProductList: response.data.content,
        },
      });
    },
    *new(_, { call, put, select }) {
      const addtype = yield select(state => state['product-new'].addtype);
      if (addtype === '0') {
        const singleFormdata = yield select(state => state['product-new'].singleFormData);
        const selecteDishTypeId = yield select(state => state.product.selecteDishTypeId)
        const param = {
          type: addtype,
          name: singleFormdata.name.value,
          dishCode: singleFormdata.code.value,
          marketPrice: singleFormdata.price.value,
          unitName: singleFormdata.unit.value,
          dishQty: singleFormdata.amount.value,
          dishTypeId: selecteDishTypeId,
          dishPropertyBos: singleFormdata.addons,
        };
      }
      const response = yield call(newSingleProduct, param);
      routerRedux.push('/product');
    },
    *update(_, { call, put, select }) {
      const addtype = yield select(state => state['product-new'].addtype);
      if (addtype === '0') {
        const singleFormdata = yield select(state => state['product-new'].singleFormData);
        const id = yield select(state => state['product-new'].id);
        const selecteDishTypeId = yield select(state => state.product.selecteDishTypeId)
        const param = {
          id,
          type: addtype,
          name: singleFormdata.name.value,
          dishCode: singleFormdata.code.value,
          marketPrice: singleFormdata.price.value,
          unitName: singleFormdata.unit.value,
          dishQty: singleFormdata.amount.value,
          dishTypeId: selecteDishTypeId,
          dishPropertyBos: singleFormdata.addons,
        };
      }
      const response = yield call(updateSingleProduct, param);
      routerRedux.push('/product');
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
        // console.log(searchParam);
        if (pathname === '/product-new') {
          const searchParam = parse(search, { ignoreQueryPrefix: true });
          const result = {};
          if (searchParam.addtype) {
            result.addtype = searchParam.addtype;
          }
          if (searchParam.isEdit === '1' && searchParam.id) {
            result.isEdit = true;
            result.id = search.id;
            dispatch({
              type: 'product-new/getProductInfo',
              payload: {
                id: searchParam.id,
              },
            });
          }
          dispatch({
            type: 'product-new/updateState',
            payload: result,
          });
          dispatch({
            type: 'product-new/getSingleProductList',
          })

          // dispatch({
          //   type: 'product/addProductType',
          //   payload: {
          //     id: 1
          //   }
          // });
        }
      });
    },
  },
};
