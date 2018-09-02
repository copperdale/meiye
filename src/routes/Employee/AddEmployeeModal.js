import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import AddEmployeeModalForm from './AddEmployeeModalForm';

@connect((state) => ({
  showAddModal: state.employee.showAddModal,
}))
export default class AddEployeeModal extends Component {

  toggleShowAddModal = () => {
    this.props.dispatch({
      type: 'employee/updateState',
      payload: {
        showAddModal: !this.props.showAddModal,
      },
    });
  }

  handleCancel = () => {
    this.toggleShowAddModal();
  }

  render() {
    return (
      <Modal
        title="创建角色"
        visible={this.props.showAddModal}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        // okText="保存"
        // cancelText="取消"
        footer={null}
      >
        <AddEmployeeModalForm />
      </Modal>
    )
  }
}
