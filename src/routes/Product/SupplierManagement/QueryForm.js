import {
  Form, Icon, Input, Button,
} from 'antd';
import { connect } from 'dva';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'supplier/getSupplierList'
        });
      }
    });
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item
          label="厂家名称"
        >
          {getFieldDecorator('supplierName', {
            // rules: [{ required: true, message: '请输入厂家名称!' }],
          })(
            <Input placeholder="厂家名称" />
          )}
        </Form.Item>
        <Form.Item
          label="联系电话"
        >
          {getFieldDecorator('contactPhone', {
            label: '联系电话'
            // rules: [{ required: true, message: 'Please input your 联系电话!' }],
          })(
            <Input placeholder="联系电话" />
          )}
        </Form.Item>
        <Form.Item
          label="联系人"
        >
          {getFieldDecorator('contactName', {
            label: '联系人'
            // rules: [{ required: true, message: 'Please input your 联系人!' }],
          })(
            <Input placeholder="联系人" />
          )}
        </Form.Item>
        <Form.Item>
        <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            查询
          </Button>
          <Button
            className="primary-blue primary-blue-button"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            icon="plus"
            style={{ marginLeft: 8 }}
          >
            新建
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const QueryForm = Form.create({
  name: 'horizontal_login',
  onFieldsChange(props, changedFields) {
    const queryFormData = props.queryFormData;
    Object.keys(changedFields).forEach((key) => {
      queryFormData[key] = changedFields[key];
    })
    props.dispatch({
      type: 'supplier/updateState',
      payload: {
        queryFormData,
      },
    })
  },
  mapPropsToFields(props) {
    return {
      contactPhone: Form.createFormField({
        ...props.queryFormData.contactName,
        value: props.queryFormData.contactPhone.value,
      }),
      contactName: Form.createFormField({
        ...props.queryFormData.contactName,
        value: props.queryFormData.contactName.value,
      }),
      supplierName: Form.createFormField({
        ...props.queryFormData.supplierName,
        value: props.queryFormData.supplierName.value,
      }),
    };
  },
})(HorizontalLoginForm);

export default connect((state) => {
  return {
    queryFormData: state.supplier.queryFormData,
  }
})(QueryForm)