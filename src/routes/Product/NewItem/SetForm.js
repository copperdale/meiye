import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './index.less'
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
            rules: [
              { required: true, max: 20, message: '请输入品项名称(最多输入20个字符)' }
            ],
          })(
            <Input disabled={this.props.isView} />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="品项编码"
        >
          {getFieldDecorator('code', {
            rules: [{ required: true, max: 20, message: '请输入品项编码(最多输入20个字符)' }],
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
            rules: [{ required: true, message: '请输入售卖价格' }],
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
          >{this.props.setFormData.amount && this.props.setFormData.amount.value}</span>
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
            <span className={styles['section-title']}>子品项</span>
          }
        />
      </Form>
        // <FormItem>
        //   <Button type="primary" htmlType="submit">查询</Button>
        // </FormItem>
    );
  }
}

const SetForm = Form.create({
  onFieldsChange(props, changedFields) {
    const setFormData = props.setFormData;
    if (changedFields.purchaseAndSaleBo_type && changedFields.purchaseAndSaleBo_type.value.length === 2) {
      changedFields.purchaseAndSaleBo_type.value.splice(0, 1);
    }
    Object.keys(changedFields).forEach((key) => {
      setFormData[key] = changedFields[key];
    })
    props.dispatch({
      type: 'product-new/updateState',
      payload: {
        setFormData,
      },
    })
  },
  mapPropsToFields(props) {
    const fields = 'name code type price unit amount purchaseAndSaleBo_purchasePrice purchaseAndSaleBo_number purchaseAndSaleBo_sourceName purchaseAndSaleBo_sourceId purchaseAndSaleBo_type'.split(' ');
    const result = {};
    fields.forEach((key) => {
      result[key] = Form.createFormField({
        ...props.setFormData[key],
        value: props.setFormData[key] &&　props.setFormData[key].value || '',
      })
    })
    return result;
  },
})(BasicForm);

export default connect((state) => {
  return {
    setFormData: state['product-new'].setFormData,
    addtype: state['product-new'].addtype,
    isEdit: state['product-new'].isEdit,
    isView: state['product-new'].isView,
  }
})(SetForm);
