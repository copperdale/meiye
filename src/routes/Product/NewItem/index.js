import React, { Component, Fragment } from 'react';
import { Button, Radio } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router'
import { routerRedux } from 'dva/router';
import ProductTypeLayout from '../Layout';
import SingleForm from './SingleForm'
import SetForm from './SetForm'
import SetFormBottom from './SetFormBottom'

const RadioGroup = Radio.Group

@connect((state) => ({
    addtype: state['product-new'].addtype,
    isEdit: state['product-new'].isEdit,
    isView: state['product-new'].isView,
    id: state['product-new'].id,
    selecteDishTypeId: state.product.selecteDishTypeId,
  }))
export default class NewItem extends Component {

  // save = () => {
  //   if (this.props.isEdit) {
  //     this.props.dispatch({
  //       type: 'product-new/update',
  //     });
  //   } else {
  //     this.props.dispatch({
  //       type: 'product-new/new',
  //     });
  //   }
  // }
  
  render() {
    // console.log(this.props.addtype)
    let title = '新建品项';
    if (this.props.isEdit) { title = '编辑品项'; }
    if (this.props.isView) { title = '品项详情'; }

    let actionButtons = [
    ];
    if (this.props.isView) {
      actionButtons.push(
        <Button size="small" className="primary-blue primary-blue-button" style={{ float: 'right' }}>
          <Link
            to={{
              pathname: '/product-new',
              search: `selecteDishTypeId=${this.props.selecteDishTypeId}&isEdit=1&id=${this.props.id}&addtype=${this.props.addtype}`
            }}
          >编辑</Link>
        </Button>
      );
      actionButtons.push(
        <Button
          style={{ float: 'right', marginRight: '8px' }}
          size="small"
          onClick={() => {
            this.props.dispatch({
              type: 'product/queryProductType'
            });
            this.props.dispatch(routerRedux.push('/product'));
          }}
        >返回
        </Button>
      );
    }
    return (
      <ProductTypeLayout
        breadcrumbs={[
          (
            <Link className="primary-blue"
              to={{
                pathname: '/product'
              }}
            >品项</Link>
          ),
          title
        ]}
        actionButtons={ actionButtons }
      >
        {
          (this.props.isView || this.props.isEdit)
          ?
          (this.props.addtype === '0' ? '单品' : '套餐')
          :
          (<RadioGroup onChange={(e) => {
              this.props.dispatch({
                  type: 'product-new/updateState',
                  payload: {
                      addtype: e.target.value
                  }
              })
          }} value={this.props.addtype}>
              <Radio value={'0'}>单品</Radio>
              <Radio value={'1'}>套餐</Radio>
          </RadioGroup>)
        }
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