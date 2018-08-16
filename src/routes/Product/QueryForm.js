import React from 'react';
import { Form, Input, Select, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

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
      <Form onSubmit={this.handleSubmit} layout="inline">
        <FormItem
          {...formItemLayout}
          label="类型"
        >
          {getFieldDecorator('type', {
            // rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input size="small" style={{ width: '120px' }} />
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
          {getFieldDecorator('no', {
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

const QueryForm = Form.create()(BasicForm);

export default QueryForm;
