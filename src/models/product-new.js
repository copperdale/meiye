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
import {
  getSupplierList
} from '../services/supplier';
import { checkIsValid10_2Number } from '../utils/utils.js';

const checkSetData = (setFormData) => {

  let result = true;
  if (!setFormData.dishSetmealGroupBos) {
    result = false;
  }
  if (!setFormData.dishSetmealGroupBos.length) {
    result = false;
  }
  setFormData.dishSetmealGroupBos.forEach((item) => {
    if (!item.dishSetmealBos) result = false;
    if (!item.dishSetmealBos.length) result = false;
  });
  if (!result) {
    notification.error({
      message: '新建套餐时需要至少添加一个非空的子品项分组'
    })
  }
  setFormData.dishSetmealGroupBos.forEach((item) => {
    let min = `${item.orderMin}`;
    let max = `${item.orderMax}`;
    let integerReg = /^\D$/;
    if (integerReg.test(min) || integerReg.test(max)) {
      notification.error({
        message: '子品项分组中至少必选和至多可选都只能输入数字',
      });
      result = false;
    }
    if (Number(min) > Number(max)) {
      notification.error({
        message: '子品项分组中至少必选不能大于至多可选',
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
      purchaseAndSaleBo_type: { value: [] },             //1为进货,2为销货
      purchaseAndSaleBo_sourceId: { value: '' },              //type为1时需要，2不需要
      purchaseAndSaleBo_sourceName: { value: '' },    //type为1时需要，2不需要
      purchaseAndSaleBo_number: { value: '' },              
      purchaseAndSaleBo_purchasePrice: { value: '' }
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
      purchaseAndSaleBo_type: { value: [] },             //1为进货,2为销货
      purchaseAndSaleBo_sourceId: { value: '' },              //type为1时需要，2不需要
      purchaseAndSaleBo_sourceName: { value: '' },    //type为1时需要，2不需要
      purchaseAndSaleBo_number: { value: '' },              
      purchaseAndSaleBo_purchasePrice: { value: '' } 
    },
    selectedSetProductType: {},
    showSetFormBottomRightAddModal: false,
    SetFormBottomRightAddModalTableData: [],
    addtype: '0',

    // 用于选择构造套餐时候的子项
    singleProductList: [],
    selectedSingleProductList: [],
    selectedSingleProducKeytList: [],
    supplierList: []
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
      let setFormData = yield select(state =>state['product-new'].setFormData);
      let selectedSetProductType = yield select(state =>state['product-new'].selectedSetProductType);
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
      setFormData = JSON.parse(JSON.stringify(setFormData));
      selectedSetProductType = JSON.parse(JSON.stringify(selectedSetProductType));
      
      selectedSetProductType.dishSetmealBos = selectedSetProductType.dishSetmealBos.concat(addedItems);
      setFormData.dishSetmealGroupBos.forEach((item, index) => {
        if (item.name === selectedSetProductType.name) {
          setFormData.dishSetmealGroupBos[index] = JSON.parse(JSON.stringify(selectedSetProductType));
        }
      });
      // console.log(selectedSetProductType, setFormData, addedItems);
      yield put({
        type: 'product-new/updateState',
        payload: {
          selectedSetProductType: JSON.parse(JSON.stringify(selectedSetProductType)),
          setFormData: JSON.parse(JSON.stringify(setFormData)),
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
          setFormData.dishSetmealGroupBos[index] = JSON.parse(JSON.stringify(selectedSetProductType));
        }
      });
      // console.log(selectedSetProductType, setFormData, addedItems);
      yield put({
        type: 'product-new/updateState',
        payload: {
          selectedSetProductType: JSON.parse(JSON.stringify(selectedSetProductType)),
          setFormData: JSON.parse(JSON.stringify(setFormData)),
          // selectedSingleProducKeytList: [],
          // selectedSingleProductList: []
        }
      })
    },
    *getProductInfo({ payload: { id } }, { call, put, select }) {
      const response = yield call(getProductById, id);
      // const {
      //   purchaseAndSaleBo_type,                //1为进货,2为销货
      //   purchaseAndSaleBo_sourceId,              //type为1时需要，2不需要
      //   purchaseAndSaleBo_sourceName,    //type为1时需要，2不需要
      //   purchaseAndSaleBo_number,              
      //   purchaseAndSaleBo_purchasePrice 
      // } = yield select(state => state['product-new'].singleFormData)
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
            purchaseAndSaleBo_type: { value: [] },             //1为进货,2为销货
            purchaseAndSaleBo_sourceId: { value: '' },              //type为1时需要，2不需要
            purchaseAndSaleBo_sourceName: { value: '' },    //type为1时需要，2不需要
            purchaseAndSaleBo_number: { value: '' },              
            purchaseAndSaleBo_purchasePrice: { value: '' } 
          }),
          selecteDishTypeId: response.data.dishTypeId
        },
      });
    },
    *getSetInfo({ payload: { id } }, { call, put, select }) {
      const response = yield call(getSetById, id);
      // const {
      //   purchaseAndSaleBo_type,                //1为进货,2为销货
      //   purchaseAndSaleBo_sourceId,              //type为1时需要，2不需要
      //   purchaseAndSaleBo_sourceName,    //type为1时需要，2不需要
      //   purchaseAndSaleBo_number,              
      //   purchaseAndSaleBo_purchasePrice 
      // } = yield select(state => state['product-new'].setFormData)
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
            purchaseAndSaleBo_type: { value: [] },             //1为进货,2为销货
            purchaseAndSaleBo_sourceId: { value: '' },              //type为1时需要，2不需要
            purchaseAndSaleBo_sourceName: { value: '' },    //type为1时需要，2不需要
            purchaseAndSaleBo_number: { value: '' },              
            purchaseAndSaleBo_purchasePrice: { value: '' }
          }),
          selecteDishTypeId: response.data.dishTypeId
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
      const selecteDishTypeId = yield select(state => state['product-new'].selecteDishTypeId);
      const supplierList = yield select(state => state['product-new'].supplierList);
      if (addtype === '0') {
        const singleFormData = yield select(state => state['product-new'].singleFormData);
        const {
          purchaseAndSaleBo_type,                //1为进货,2为销货
          purchaseAndSaleBo_sourceId,              //type为1时需要，2不需要
          purchaseAndSaleBo_sourceName,    //type为1时需要，2不需要
          purchaseAndSaleBo_number,              
          purchaseAndSaleBo_purchasePrice
        } = singleFormData
        let purchaseAndSaleBoWrapper = {};
        if (purchaseAndSaleBo_type && purchaseAndSaleBo_type.value.length) {
          let sourceName = supplierList.filter(item => `${item.id}` === `${purchaseAndSaleBo_sourceId.value}`)[0]
            && supplierList.filter(item => `${item.id}` === `${purchaseAndSaleBo_sourceId.value}`)[0].name || '';
          purchaseAndSaleBoWrapper = {
            purchaseAndSaleBo: {
              type: purchaseAndSaleBo_type.value[0],                //1为进货,2为销货
              sourceId: purchaseAndSaleBo_sourceId.value,              //type为1时需要，2不需要
              sourceName,
              number: purchaseAndSaleBo_number.value,              
              purchasePrice: purchaseAndSaleBo_purchasePrice.value, 
            }
          }
        }
        const param = {
          type: addtype,
          name: singleFormData.name.value,
          dishCode: singleFormData.code.value,
          marketPrice: singleFormData.price.value,
          unitName: singleFormData.unit.value,
          dishQty: singleFormData.amount.value || 0,
          dishPropertyBos: singleFormData.addons,
          enabledFlag: '1',
          ...purchaseAndSaleBoWrapper
        };
        if (selecteDishTypeId) {
          param.dishTypeId = selecteDishTypeId
        }
        if (!checkSingleAddonIsValid(singleFormData.addons)) {
          return;
        }
        const response = yield call(newSingleProduct, param);
        if (response.messageType !== 'ignore') {
          return;
        }
        notification.success({
          message: `创建${singleFormData.name.value}成功`
        })
      } else if (addtype === '1') {
        const setFormData = yield select(state => state['product-new'].setFormData);

        if (!checkSetData(setFormData)) return;
        const {
          purchaseAndSaleBo_type,                //1为进货,2为销货
          purchaseAndSaleBo_sourceId,              //type为1时需要，2不需要
          purchaseAndSaleBo_sourceName,    //type为1时需要，2不需要
          purchaseAndSaleBo_number,              
          purchaseAndSaleBo_purchasePrice
        } = yield select(state => state['product-new'].setFormData)
        let purchaseAndSaleBoWrapper = {};
        if (purchaseAndSaleBo_type.value.length) {
          let sourceName = supplierList.filter(item => `${item.id}` === `${purchaseAndSaleBo_sourceId.value}`)[0]
            && supplierList.filter(item => `${item.id}` === `${purchaseAndSaleBo_sourceId.value}`)[0].name || '';
          purchaseAndSaleBoWrapper = {
            purchaseAndSaleBo: {
              type: purchaseAndSaleBo_type.value[0],                //1为进货,2为销货
              sourceId: purchaseAndSaleBo_sourceId.value,              //type为1时需要，2不需要
              sourceName,
              number: purchaseAndSaleBo_number.value,              
              purchasePrice: purchaseAndSaleBo_purchasePrice.value, 
            }
          }
        }
        const param = Object.assign({}, setFormData, {
          type: addtype,
          name: setFormData.name.value,
          dishCode: setFormData.code.value,
          marketPrice: setFormData.price.value,
          unitName: setFormData.unit.value,
          dishQty: setFormData.amount.value || 0,
          // dishTypeId: selecteDishTypeId,
          enabledFlag: '1',
          ...purchaseAndSaleBoWrapper
        });
        if (selecteDishTypeId) {
          param.dishTypeId = selecteDishTypeId
        }
        // debugger;
        const response = yield call(newSetProduct, param);
        if (response.messageType !== 'ignore') {
          return;
        }
        notification.success({
          message: `创建${setFormData.name.value}成功`
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
      const supplierList = yield select(state => state['product-new'].supplierList);
      if (addtype === '0') {
        const singleFormData = yield select(state => state['product-new'].singleFormData);
        const {
          purchaseAndSaleBo_type,                //1为进货,2为销货
          purchaseAndSaleBo_sourceId,              //type为1时需要，2不需要
          // purchaseAndSaleBo_sourceName,    //type为1时需要，2不需要
          purchaseAndSaleBo_number,              
          purchaseAndSaleBo_purchasePrice
        } = singleFormData
        let purchaseAndSaleBoWrapper = {};
        if (purchaseAndSaleBo_type && purchaseAndSaleBo_type.value.length) {
          let sourceName = supplierList.filter(item => `${item.id}` === `${purchaseAndSaleBo_sourceId.value}`)[0]
            && supplierList.filter(item => `${item.id}` === `${purchaseAndSaleBo_sourceId.value}`)[0].name || '';
          purchaseAndSaleBoWrapper = {
            purchaseAndSaleBo: {
              type: purchaseAndSaleBo_type.value[0],                //1为进货,2为销货
              sourceId: purchaseAndSaleBo_sourceId.value,              //type为1时需要，2不需要
              sourceName,
              number: purchaseAndSaleBo_number.value,              
              purchasePrice: purchaseAndSaleBo_purchasePrice.value, 
            }
          }
        }
        const param = {
          id,
          type: addtype,
          name: singleFormData.name.value,
          dishCode: singleFormData.code.value,
          marketPrice: singleFormData.price.value,
          unitName: singleFormData.unit.value,
          dishQty: singleFormData.amount.value || 0,
          dishPropertyBos: singleFormData.addons,
          dishPropertyBos: singleFormData.addons,
          ...purchaseAndSaleBoWrapper
        };
        if (selecteDishTypeId) {
          param.dishTypeId = selecteDishTypeId
        }
        if (!checkSingleAddonIsValid(singleFormData.addons)) {
          return;
        }
        const response = yield call(updateSingleProduct, param);
        if (response.messageType !== 'ignore') {
          return;
        }
        notification.success({
          message: `更新成功`
        })

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
        const setFormData = yield select(state => state['product-new'].setFormData);
        if (!checkSetData(setFormData)) return;
        const {
          purchaseAndSaleBo_type,                //1为进货,2为销货
          purchaseAndSaleBo_sourceId,              //type为1时需要，2不需要
          purchaseAndSaleBo_sourceName,    //type为1时需要，2不需要
          purchaseAndSaleBo_number,              
          purchaseAndSaleBo_purchasePrice
        } = setFormData;
        let purchaseAndSaleBoWrapper = {};
        if (purchaseAndSaleBo_type.value.length) {
          let sourceName = supplierList.filter(item => `${item.id}` === `${purchaseAndSaleBo_sourceId.value}`)[0]
            && supplierList.filter(item => `${item.id}` === `${purchaseAndSaleBo_sourceId.value}`)[0].name || '';
          purchaseAndSaleBoWrapper = {
            purchaseAndSaleBo: {
              type: purchaseAndSaleBo_type.value[0],                //1为进货,2为销货
              sourceId: purchaseAndSaleBo_sourceId.value,              //type为1时需要，2不需要
              sourceName,
              number: purchaseAndSaleBo_number.value,              
              purchasePrice: purchaseAndSaleBo_purchasePrice.value, 
            }
          }
        }

        const param = Object.assign({}, setFormData, {
          type: addtype,
          name: setFormData.name.value,
          dishCode: setFormData.code.value,
          marketPrice: setFormData.price.value,
          unitName: setFormData.unit.value,
          dishQty: setFormData.amount.value || 0,
          ...purchaseAndSaleBoWrapper
        });
        if (selecteDishTypeId) {
          param.dishTypeId = selecteDishTypeId
        }
        const response = yield call(updateSetProduct, param);
        // console.log(response);
        if (response.messageType !== 'ignore') {
          return;
        }
        notification.success({
          message: `更新成功`
        })
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
      yield put({
        type: 'product/queryProductType'
      })
      yield put(routerRedux.push('/product'));
    },
    *getSupplierList(_, { call, put, select }) {

      const response = yield call(getSupplierList, {});
    //   if (!response) {
    //     response = {"data":[{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":5,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534338859756,"serverUpdateTime":1534338859756,"sort":900000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"f45c07c6-1445-4412-b5af-f610bd2f461c"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":6,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534341921890,"serverUpdateTime":1534341921890,"sort":800000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"6f9cab11-58ab-4f00-90d0-b5335f221618"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":1,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534168060069,"serverUpdateTime":1534168060069,"sort":700000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"eae49042-0c88-47d8-8d8f-70f4b1d40910"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":3,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534259632792,"serverUpdateTime":1534259632792,"sort":600000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"f9896b55-27fe-407c-8a0a-7298cc4f534b"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":7,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534345162250,"serverUpdateTime":1534345162250,"sort":300000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"213d2c03-c2ff-4cd6-a550-77117757ed9d"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":15,"isCure":2,"isOrder":1,"name":"String","parentId":11,"serverCreateTime":1534082241089,"serverUpdateTime":1534429989860,"sort":300000,"statusFlag":1,"typeCode":"ffff","updatorId":0,"updatorName":"","uuid":"b956a567-2f63-4566-8422-fa16b887408f"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":2,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534168678267,"serverUpdateTime":1534168678267,"sort":200000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"81ea563a-e1f6-468c-814e-a27e134877ac"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":4,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534259705102,"serverUpdateTime":1534259705102,"sort":200000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"acbafa01-74ef-4312-a479-ddc3ff69fb0d"}],"dishTypeDesc":"","enabledFlag":1,"id":11,"isCure":2,"isOrder":1,"name":"保健","parentId":0,"serverCreateTime":1534079891779,"serverUpdateTime":1534079891779,"sort":500000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"8bd17894-38df-49bf-9ad2-72c02509cbff"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":8,"isCure":2,"isOrder":1,"name":"护肤类","parentId":0,"serverCreateTime":1534077078830,"serverUpdateTime":1534077078830,"sort":300000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"19d76e88-f84b-47f2-a55d-3c52b61e9a58"}],"message":"","messageType":"ignore","statusCode":200}
    //   }
      yield put({
        type: 'updateState',
        payload: {
          supplierList: response.data.content || [],
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
        // console.log(searchParam);
        if (pathname !== '/product-new') return; 
        dispatch({
          type: 'getSupplierList'
        });
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
