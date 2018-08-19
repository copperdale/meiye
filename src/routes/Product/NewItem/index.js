import React, { Component, Fragment } from 'react';
import { Button, Radio } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ProductTypeLayout from '../Layout';
import SingleForm from './SingleForm'
import SetForm from './SetForm'
import SetFormBottom from './SetFormBottom'

const RadioGroup = Radio.Group

@connect((state) => ({
    addtype: state['product-new'].addtype,
    isEdit: state['product-new'].isEdit
  }))
export default class NewItem extends Component {

  save = () => {
    this.props.dispatch({
      type: 'product-new/new',
    });
}
  render() {
      console.log(this.props.addtype)
    return (
      <ProductTypeLayout breadcrumbs={['品项', this.props.isEdit ? '编辑品项' : '新建品项']} actionButtons={
        [
            <Button
                size="small"
                style={{ float: 'right', marginLeft: '4px' }}
                onClick={() => { this.props.dispatch(routerRedux.push('/product')); }}
            >取消</Button>,
            <Button onClick={this.save} size="small" style={{ float: 'right', marginLeft: '4px' }} className="primary-blue primary-blue-button">保存</Button>,
        ]
      }>
        <RadioGroup onChange={(e) => {
            this.props.dispatch({
                type: 'product-new/updateState',
                payload: {
                    addtype: e.target.value
                }
            })
        }} value={this.props.addtype}>
            <Radio value={'0'}>单品</Radio>
            <Radio value={'1'}>套餐</Radio>
        </RadioGroup>
        {
            this.props.addtype === '0' ?
            <SingleForm /> :
            <Fragment>
                <SetForm />
                <SetFormBottom />
            </Fragment>
        }
      </ProductTypeLayout>
    );
  }
};