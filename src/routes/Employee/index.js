import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ProductTypeLayout from './Layout';
import QueryForm from './QueryForm';
import SearchResult from './SearchResult';
import { hasAuthrity } from '../../utils/authority'


@connect((state) => ({
  // showNewButton: state.product.showNewButton,
  selectedRoleName: state.employee.selectedRoleName,
}))
export default class Employee extends Component {

  render() {
    let breadcrumbs=['店长', '员工列表'];
    if (this.props.selectedRoleName) {
      breadcrumbs.push(this.props.selectedRoleName);
    }
    console.log("hasAuthrity('USER_ADD')", hasAuthrity('USER_ADD'));
    return (
      <ProductTypeLayout
        breadcrumbs={breadcrumbs}
        actionButtons={
          hasAuthrity('USER_ADD')
          ?
          (
            <Button
              size="small" 
              style={{ float: 'right' }} 
              className="primary-blue primary-blue-button"
              onClick={() => {
                this.props.dispatch(routerRedux.push('/employee-new?isView=false&isEdit=false'));
              }}
            >新建员工
            </Button>
          )
          : ''
        }
      >
        <QueryForm />
        <SearchResult />
      </ProductTypeLayout>
    );
  }
};
