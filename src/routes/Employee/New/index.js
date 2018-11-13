import React, { Component, Fragment } from 'react';
import { Breadcrumb } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import NewEmployeeForm from './NewEmployeeForm';


@connect((state) => ({
  // showNewButton: state.product.showNewButton,
  // selectedDishName: state.product.selectedDishName
  isView: state['employee-new'].isView,
  isEdit: state['employee-new'].isEdit,
}))
export default class Product extends Component {

  render() {
    let title = '新建员工';
    if (this.props.isView) {
      title = '查看员工';
    }
    if (this.props.isEdit) {
      title = '编辑员工';
    }
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>员工管理</Breadcrumb.Item>
          <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb>
        <hr />
        <NewEmployeeForm />
      </div>
    );
  }
};
