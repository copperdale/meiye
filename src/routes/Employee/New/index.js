import React, { Component, Fragment } from 'react';
import { Breadcrumb } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import NewEmployeeForm from './NewEmployeeForm';


@connect((state) => ({
  showNewButton: state.product.showNewButton,
  selectedDishName: state.product.selectedDishName
}))
export default class Product extends Component {

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>员工管理</Breadcrumb.Item>
          <Breadcrumb.Item>新建员工</Breadcrumb.Item>
        </Breadcrumb>
        <hr />
        <NewEmployeeForm />
      </div>
    );
  }
};
