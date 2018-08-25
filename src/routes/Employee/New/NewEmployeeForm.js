import React, { Fragment } from 'react';
import { Form, Input, Row, Col, Radio, DatePicker, Select } from 'antd';
import { connect } from 'dva';
import styles from '../../Product/NewItem/index.less'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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

  getFieldsConfig = () => {
    const result = [{
      sectionTitle: '基础信息',
      fields: [{
        label: '姓名',
        placeholder: '请输入姓名',
        dataIndex: 'name',
        rules: [{ required: true,  message: '请输入姓名' }],
        render:<Input size="small" />,
      },{
        label: '性别',
        placeholder: '',
        dataIndex: 'gender',
        // rules: [{ required: true,  message: '请输入姓名' }],
        render:(
          <RadioGroup
            options={[
              { label: '男', value: 'Apple' },
              { label: '女', value: 'Pear' },
            ]}
            // onChange={this.onChange2}
            // value={this.state.value2}
          />
        ),
      },{
        label: '生日',
        placeholder: '请选择日期',
        dataIndex: 'birthday',
        // rules: [{ required: true,  message: '请输入姓名' }], 
        render:<DatePicker size="small" style={{ width: '100%' }} />,
      },{
        label: '身份证号',
        placeholder: '请输入身份证号码',
        dataIndex: 'birthday',
        // rules: [{ required: true,  message: '请输入姓名' }], 
        render:<Input size="small" maxLength={20} />,
      },{
        label: '学历',
        placeholder: '',
        dataIndex: 'birthday',
        // rules: [{ required: true,  message: '请输入姓名' }], 
        render: (
          <Select size="small" style={{ width: '100%' }}>
            <Option value="jack">职高</Option>
            <Option value="lucy">中专</Option>
            <Option value="disabled">大专</Option>
            <Option value="Yiminghe">本科</Option>
            <Option value="Yiminghe">硕士</Option>
            <Option value="Yiminghe">博士</Option>
          </Select>
        ),
      },{
        label: '毕业学校',
        placeholder: '请输入毕业学校',
        dataIndex: 'birthday',
        // rules: [{ required: true,  message: '请输入姓名' }], 
        render:<Input size="small" maxLength={40} />,
      },{
        label: '参加工作时间',
        placeholder: '请选择日期',
        dataIndex: 'birthday',
        // rules: [{ required: true,  message: '请输入姓名' }], 
        render:<DatePicker size="small" style={{ width: '100%' }} />,
      },{
        label: '婚姻状况',
        placeholder: '',
        dataIndex: 'birthday',
        // rules: [{ required: true,  message: '请输入姓名' }], 
        render: (
          <Select size="small" style={{ width: '100%' }}>
            <Option value="jack">职高</Option>
            <Option value="lucy">中专</Option>
            <Option value="disabled">大专</Option>
            <Option value="Yiminghe">本科</Option>
            <Option value="Yiminghe">硕士</Option>
            <Option value="Yiminghe">博士</Option>
          </Select>
        ),
      }],
    },
    {
      sectionTitle: '当前工作信息',
      fields: [{
        label: '工号',
        placeholder: '请输入员工工号',
        dataIndex: 'name',
        rules: [{ required: true,  message: '请输入姓名' }],
        render:<Input size="small" maxLength={10} />,
      },{
        label: ' ',
        placeholder: ' ',
        dataIndex: 'name',
        // rules: [{ required: true,  message: '请输入姓名' }],
        render: '上一名加入我公司的赵店长',
      },{
        label: '员工类型',
        placeholder: '',
        dataIndex: 'birthday',
        // rules: [{ required: true,  message: '请输入姓名' }], 
        render: (
          <Select size="small" style={{ width: '100%' }}>
            <Option value="jack">试用期</Option>
            <Option value="lucy">正式</Option>
            <Option value="disabled">外聘</Option>
          </Select>
        ),
      },{
        label: '入职时间',
        placeholder: '请选择日期',
        dataIndex: 'birthday',
        // rules: [{ required: true,  message: '请输入姓名' }], 
        render:<DatePicker size="small" style={{ width: '100%' }} />,
      },{
        label: '转正时间',
        placeholder: '请选择日期',
        dataIndex: 'birthday',
        // rules: [{ required: true,  message: '请输入姓名' }], 
        render:<DatePicker size="small" style={{ width: '100%' }} />,
      },{
        label: '职位',
        placeholder: '',
        dataIndex: 'birthday',
        // rules: [{ required: true,  message: '请输入姓名' }], 
        render: (
          <Select size="small" style={{ width: '100%' }}>
            <Option value="jack">试用期</Option>
            <Option value="lucy">正式</Option>
            <Option value="disabled">外聘</Option>
          </Select>
        ),
      },{
        label: '职级',
        placeholder: '请输入职级',
        dataIndex: 'name',
        // rules: [{ required: true,  message: '请输入姓名' }],
        render:<Input size="small" maxLength={10} />,
      },{
        label: '工作地点',
        placeholder: '请输入工作地点',
        dataIndex: 'name',
        // rules: [{ required: true,  message: '请输入姓名' }],
        render:<Input size="small" maxLength={40} />,
      }],
    },{
      sectionTitle: '联系方式',
      fields: [{
        label: '手机号',
        placeholder: '请输入手机号',
        dataIndex: 'name',
        rules: [{ required: true,  message: '请输入手机号' }],
        render:<Input size="small" type='number' />,
      }, {
        label: '邮箱',
        placeholder: '请输入邮箱',
        dataIndex: 'name',
        // rules: [{ required: true,  message: '请输入姓名' }],
        render:<Input size="small" maxLength={40} />,
      }, {
        label: 'QQ',
        placeholder: '请输入QQ',
        dataIndex: 'name',
        // rules: [{ required: true,  message: '请输入QQ' }],
        render:<Input size="small" maxLength={20} />,
      }, {
        label: '现住址',
        placeholder: '请输入现住址',
        dataIndex: 'name',
        // rules: [{ required: true,  message: '请输入QQ' }],
        render:<Input size="small" maxLength={50} />,
      }],
    },{
      sectionTitle: '薪资',
      fields: [{
        label: '记薪方式',
        placeholder: '请输入记薪方式',
        dataIndex: 'name',
        rules: [{ required: true,  message: '请输入记薪方式' }],
        render: '月薪',
      }, {
        label: '基本工资',
        placeholder: '请输入基本工资',
        dataIndex: 'name',
        rules: [{ required: true,  message: '请输入基本工资' }],
        render:<Input size="small" maxLength={10} addonBefore="￥" />,
      }, {
        label: '岗位工资',
        placeholder: '请输入岗位工资',
        dataIndex: 'name',
        // rules: [{ required: true,  message: '请输入岗位工资' }],
        render:<Input size="small" maxLength={10} addonBefore="￥" />,
      }],
    },{
      sectionTitle: '紧急联系人',
      fields: [{
        label: '姓名',
        placeholder: '请输入姓名',
        dataIndex: 'name',
        rules: [{ required: true,  message: '请输入姓名' }],
        render:<Input size="small" maxLength={10} />,
      }, {
        label: '关系',
        placeholder: '请输入关系',
        dataIndex: 'name',
        rules: [{ required: true,  message: '请输入关系' }],
        render:<Input size="small" maxLength={10} />,
      }, {
        label: '联系电话',
        placeholder: '请输入联系电话',
        dataIndex: 'name',
        rules: [{ required: true,  message: '请输入联系电话' }],
        render:<Input size="small" maxLength={20} type="number" />,
      }, {
        label: '备用电话',
        placeholder: '请输入备用电话',
        dataIndex: 'name',
        rules: [{ required: true,  message: '请输入备用电话' }],
        render:<Input size="small" maxLength={20} type="number" />,
      }],
    },{
      sectionTitle: '登陆账号',
      fields: [{
        label: '登陆账号',
        placeholder: '请输入登陆账号',
        dataIndex: 'name',
        rules: [{ required: true,  message: '请输入登陆账号' }],
        render: '登陆账号',
      }, {
        label: '登录密码',
        placeholder: '请输入登录密码',
        dataIndex: 'name',
        rules: [{ validator: (val) => { return val.length === 6 && (/\d/gi).test(val) },  message: '只能输入数字，长度为6位数字' }],
        render:<Input size="small" maxLength={6} />,
      }, {
        label: '确认密码',
        placeholder: '请输入确认密码',
        dataIndex: 'name',
        rules: [{ validator: (val) => { return val.length === 6 && (/\d/gi).test(val) },  message: '只能输入数字，长度为6位数字' }],
        render:<Input size="small" maxLength={6} />,
      }],
    }];
    return result;
  }

  getFormContent = () => {
    const configs = this.getFieldsConfig();
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
    // <Row gutter={16}>
    const cols = configs.map((item) => {
      return (
        <Col span={12}>
          <FormItem
            {...formItemLayout}
            label={
              <span className={styles['section-title']}>{item.sectionTitle}</span>
            }
          />
          {
            item.fields.map((subItem) => {
              return (
                <FormItem
                  {...formItemLayout}
                  label={subItem.label}
                >
                  {
                    typeof subItem.render === 'string'
                    ?
                    subItem.render
                    :
                    getFieldDecorator(subItem.dataIndex, {
                      rules: subItem.rules,
                    })(
                      subItem.render
                      )}
                </FormItem>
              );
            })
          }
        </Col>
      )
    })

    const result = [];
    let rowContent = [];
    cols.forEach((item, index) => {
      rowContent.push(item);
      if (index % 2 !== 0) {
        result.push(
          <Row gutter={16}>
            {rowContent}
          </Row>
        );
        rowContent = []
      }
    });

    return result;
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {
          this.getFormContent()
        }
      </Form>
    );
  }
}

const AddEmployeeForm = Form.create({
  onFieldsChange(props, changedFields) {
    // const addEmployeeModalFormData = props.addEmployeeModalFormData;
    // Object.keys(changedFields).forEach((key) => {
    //   addEmployeeModalFormData[key] = changedFields[key];
    // })
    // props.dispatch({
    //   type: 'product/updateState',
    //   payload: {
    //     addEmployeeModalFormData,
    //   },
    // })
  },
  mapPropsToFields(props) {
    // const fields = 'name no'.split(' ');
    // const result = {};
    // fields.forEach((key) => {
    //   result[key] = Form.createFormField({
    //     ...props.addEmployeeModalFormData[key],
    //     value: props.addEmployeeModalFormData[key].value,
    //   })
    // })
    // return result;
  },
})(BasicForm);

// @connect((state) => ({
//   addEmployeeModalFormData: state.product.addEmployeeModalFormData,
// }))
export default connect((state) => {
  return {
    // addEmployeeModalFormData: state.employee.addEmployeeModalFormData,
  }
})(AddEmployeeForm);
