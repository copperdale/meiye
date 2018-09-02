import React, { Component, Fragment } from 'react';
import { Button, Radio } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router'
import { routerRedux } from 'dva/router';

const RadioGroup = Radio.Group

@connect((state) => ({
    addtype: state['product-new'].addtype,
    isEdit: state['product-new'].isEdit,
    isView: state['product-new'].isView,
    id: state['product-new'].id
  }))
export default class NewItem extends Component {

  save = () => {
    if (this.props.isEdit) {
      this.props.dispatch({
        type: 'product-new/update',
      });
    } else {
      this.props.dispatch({
        type: 'product-new/new',
      });
    }
  }
  
  render() {
    // console.log(this.props.addtype)
    let title = '新建品项';
    if (this.props.isEdit) { title = '编辑品项'; }
    if (this.props.isView) { title = '品项详情'; }

    
    return (
      <div>setting</div>
    );
  }
};