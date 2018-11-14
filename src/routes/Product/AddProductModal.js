import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import AddProductModalForm from './AddProductModalForm';

@connect((state) => ({
  showAddModal: state.product.showAddModal,
  isEditProductType: state.product.isEditProductType,
}))
export default class AddProductModal extends Component {
  toggleShowAddModal = () => {
    this.props.dispatch({
      type: 'product/updateState',
      payload: {
        showAddModal: !this.props.showAddModal,
      },
    });
  }

  handleCancel = () => {
    this.toggleShowAddModal();
  }

  handleOk = () => {
    this.props.dispatch({
      type: 'product/addProductType'
    });
    // this.toggleShowAddModal();
  }

  render() {
    let title = "创建分类";
    if (this.props.isEditProductType) {
      title = '更新分类';
    }
    return (
      <Modal
        title={title}
        visible={this.props.showAddModal}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <AddProductModalForm />
      </Modal>
    )
  }
}
