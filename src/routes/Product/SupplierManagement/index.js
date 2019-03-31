import React, { Component, Fragment } from 'react';
import { Button, Tabs  } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ProductTypeLayout from '../Layout';
import QueryForm from './QueryForm';
import SearchResult from './SearchResult';

const TabPane = Tabs.TabPane;

@connect((state) => ({
  showNewButton: state.product.showNewButton,
  selectedDishName: state.product.selectedDishName,
  selecteDishTypeId: state.product.selecteDishTypeId,
}))
export default class SupplierHome extends Component {
  
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
      <Tabs activeKey="2" onTabClick={this.onTabClick}>
        <TabPane tab="品项管理" key="1"></TabPane>
        <TabPane tab="货源管理" key="2">
          <QueryForm />
          <SearchResult />
        </TabPane>
      </Tabs>
    );
  }
};
