import React, { Component } from 'react';
import { Table, Divider } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment'

@connect((state) => ({
  searchResult: state.commission.searchResult,
}))
export default class SearchResult extends Component {
  render() {
    const columns = [{
      title: '方案名称',
      dataIndex: 'planName',
    }, {
      title: '类型',
      dataIndex: 'planType',
    }, {
      title: '创建时间',
      dataIndex: 'serverCreateTime',
      render: (text) => {
        return moment(text);
      },
    }, {
      title: '启动时间',
      dataIndex: 'serverUpdateTime',
      render: (text) => {
        return moment(text);
      },
    }, {
      title: '状态',
      dataIndex: 'planState',
      render: (text) => {
        return text === 1 ? '启用' : '禁用'; 
      },
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a className="primary-blue" href="javascript:;">启用/停用</a>
          <Divider type="vertical" />
          <Link
            className="primary-blue"
            href="javascript:;"
            to={{
              pathname: '/product-new',
              search: `isEdit=1&id=${record.id}&addtype=${record.type}`,
            }}
          >
          编辑
          </Link>
          <Divider type="vertical" />
          <a className="primary-blue" href="javascript:;">删除</a>
        </span>
      ),
    }];

    const data = this.props.searchResult;
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
        dataSource={data.content}
        bordered
        size="small"
        pagination={pager}
      />
    )
  }
}
