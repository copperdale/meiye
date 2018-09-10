import React from 'react';
import { Form, Input, Row, Col, Radio, DatePicker, Select, Button } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from '../../Product/NewItem/index.less';

const FormItem = Form.Item;
const Option = Select.Option;

export const getFieldsConfig = (props = { }) => {
  const latestInfo = '';
  const result = [{
    sectionTitle: '基础信息',
    fields: [{
      label: '方案名称',
      placeholder: '请输入方案名称',
      dataIndex: 'name',
      // rules: [{ required: true, message: '请输入姓名' }],
      render:<Input size="small" maxLength={20} />,
    },{
      label: '方案类型',
      placeholder: '',
      dataIndex: 'gender',
      // rules: [{ required: true, message: '请输入姓名' }],
      render:(
        <Select size="small" style={{ width: '100%' }}>
          <Option value="1">试用期</Option>
          <Option value="2">正式</Option>
          <Option value="3">外聘</Option>
        </Select>
      ),
    }],
  },
  {
    sectionTitle: '提成分配',
    fields: [{
      label: '选择参与提成分配身份',
      placeholder: '请输入员工工号',
      dataIndex: 'jobNumber',
      rules: [{ required: true, message: '请输入工号' }],
      render:<Input size="small" maxLength={10} />,
    },{
      label: ' ',
      placeholder: ' ',
      dataIndex: '',
      // rules: [{ required: true, message: '请输入姓名' }],
      render: latestInfo,
    },{
      label: '员工类型',
      placeholder: '',
      dataIndex: 'jobEmployeeType',
      rules: [{ required: true, message: '请输入员工类型' }], 
      render: (
        <Select size="small" style={{ width: '100%' }}>
          <Option value="1">试用期</Option>
          <Option value="2">正式</Option>
          <Option value="3">外聘</Option>
        </Select>
      ),
    },{
      label: '入职时间',
      placeholder: '请选择日期',
      dataIndex: 'jobEntryTime',
      rules: [{ required: true, message: '请输入入职时间' }], 
      render:<DatePicker size="small" style={{ width: '100%' }} />,
    },{
      label: '转正时间',
      placeholder: '请选择日期',
      dataIndex: 'jobPositiveTime',
      // rules: [{ required: true, message: '请输入姓名' }], 
      render:<DatePicker size="small" style={{ width: '100%' }} />,
    },{
      label: '职位',
      placeholder: '',
      dataIndex: 'jobPosition',
      rules: [{ required: true, message: '请输入职位' }], 
      render: (
        <Select size="small" style={{ width: '100%' }}>
          {
            (props.EmployeeRoleList || []).map(role => {
              return (
                <Option value={role.id}>{role.name}</Option>
              );
            })
          }
        </Select>
      ),
    },{
      label: '职级',
      placeholder: '请输入职级',
      dataIndex: 'jobGrade',
      // rules: [{ required: true, message: '请输入姓名' }],
      render:<Input size="small" maxLength={10} />,
    },{
      label: '工作地点',
      placeholder: '请输入工作地点',
      dataIndex: 'jobAddress',
      // rules: [{ required: true, message: '请输入姓名' }],
      render:<Input size="small" maxLength={40} />,
    }],
  },{
    sectionTitle: '联系方式',
    fields: [{
      label: '手机号',
      placeholder: '请输入手机号',
      dataIndex: 'mobile',
      rules: [{ required: true, message: '请输入手机号' }],
      render:<Input size="small" type='number' />,
    }, {
      label: '邮箱',
      placeholder: '请输入邮箱',
      dataIndex: 'email',
      // rules: [{ required: true, message: '请输入姓名' }],
      render:<Input size="small" maxLength={40} />,
    }, {
      label: 'QQ',
      placeholder: '请输入QQ', 
      dataIndex: 'qQ',
      // rules: [{ required: true, message: '请输入QQ' }],
      render:<Input size="small" maxLength={20} />,
    }, {
      label: '现住址',
      placeholder: '请输入现住址',
      dataIndex: 'address',
      // rules: [{ required: true, message: '请输入QQ' }],
      render:<Input size="small" maxLength={50} />,
    }],
  },{
    sectionTitle: '薪资',
    fields: [{
      label: '记薪方式',
      placeholder: '请输入记薪方式',
      dataIndex: 'salaryCalcMode',
      rules: [{ required: true, message: '请输入记薪方式' }],
      render: '月薪',
    }, {
      label: '基本工资',
      placeholder: '请输入基本工资',
      dataIndex: 'salaryBase',
      rules: [{ required: true, message: '请输入基本工资' }],
      render:<Input size="small" maxLength={10} addonBefore="￥" />,
    }, {
      label: '岗位工资',
      placeholder: '请输入岗位工资',
      dataIndex: 'salaryPost',
      // rules: [{ required: true, message: '请输入岗位工资' }],
      render:<Input size="small" maxLength={10} addonBefore="￥" />,
    }],
  },{
    sectionTitle: '紧急联系人',
    fields: [{
      label: '姓名',
      placeholder: '请输入姓名',
      dataIndex: 'ecName',
      rules: [{ required: true, message: '请输入姓名' }],
      render:<Input size="small" maxLength={10} />,
    }, {
      label: '关系',
      placeholder: '请输入关系',
      dataIndex: 'ecRelation',
      rules: [{ required: true, message: '请输入关系' }],
      render:<Input size="small" maxLength={10} />,
    }, {
      label: '联系电话',
      placeholder: '请输入联系电话',
      dataIndex: 'ecMobile',
      rules: [{ required: true, message: '请输入联系电话' }],
      render:<Input size="small" maxLength={20} type="number" />,
    }, {
      label: '备用电话',
      placeholder: '请输入备用电话',
      dataIndex: 'ecMobileReserve',
      rules: [{ required: true, message: '请输入备用电话' }],
      render:<Input size="small" maxLength={20} type="number" />,
    }],
  },{
    sectionTitle: '登陆账号',
    fields: [{
      label: '登陆账号',
      placeholder: '请输入登陆账号',
      dataIndex: 'account',
      rules: [{ required: true, message: '请输入登陆账号' }],
      render: <Input size="small" maxLength={20} type="number" />,
    }, {
      label: '登录密码',
      placeholder: '请输入登录密码',
      dataIndex: 'password',
      // rules: [{ validator: (val) => { return val.length === 6 && (/\d/gi).test(val) },  message: '只能输入数字，长度为6位数字' }],
      render:<Input size="small" maxLength={6} />,
    }, {
      label: '确认密码',
      placeholder: '请输入确认密码',
      dataIndex: 'passwordNum',
      // rules: [{ validator: (val) => { return val.length === 6 && (/\d/gi).test(val) },  message: '只能输入数字，长度为6位数字' }],
      render:<Input size="small" maxLength={6} />,
    }],
  }];
  return result;
};

class BasicForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err) => {
      if (!err) {
        this.props.dispatch({
          type: 'commission-new/',
        });
      }
    });
  }

  

  getFormContent = () => {
    const configs = getFieldsConfig(this.props);
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
                      rules: subItem.rules || [],
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
        {
          !this.props.isView
          &&
          (
            <Row gutter={16}>
              <Col span={12} offset={12}>
                <FormItem
                  {...formItemLayout}
                  label=" "
                  style={{ textAlign: 'right' }}
                >
                  <Button
                    size="small"
                    onClick={() => {
                      this.props.dispatch(routerRedux.push('/employee'))
                    }}
                  >取消
                  </Button>
                  &nbsp;
                  <Button htmlType="submit" type="primary" size="small">保存</Button>
                </FormItem>
              </Col>
            </Row>
          )
        }
        {
          this.getFormContent()
        }
      </Form>
    );
  }
}

export const fieldsKeys = getFieldsConfig().reduce((result, item) => {
  if (item.fields.length) {
    item.fields.forEach((field) => {
      result.push(field.dataIndex);
    });
  }
  return result;
}, []);

const NewCommissionSolutionForm = Form.create({
  onFieldsChange(props, changedFields) {
    const newCommissionSolutionFormData = props.newCommissionSolutionFormData;
    console.log(changedFields);
    Object.keys(changedFields).forEach((key) => {
      newCommissionSolutionFormData[key] = changedFields[key];
    })
    props.dispatch({
      type: 'commission-new/updateState',
      payload: {
        newCommissionSolutionFormData,
      },
    })
  },
  mapPropsToFields(props) {
    const fields = fieldsKeys;
    const result = {};
    fields.forEach((key) => {
      result[key] = Form.createFormField({
        ...props.newCommissionSolutionFormData[key],
        value: props.newCommissionSolutionFormData[key].value,
      })
    })
    return result;
  },
})(BasicForm);

// @connect((state) => ({
//   newCommissionSolutionFormData: state.product.newCommissionSolutionFormData,
// }))
export default connect((state) => {
  return {
    newCommissionSolutionFormData: state['commission-new'].newCommissionSolutionFormData,
    isView: state['commission-new'].isView,
  }
})(NewCommissionSolutionForm);
