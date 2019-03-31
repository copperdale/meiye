import React, { Component, Fragment } from 'react';
import { Button, Tabs } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ProductTypeLayout from './Layout';
import QueryForm from './QueryForm';
import SerachResult from './SearchResult';

const TabPane = Tabs.TabPane;
@connect((state) => ({
  showNewButton: state.product.showNewButton,
  selectedDishName: state.product.selectedDishName,
  selecteDishTypeId: state.product.selecteDishTypeId,
}))
export default class Product extends Component {

  onTabClick = (key) => {
    if (key === '2') {
      this.props.dispatch(routerRedux.push({
        pathname: '/supplier'
      }))
    } else if (key === '1') {
      this.props.dispatch(routerRedux.push({
        pathname: '/product'
      }))
    }
  }
  render() {
    return (
      <Tabs activeKey="1" onTabClick={this.onTabClick}>
        <TabPane tab="品项管理" key="1">
            <ProductTypeLayout breadcrumbs={['品项列表', this.props.selectedDishName]} actionButtons={
            this.props.showNewButton
            &&
            <Button
              size="small" 
              style={{ float: 'right' }} 
              className="primary-blue primary-blue-button"
              onClick={() => { 
                this.props.dispatch({
                  type: 'product-new/updateState',
                  payload: {
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
                      'dishSetmealGroupBos': [],
                    },
                    selectedSetProductType: {},
                    showSetFormBottomRightAddModal: false,
                    SetFormBottomRightAddModalTableData: [],
                    addtype: '0',

                    // 用于选择构造套餐时候的子项
                    singleProductList: [],
                    selectedSingleProductList: [],
                    selectedSingleProducKeytList: [],
                  }
                });
                this.props.dispatch(routerRedux.push(`/product-new?selecteDishTypeId=${this.props.selecteDishTypeId}`)); 
              }}
            >新建品项</Button>
          }>
            <QueryForm />
            <SerachResult />
          </ProductTypeLayout>
        </TabPane>
        <TabPane tab="货源管理" key="2"></TabPane>
      </Tabs>
      
    );
  }
};
