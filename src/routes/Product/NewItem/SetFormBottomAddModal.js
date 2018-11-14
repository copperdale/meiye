import React, { Component } from 'react';
import { Modal, notification } from 'antd';
import { connect } from 'dva';
import SetFormBottomAddModalForm from './SetFormBottomAddModalForm.js';

@connect((state) => ({
  showSetFormBottomAddModal: state['product-new'].showSetFormBottomAddModal,
  SetFormBottomAddModalFormData: state['product-new'].SetFormBottomAddModalFormData,
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
    let SetFormBottomAddModalFormData = this.props.SetFormBottomAddModalFormData;
    let min = SetFormBottomAddModalFormData.orderMin.value;
    let max = SetFormBottomAddModalFormData.orderMax.value;
    let integerReg = /^\D$/;
    if (integerReg.test(min) || integerReg.test(max)) {
      notification.error({
        message: '至少必选和至多可选都只能输入数字',
      });
      return;
    }
    if (Number(min) >= Number(max)) {
      notification.error({
        message: '至少必选必须小于至多可选',
      });
      return;
    }
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
