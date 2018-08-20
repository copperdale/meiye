import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import SetFormBottomRightAddModalTable from './SetFormBottomRightAddModalTable';

@connect((state) => ({
  showSetFormBottomRightAddModal: state['product-new'].showSetFormBottomRightAddModal,
}))
export default class AddProductModal extends Component {
  toggleShowAddModal = () => {
    this.props.dispatch({
      type: 'product-new/updateState',
      payload: {
        showSetFormBottomRightAddModal: !this.props.showSetFormBottomRightAddModal,
      },
    });
  }

  handleCancel = () => {
    this.toggleShowAddModal();
  }

  handleOk = () => {
    // this.props.dispatch({
    //   type: 'product/addProductType'
    // });
    // this.toggleShowAddModal();
  }

  render() {
    return (
      <Modal
        title="选择品项"
        visible={this.props.showSetFormBottomRightAddModal}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="保存"
        cancelText="取消"
      >
        <SetFormBottomRightAddModalTable />
      </Modal>
    )
  }
}
