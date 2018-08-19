import React, { Component, Fragment } from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';

@connect((state) => ({
  SetFormBottomRightAddModalTableData: state['product-new'].SetFormBottomRightAddModalTableData,
}))
export default class AddProductModal extends Component {

  render() {
    return (
      <Fragment>
        SetFormBottomRightAddModalTableData
      </Fragment>
    )
  }
}
