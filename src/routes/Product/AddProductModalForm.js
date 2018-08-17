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
          label="分类名称"
        >
          {getFieldDecorator('name', {
            // rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input size="default" style={{ width: '100%' }} />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="分类编码"
        >
          {getFieldDecorator('no', {
            // rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input size="default" style={{ width: '100%' }} />
            )}
        </FormItem>
      </Form>
    );
  }
}

const AddProductModalForm = Form.create({
  onFieldsChange(props, changedFields) {
    const addModalFormData = props.addModalFormData;
    Object.keys(changedFields).forEach((key) => {
      addModalFormData[key] = changedFields[key];
    })
    props.dispatch({
      type: 'product/updateState',
      payload: {
        addModalFormData,
      },
    })
  },
  mapPropsToFields(props) {
    const fields = 'name no'.split(' ');
    const result = {};
    fields.forEach((key) => {
      result[key] = Form.createFormField({
        ...props.addModalFormData[key],
        value: props.addModalFormData[key].value,
      })
    })
    return result;
  },
})(BasicForm);

// @connect((state) => ({
//   addModalFormData: state.product.addModalFormData,
// }))
export default connect((state) => {
  return {
    addModalFormData: state.product.addModalFormData,
  }
})(AddProductModalForm);
