import React, { Component, Fragment } from 'react';
import { Button, Radio, Row, Col, Card, List } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import SetFormBottomRight from './SetFormBottomRight'
import SetFormBottomAddModal from './SetFormBottomAddModal'
import SetFormBottomRightAddModal from './SetFormBottomRightAddModal'


const RadioGroup = Radio.Group

@connect((state) => ({
    addtype: state['product-new'].addtype,
    dishSetmealGroupBos: state['product-new'].setFormData.dishSetmealGroupBos,
    selectedSetProductType: state['product-new'].selectedSetProductType,
    setProductTypeToBeEdit: state['product-new'].setProductTypeToBeEdit,
  }))
export default class NewItem extends Component {

  save = () => {
    this.props.dispatch({
      type: 'product-new/new',
    });
  }
  
  updateSetProductTypeToBeEdit = (setProductTypeToBeEdit) => {
    this.props.dispatch({
      type: 'product-new/updateState',
      payload: {
        setProductTypeToBeEdit,
      },
    });
  }
  
  updateSelectedSetProductType = (selectedSetProductType) => {
    this.props.dispatch({
      type: 'product-new/updateState',
      payload: {
        selectedSetProductType: JSON.parse(JSON.stringify(selectedSetProductType)),
      },
    });
  }

  toggleShowSetFormBottomAddModal = () => {
    this.props.dispatch({
      type: 'product-new/updateState',
      payload: {
        showSetFormBottomAddModal: !this.props.showSetFormBottomAddModal,
      },
    });
  }

  render() {

    return (
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false}>
            <Fragment>
              <div style={{ marginTop: '8px', padding: '0px 4px', backgroundColor: '#ccc', height: '32px', lineHeight: '32px', textAlign: 'right' }}>
                <span style={{ float: 'left' }}>子品项分组</span>
                <Button size="small" type="primary" onClick={() => { this.toggleShowSetFormBottomAddModal()}}>创建子品项</Button>
              </div>
              <List
                size="small"
                itemLayout="horizontal"
                split={false}
                locale={{
                  emptyText: '暂无下级分类',
                }}
                dataSource={this.props.dishSetmealGroupBos}
                renderItem={(subItem) => (
                  <List.Item actions={[
                    <a href="javascript:void(0)" onClick={() => { this.updateSetProductTypeToBeEdit(subItem)}}>编辑</a>,
                    <a href="javascript:void(0)" onClick={() => { this.deleteProduct(subItem.id) }}>删除</a>,
                  ]}
                  >
                    <span
                      className={
                        (
                          this.props.selectedSetProductType.name == subItem.name
                          || (this.props.selectedSetProductType.id && this.props.selectedSetProductType.id === subItem.id)
                        )
                        ? 'selected-type' : ''}
                      style={{ paddingLeft: '20px', cursor: 'pointer' }}
                      onClick={() => { this.updateSelectedSetProductType(subItem); }}
                    >{subItem.name}
                    </span>
                  </List.Item>
                )}
              />
            </Fragment>
            
            {/* <div style={{ marginTop: '8px', padding: '0px 4px 0px 16px', height: '18px', lineHeight: '18px', textAlign: 'right' }}>
              <span style={{ float: 'left', marginLeft: '4px' }}>护肤类</span>
              <a href="javascript:void(0)">编辑</a>&nbsp;
              <a href="javascript:void(0)">删除</a> &nbsp;
            </div> */}
          </Card>
          <SetFormBottomAddModal />
        </Col>
        <Col span={16}>
          <Card bordered={false}>
            <SetFormBottomRight />
            <SetFormBottomRightAddModal />
          </Card>
        </Col>
      </Row>
    );
  }
};