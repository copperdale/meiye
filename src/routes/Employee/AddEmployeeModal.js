import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import AddEmployeeModalForm from './AddEmployeeModalForm';

@connect((state) => ({
  showAddModal: state.employee.showAddModal,
  isEditing: state.employee.isEditing,
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
    let title = '创建角色';
    if (this.props.isEditing) {
      title = '更新角色';
    }
    return (
      <Modal
        title={title}
        visible={this.props.showAddModal}
        onCancel={this.handleCancel}
        // okText="保存"
        // cancelText="取消"
        footer={null}
        width={900}
      >
        <AddEmployeeModalForm />
      </Modal>
    )
  }
}
