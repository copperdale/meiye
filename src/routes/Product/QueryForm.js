import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;

class BasicForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.props.dispatch({
          type: 'product/queryProductType'
        });
      }

      // Should format date value before submit.

    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
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
      <Form onSubmit={this.handleSubmit} layout="inline">
        <FormItem
          {...formItemLayout}
          label="类型"
        >
          {getFieldDecorator('type', {
            // rules: [{ required: true, message: 'Please input your note!' }],
            initialValue: '0'
          })(
            <Select size="small" style={{ width: '120px' }}>
              <Option value='0'>单品</Option>
              <Option value='1'>套餐</Option>
            </Select>
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="品项名称"
        >
          {getFieldDecorator('name', {
            // rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input size="small" style={{ width: '120px' }} />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="品项编码"
        >
          {getFieldDecorator('dishCode', {
            // rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input size="small" style={{ width: '120px' }} />
            )}
        </FormItem>
        <FormItem>
          <Button size="small" type="primary" htmlType="submit">查询</Button>
        </FormItem>
      </Form>
    );
  }
}

const QueryForm = Form.create({
  onFieldsChange(props, changedFields) {
    const queryFormData = props.queryFormData;
    Object.keys(changedFields).forEach((key) => {
      queryFormData[key] = changedFields[key];
    })
    props.dispatch({
      type: 'product/updateState',
      payload: {
        queryFormData,
      },
    })
  },
  mapPropsToFields(props) {
    const fields = 'name dishCode type'.split(' ');
    const result = {};
    fields.forEach((key) => {
      result[key] = Form.createFormField({
        ...props.queryFormData[key],
        value: props.queryFormData[key].value,
      })
    })
    return result;
  },
})(BasicForm);

export default connect((state) => {
  return {
    queryFormData: state.product.queryFormData,
  }
})(QueryForm);
