import {
  Form, Input, Button,
} from 'antd';
import { connect } from 'dva'
import { routerRedux } from 'dva/router';

class basicForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'supplier-new/saveOrUpdateSupplier'
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 12
      },
      colon: false
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          {...formItemLayout}
          label="货源名称"
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, max: 50, message: '请输入货源名称(最多50个字符)' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="货源地址"
        >
          {getFieldDecorator('address', {
            rules: [{ max: 50, message: '请输入货源地址(最多50个字符)' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="货源联系人"
        >
          {getFieldDecorator('contacts', {
            rules: [{ max: 10, message: '请输入货源联系人(最多10个字符)' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="联系电话"
        >
          {getFieldDecorator('contactsPhone', {})(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label=" ">
          <Button type="primary" htmlType="submit">保存</Button>
          <Button
            className="primary-blue primary-blue-button"
            style={{ marginLeft: 8 }}
            onClick={() => {
              this.props.dispatch(routerRedux.push({
                pathname: '/supplier',
              }));
            }}
          >返回</Button>
        </Form.Item>
      </Form>
    );
  }
}
const AddForm = Form.create({
  name: 'addform',
  onFieldsChange(props, changedFields) {
    const formData = props.formData;
    Object.keys(changedFields).forEach((key) => {
      formData[key] = changedFields[key];
    })
    props.dispatch({
      type: 'supplier-new/updateState',
      payload: {
        formData,
      },
    })
  },
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        ...props.formData.name,
        value: props.formData.name.value,
      }),
      address: Form.createFormField({
        ...props.formData.address,
        value: props.formData.address.value,
      }),
      contacts: Form.createFormField({
        ...props.formData.contacts,
        value: props.formData.contacts.value,
      }),
      contactsPhone: Form.createFormField({
        ...props.formData.contactsPhone,
        value: props.formData.contactsPhone.value,
      }),
    };
  },
})(basicForm);

export default connect((state) => {
  return {
    formData: state['supplier-new'].formData,
  }
})(AddForm)
