import React, { Component, Fragment } from 'react';
import { Button, Radio, Row, Col, Card, List } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ProductTypeLayout from '../Layout';
import SingleForm from './SingleForm'
import SetForm from './SetForm'

const RadioGroup = Radio.Group

@connect((state) => ({
    addtype: state['product-new'].addtype,
    productList: state.product.productList,
    selecteDishTypeId: state.product.selecteDishTypeId,
  }))
export default class NewItem extends Component {

  save = () => {
    this.props.dispatch({
      type: 'product-new/new'
    });
}
  render() {
    return (
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false}>
            {
              this.props.productList.map(item => (
                <Fragment>
                  <div style={{ marginTop: '8px', padding: '0px 4px', backgroundColor: '#ccc', height: '32px', lineHeight: '32px', textAlign: 'right' }}>
                    <span
                      className={this.props.selecteDishTypeId == item.id ? 'selected-type' : ''}
                      style={{ float: 'left', marginLeft: '4px', cursor: 'pointer' }}
                      onClick={() => { this.updateSelecteDishTypeId(item.id, item.name, false) }}
                    >{item.name}</span>
                    <Button size="small" type="primary" onClick={() => { this.toggleAddProductModal(item.id)}}>创建子品项</Button>
                  </div>
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
                          style={{ paddingLeft: '20px', cursor: 'pointer' }}
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
        <Col span={16}>
          <Card bordered={false}>
            
          </Card>
        </Col>
      </Row>
    );
  }
};