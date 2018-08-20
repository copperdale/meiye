import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;

class BasicForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    // this.props.form.validateFields((err, fieldsValue) => {
    //   if (err) {

    //   }

    //   // Should format date value before submit.

    // });
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
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="分组名称"
        >
          {getFieldDecorator('name', {
            // rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input size="default" style={{ width: '100%' }} />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="至少比选"
        >
          {getFieldDecorator('orderMin', {
            // rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input size="default" style={{ width: '100%' }} />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="至多可选"
        >
          {getFieldDecorator('orderMax', {
            // rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input size="default" style={{ width: '100%' }} />
            )}
        </FormItem>
      </Form>
    );
  }
}

const SetFormBottomAddModalForm = Form.create({
  onFieldsChange(props, changedFields) {
    const SetFormBottomAddModalFormData = props.SetFormBottomAddModalFormData;
    Object.keys(changedFields).forEach((key) => {
      SetFormBottomAddModalFormData[key] = changedFields[key];
    })
    props.dispatch({
      type: 'product/updateState',
      payload: {
        SetFormBottomAddModalFormData,
      },
    })
  },
  mapPropsToFields(props) {
    const fields = 'name orderMin orderMax'.split(' ');
    const result = {};
    fields.forEach((key) => {
      result[key] = Form.createFormField({
        ...props.SetFormBottomAddModalFormData[key],
        value: props.SetFormBottomAddModalFormData[key].value,
      })
    })
    return result;
  },
})(BasicForm);

// @connect((state) => ({
//   SetFormBottomAddModalFormData: state.product.SetFormBottomAddModalFormData,
// }))
export default connect((state) => {
  return {
    SetFormBottomAddModalFormData: state['product-new'].SetFormBottomAddModalFormData,
  }
})(SetFormBottomAddModalForm);

