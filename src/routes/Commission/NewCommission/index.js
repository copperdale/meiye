import React, { Component, Fragment } from 'react';
import { Breadcrumb, Spin } from 'antd';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router';
import NewCommissionSolutionForm from './NewCommissionSolutionForm';


@connect((state) => ({
  // showNewButton: state.product.showNewButton,
  // selectedDishName: state.product.selectedDishName
  loading: !!state.loading.models['commission-new'],
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
        <Spin spinning={this.props.loading}>
          <NewCommissionSolutionForm />
        </Spin>
      </div>
    );
  }
};
