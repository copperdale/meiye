import React, { Fragment } from 'react';
import { Form, Input, Select, Radio } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

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

  getIsSingle = () => this.props.addtype === '0';

  render() {
    const isSingle = this.getIsSingle();
    let formData = isSingle
      ?
      this.props.singleFormData.purchaseAndSaleBo
      :
      this.props.setFormData.purchaseAndSaleBo;
    const { purchasePrice, number, sourceName, sourceId, type } = formData || {};
    return (
      <Fragment>
        <FormItem
          {...this.props.formItemLayout}
          label=" "
        >
          <RadioGroup
            value={type}
            onChange={(e) => {
              this.onChange({ type: e.target.value });
            }}
          >
            <Radio value={'1'}>进货</Radio>
            <Radio value={'2'}>销货</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          style={{
            display: type === '1' ? 'block' : 'none'
          }}
          {...this.props.formItemLayout}
          label="货源厂商"
        >
          <Select
            value={sourceId}
            onChange={(value) => {
              this.onChange({ sourceId: value });
            }}
          >
            {
              this.props.supplierList.map((item) => {
                return (
                  <Option key={item.id}>{item.name}</Option>
                );
              })
            }
          </Select>
        </FormItem>
        <FormItem
          style={{
            display: type === '1' ? 'block' : 'none'
          }}
          {...this.props.formItemLayout}
          label="进货价格"
        >
          <Input
            value={purchasePrice}
            onChange={(e) => {
              this.onChange({ purchasePrice: e.target.value });
            }}
          />
        </FormItem>
        <FormItem
          style={{
            display: type === '1' ? 'block' : 'none'
          }}
          {...this.props.formItemLayout}
          label="进货数量"
        >
          <Input
            value={number}
            onChange={(e) => {
              this.onChange({ number: e.target.value });
            }}
          />
        </FormItem>
        <FormItem
          style={{
            display: type === '2' ? 'block' : 'none'
          }}
          {...this.props.formItemLayout}
          label="销货数量"
        >
          <Input
            value={number}
            onChange={(e) => {
              this.onChange({ number: e.target.value });
            }}
          />
        </FormItem>
      </Fragment>
    );
  }
}


export default SupplierInfoInput;
