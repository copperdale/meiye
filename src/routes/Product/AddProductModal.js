import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import AddProductModalForm from './AddProductModalForm';

@connect((state) => ({
  showAddModal: state.product.showAddModal,
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
    this.toggleShowAddModal();
  }

  render() {
    return (
      <Modal
        title="创建分类"
        visible={this.props.showAddModal}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <AddProductModalForm />
      </Modal>
    )
  }
}
