import React, { Component, Fragment } from 'react';
import { Modal, Table } from 'antd';
import { connect } from 'dva';

@connect((state) => ({
  singleProductList: state['product-new'].singleProductList,
  selectedSingleProductList: state['product-new'].selectedSingleProductList,
  selectedSingleProducKeytList: state['product-new'].selectedSingleProducKeytList,
  
}))
export default class AddProductModal extends Component {

  

  render() {
    const columns = [{
      title: '品项名称',
      dataIndex: 'name',
    }, {
      title: '品项编码',
      dataIndex: 'dishCode',
    }, {
      title: '售卖价',
      dataIndex: 'marketPrice',
    }];

    let data = this.props.singleProductList || [];
    // data = data;
    const pager = {
      pageSize: 10,
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
        <Table
          columns={columns}
          dataSource={data}
          bordered
          size="small"
          pagination={pager}
          rowkey='id'
          rowSelection={{
            selectedRowKeys: this.props.selectedSingleProducKeytList,
            onChange: (selectedRowKeys, selectedRows) => {
              // selectedRowKeys = JSON.parse(JSON.stringify(selectedRowKeys));
              // selectedRows = JSON.parse(JSON.stringify(selectedRows));
              this.props.dispatch({
                type: 'product-new/updateState',
                payload: {
                  selectedSingleProductList: selectedRows,
                  selectedSingleProducKeytList: selectedRowKeys,
                },
              });
            },
          }}
        />
      </Fragment>
    )
  }
}
