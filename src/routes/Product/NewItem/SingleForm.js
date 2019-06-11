import React, { Fragment } from 'react';
import { Form, Input, Select, Button, Icon } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './index.less'
import { checkPriceIsValid } from '../../../utils/utils.js'
import SupplierInfoInput from './SupplierInfoInput';

const FormItem = Form.Item;
const Option = Select.Option;

class BasicForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (!fieldsValue.purchaseAndSaleBo_type.length) {
        delete err.purchaseAndSaleBo_sourceId;
        delete err.purchaseAndSaleBo_purchasePrice;
        delete err.purchaseAndSaleBo_number;
        if (!Object.keys(err).length) {
          err = false;
        }
      }

      if (fieldsValue.purchaseAndSaleBo_type[0] === '2') {
        delete err.purchaseAndSaleBo_sourceId;
        delete err.purchaseAndSaleBo_purchasePrice;
        if (!Object.keys(err).length) {
          err = false;
        }
      }

      if (!err) {
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

      // Should format date value before submit.

    });
  }

  addAddon = () => {
    let singleFormData = JSON.parse(JSON.stringify(this.props.singleFormData));
    singleFormData.addons.push({ name: '', reprice: '' });
    this.props.dispatch({
      type: 'product-new/updateState',
      payload: {
        singleFormData
      }
    });
  }

  deleteAddons = (index) => {
    let singleFormData = JSON.parse(JSON.stringify(this.props.singleFormData));
    singleFormData.addons = singleFormData.addons.filter((item, cIndex) => index !== cIndex);
    this.props.dispatch({
      type: 'product-new/updateState',
      payload: {
        singleFormData
      }
    });
  }

  updateAddons = (index, key, value) => {
    let singleFormData = JSON.parse(JSON.stringify(this.props.singleFormData));
    singleFormData.addons = singleFormData.addons.map((item, cIndex) => {
      let result = JSON.parse(JSON.stringify(item));
      if (cIndex === index) {
        result[key] = value;
      }
      return result;
    });
    this.props.dispatch({
      type: 'product-new/updateState',
      payload: {
        singleFormData
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      colon: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        {
          !this.props.isView
          &&
          <FormItem>
            <Button htmlType="submit" style={{ float: 'right', marginLeft: '4px' }} className="primary-blue primary-blue-button">保存</Button>
            <Button
              style={{ float: 'right', marginLeft: '4px' }}
              onClick={() => { 
                this.props.dispatch({
                  type: 'product/queryProductType'
                });
                this.props.dispatch(routerRedux.push('/product')); 
              }}
            >取消</Button>
          </FormItem>
        }
        <FormItem
          {...formItemLayout}
          label={
            <span className={styles['section-title']}>基础信息</span>
          }
        />
        
        <FormItem
          {...formItemLayout}
          label="品项名称"
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, max: 20, message: '请输入品项名称(最多20个字符)' }],
          })(
            <Input disabled={this.props.isView} />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="品项编码"
        >
          {getFieldDecorator('code', {
            rules: [{ required: true, max: 20, message: '请输入品项编码(最多20个字符)' }],
          })(
            <Input disabled={this.props.isView} />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="品项分类"
        >
          {this.props.addtype === '0' ? '单品' : '套餐'}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="售卖价格"
        >
          {getFieldDecorator('price', {
            rules: [
              { required: true, message: '请输入售卖价格' },
              { validator: checkPriceIsValid }
            ],
          })(
            <Input disabled={this.props.isView} />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="库存数量"
        >
          <span
            style={{ width: '120px', display: 'inline-block' }}
          >{this.props.singleFormData.amount && this.props.singleFormData.amount.value}</span>
          &nbsp;
          单位&nbsp;
          {getFieldDecorator('unit', {
            rules: [{ max: 4, message: '最多输入4个字符' }],
          })(
            <Input style={{width: '120px'}} disabled={this.props.isView} />
            )}
        </FormItem>
        <SupplierInfoInput {...this.props} formItemLayout={formItemLayout} />
        <FormItem
          {...formItemLayout}
          label={
            <span className={styles['section-title']}>加项</span>
          }
        >
          {
            !this.props.isView
            &&
            <Button onClick={this.addAddon} className="primary-blue primary-blue-button">添加加项</Button>
          }
        </FormItem>
        {
          this.props.singleFormData.addons.map((item, index) => {
            return (
              <Fragment>
                <FormItem
                  {...formItemLayout}
                  label="加项名称"
                  required
                >
                  <Input 
                    disabled={this.props.isView}
                    value={item.name}
                    onChange={(e) => {this.updateAddons(index, 'name', e.target.value)}}
                    addonAfter={!this.props.isView && <Icon onClick={() => { this.deleteAddons(index) }} type="delete" />} 
                  />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="加项价格"
                  required
                >
                  <Input
                    disabled={this.props.isView}
                    value={item.reprice}
                    onChange={(e) => {this.updateAddons(index, 'reprice', e.target.value)}}
                  />
                </FormItem>
              </Fragment>
            );
          })
        }
      </Form>
    );
  }
}

const SingleForm = Form.create({
  onFieldsChange(props, changedFields) {
    const singleFormData = props.singleFormData;
    if (changedFields.purchaseAndSaleBo_type && changedFields.purchaseAndSaleBo_type.value.length === 2) {
      changedFields.purchaseAndSaleBo_type.value.splice(0, 1);
    }
    Object.keys(changedFields).forEach((key) => {
      singleFormData[key] = changedFields[key];
    })
    props.dispatch({
      type: 'product-new/updateState',
      payload: {
        singleFormData,
      },
    })
  },
  mapPropsToFields(props) {
    const fields = 'name code type price unit amount purchaseAndSaleBo_purchasePrice purchaseAndSaleBo_number purchaseAndSaleBo_sourceName purchaseAndSaleBo_sourceId purchaseAndSaleBo_type'.split(' ');
    const result = {};
    fields.forEach((key) => {
      result[key] = Form.createFormField({
        ...props.singleFormData[key],
        value: props.singleFormData[key] &&　props.singleFormData[key].value || '',
      })
    })
    return result;
  },
})(BasicForm);

export default connect((state) => {
  return {
    singleFormData: state['product-new'].singleFormData,
    addtype: state['product-new'].addtype,
    isView: state['product-new'].isView,
    isEdit: state['product-new'].isEdit,
  }
})(SingleForm);
