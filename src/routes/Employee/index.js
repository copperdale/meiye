import React, { Component, Fragment } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ProductTypeLayout from './Layout';
// import QueryForm from './QueryForm';
// import SerachResult from './SearchResult';


@connect((state) => ({
  showNewButton: state.product.showNewButton,
  selectedDishName: state.product.selectedDishName
}))
export default class Product extends Component {

  render() {
    return (
      <ProductTypeLayout breadcrumbs={['品项列表', this.props.selectedDishName]} actionButtons={
        this.props.showNewButton
        &&
        <Button
          size="small" 
          style={{ float: 'right' }} 
          className="primary-blue primary-blue-button"
          onClick={() => { this.props.dispatch(routerRedux.push('/product-new')); }}
        >新建品项</Button>
      }>
        {/* <QueryForm />
        <SerachResult /> */}
      </ProductTypeLayout>
    );
  }
};
