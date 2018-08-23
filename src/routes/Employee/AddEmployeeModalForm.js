import React, { Fragment } from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
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

  toggleShowAddModal = () => {
    this.props.dispatch({
      type: 'employee/updateState',
      payload: {
        showAddModal: !this.props.showAddModal,
      },
    });
  }

  handleCancel = () => {
    this.toggleShowAddModal();
  }

  handleOk = () => {
    this.props.dispatch({
      type: 'employee/addProductType'
    });
    // this.toggleShowAddModal();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      colon: false,
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="角色名称"
        >
          {getFieldDecorator('name', {
            // rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input size="small" style={{ width: '100%' }} />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="角色编码"
        >
          {getFieldDecorator('no', {
            // rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input size="small" style={{ width: '100%' }} />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <span>角色权限</span>
          }
        >
        </FormItem>
        <FormItem
          // {...formItemLayout}
          labelCol= {{
            xs: { span: 24 },
            sm: { span: 8 },
          }}
          wrapperCol= {{
            xs: { span: 24 },
            sm: { span: 24 },
          }}
          colon={false}
          label="商家后台操作权限"
        >
          {getFieldDecorator('no', {
            // rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={8}><Checkbox value="A">登陆</Checkbox></Col>
                <Col span={8}><Checkbox value="B">查看品项</Checkbox></Col>
                <Col span={8}><Checkbox value="C">添加品项</Checkbox></Col>
                <Col span={8}><Checkbox value="D">编辑品项</Checkbox></Col>
                <Col span={8}><Checkbox value="E">报表查看</Checkbox></Col>
                <Col span={8}><Checkbox value="F">创建角色</Checkbox></Col>
                <Col span={8}><Checkbox value="G">添加员工</Checkbox></Col>
              </Row>
            </Checkbox.Group>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          labelCol= {{
            xs: { span: 24 },
            sm: { span: 8 },
          }}
          wrapperCol= {{
            xs: { span: 24 },
            sm: { span: 24 },
          }}
          colon={false}
          label="POS前端操作权限"
        >
          {getFieldDecorator('no', {
            // rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={8}><Checkbox value="A">登陆</Checkbox></Col>
                <Col span={8}><Checkbox value="B">查看品项</Checkbox></Col>
                <Col span={8}><Checkbox value="C">添加品项</Checkbox></Col>
                <Col span={8}><Checkbox value="D">编辑品项</Checkbox></Col>
                <Col span={8}><Checkbox value="E">报表查看</Checkbox></Col>
                <Col span={8}><Checkbox value="F">创建角色</Checkbox></Col>
                <Col span={8}><Checkbox value="G">添加员工</Checkbox></Col>
              </Row>
            </Checkbox.Group>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label=" "
          style={{ textAlign: 'right' }}
        >
          <Button size="small" onClick={this.toggleShowAddModal}>Cancel</Button>
          &nbsp;
          <Button size="small" type="primary" htmlType="submit">Save</Button>
        </FormItem>
      </Form>
    );
  }
}

const AddProductModalForm = Form.create({
  onFieldsChange(props, changedFields) {
    const addEmployeeModalFormData = props.addEmployeeModalFormData;
    Object.keys(changedFields).forEach((key) => {
      addEmployeeModalFormData[key] = changedFields[key];
    })
    props.dispatch({
      type: 'product/updateState',
      payload: {
        addEmployeeModalFormData,
      },
    })
  },
  mapPropsToFields(props) {
    const fields = 'name no'.split(' ');
    const result = {};
    fields.forEach((key) => {
      result[key] = Form.createFormField({
        ...props.addEmployeeModalFormData[key],
        value: props.addEmployeeModalFormData[key].value,
      })
    })
    return result;
  },
})(BasicForm);

// @connect((state) => ({
//   addEmployeeModalFormData: state.product.addEmployeeModalFormData,
// }))
export default connect((state) => {
  return {
    addEmployeeModalFormData: state.employee.addEmployeeModalFormData,
  }
})(AddProductModalForm);
