import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import { 
  newSingleProduct, 
  updateSingleProduct, 
  newSetProduct,
  updateSetProduct, 
  getProductById, 
  getSetById, 
  querySingleProductItems 
} from '../services/product-new';
import { debug } from 'util';


export default {
  namespace: 'product-new',

  state: {
    isEdit: false,
    isView: false,
    id: false,
    singleFormData: {
      name: { value: '' },
      code: { value: '' },
      type: { value: '' },
      price: { value: '' },
      amount: { value: '' },
      unit: { value: '' },
      // addons: [{ name: '测试名字', price: '测试价格' }],
      addons: [],
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
        // {
        //   'name': '经济套餐',
        //   'orderMin': 0,
        //   'orderMax': 5,
        //   'dishSetmealBos': [{
        //     'childDishId': 11,
        //     'price': 122,
        //     'isReplace': 1,
        //     'isDefault': 1,
        //     'isMulti': 1,
        //     'leastCellNum': 1,
        //   }],
        // }, {
        //   'name': '商务套餐',
        //   'orderMin': 0,
        //   'orderMax': 5,
        //   'dishSetmealBos': [{
        //     'childDishId': 11,
        //     'price': 124,
        //     'isReplace': 1,
        //     'isDefault': 1,
        //     'isMulti': 1,
        //     'leastCellNum': 1,
        //   }],
        // },
      ],
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
      let SetFormBottomAddModalFormData = yield select(state => state['product-new'].SetFormBottomAddModalFormData);
      let setFormData = yield select(state => state['product-new'].setFormData);
      setFormData = JSON.parse(JSON.stringify(setFormData));
      SetFormBottomAddModalFormData = JSON.parse(JSON.stringify(SetFormBottomAddModalFormData));
      setFormData.dishSetmealGroupBos = setFormData.dishSetmealGroupBos.map((item) => {
        if (item.name == SetFormBottomAddModalFormData.name.value) {
          return Object.assign({}, item, {
            'name': SetFormBottomAddModalFormData.name.value,
            'orderMin': SetFormBottomAddModalFormData.orderMin.value,
            'orderMax': SetFormBottomAddModalFormData.orderMax.value,
          });
        }
        return item;
      });
      if (!setFormData.dishSetmealGroupBos.filter(item => item.name == SetFormBottomAddModalFormData.name.value).length){
        setFormData.dishSetmealGroupBos.push({
          'name': SetFormBottomAddModalFormData.name.value,
          'orderMin': SetFormBottomAddModalFormData.orderMin.value,
          'orderMax': SetFormBottomAddModalFormData.orderMax.value,
          'dishSetmealBos': [],
        });
      }
      yield put({
        type: 'updateState',
        payload: {
          setFormData,
        },
      });
    },
    // 添加子品项组下面的子项
    *addSubTypeItems(_, { call, put, select }) {
      const selectedSingleProductList = yield select(state => state['product-new'].selectedSingleProductList);
      let addedItems = selectedSingleProductList.map((item) => {
        return {
          childDishId: item.id,
          price: item.marketPrice,
          isReplace: 1,
          isDefault: 1,
          isMulti: 1,
          leastCellNum: 1,
        };
      });
      let setFormData = yield select(state =>state['product-new'].setFormData);
      let selectedSetProductType = yield select(state =>state['product-new'].selectedSetProductType);
      setFormData = JSON.parse(JSON.stringify(setFormData));
      selectedSetProductType = JSON.parse(JSON.stringify(selectedSetProductType));
      selectedSetProductType.dishSetmealBos = selectedSetProductType.dishSetmealBos.concat(addedItems);
      setFormData.dishSetmealGroupBos = setFormData.dishSetmealGroupBos.map(item => {
        if (item.name === selectedSetProductType.name) {
          item = JSON.parse(JSON.stringify(selectedSetProductType));
        }
        return item;
      });
      // console.log(selectedSetProductType, setFormData, addedItems);
      yield put({
        type: 'product-new/updateState',
        payload: {
          selectedSetProductType,
          setFormData,
          selectedSingleProducKeytList: [],
          selectedSingleProductList: []
        }
      })
    },
    // 删除子品项组下面的子项
    *deleteSubTypeItems({ payload: { index } }, { call, put, select }) {
      let setFormData = yield select(state =>state['product-new'].setFormData);
      let selectedSetProductType = yield select(state =>state['product-new'].selectedSetProductType);
      setFormData = JSON.parse(JSON.stringify(setFormData));
      selectedSetProductType = JSON.parse(JSON.stringify(selectedSetProductType));

      selectedSetProductType.dishSetmealBos = selectedSetProductType.dishSetmealBos.filter((item, cIndex) => cIndex !== index);
      setFormData.dishSetmealGroupBos.forEach(item => {
        if (item.name == selectedSetProductType.name) {
          item = JSON.parse(JSON.stringify(selectedSetProductType));
        }
      });
      // console.log(selectedSetProductType, setFormData, addedItems);
      yield put({
        type: 'product-new/updateState',
        payload: {
          selectedSetProductType,
          setFormData,
          // selectedSingleProducKeytList: [],
          // selectedSingleProductList: []
        }
      })
    },
    *getProductInfo({ payload: { id } }, { call, put, select }) {
      const response = yield call(getProductById, id);
      // if (response.data)
      yield put({
        type: 'product-new/updateState',
        payload: {
          singleFormData: Object.assign({}, response.data, {
            name: { value: response.data.name },
            code: { value: response.data.dishCode },
            type: { value: response.data.type },
            price: { value: response.data.marketPrice },
            amount: { value: response.data.dishQty },
            unit: { value: response.data.unitName },
            addons: response.data.dishPropertyBos,
          }),
        },
      });
    },
    *getSetInfo({ payload: { id } }, { call, put, select }) {
      const response = yield call(getSetById, id);
      // if (response.data)
      yield put({
        type: 'product-new/updateState',
        payload: {
          setFormData: Object.assign({}, response.data, {
            name: { value: response.data.name },
            code: { value: response.data.dishCode },
            type: { value: response.data.type },
            price: { value: response.data.marketPrice },
            amount: { value: response.data.dishQty },
            unit: { value: response.data.unitName },
          }),
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
      const selecteDishTypeId = yield select(state => state.product.selecteDishTypeId)
      if (addtype === '0') {
        const singleFormdata = yield select(state => state['product-new'].singleFormData);
        const param = {
          type: addtype,
          name: singleFormdata.name.value,
          dishCode: singleFormdata.code.value,
          marketPrice: singleFormdata.price.value,
          unitName: singleFormdata.unit.value,
          dishQty: singleFormdata.amount.value,
          dishPropertyBos: singleFormdata.addons,
          enabledFlag: '1'
        };
        if (selecteDishTypeId) {
          param.dishTypeId = selecteDishTypeId
        }
        const response = yield call(newSingleProduct, param);
        yield put(routerRedux.push('/product'));
      } else if (addtype === '1') {
        const setFormdata = yield select(state => state['product-new'].setFormData);
        // debugger;
        const param = Object.assign({}, setFormdata, {
          type: addtype,
          name: setFormdata.name.value,
          dishCode: setFormdata.code.value,
          marketPrice: setFormdata.price.value,
          unitName: setFormdata.unit.value,
          dishQty: setFormdata.amount.value,
          // dishTypeId: selecteDishTypeId,
          enabledFlag: '1'
        });
        if (selecteDishTypeId) {
          param.dishTypeId = selecteDishTypeId
        }
        // debugger;
        const response = yield call(newSetProduct, param);
        yield put(routerRedux.push('/product'));
      }
    },
    *update(_, { call, put, select }) {
      const addtype = yield select(state => state['product-new'].addtype);
      const selecteDishTypeId = yield select(state => state.product.selecteDishTypeId)
      const id = yield select(state => state['product-new'].id);
      if (addtype === '0') {
        const singleFormdata = yield select(state => state['product-new'].singleFormData);
        const param = {
          id,
          type: addtype,
          name: singleFormdata.name.value,
          dishCode: singleFormdata.code.value,
          marketPrice: singleFormdata.price.value,
          unitName: singleFormdata.unit.value,
          dishQty: singleFormdata.amount.value,
          dishPropertyBos: singleFormdata.addons,
        };
        if (selecteDishTypeId) {
          param.dishTypeId = selecteDishTypeId
        }
        const response = yield call(updateSingleProduct, param);
      } else if (addtype === '1') {
        const setFormdata = yield select(state => state['product-new'].setFormData);
        const param = Object.assign({}, setFormdata, {
          type: addtype,
          name: setFormdata.name.value,
          dishCode: setFormdata.code.value,
          marketPrice: setFormdata.price.value,
          unitName: setFormdata.unit.value,
          dishQty: setFormdata.amount.value,
        });
        if (selecteDishTypeId) {
          param.dishTypeId = selecteDishTypeId
        }
        const response = yield call(updateSetProduct, param);
      }
      yield put(routerRedux.push('/product'));
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
        if (pathname !== '/product-new') return; 
        let result = {};
        const searchParam = parse(search, { ignoreQueryPrefix: true });
        if (searchParam.addtype) {
          result.addtype = searchParam.addtype;
        }
        if (searchParam.id) {
          result.id = searchParam.id;
        }
        if (searchParam.isEdit === '1' && searchParam.id) {
          result.isEdit = true;
          result.isView = false;
          const getTypeMapping = {
            0: 'getProductInfo', // 单品的初始化
            1: 'getSetInfo', // 套餐的初始化
          };
          dispatch({
            type: `product-new/${getTypeMapping[searchParam.addtype]}`,
            payload: {
              id: searchParam.id,
            },
          });
        }
        if (searchParam.isView === '1' && searchParam.id) {
          result.isView = true;
          result.isEdit = false;
          const getTypeMapping = {
            0: 'getProductInfo', // 单品的初始化
            1: 'getSetInfo', // 套餐的初始化
          };
          dispatch({
            type: `product-new/${getTypeMapping[searchParam.addtype]}`,
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
      });
    },
  },
};
