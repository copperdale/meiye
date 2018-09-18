import React, { Component, Fragment } from 'react';
import { Table, Checkbox, Button, Input, Icon } from 'antd';
import { connect } from 'dva';
import SetFormBottomRightAddModal from './SetFormBottomRightAddModal'

@connect((state) => ({
  selectedSetProductType: state['product-new'].selectedSetProductType,
  singleProductList: state['product-new'].singleProductList,
  setFormData: state['product-new'].setFormData,
  isEdit: state['product-new'].isEdit,
  isView: state['product-new'].isView,
}))
export default class SearchResult extends Component {
  
  updatetableCell = (value, item, dataIndex) => {
    // debugger;
    const selectedSetProductType = JSON.parse(JSON.stringify(this.props.selectedSetProductType));
    const setFormData = JSON.parse(JSON.stringify(this.props.setFormData));
    selectedSetProductType.dishSetmealBos.forEach((cItem) => {
      if (item.id === cItem.id) {
        // eslint-disable-next-line
        cItem[dataIndex] = value;
      }
    })
    setFormData.dishSetmealGroupBos = setFormData.dishSetmealGroupBos.map(cItem => {
      if (cItem.name === selectedSetProductType.name) {
        // eslint-disable-next-line
        cItem = { ...cItem, ...JSON.parse(JSON.stringify(selectedSetProductType))};
      }
      return cItem;
    });
    this.props.dispatch({
      type: 'product-new/updateState',
      payload: {
        selectedSetProductType,
        setFormData,
      },
    });
  }

  getSingleProductItemById = (id) => {
    // debugger
    return this.props.singleProductList.filter(item => item.id === id)[0] || {};
  }

  render() {
    const columns = [{
      title: '品项名称',
      render: (text, item) => {
        // console.log('123', this.getSingleProductItemById(item.childDishId))
        return <span>{this.getSingleProductItemById(item.childDishId).name}</span>
      },
    }, {
      title: '品项编码',
      render: (text, item) => {
        return <span>{this.getSingleProductItemById(item.childDishId).dishCode}</span>
      },
    }, {
      title: '必选',
      render: (text, item) => {
        return (
          <Checkbox
            disabled={this.props.isView}
            checked={`${item.isReplace}` === 'i'}
            onChange={(e) => { this.updatetableCell(e.target.checked ? 1 : 2, item, 'isReplace') }}
          />
        );
      },
    }, {
      title: '默认选中',
      render: (text, item) => {
        return (
          <Checkbox
            disabled={this.props.isView}
            checked={`${item.isDefault}` === `1`}
            onChange={(e) => { this.updatetableCell(e.target.checked ? 1 : 2, item, 'isDefault') }}
          />
        );
      },
    }, {
      title: '可复选',
      render: (text, item,) => {
        return (
          <Checkbox
            disabled={this.props.isView}
            checked={`${item.isMulti}` === `1`}
            onChange={(e) => { this.updatetableCell(e.target.checked ? 1 : 2, item, 'isMulti') }}
          />
        );
      },
    // }, {
    //   title: '加价',
    //   dataIndex: 'address',
    //   render: (text, item, index) => {
    //     return (
    //       <Input 
    //         style={{ width: '60px' }} 
    //         size="small"
    //         value={item.address} 
    //         onChange={(e) => { this.updatetableCell(e.target.value, item, 'address') }}
    //       />
    //     )
    //   }
    }, {
      title: '起卖数',
      dataIndex: 'leastCellNum',
      render: (text, item) => {
        return (
          <Input 
            style={{ width: '60px' }}
            disabled={this.props.isView}
            size="small"
            value={item.leastCellNum} 
            onChange={(e) => { this.updatetableCell(e.target.value, item, 'leastCellNum') }}
          />
        )
      },
    }, {
      title: '售卖价',
      dataIndex: 'price',
      render: (text, item) => {
        return (
          <Input 
            style={{ width: '60px' }} 
            disabled={this.props.isView}
            size="small"
            value={item.price} 
            onChange={(e) => { this.updatetableCell(e.target.value, item, 'price') }}
          />
        )
      },
    }, {
      title: ' ',
      key: 'action',
      render: (text, record, index) => (
        <span>
          <a 
            className="primary-blue" 
            href="javascript:;"
            onClick={() => { 
              this.props.dispatch({
                type: 'product-new/deleteSubTypeItems',
                payload: {
                  index,
                },
              });
            }}
          ><Icon type="delete" />
          </a>
        </span>
      ),
    }].filter(item => item.key !== 'action' || !this.props.isView );

    const data = this.props.selectedSetProductType.dishSetmealBos || [];
    // data = data.concat(data).concat(data);
    const pager = {
      pageSize: 20,
      showSizeChanger: true,
      pageSizeOptions: ['2', '5', '10', '20', '30', '40', '50', '100'],
      showTotal: (total, range) => { // eslint-disable-line
        return (
          <div>
            共{total}条&nbsp;
          </div>
        );
      },
      showQuickJumper: true,
      size: 'small',
    };
    return (
      <Fragment>
        {
          this.props.selectedSetProductType.name ? (
            <div style={{ height: '36px' }}>
              {
                !this.props.isView
                &&
                (
                  <Button
                    onClick={() => {
                      this.props.dispatch({
                        type: 'product-new/updateState',
                        payload: { showSetFormBottomRightAddModal: true },
                      });
                    }}
                    size='small'
                    style={{ float: 'right', marginBottom: '8px' }}
                    className="primary-blue primary-blue-button"
                  >添加品项
                  </Button>
                )
              }
            </div>
          ): ''
        }
        <SetFormBottomRightAddModal />
        <Table
          columns={columns}
          dataSource={data}
          bordered
          size="small"
          pagination={pager}
        />
      </Fragment>
    )
  }
}
