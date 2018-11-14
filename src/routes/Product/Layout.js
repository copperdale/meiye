import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Button, List, Breadcrumb, Spin, Popconfirm } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import AddProductModal from './AddProductModal';
import { hasAuthrity } from '../../utils/authority';

@connect((state) => ({
  productList: state.product.productList,
  selecteDishTypeId: state.product.selecteDishTypeId,
  productListLoading: !!state.loading.effects['product/getProductList'],
}))

export default class ProductTypeLayout extends Component { // eslint-disable-line
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
      type: 'product/deleteProduct',
      payload: {
        id,
      },
    });
  }

  toggleAddProductModal = (id, isEditProductType = false, item = {}) => {
    this.props.dispatch({
      type: 'product/updateState',
      payload: {
        showAddModal: true,
        addProductParentId: id,
        isEditProductType,
        addModalFormData: {
          name: { value: item.name || '' },
          no: { value: item.typeCode || '' },
        },
      },
    });
  }
  
  updateSelecteDishTypeId = (id, selectedDishName,  showNewButton) => {
    if (`${this.props.selecteDishTypeId}` === `${id}`) {
      // this.props.dispatch({
      //   type: 'product/updateState',
      //   payload: {
      //     selecteDishTypeId: false,
      //     selectedDishName,
      //     showNewButton,
      //   },
      // });
      // this.props.dispatch({
      //   type: 'product/queryProductType',
      // });
      return;
    }
    this.props.dispatch({
      type: 'product/updateState',
      payload: {
        selecteDishTypeId: id,
        selectedDishName,
        showNewButton,
      },
    });
    this.props.dispatch({
      type: 'product/queryProductType',
      payload: {
        selecteDishTypeId: id,
      },
    });
  }

  render() {
    // console.log(this.props.selecteDishTypeId, this.props.productList)
    return (
      <PageHeaderLayout>
        <Spin spinning={this.props.productListLoading}>
          <Row gutter={8}>
            <Col span={7}>
              <Card bordered={false}>
                <h4>品项类别管理</h4>
                <div style={{ lineHeight: '32px', height: '32px' }}>
                  一级分类{this.props.productList.length}个
                  {
                    hasAuthrity('DISH_ADD_GROUP')
                    && 
                    <Button type="primary" style={{ float: 'right' }} onClick={() => { this.toggleAddProductModal(); }}>创建一级分类</Button>
                  }
                </div>
                {
                  this.props.productList.map(item => (
                    <Fragment>
                      <div style={{ marginTop: '8px', padding: '0px 4px 0 0', backgroundColor: '#ccc', height: '32px', lineHeight: '32px', textAlign: 'right' }}>
                        <span
                          className={`${this.props.selecteDishTypeId}` === `${item.id}` ? 'selected-type' : ''}
                          style={{ float: 'left', paddingLeft: '4px', borderLeft: '4px solid transparent', cursor: 'pointer' }}
                          onClick={() => { this.updateSelecteDishTypeId(item.id, item.name, false) }}
                        >{item.name}
                        </span>
                        {
                          hasAuthrity('DISH_MODIFY')
                          &&
                          <a href="javascript:void(0)" onClick={() => { this.toggleAddProductModal(item.id, true, item)}}>编辑</a>
                        }
                        &nbsp;
                        {
                          hasAuthrity('DISH_DELETE')
                          &&
                          <Popconfirm
                            title="确定要删除这条记录吗?"
                            onConfirm={() => { this.deleteProduct(item.id) }}
                            okText="删除"
                            cancelText="取消"
                          >
                            <a
                              href="javascript:void(0)"
                            >删除</a>
                          </Popconfirm>
                        }
                        &nbsp;
                        {
                          hasAuthrity('DISH_ADD')
                          &&
                          <Button size="small" type="primary" onClick={() => { this.toggleAddProductModal(item.id)}}>添加下一级分类</Button>
                        }
                      </div>
                      <List
                        size="small"
                        itemLayout="horizontal"
                        split={false}
                        locale={{
                          emptyText: '暂无下级分类',
                        }}
                        dataSource={item.dishBrandTypeBoList}
                        renderItem={(subItem) => (
                          <List.Item actions={[
                            <a href="javascript:void(0)" onClick={() => { this.toggleAddProductModal(subItem.id, true, subItem)}}>编辑</a>,
                            // <a href="javascript:void(0)" onClick={() => { this.deleteProduct(subItem.id) }}>删除</a>,
                            <Popconfirm
                              title="确定要删除这条记录吗?"
                              onConfirm={() => { this.deleteProduct(subItem.id) }}
                              okText="删除"
                              cancelText="取消"
                            >
                              <a
                                href="javascript:void(0)"
                              >删除</a>
                            </Popconfirm>
                          ]}
                          >
                            <span
                              className={`${this.props.selecteDishTypeId}` === `${subItem.id}` ? 'selected-type' : ''}
                              style={{ paddingLeft: '4px', borderLeft: '4px solid transparent', cursor: 'pointer' }}
                              onClick={() => { this.updateSelecteDishTypeId(subItem.id, subItem.name, true); }}
                            >{subItem.name}
                            </span>
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
          <AddProductModal />
        </Spin>
      </PageHeaderLayout>
    );
  }
};
