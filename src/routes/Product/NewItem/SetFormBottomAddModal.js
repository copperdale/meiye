import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import SetFormBottomAddModalForm from './SetFormBottomAddModalForm.js';

@connect((state) => ({
  showSetFormBottomAddModal: state['product-new'].showSetFormBottomAddModal,
}))
export default class SetFormBottomAddModal extends Component {
  toggleShowAddModal = () => {
    this.props.dispatch({
      type: 'product-new/updateState',
      payload: {
        showSetFormBottomAddModal: !this.props.showSetFormBottomAddModal,
      },
    });
  }

  handleCancel = () => {
    this.toggleShowAddModal();
  }

  handleOk = () => {
    this.props.dispatch({
      type: 'product-new/newSubType',
    });
    this.toggleShowAddModal();
  }

  render() {
    return (
      <Modal
        title="创建子品项组"
        visible={this.props.showSetFormBottomAddModal}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="保存"
        cancelText="取消"
      >
        <SetFormBottomAddModalForm />
      </Modal>
    )
  }
}
