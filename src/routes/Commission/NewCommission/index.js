import React, { Component, Fragment } from 'react';
import { Breadcrumb } from 'antd';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router';
import NewCommissionSolutionForm from './NewCommissionSolutionForm';


@connect((state) => ({
  // showNewButton: state.product.showNewButton,
  // selectedDishName: state.product.selectedDishName
}))
export default class NewCommission extends Component {

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>人效管理</Breadcrumb.Item>
          <Breadcrumb.Item>提成方案</Breadcrumb.Item>
          <Breadcrumb.Item>创建方案</Breadcrumb.Item>
        </Breadcrumb>
        <hr />
        <NewCommissionSolutionForm />
      </div>
    );
  }
};
