import React, { Component, Fragment } from 'react';
import { Table, Checkbox, Button } from 'antd';
import { connect } from 'dva';
import SetFormBottomRightAddModal from './SetFormBottomRightAddModal'

@connect((state) => ({
  selectedSetProductType: state['product-new'].selectedSetProductType,
  singleProductList: state['product-new'].singleProductList,
}))
export default class SearchResult extends Component {
  getSingleProductItemById = (id) => {
    // debugger
    return this.props.singleProductList.filter(item => item.id)[0] || {};
  }
  render() {
    const columns = [{
      title: '品项名称',
      render: (text, item) => {
        // console.log('123', this.getSingleProductItemById(item.childDishId))
        return <span>{this.getSingleProductItemById(item.childDishId).name}</span>
      }
    }, {
      title: '品项编码',
      render: (text, item) => {
        return <span>{this.getSingleProductItemById(item.childDishId).dishCode}</span>
      }
    }, {
      title: '必选',
      render: (text, item) => {
        return (
          <Checkbox
            checked={item.isReplace == 1}
          />
        );
      }
    }, {
      title: '默认选中',
      render: (text, item) => {
        return (
          <Checkbox
            checked={item.isDefault == 1}
          />
        );
      }
    }, {
      title: '可复选',
      render: (text, item) => {
        return (
          <Checkbox
            checked={item.isMulti == 1}
          />
        );
      }
    }, {
      title: '加价',
      dataIndex: 'address',
    }, {
      title: '起卖数',
      dataIndex: 'leastCellNum',
      key: 'leastCellNum',
    }, {
      title: '售卖价',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a className="primary-blue" href="javascript:;">移除</a>
        </span>
      ),
    }];

    let data = this.props.selectedSetProductType.dishSetmealBos || [];
    data = data.concat(data).concat(data);
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
        <Button onClick={() => { 
          this.props.dispatch({ 
            type: 'product-new/updateState', 
            payload: { showSetFormBottomRightAddModal: true } 
          }); 
        }}>选择品项</Button>
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
