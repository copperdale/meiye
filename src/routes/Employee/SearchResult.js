import React, { Component } from 'react';
import { Table, Divider, Icon } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

@connect((state) => ({
  queryResult: state['employee'].queryResult,
}))
export default class SearchResult extends Component {
  render() {
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '工号',
      dataIndex: 'jobNumber',
      key: 'jobNumber',
    }, {
      title: '员工类型',
      dataIndex: 'jobEmployeeType',
    }, {
      title: '入职日期',
      dataIndex: 'jobEntryTime',
    }, {
      title: '状态',
      dataIndex: 'statusFlag',
    }, {
      title: '职位',
      dataIndex: 'jobPosition',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link
            className="primary-blue"
            href="javascript:;"
            to={{
              pathname: '/employee-new',
              search: `isView=true&isEdit=false&id=${record.id}`,
            }}
          >查看
          </Link>
          <Divider type="vertical" />
          <Link
            className="primary-blue"
            href="javascript:;"
            to={{
              pathname: '/product-new',
              search: `isView=true&isEdit=true&id=${record.id}`,
            }}
          >编辑
          </Link>
          <Divider type="vertical" />
          <a className="primary-blue" href="javascript:;">删除</a>
        </span>
      ),
    }];

    let data = this.props.queryResult.content || [];
    // data = data.concat(data).concat(data);
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
