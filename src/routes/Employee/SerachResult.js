import React, { Component } from 'react';
import { Table, Divider, Icon } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

@connect((state) => ({
  // queryResult: state.product.queryResult,
}))
export default class SearchResult extends Component {
  render() {
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '工号',
      dataIndex: 'skuKey',
      key: 'skuKey',
    }, {
      title: '员工类型',
      dataIndex: 'marketPrice',
    }, {
      title: '入职日期',
      dataIndex: 'currRemainTotal',
    }, {
      title: '状态',
      dataIndex: 'unitName',
    }, {
      title: '职位',
      dataIndex: 'type',
      render: text => text === '0' ? '单品' : '套餐'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link className="primary-blue" href="javascript:;"
            to={{
              pathname: '/product-new',
              search: `isView=1&id=${record.id}&addtype=${record.type}`
            }}
          >查看</Link>
          <Divider type="vertical" />
          <Link className="primary-blue" href="javascript:;"
            to={{
              pathname: '/product-new',
              search: `isEdit=1&id=${record.id}&addtype=${record.type}`
            }}
          >编辑</Link>
          <Divider type="vertical" />
          <a className="primary-blue" href="javascript:;">删除</a>
        </span>
      ),
    }];

    let data = this.props.queryResult || [];
    data = data.concat(data).concat(data);
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
