import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Button, List, Breadcrumb, Modal } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import QueryForm from './QueryForm';
// import SerachResult from './SearchResult';
import AddEmployeeModal from './AddEmployeeModal';

@connect((state) => ({
  // productList: state.product.productList,
  // selecteDishTypeId: state.product.selecteDishTypeId,
}))
export default class ProductTypeLayout extends Component {
  // componentDidMount() {
  //   debugger;
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'product/getProductList',
  //   });
  // }
  deleteProduct = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'employee/deleteProduct',
      payload: {
        id
      }
    });
  }
  toggleAddEmployeeModal = (id, isEditProductType = false, item = {}) => {
    this.props.dispatch({
      type: 'employee/updateState',
      payload: {
        showAddModal: true,
        // addProductParentId: id,
        // isEditProductType,
        // addModalFormData: {
        //   name: { value: item.name || '' },
        //   no: { value: item.typeCode || '' },
        // },
      },
    });
  }
  updateSelecteDishTypeId = (id, selectedDishName,  showNewButton) => {
    this.props.dispatch({
      type: 'employee/updateState',
      payload: {
        selecteDishTypeId: id,
        selectedDishName,
        showNewButton
      }
    });
  }

  render() {
    // console.log(this.props.selecteDishTypeId, this.props.productList)
    return (
      <PageHeaderLayout>
        <Row gutter={8}>
          <Col span={7}>
            <Card bordered={false}>
              <div style={{ lineHeight: '32px', height: '32px' }}>
                员工角色管理
                <Button type="primary" style={{ float: 'right' }} onClick={() => { this.toggleAddEmployeeModal()}}>创建角色</Button>
              </div>
              {
                (this.props.productList || []).map(item => (
                  <Fragment>
                    <List
                      size="small"
                      itemLayout="horizontal"
                      split={false}
                      locale={{
                        emptyText: '暂无下级分类'
                      }}
                      dataSource={item.dishBrandTypeBoList}
                      renderItem={(subItem) => (
                        <List.Item actions={[
                          <a href="javascript:void(0)" onClick={() => { this.toggleAddProductModal(subItem.id, true, subItem)}}>编辑</a>,
                          <a href="javascript:void(0)" onClick={() => { this.deleteProduct(subItem.id) }}>删除</a>,
                        ]}
                        >
                          <span
                            className={this.props.selecteDishTypeId == subItem.id ? 'selected-type' : ''}
                            style={{ paddingLeft: '4px', borderLeft: '4px solid transparent', cursor: 'pointer' }}
                            onClick={() => { this.updateSelecteDishTypeId(subItem.id, subItem.name, true); }}
                          >{subItem.name}</span>
                        </List.Item>
                      )}
                    />
                  </Fragment>
                ))
              }
              
              {/* <div style={{ marginTop: '8px', padding: '0px 4px 0px 16px', height: '18px', lineHeight: '18px', textAlign: 'right' }}>
                <span style={{ float: 'left', marginLeft: '4px' }}>护肤类</span>
                <a href="javascript:void(0)">编辑</a>&nbsp;
                <a href="javascript:void(0)">删除</a> &nbsp;
              </div> */}
            </Card>
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
