import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import { notification } from 'antd';
import { 
  newSingleProduct, 
  updateSingleProduct, 
  newSetProduct,
  updateSetProduct, 
  getProductById, 
  getSetById, 
  querySingleProductItems 
} from '../services/product-new';
import { checkIsValid10_2Number } from '../utils/utils.js';

const checkSetData = (setFormdata) => {

  let result = true;
  if (!setFormdata.dishSetmealGroupBos) {
    result = false;
  }
  if (!setFormdata.dishSetmealGroupBos.length) {
    result = false;
  }
  setFormdata.dishSetmealGroupBos.forEach((item) => {
    if (!item.dishSetmealBos) result = false;
    if (!item.dishSetmealBos.length) result = false;
  });
  if (!result) {
    notification.error({
      message: '新建套餐时需要至少添加一个非空的子品项分组'
    })
  }
  setFormdata.dishSetmealGroupBos.forEach((item) => {
    let min = `${item.orderMin}`;
    let max = `${item.orderMax}`;
    let integerReg = /^\D$/;
    if (integerReg.test(min) || integerReg.test(max)) {
      notification.error({
        message: '子品项分组中至少必选和至多可选都只能输入数字',
      });
      result = false;
    }
    if (Number(min) >= Number(max)) {
      notification.error({
        message: '子品项分组中至少必选必须小于至多可选',
      });
      result = false;
    }
  })
  return result;
}

const checkSingleAddonIsValid = (addons = []) => {
  let result = true;
  addons.forEach(item => {
    if (!item.name || !item.reprice) {
      result = false;
      notification.error({
        message: '加项名称和加项价格都不能为空'
      });
    } else if (!checkIsValid10_2Number(item.reprice)) {
      result = false;
      notification.error({
        message: '加项价格最多输入10位数字，最多保留2位小数'
      });
    }
  })
  
  return result;
}

export default {
  namespace: 'product-new',

  state: {
    isEdit: false,
    isView: false,
    id: false,
    selecteDishTypeId: '',
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
      const selecteDishTypeId = yield select(state => state['product-new'].selecteDishTypeId)
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
        if (!checkSingleAddonIsValid(singleFormdata.addons)) {
          return;
        }
        const response = yield call(newSingleProduct, param);
        notification.success({
          message: `创建${singleFormdata.name.value}成功`
        })
      } else if (addtype === '1') {
        const setFormdata = yield select(state => state['product-new'].setFormData);

        if (!checkSetData(setFormdata)) return;
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
        notification.success({
          message: `创建${setFormdata.name.value}成功`
        })
      }
      yield put({
        type: 'product/queryProductType'
      })
      yield put(routerRedux.push('/product'));
    },
    *update(_, { call, put, select }) {
      const addtype = yield select(state => state['product-new'].addtype);
      const selecteDishTypeId = yield select(state => state['product-new'].selecteDishTypeId)
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
        if (!checkSingleAddonIsValid(singleFormdata.addons)) {
          return;
        }
        const response = yield call(updateSingleProduct, param);
        let queryResult = yield select(state => state.product.queryResult);
        queryResult = queryResult.map((item) => {
          if (`${item.id}` === `${id}`) {
            return JSON.parse(JSON.stringify(Object.assign({}, item, param)));
          }
          return JSON.parse(JSON.stringify(item));
        });
        yield put({
          type: 'product/updateState',
          payload: {
            queryResult: queryResult
          }
        });
      } else if (addtype === '1') {
        const setFormdata = yield select(state => state['product-new'].setFormData);

        if (!checkSetData(setFormdata)) return;

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
        let queryResult = yield select(state => state.product.queryResult);
        queryResult = queryResult.map((item) => {
          if (`${item.id}` === `${id}`) {
            return JSON.parse(JSON.stringify(Object.assign({}, item, param)));
          }
          return JSON.parse(JSON.stringify(item));
        });
        yield put({
          type: 'product/updateState',
          payload: {
            queryResult: queryResult
          }
        });
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
        if (searchParam.selecteDishTypeId) {
          result.selecteDishTypeId = searchParam.selecteDishTypeId;
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
