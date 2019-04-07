import React, { Fragment } from 'react';
import { Form, Input, Select, Checkbox } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

@connect((state) => ({
  supplierList: state['product-new'].supplierList || [],
  singleFormData: state['product-new'].singleFormData || {},
  setFormData: state['product-new'].setFormData || {},
}))
class SupplierInfoInput extends React.Component {

  onChange = (valueObj) => {
    const isSingle = this.getIsSingle();
    if (isSingle) {
      let singleFormData = JSON.parse(JSON.stringify(this.props.singleFormData));
      let formData = singleFormData.purchaseAndSaleBo;
      formData = { ...formData, ...valueObj };
      singleFormData.purchaseAndSaleBo = formData;
      this.props.dispatch({
        type: 'product-new/updateState',
        payload: {
          singleFormData: JSON.parse(JSON.stringify(singleFormData))
        }
      });
    } else {
      let setFormData = JSON.parse(JSON.stringify(this.props.setFormData));
      let formData = setFormData.purchaseAndSaleBo;
      formData = { ...formData, ...valueObj };
      setFormData.purchaseAndSaleBo = formData;
      this.props.dispatch({
        type: 'product-new/updateState',
        payload: {
          setFormData: JSON.parse(JSON.stringify(setFormData))
        }
      });
    }
  }

  getIsSingle = () => {
    return this.props.addtype === '0';
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const isSingle = this.getIsSingle();
    let formData = isSingle
      ?
      this.props.singleFormData
      :
      this.props.setFormData;
    const { purchaseAndSaleBo_type = { value: '' } } = formData || {};
    return (
      <Fragment>
        <FormItem
          {...this.props.formItemLayout}
          label=" "
        >
          {getFieldDecorator('purchaseAndSaleBo_type', {
          })(
            <CheckboxGroup
              options={[
                { label: '进货', value: '1' },
                { label: '销货', value: '2' },
              ]}
            />
          )}
        </FormItem>
        <FormItem
          required={true}
          style={{
            display: purchaseAndSaleBo_type.value[0] === '1' ? 'block' : 'none'
          }}
          {...this.props.formItemLayout}
          label="货源厂商"
        >
          {getFieldDecorator('purchaseAndSaleBo_sourceId', {
            rules: [{ required: true, message: '请选择货源厂商' }],
          })(
            <Select
            >
              {
                this.props.supplierList.map((item) => {
                  return (
                    <Option key={item.id}>{item.name}</Option>
                  );
                })
              }
            </Select>
            )}
          
        </FormItem>
        <FormItem
          required={true}
          style={{
            display: purchaseAndSaleBo_type.value[0] === '1' ? 'block' : 'none'
          }}
          {...this.props.formItemLayout}
          label="进货价格"
        >
          {getFieldDecorator('purchaseAndSaleBo_purchasePrice', {
            rules: [{ required: true, type: 'number', message: '请输入数字', transform: value => Number(value) || '' }],
          })(
            <Input />
            )}
        </FormItem>
        <FormItem
          required={true}
          style={{
            display: purchaseAndSaleBo_type.value[0] ? 'block' : 'none'
          }}
          {...this.props.formItemLayout}
          label={purchaseAndSaleBo_type.value[0] === '1' ? "进货数量" : "销货数量"}
        >
          {getFieldDecorator('purchaseAndSaleBo_number', {
            rules: [{ required: true, type: 'number', message: '请输入整数', transform: value => Number(value) || '' }],
          })(
            <Input />
            )}
        </FormItem>

      </Fragment>
    );
  }
}


export default SupplierInfoInput;
