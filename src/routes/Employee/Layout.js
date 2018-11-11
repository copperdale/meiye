import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Button, List, Breadcrumb, Modal, Spin, Popconfirm } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import QueryForm from './QueryForm';
// import SerachResult from './SearchResult';
import AddEmployeeModal from './AddEmployeeModal';

@connect((state) => ({
  // productList: state.employee.productList,
  selectedRoleId: state.employee.selectedRoleId,
  EmployeeRoleList: state.employee.EmployeeRoleList || [],
  showAddModal: state.employee.showAddModal,
  addEmployeeModalFormData: state.employee.addEmployeeModalFormData,
  permissions: state.employee.permissions,
  loading: !!state.loading.effects['employee/getEmployeeRoles'],
}))
export default class ProductTypeLayout extends Component {
  // componentDidMount() {
  //   debugger;
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'employee/getProductList',
  //   });
  // }
  deleteEmployeeRole = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'employee/deleteEmployeeRole',
      payload: {
        id,
      },
    });
  }

  toggleAddEmployeeModal = (isEditing = false, item = {}) => {
    this.props.dispatch({
      type: 'employee/getEmployeeRole',
      payload: {
        id: item.id,
      },
    });
    this.props.dispatch({
      type: 'employee/updateState',
      payload: {
        showAddModal: true,
        isEditing,
        // permissions: JSON.parse(JSON.stringify(permissions)),
        addEmployeeModalFormData: {
          code: { value: item.code || '' },
          name: { value: item.name || '' },
        },
        // addProductParentId: id,
        // isEditProductType,
        // addModalFormData: {
        //   name: { value: item.name || '' },
        //   no: { value: item.typeCode || '' },
        // },
      },
    });
  }

  updateSelectedRoleId = (id, selectedRoleName,  showNewButton) => {
    if (`${this.props.selectedRoleId}` === `${id}`) {
      // this.props.dispatch({
      //   type: 'employee/updateState',
      //   payload: {
      //     selectedRoleId: false,
      //     selectedRoleName: '',
      //     showNewButton: false,
      //   },
      // });
      // this.props.dispatch({
      //   type: 'employee/queryEmployee',
      // })
      return;
    }
    this.props.dispatch({
      type: 'employee/updateState',
      payload: {
        selectedRoleId: id,
        selectedRoleName,
        showNewButton,
      },
    });
    this.props.dispatch({
      type: 'employee/queryEmployee',
      payload: {
        selectedRoleId: id,
      },
    })
  }

  render() {
    return (
      <PageHeaderLayout>
        <Row gutter={8}>
          <Col span={7}>
            <Spin spinning={this.props.loading}>
              <Card bordered={false}>
                <div style={{ lineHeight: '32px', height: '32px' }}>
                  员工角色管理
                  <Button type="primary" style={{ float: 'right' }} onClick={() => { this.toggleAddEmployeeModal()}}>创建角色</Button>
                </div>
                <List
                  size="small"
                  itemLayout="horizontal"
                  split={false}
                  locale={{
                    emptyText: '暂无下级分类',
                  }}
                  dataSource={this.props.EmployeeRoleList}
                  renderItem={(subItem) => (
                    <List.Item actions={[
                      <a href="javascript:void(0)" onClick={() => { this.toggleAddEmployeeModal(true, subItem)}}>编辑</a>,
                      <Popconfirm
                        title="确定要删除这个角色吗?"
                        onConfirm={() => { this.deleteEmployeeRole(subItem.id) }}
                        okText="删除"
                        cancelText="取消"
                      >
                        <a
                          href="javascript:void(0)"
                        >删除
                        </a>
                      </Popconfirm>,
                    ]}
                    >
                      <span
                        className={this.props.selectedRoleId == subItem.id ? 'selected-type' : ''}
                        style={{ paddingLeft: '4px', borderLeft: '4px solid transparent', cursor: 'pointer' }}
                        onClick={() => { this.updateSelectedRoleId(subItem.id, subItem.name, true); }}
                      >{subItem.name}
                      </span>
                    </List.Item>
                  )}
                />
                
                {/* <div style={{ marginTop: '8px', padding: '0px 4px 0px 16px', height: '18px', lineHeight: '18px', textAlign: 'right' }}>
                  <span style={{ float: 'left', marginLeft: '4px' }}>护肤类</span>
                  <a href="javascript:void(0)">编辑</a>&nbsp;
                  <a href="javascript:void(0)">删除</a> &nbsp;
                </div> */}
              </Card>
            </Spin>
          </Col>
          <Col span={17}>
            <Card bordered={false}>
              <div>
                <Breadcrumb>
                  {this.props.breadcrumbs.map(item => (
                    <Breadcrumb.Item>{item}</Breadcrumb.Item>
                  ))}
                  {
                    this.props.actionButtons
                  }
                </Breadcrumb>
                <hr />
                {
                    this.props.children
                }
              </div>
            </Card>
          </Col>
        </Row>
        
        <AddEmployeeModal />
      </PageHeaderLayout>
    );
  }
};
