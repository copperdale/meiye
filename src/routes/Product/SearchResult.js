import React, { Component } from 'react';
import { Table, Divider, Icon } from 'antd';
import { connect } from 'dva';

@connect((state) => ({
  queryResult: state.product.queryResult,
}))
export default class SearchResult extends Component {
  render() {
    const columns = [{
      title: '品项名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '品项编码',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '价格',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '库存',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '单位',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '类型',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a className="primary-blue" href="javascript:;">查看</a>
          <Divider type="vertical" />
          <a className="primary-blue" href="javascript:;">编辑</a>
          <Divider type="vertical" />
          <a className="primary-blue" href="javascript:;">删除</a>
        </span>
      ),
    }];

    let data = this.props.queryResult;
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
      <Table
        columns={columns}
        dataSource={data}
        bordered
        size="small"
        pagination={pager}
      />
    )
  }
}
